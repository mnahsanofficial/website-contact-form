# 🚀 React Installation Guide

## 📦 **Installation**

### **1. Install the Package**
```bash
npm install website-contact-form@latest
```

### **2. Install Peer Dependencies**
```bash
npm install @ckeditor/ckeditor5-build-classic emailjs-com
```

### **3. Install React (if not already installed)**
```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```

## 🎯 **Usage Examples**

### **Basic React Component**
```tsx
import React from 'react';
import { ReactContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const ContactPage: React.FC = () => {
  const handleSubmit = async (data: { 
    name: string; 
    email: string; 
    messageHtml: string; 
    messageText: string 
  }) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="contact-container">
      <ReactContactForm
        theme="light"
        labels={{ 
          title: "Get In Touch",
          name: "Your Name",
          email: "Email Address",
          message: "Your Message"
        }}
        placeholders={{
          name: "John Doe",
          email: "john@example.com",
          message: "Tell us about your project..."
        }}
        onSubmit={handleSubmit}
        onSuccessMessage="✅ Thank you! Your message has been sent."
        onErrorMessage="❌ Something went wrong. Please try again."
      />
    </div>
  );
};

export default ContactPage;
```

### **With EmailJS Integration**
```tsx
import React from 'react';
import { ReactContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const ContactWithEmailJS: React.FC = () => {
  return (
    <ReactContactForm
      theme="dark"
      labels={{ title: "Contact Us" }}
      emailJS={{
        serviceId: "your_service_id",
        templateId: "your_template_id",
        publicKey: "your_public_key"
      }}
      onSubmit={(data) => {
        console.log('Form data:', data);
        // Additional processing if needed
      }}
    />
  );
};

export default ContactWithEmailJS;
```

### **Custom Styling**
```tsx
import React from 'react';
import { ReactContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const StyledContactForm: React.FC = () => {
  return (
    <div className="custom-contact-wrapper">
      <style>{`
        .custom-contact-wrapper .wcf__card {
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .custom-contact-wrapper .wcf__submit {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          border-radius: 25px;
        }
      `}</style>
      
      <ReactContactForm
        theme="light"
        labels={{ title: "Let's Talk!" }}
        accentGradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
      />
    </div>
  );
};

export default StyledContactForm;
```

## 🔧 **Configuration Options**

### **Theme Options**
```tsx
// Light theme (default)
<ReactContactForm theme="light" />

// Dark theme
<ReactContactForm theme="dark" />
```

### **Custom Labels**
```tsx
<ReactContactForm
  labels={{
    title: "Send us a message",
    name: "Full Name",
    email: "Work Email",
    message: "Project Details",
    button: "Submit Request"
  }}
/>
```

### **Custom Placeholders**
```tsx
<ReactContactForm
  placeholders={{
    name: "Enter your full name",
    email: "your.email@company.com",
    message: "Describe your project requirements..."
  }}
/>
```

### **EmailJS Configuration**
```tsx
<ReactContactForm
  emailJS={{
    serviceId: "your_emailjs_service_id",
    templateId: "your_emailjs_template_id",
    publicKey: "your_emailjs_public_key"
  }}
/>
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

### **Form Validation Handling**
```tsx
import React, { useState } from 'react';
import { ReactContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const AdvancedContactForm: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (data: any) => {
    setFormStatus('submitting');
    
    try {
      // Your custom submission logic
      await submitToAPI(data);
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div>
      <ReactContactForm
        onSubmit={handleSubmit}
        onSuccessMessage="Message sent successfully!"
        onErrorMessage="Failed to send message"
      />
      
      {formStatus === 'success' && (
        <div className="success-banner">
          ✅ Your message has been sent!
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="error-banner">
          ❌ Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
};

export default AdvancedContactForm;
```

### **Multiple Forms on Same Page**
```tsx
import React from 'react';
import { ReactContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const MultiFormPage: React.FC = () => {
  return (
    <div className="multi-form-page">
      <section className="general-inquiry">
        <h2>General Inquiry</h2>
        <ReactContactForm
          labels={{ title: "General Questions" }}
          onSubmit={(data) => console.log('General:', data)}
        />
      </section>
      
      <section className="support-request">
        <h2>Support Request</h2>
        <ReactContactForm
          theme="dark"
          labels={{ title: "Technical Support" }}
          onSubmit={(data) => console.log('Support:', data)}
        />
      </section>
    </div>
  );
};

export default MultiFormPage;
```

## 🔍 **Troubleshooting**

### **Common Issues & Solutions**

#### **1. CKEditor Not Loading**
```tsx
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

/* Or use CSS modules/emotion for scoped styling */
```

#### **3. Form Not Submitting**
```tsx
// Check if onSubmit handler is properly defined
<ReactContactForm
  onSubmit={(data) => {
    console.log('Form data:', data); // Verify data is received
    // Your submission logic
  }}
/>
```

#### **4. EmailJS Errors**
```tsx
// Verify EmailJS configuration
<ReactContactForm
  emailJS={{
    serviceId: "your_service_id",      // Check service ID
    templateId: "your_template_id",    // Check template ID
    publicKey: "your_public_key"       // Check public key
  }}
/>
```

## 📚 **TypeScript Support**

### **Full Type Definitions**
```tsx
import React from 'react';
import { 
  ReactContactForm, 
  CreateContactFormOptions,
  EmailJSConfig 
} from 'website-contact-form';

interface ContactFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    messageHtml: string;
    messageText: string;
  }) => void | Promise<void>;
  theme?: 'light' | 'dark';
  emailJS?: EmailJSConfig;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, theme, emailJS }) => {
  return (
    <ReactContactForm
      theme={theme}
      onSubmit={onSubmit}
      emailJS={emailJS}
    />
  );
};

export default ContactForm;
```

## 🎯 **Best Practices**

### **1. Performance Optimization**
```tsx
// Use React.memo for static forms
const ContactForm = React.memo(() => (
  <ReactContactForm
    theme="light"
    onSubmit={handleSubmit}
  />
));

// Lazy load for better performance
const ContactForm = React.lazy(() => import('./ContactForm'));
```

### **2. Accessibility**
```tsx
// Ensure proper ARIA labels
<ReactContactForm
  labels={{
    title: "Contact Form",
    name: "Full Name (Required)",
    email: "Email Address (Required)",
    message: "Your Message (Required)"
  }}
/>
```

### **3. Error Handling**
```tsx
const handleSubmit = async (data: any) => {
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
2. **Import the component**: `import { ReactContactForm } from 'website-contact-form'`
3. **Add CSS**: `import 'website-contact-form/dist/style.css'`
4. **Customize as needed**: Use the configuration options above
5. **Test thoroughly**: Ensure form submission works in your environment

## 📞 **Support**

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/mnahsanofficial/website-contact-form/issues)
- **Author**: [Nazmul Ahsan](https://www.linkedin.com/in/mn-ahsan/)
- **Company**: [TrioTrix Tech Solutions](https://www.linkedin.com/company/triotrix-tech-solutions/)

---

**Happy coding! 🎉**
