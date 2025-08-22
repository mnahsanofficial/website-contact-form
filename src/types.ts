export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export type Theme = "light" | "dark";

export interface Placeholders {
  name?: string;
  email?: string;
  message?: string;
  button?: string;
}

export interface Labels {
  title?: string;              // default: "Send Me a Message"
  name?: string;               // default: "Your Name"
  email?: string;              // default: "Email Address"
  message?: string;            // default: "Your Message"
}

export interface CreateContactFormOptions {
  target: string | HTMLElement;         // DOM selector or node to mount into
  theme?: Theme;                         // default: "light"
  labels?: Labels;
  placeholders?: Placeholders;
  buttonText?: string;                   // default: "Send Message"
  locale?: string;                       // reserved for future i18n
  emailJS?: EmailJSConfig;               // if provided, auto-sends email
  onSubmit?: (data: { name: string; email: string; messageHtml: string; messageText: string }) => void | Promise<void>;
  onSuccessMessage?: string;             // default: "✅ Message sent successfully!"
  onErrorMessage?: string;               // default: "❌ Failed to send. Please try again."
  accentGradient?: string;               // CSS gradient for button (default blue→purple)
}

export interface Destroyable {
  destroy(): void; // unmount and cleanup (CKEditor teardown, events removal)
}

export interface FormData {
  name: string;
  email: string;
  messageHtml: string;
  messageText: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}
