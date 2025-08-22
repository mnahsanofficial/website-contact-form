import type { 
  CreateContactFormOptions, 
  Destroyable, 
  FormData
} from './types';
import { validateForm } from './validation';
import { createCKEditor, type CKEditorWrapper } from './editor';
import { sendEmailViaEmailJS } from './email';

/**
 * Creates and mounts the contact form, returns a destroyable handle.
 */
export async function createContactForm(options: CreateContactFormOptions): Promise<Destroyable> {
  let targetElement: HTMLElement;
  
  if (typeof options.target === 'string') {
    const element = document.querySelector(options.target);
    if (!element) {
      throw new Error(`Target element not found: ${options.target}`);
    }
    targetElement = element as HTMLElement;
  } else {
    targetElement = options.target;
  }
  
  return new ContactForm(targetElement, options);
}

export class ContactForm implements Destroyable {
  private container: HTMLElement;
  private form!: HTMLFormElement;
  private nameInput!: HTMLInputElement;
  private emailInput!: HTMLInputElement;
  private messageEditor: CKEditorWrapper | null = null;
  private submitButton!: HTMLButtonElement;
  private statusElement!: HTMLElement;
  private honeypotInput!: HTMLInputElement;
  private options: CreateContactFormOptions;
  private isSubmitting = false;

  constructor(container: HTMLElement, options: CreateContactFormOptions) {
    this.container = container;
    this.options = options;
    this.createForm();
    this.setupEventListeners();
  }

  private createForm(): void {
    const theme = this.options.theme || 'light';
    const labels = this.options.labels || {};
    const placeholders = this.options.placeholders || {};
    const buttonText = this.options.buttonText || 'Send Message';
    const title = labels.title || 'Send Me a Message';

    this.container.className = `wcf wcf--${theme}`;
    
    this.container.innerHTML = `
      <div class="wcf__card">
        <h2 class="wcf__title">${title}</h2>
        
        <form class="wcf__form" novalidate>
          <div class="wcf__field">
            <label for="wcf-name" class="wcf__label">${labels.name || 'Your Name'}</label>
            <input 
              type="text" 
              id="wcf-name" 
              name="name" 
              class="wcf__input" 
              placeholder="${placeholders.name || 'Enter your name'}"
              required
              minlength="2"
            />
            <div class="wcf__error" id="wcf-name-error" aria-live="polite"></div>
          </div>

          <div class="wcf__field">
            <label for="wcf-email" class="wcf__label">${labels.email || 'Email Address'}</label>
            <input 
              type="email" 
              id="wcf-email" 
              name="email" 
              class="wcf__input" 
              placeholder="${placeholders.email || 'Enter your email'}"
              required
            />
            <div class="wcf__error" id="wcf-email-error" aria-live="polite"></div>
          </div>

          <div class="wcf__field">
            <label for="wcf-message" class="wcf__label">${labels.message || 'Your Message'}</label>
            <div id="wcf-message" class="wcf__editor" placeholder="${placeholders.message || 'Type your message here...'}"></div>
            <div class="wcf__error" id="wcf-message-error" aria-live="polite"></div>
          </div>

          <!-- Honeypot field -->
          <input 
            type="text" 
            name="website" 
            class="wcf__honeypot" 
            tabindex="-1" 
            autocomplete="off"
            style="position: absolute; left: -9999px;"
          />

          <button type="submit" class="wcf__submit" disabled>
            <span class="wcf__submit-text">${buttonText}</span>
            <span class="wcf__submit-spinner" style="display: none;">
              <svg class="wcf__spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                </circle>
              </svg>
            </span>
          </button>
        </form>

        <div class="wcf__status" id="wcf-status" aria-live="polite"></div>
      </div>
    `;

    // Get references to form elements
    this.form = this.container.querySelector('.wcf__form') as HTMLFormElement;
    this.nameInput = this.container.querySelector('#wcf-name') as HTMLInputElement;
    this.emailInput = this.container.querySelector('#wcf-email') as HTMLInputElement;
    this.submitButton = this.container.querySelector('.wcf__submit') as HTMLButtonElement;
    this.statusElement = this.container.querySelector('#wcf-status') as HTMLElement;
    this.honeypotInput = this.container.querySelector('.wcf__honeypot') as HTMLInputElement;

    // Initialize CKEditor with a small delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeEditor();
    }, 100);
  }

  private async initializeEditor(): Promise<void> {
    try {
      const editorElement = this.container.querySelector('#wcf-message') as HTMLElement;
      console.log('Initializing CKEditor on element:', editorElement);
      
      if (!editorElement) {
        throw new Error('Editor element not found');
      }
      
      this.messageEditor = await createCKEditor(editorElement);
      this.submitButton.disabled = false;
      console.log('CKEditor initialized successfully');
    } catch (error) {
      console.error('Failed to initialize editor:', error);
      this.showError('Failed to initialize rich text editor. Please refresh the page.');
    }
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Real-time validation
    this.nameInput.addEventListener('blur', () => this.validateField('name'));
    this.emailInput.addEventListener('blur', () => this.validateField('email'));
    
    // Clear errors on input
    this.nameInput.addEventListener('input', () => this.clearFieldError('name'));
    this.emailInput.addEventListener('input', () => this.clearFieldError('email'));
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    
    if (this.isSubmitting) return;
    
    // Check honeypot
    if (this.honeypotInput.value.trim()) {
      console.log('Honeypot triggered, blocking submission');
      return;
    }

    // Validate form
    const formData = this.getFormData();
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      this.showValidationErrors(validation.errors);
      return;
    }

    this.isSubmitting = true;
    this.setSubmittingState(true);
    this.clearAllErrors();

    try {
      // Call onSubmit callback if provided
      if (this.options.onSubmit) {
        await this.options.onSubmit(formData);
      }

      // Send via EmailJS if configured
      if (this.options.emailJS) {
        const emailResult = await sendEmailViaEmailJS(this.options.emailJS, formData);
        
        if (emailResult.success) {
          this.showSuccess(this.options.onSuccessMessage || '✅ Message sent successfully!');
          this.resetForm();
        } else {
          this.showError(emailResult.error || this.options.onErrorMessage || '❌ Failed to send. Please try again.');
        }
      } else {
        // No EmailJS, just show success
        this.showSuccess(this.options.onSuccessMessage || '✅ Message sent successfully!');
        this.resetForm();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError(this.options.onErrorMessage || '❌ Failed to send. Please try again.');
    } finally {
      this.isSubmitting = false;
      this.setSubmittingState(false);
    }
  }

  private getFormData(): FormData {
    return {
      name: this.nameInput.value.trim(),
      email: this.emailInput.value.trim(),
      messageHtml: this.messageEditor?.getData() || '',
      messageText: this.messageEditor?.getDataAsText() || ''
    };
  }

  private validateField(fieldName: string): void {
    const formData = this.getFormData();
    const validation = validateForm(formData);
    
    if (validation.errors[fieldName as keyof typeof validation.errors]) {
      this.showFieldError(fieldName, validation.errors[fieldName as keyof typeof validation.errors]!);
    }
  }

  private showFieldError(fieldName: string, message: string): void {
    const errorElement = this.container.querySelector(`#wcf-${fieldName}-error`) as HTMLElement;
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      
      const inputElement = this.container.querySelector(`#wcf-${fieldName}`) as HTMLElement;
      if (inputElement) {
        inputElement.setAttribute('aria-invalid', 'true');
        inputElement.setAttribute('aria-describedby', `wcf-${fieldName}-error`);
      }
    }
  }

  private clearFieldError(fieldName: string): void {
    const errorElement = this.container.querySelector(`#wcf-${fieldName}-error`) as HTMLElement;
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    
    const inputElement = this.container.querySelector(`#wcf-${fieldName}`) as HTMLElement;
    if (inputElement) {
      inputElement.removeAttribute('aria-invalid');
      inputElement.removeAttribute('aria-describedby');
    }
  }

  private clearAllErrors(): void {
    ['name', 'email', 'message'].forEach(field => {
      this.clearFieldError(field);
    });
  }

  private showValidationErrors(errors: { [key: string]: string | undefined }): void {
    Object.entries(errors).forEach(([field, message]) => {
      if (message) {
        this.showFieldError(field, message);
      }
    });
  }

  private setSubmittingState(isSubmitting: boolean): void {
    this.submitButton.disabled = isSubmitting;
    
    const submitText = this.submitButton.querySelector('.wcf__submit-text') as HTMLElement;
    const spinner = this.submitButton.querySelector('.wcf__submit-spinner') as HTMLElement;
    
    if (isSubmitting) {
      submitText.style.display = 'none';
      spinner.style.display = 'inline-block';
    } else {
      submitText.style.display = 'inline';
      spinner.style.display = 'none';
    }
  }

  private showSuccess(message: string): void {
    this.statusElement.innerHTML = `<div class="wcf__success">${message}</div>`;
    this.statusElement.style.display = 'block';
  }

  private showError(message: string): void {
    this.statusElement.innerHTML = `<div class="wcf__error">${message}</div>`;
    this.statusElement.style.display = 'block';
  }

  private resetForm(): void {
    this.form.reset();
    if (this.messageEditor) {
      this.messageEditor.editor.setData('');
    }
    this.clearAllErrors();
    this.statusElement.style.display = 'none';
  }

  public destroy(): void {
    if (this.messageEditor) {
      this.messageEditor.destroy();
    }
    
    // Remove event listeners
    this.form.removeEventListener('submit', this.handleSubmit);
    this.nameInput.removeEventListener('blur', () => this.validateField('name'));
    this.emailInput.removeEventListener('blur', () => this.validateField('email'));
    this.nameInput.removeEventListener('input', () => this.clearFieldError('name'));
    this.emailInput.removeEventListener('input', () => this.clearFieldError('email'));
    
    // Clear container
    this.container.innerHTML = '';
    this.container.className = '';
  }
}
