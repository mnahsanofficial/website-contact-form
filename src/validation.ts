import { ValidationResult } from './types';

/**
 * Validates email format using RFC-like regex
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates form data and returns validation result
 */
export function validateForm(data: { name: string; email: string; messageHtml: string }): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  let isValid = true;

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
    isValid = false;
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Message validation - strip HTML tags and check for content
  const messageText = data.messageHtml.replace(/<[^>]*>/g, '').trim();
  if (!messageText) {
    errors.message = 'Message is required';
    isValid = false;
  }

  return { isValid, errors };
}

/**
 * Strips HTML tags from content and returns plain text
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
