import { createContactForm, type CreateContactFormOptions } from '../src/index';
import '../src/styles.css';

/**
 * Demo: Basic contact form with light theme
 */
async function createBasicForm(): Promise<void> {
  try {
    const form = await createContactForm({
      target: '#contact-basic',
      theme: 'light',
      labels: {
        title: 'Contact Us',
        name: 'Your Name',
        email: 'Email Address',
        message: 'Your Message'
      },
      buttonText: 'Send Message',
      onSubmit: (data) => {
        console.log('Basic form submitted:', data);
        // Handle form data here
      }
    });

    console.log('Basic form created successfully');
  } catch (error) {
    console.error('Failed to create basic form:', error);
  }
}

/**
 * Demo: Dark theme form with custom styling
 */
async function createDarkForm(): Promise<void> {
  try {
    const form = await createContactForm({
      target: '#contact-dark',
      theme: 'dark',
      labels: {
        title: 'Get in Touch',
        name: 'Full Name',
        email: 'Email',
        message: 'Project Details'
      },
      placeholders: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Tell us about your project...'
      },
      buttonText: 'Start Project',
      accentGradient: 'linear-gradient(90deg, #f59e0b, #dc2626)',
      onSubmit: (data) => {
        console.log('Dark form submitted:', data);
      }
    });

    console.log('Dark form created successfully');
  } catch (error) {
    console.error('Failed to create dark form:', error);
  }
}

/**
 * Demo: Form with EmailJS integration
 */
async function createEmailJSForm(): Promise<void> {
  try {
    const form = await createContactForm({
      target: '#contact-emailjs',
      theme: 'light',
      labels: {
        title: 'Send Message',
        name: 'Your Name',
        email: 'Email Address',
        message: 'Message'
      },
      placeholders: {
        name: 'Your full name',
        email: 'your.email@domain.com',
        message: 'Type your message here...'
      },
      buttonText: 'Send via Email',
      emailJS: {
        serviceId: process.env.EMAILJS_SERVICE_ID || 'your_service_id',
        templateId: process.env.EMAILJS_TEMPLATE_ID || 'your_template_id',
        publicKey: process.env.EMAILJS_PUBLIC_KEY || 'your_public_key'
      },
      onSubmit: (data) => {
        console.log('Form validated, sending via EmailJS:', data);
        // This callback runs before EmailJS sends the email
      },
      onSuccessMessage: '🎉 Message sent successfully! We\'ll get back to you soon.',
      onErrorMessage: '❌ Failed to send message. Please try again or contact us directly.'
    });

    console.log('EmailJS form created successfully');
  } catch (error) {
    console.error('Failed to create EmailJS form:', error);
  }
}

/**
 * Demo: Form with custom validation and handling
 */
async function createCustomForm(): Promise<void> {
  try {
    const form = await createContactForm({
      target: '#contact-custom',
      theme: 'light',
      labels: {
        title: 'Project Inquiry',
        name: 'Contact Person',
        email: 'Business Email',
        message: 'Project Requirements'
      },
      placeholders: {
        name: 'Your name or company',
        email: 'business@company.com',
        message: 'Describe your project needs, timeline, and budget...'
      },
      buttonText: 'Submit Inquiry',
      onSubmit: async (data) => {
        console.log('Custom form submitted:', data);
        
        // Example: Custom validation or processing
        if (data.messageText.length < 50) {
          throw new Error('Message is too short. Please provide more details.');
        }
        
        // Example: Send to your own API
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          
          if (!response.ok) {
            throw new Error('Failed to save contact request');
          }
          
          console.log('Contact request saved successfully');
        } catch (apiError) {
          console.error('API error:', apiError);
          throw apiError;
        }
      }
    });

    console.log('Custom form created successfully');
  } catch (error) {
    console.error('Failed to create custom form:', error);
  }
}

/**
 * Demo: Form lifecycle management
 */
async function createManagedForm(): Promise<void> {
  try {
    const form = await createContactForm({
      target: '#contact-managed',
      theme: 'light',
      labels: {
        title: 'Managed Form',
        name: 'Name',
        email: 'Email',
        message: 'Message'
      },
      buttonText: 'Submit'
    });

    console.log('Managed form created successfully');

    // Example: Destroy form after 30 seconds (for demo purposes)
    setTimeout(() => {
      console.log('Destroying managed form...');
      form.destroy();
      console.log('Managed form destroyed');
    }, 30000);

  } catch (error) {
    console.error('Failed to create managed form:', error);
  }
}

/**
 * Initialize all demo forms
 */
async function initializeAllForms(): Promise<void> {
  console.log('Initializing website contact form demos...');
  
  await Promise.all([
    createBasicForm(),
    createDarkForm(),
    createEmailJSForm(),
    createCustomForm(),
    createManagedForm()
  ]);
  
  console.log('All demo forms initialized successfully!');
}

/**
 * Error handling wrapper
 */
function handleErrors(fn: () => Promise<void>): void {
  fn().catch(error => {
    console.error('Demo error:', error);
  });
}

// Initialize forms when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    handleErrors(initializeAllForms);
  });
} else {
  handleErrors(initializeAllForms);
}

// Export for potential external use
export {
  createBasicForm,
  createDarkForm,
  createEmailJSForm,
  createCustomForm,
  createManagedForm,
  initializeAllForms
};
