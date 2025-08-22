# 🚀 Vite Installation Guide

## 📦 **Installation**

### **1. Install the Package**
```bash
npm install website-contact-form@latest
```

### **2. Install Peer Dependencies**
```bash
npm install @ckeditor/ckeditor5-build-classic emailjs-com
```

### **3. Install Vite (if not already installed)**
```bash
npm install --save-dev vite
npm install --save-dev @vitejs/plugin-react # For React projects
npm install --save-dev @vitejs/plugin-vue # For Vue projects
```

## 🎯 **Usage Examples**

### **Basic Vanilla JavaScript with Vite**
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Demo</title>
  <link rel="stylesheet" href="./dist/style.css">
</head>
<body>
  <div id="contact-form"></div>
  <script type="module" src="./src/main.js"></script>
</body>
</html>
```

```javascript
// src/main.js
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const initContactForm = async () => {
  try {
    const formInstance = await createContactForm({
      target: '#contact-form',
      theme: 'light',
      labels: { 
        title: "Get In Touch",
        name: "Your Name",
        email: "Email Address",
        message: "Your Message"
      },
      placeholders: {
        name: "John Doe",
        email: "john@example.com",
        message: "Tell us about your project..."
      },
      onSubmit: (data) => {
        console.log('Form submitted:', data);
        // Handle form submission
      },
      onSuccessMessage: "✅ Thank you! Your message has been sent.",
      onErrorMessage: "❌ Something went wrong. Please try again."
    });

    // Store instance for cleanup if needed
    window.contactFormInstance = formInstance;
  } catch (error) {
    console.error('Failed to initialize contact form:', error);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
```

### **With EmailJS Integration**
```javascript
// src/contact-form-emailjs.js
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const initEmailJSContactForm = async () => {
  try {
    const formInstance = await createContactForm({
      target: '#contact-form',
      theme: 'dark',
      labels: { title: "Contact Us" },
      emailJS: {
        serviceId: "your_service_id",
        templateId: "your_template_id",
        publicKey: "your_public_key"
      },
      onSubmit: (data) => {
        console.log('Form data:', data);
        // Additional processing if needed
      }
    });

    return formInstance;
  } catch (error) {
    console.error('Failed to initialize EmailJS contact form:', error);
    throw error;
  }
};

export { initEmailJSContactForm };
```

### **Advanced Form with Custom Styling**
```javascript
// src/advanced-contact-form.js
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

class AdvancedContactForm {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = options;
    this.formInstance = null;
    this.statusElement = null;
  }

  async init() {
    try {
      // Create status element
      this.createStatusElement();

      // Initialize form
      this.formInstance = await createContactForm({
        target: this.containerId,
        theme: this.options.theme || 'light',
        labels: this.options.labels || { title: "Contact Us" },
        placeholders: this.options.placeholders || {},
        onSubmit: this.handleSubmit.bind(this),
        onSuccessMessage: this.options.onSuccessMessage || "✅ Message sent successfully!",
        onErrorMessage: this.options.onErrorMessage || "❌ Failed to send message."
      });

      console.log('Advanced contact form initialized');
    } catch (error) {
      console.error('Failed to initialize advanced contact form:', error);
      this.showError('Failed to initialize contact form');
    }
  }

  createStatusElement() {
    const container = document.querySelector(this.containerId);
    if (container) {
      this.statusElement = document.createElement('div');
      this.statusElement.className = 'custom-status';
      this.statusElement.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        display: none;
      `;
      container.appendChild(this.statusElement);
    }
  }

  async handleSubmit(data) {
    try {
      this.showStatus('submitting', 'Sending message...');
      
      // Your custom submission logic
      await this.submitToAPI(data);
      
      this.showStatus('success', 'Message sent successfully!');
      
      // Reset form after success
      setTimeout(() => {
        this.resetForm();
      }, 3000);
      
    } catch (error) {
      console.error('Form submission failed:', error);
      this.showStatus('error', 'Failed to send message. Please try again.');
    }
  }

  async submitToAPI(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve(data);
        } else {
          reject(new Error('Simulated API failure'));
        }
      }, 1000);
    });
  }

  showStatus(type, message) {
    if (!this.statusElement) return;

    this.statusElement.style.display = 'block';
    this.statusElement.textContent = message;
    this.statusElement.className = `custom-status ${type}`;

    // Set colors based on type
    switch (type) {
      case 'success':
        this.statusElement.style.backgroundColor = '#d1fae5';
        this.statusElement.style.color = '#065f46';
        this.statusElement.style.border = '1px solid #a7f3d0';
        break;
      case 'error':
        this.statusElement.style.backgroundColor = '#fee2e2';
        this.statusElement.style.color = '#991b1b';
        this.statusElement.style.border = '1px solid #fecaca';
        break;
      case 'submitting':
        this.statusElement.style.backgroundColor = '#dbeafe';
        this.statusElement.style.color = '#1e40af';
        this.statusElement.style.border = '1px solid #93c5fd';
        break;
    }
  }

  resetForm() {
    if (this.statusElement) {
      this.statusElement.style.display = 'none';
    }
  }

  destroy() {
    if (this.formInstance) {
      this.formInstance.destroy();
      this.formInstance = null;
    }
  }
}

export { AdvancedContactForm };
```

## 🔧 **Configuration Options**

### **Theme Options**
```javascript
// Light theme (default)
await createContactForm({
  target: '#contact-form',
  theme: 'light'
});

// Dark theme
await createContactForm({
  target: '#contact-form',
  theme: 'dark'
});
```

### **Custom Labels**
```javascript
await createContactForm({
  target: '#contact-form',
  labels: {
    title: "Send us a message",
    name: "Full Name",
    email: "Work Email",
    message: "Project Details",
    button: "Submit Request"
  }
});
```

### **Custom Placeholders**
```javascript
await createContactForm({
  target: '#contact-form',
  placeholders: {
    name: "Enter your full name",
    email: "your.email@company.com",
    message: "Describe your project requirements..."
  }
});
```

### **EmailJS Configuration**
```javascript
await createContactForm({
  target: '#contact-form',
  emailJS: {
    serviceId: "your_emailjs_service_id",
    templateId: "your_emailjs_template_id",
    publicKey: "your_emailjs_public_key"
  }
});
```

## 🎨 **Styling & Theming**

### **CSS Variables for Customization**
```css
.wcf {
  --bg: #ffffff;                    /* Background color */
  --fg: #1f2937;                    /* Text color */
  --muted: #6b7280;                 /* Muted text color */
  --border: #d1d5db;                /* Border color */
  --ring: #3b82f6;                  /* Focus ring color */
  --accentStart: #2563eb;           /* Button gradient start */
  --accentEnd: #7c3aed;             /* Button gradient end */
  --error: #dc2626;                 /* Error color */
  --success: #16a34a;               /* Success color */
}

.wcf--dark {
  --bg: #111827;
  --fg: #f9fafb;
  --muted: #9ca3af;
  --border: #374151;
  --ring: #60a5fa;
}
```

### **Custom CSS Overrides**
```css
/* Custom button styling */
.wcf__submit {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Custom input styling */
.wcf__input {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.wcf__input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

## 🚀 **Advanced Usage**

### **Multiple Forms on Same Page**
```javascript
// src/multi-form.js
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

class MultiFormManager {
  constructor() {
    this.forms = new Map();
  }

  async createForm(containerId, options) {
    try {
      const formInstance = await createContactForm({
        target: containerId,
        ...options
      });

      this.forms.set(containerId, formInstance);
      console.log(`Form created in ${containerId}`);
      
      return formInstance;
    } catch (error) {
      console.error(`Failed to create form in ${containerId}:`, error);
      throw error;
    }
  }

  destroyForm(containerId) {
    const formInstance = this.forms.get(containerId);
    if (formInstance) {
      formInstance.destroy();
      this.forms.delete(containerId);
      console.log(`Form destroyed in ${containerId}`);
    }
  }

  destroyAllForms() {
    this.forms.forEach((formInstance, containerId) => {
      formInstance.destroy();
      console.log(`Form destroyed in ${containerId}`);
    });
    this.forms.clear();
  }
}

// Usage
const multiFormManager = new MultiFormManager();

// Create multiple forms
await multiFormManager.createForm('#general-form', {
  theme: 'light',
  labels: { title: "General Questions" },
  onSubmit: (data) => console.log('General:', data)
});

await multiFormManager.createForm('#support-form', {
  theme: 'dark',
  labels: { title: "Technical Support" },
  onSubmit: (data) => console.log('Support:', data)
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  multiFormManager.destroyAllForms();
});
```

### **Form Validation Handling**
```javascript
// src/form-validation.js
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

class ValidatedContactForm {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = options;
    this.formInstance = null;
    this.validationErrors = [];
  }

  async init() {
    try {
      this.formInstance = await createContactForm({
        target: this.containerId,
        theme: this.options.theme || 'light',
        labels: this.options.labels || { title: "Contact Form" },
        onSubmit: this.handleSubmit.bind(this)
      });

      this.createValidationDisplay();
    } catch (error) {
      console.error('Failed to initialize validated contact form:', error);
    }
  }

  createValidationDisplay() {
    const container = document.querySelector(this.containerId);
    if (container) {
      this.validationElement = document.createElement('div');
      this.validationElement.className = 'validation-errors';
      this.validationElement.style.cssText = `
        margin-top: 20px;
        padding: 15px;
        background-color: #fee2e2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        display: none;
      `;
      container.appendChild(this.validationElement);
    }
  }

  async handleSubmit(data) {
    // Clear previous errors
    this.clearValidationErrors();
    
    // Custom validation
    if (!data.name.trim()) {
      this.addValidationError('name', 'Name is required');
    }
    
    if (!data.email.includes('@')) {
      this.addValidationError('email', 'Valid email is required');
    }
    
    if (this.validationErrors.length > 0) {
      this.showValidationErrors();
      return; // Don't submit if validation fails
    }
    
    // Submit form
    try {
      await this.submitToAPI(data);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }

  addValidationError(field, message) {
    this.validationErrors.push({ field, message });
  }

  showValidationErrors() {
    if (!this.validationElement) return;

    this.validationElement.style.display = 'block';
    this.validationElement.innerHTML = this.validationErrors
      .map(error => `<div class="error-item">${error.message}</div>`)
      .join('');
  }

  clearValidationErrors() {
    this.validationErrors = [];
    if (this.validationElement) {
      this.validationElement.style.display = 'none';
    }
  }

  async submitToAPI(data) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  destroy() {
    if (this.formInstance) {
      this.formInstance.destroy();
      this.formInstance = null;
    }
  }
}

export { ValidatedContactForm };
```

## 🔍 **Troubleshooting**

### **Common Issues & Solutions**

#### **1. CKEditor Not Loading**
```javascript
// Ensure CKEditor is properly imported
import 'website-contact-form/dist/style.css';

// Check browser console for errors
// Verify network connectivity for CDN resources
```

#### **2. Styling Conflicts**
```css
/* Use more specific selectors */
.contact-page .wcf__card {
  /* Your custom styles */
}

/* Or use CSS modules for scoped styling */
```

#### **3. Form Not Submitting**
```javascript
// Check if onSubmit handler is properly defined
await createContactForm({
  target: '#contact-form',
  onSubmit: (data) => {
    console.log('Form data:', data); // Verify data is received
    // Your submission logic
  }
});
```

#### **4. EmailJS Errors**
```javascript
// Verify EmailJS configuration
await createContactForm({
  target: '#contact-form',
  emailJS: {
    serviceId: "your_service_id",      // Check service ID
    templateId: "your_template_id",    // Check template ID
    publicKey: "your_public_key"       // Check public key
  }
});
```

## 📚 **TypeScript Support**

### **Full Type Definitions**
```typescript
import { 
  createContactForm, 
  CreateContactFormOptions,
  EmailJSConfig,
  Destroyable 
} from 'website-contact-form';

interface ContactFormConfig {
  target: string;
  theme?: 'light' | 'dark';
  onSubmit: (data: {
    name: string;
    email: string;
    messageHtml: string;
    messageText: string;
  }) => void | Promise<void>;
  emailJS?: EmailJSConfig;
}

const createContactFormInstance = async (config: ContactFormConfig): Promise<Destroyable> => {
  return await createContactForm(config);
};
```

## 🎯 **Best Practices**

### **1. Performance Optimization**
```javascript
// Use lazy loading for better performance
const loadContactForm = async () => {
  const { createContactForm } = await import('website-contact-form');
  return createContactForm;
};

// Initialize only when needed
const initForm = async () => {
  const createContactForm = await loadContactForm();
  // Use the function
};
```

### **2. Accessibility**
```javascript
await createContactForm({
  target: '#contact-form',
  labels: {
    title: "Contact Form",
    name: "Full Name (Required)",
    email: "Email Address (Required)",
    message: "Your Message (Required)"
  }
});
```

### **3. Error Handling**
```javascript
const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    showSuccess('Message sent successfully!');
  } catch (error) {
    console.error('Form submission error:', error);
    showError('Failed to send message. Please try again.');
  }
};
```

## 🚀 **Next Steps**

1. **Install the package**: `npm install website-contact-form@latest`
2. **Import the function**: `import { createContactForm } from 'website-contact-form'`
3. **Add CSS**: `import 'website-contact-form/dist/style.css'`
4. **Create form instance**: Use `createContactForm()` with proper target
5. **Clean up**: Call `destroy()` when needed
6. **Test thoroughly**: Ensure form submission works in your environment

## 📞 **Support**

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/mnahsanofficial/website-contact-form/issues)
- **Author**: [Nazmul Ahsan](https://www.linkedin.com/in/mn-ahsan/)
- **Company**: [TrioTrix Tech Solutions](https://www.linkedin.com/company/triotrix-tech-solutions/)

---

**Happy coding! 🎉**
