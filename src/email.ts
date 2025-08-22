import type { EmailJSConfig, FormData } from './types';

// Rate limiting: prevent repeat submits within 10 seconds
const SUBMIT_COOLDOWN_MS = 10000;
let lastSubmitTime = 0;

/**
 * Sends email via EmailJS
 */
export async function sendEmailViaEmailJS(
  config: EmailJSConfig, 
  data: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
      return {
        success: false,
        error: 'Please wait a moment before sending another message.'
      };
    }

    // Dynamic import to avoid SSR issues
    const emailjs = await import('emailjs-com');
    
    // Initialize EmailJS if not already done
    if (typeof emailjs.default.init === 'function') {
      emailjs.default.init(config.publicKey);
    }

    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message_html: data.messageHtml,
      message_text: data.messageText,
    };

    // Send email
    const result = await emailjs.default.send(
      config.serviceId,
      config.templateId,
      templateParams
    );

    if (result.status === 200) {
      lastSubmitTime = now;
      return { success: true };
    } else {
      return {
        success: false,
        error: `Email service returned status: ${result.status}`
      };
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = 'Failed to send email. Please try again.';
    
    if (error instanceof Error) {
      if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message.includes('service') || error.message.includes('template')) {
        errorMessage = 'Email service configuration error. Please contact support.';
      }
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}
