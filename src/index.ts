export type {
  EmailJSConfig,
  Theme,
  Placeholders,
  Labels,
  CreateContactFormOptions,
  Destroyable,
  FormData
} from './types';

export { createContactForm } from './form';

// Re-export the main function for UMD global access
export { createContactForm as default } from './form';

// React-specific exports
export { ReactContactForm } from './react';
export type { ReactContactFormProps } from './react';
