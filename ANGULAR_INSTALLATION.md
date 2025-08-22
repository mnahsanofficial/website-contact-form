# 🚀 Angular Installation Guide

## 📦 **Installation**

### **1. Install the Package**
```bash
npm install website-contact-form@latest
```

### **2. Install Peer Dependencies**
```bash
npm install @ckeditor/ckeditor5-build-classic emailjs-com
```

### **3. Install Angular (if not already installed)**
```bash
npm install @angular/core @angular/common @angular/platform-browser
npm install --save-dev @angular/compiler @angular/compiler-cli
```

## 🎯 **Usage Examples**

### **Basic Angular Component**
```typescript
// contact-form.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { createContactForm, Destroyable } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

@Component({
  selector: 'app-contact-form',
  template: `
    <div class="contact-container">
      <div #contactFormContainer></div>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @ViewChild('contactFormContainer', { static: true }) 
  contactFormContainer!: ElementRef;

  private formInstance: Destroyable | null = null;

  async ngOnInit() {
    this.formInstance = await createContactForm({
      target: this.contactFormContainer.nativeElement,
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
      onSubmit: this.handleSubmit.bind(this),
      onSuccessMessage: "✅ Thank you! Your message has been sent.",
      onErrorMessage: "❌ Something went wrong. Please try again."
    });
  }

  ngOnDestroy() {
    if (this.formInstance) {
      this.formInstance.destroy();
    }
  }

  private async handleSubmit(data: { 
    name: string; 
    email: string; 
    messageHtml: string; 
    messageText: string 
  }) {
    console.log('Form submitted:', data);
    // Handle form submission
  }
}
```

### **With EmailJS Integration**
```typescript
// contact-form-emailjs.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { createContactForm, Destroyable } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

@Component({
  selector: 'app-contact-form-emailjs',
  template: `
    <div class="contact-page">
      <div #contactFormContainer></div>
    </div>
  `
})
export class ContactFormEmailJSComponent implements OnInit, OnDestroy {
  @ViewChild('contactFormContainer', { static: true }) 
  contactFormContainer!: ElementRef;

  private formInstance: Destroyable | null = null;

  async ngOnInit() {
    this.formInstance = await createContactForm({
      target: this.contactFormContainer.nativeElement,
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
  }

  ngOnDestroy() {
    if (this.formInstance) {
      this.formInstance.destroy();
    }
  }
}
```

### **Reactive Form Component with Status**
```typescript
// contact-form-reactive.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { createContactForm, Destroyable } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

@Component({
  selector: 'app-contact-form-reactive',
  template: `
    <div class="contact-form-wrapper">
      <div #contactFormContainer></div>
      
      <!-- Custom status display -->
      <div *ngIf="formStatus" [class]="'status-banner ' + formStatus">
        <span *ngIf="formStatus === 'success'">✅ {{ successMessage }}</span>
        <span *ngIf="formStatus === 'error'">❌ {{ errorMessage }}</span>
      </div>
    </div>
  `,
  styles: [`
    .contact-form-wrapper {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .status-banner {
      margin-top: 20px;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: 500;
    }
    
    .status-banner.success {
      background-color: #d1fae5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }
    
    .status-banner.error {
      background-color: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  `]
})
export class ContactFormReactiveComponent implements OnInit, OnDestroy {
  @ViewChild('contactFormContainer', { static: true }) 
  contactFormContainer!: ElementRef;

  formStatus: 'success' | 'error' | null = null;
  successMessage = '';
  errorMessage = '';

  private formInstance: Destroyable | null = null;

  async ngOnInit() {
    this.formInstance = await createContactForm({
      target: this.contactFormContainer.nativeElement,
      theme: 'light',
      labels: { title: "Let's Talk!" },
      onSubmit: this.handleSubmit.bind(this)
    });
  }

  ngOnDestroy() {
    if (this.formInstance) {
      this.formInstance.destroy();
    }
  }

  private async handleSubmit(data: any) {
    try {
      // Your custom submission logic
      await this.submitToAPI(data);
      this.formStatus = 'success';
      this.successMessage = 'Message sent successfully!';
    } catch (error) {
      this.formStatus = 'error';
      this.errorMessage = 'Failed to send message. Please try again.';
    }
  }

  private async submitToAPI(data: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}
```

## 🔧 **Configuration Options**

### **Theme Options**
```typescript
// Light theme (default)
await createContactForm({
  target: this.contactFormContainer.nativeElement,
  theme: 'light'
});

// Dark theme
await createContactForm({
  target: this.contactFormContainer.nativeElement,
  theme: 'dark'
});
```

### **Custom Labels**
```typescript
await createContactForm({
  target: this.contactFormContainer.nativeElement,
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
```typescript
await createContactForm({
  target: this.contactFormContainer.nativeElement,
  placeholders: {
    name: "Enter your full name",
    email: "your.email@company.com",
    message: "Describe your project requirements..."
  }
});
```

### **EmailJS Configuration**
```typescript
await createContactForm({
  target: this.contactFormContainer.nativeElement,
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

### **Service Pattern**
```typescript
// contact-form.service.ts
import { Injectable } from '@angular/core';
import { createContactForm, Destroyable, CreateContactFormOptions } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private formInstances = new Map<string, Destroyable>();

  async createForm(target: HTMLElement, options: CreateContactFormOptions): Promise<Destroyable> {
    const formInstance = await createContactForm({
      target,
      ...options
    });
    
    this.formInstances.set(target.id || 'default', formInstance);
    return formInstance;
  }

  destroyForm(targetId: string): void {
    const formInstance = this.formInstances.get(targetId);
    if (formInstance) {
      formInstance.destroy();
      this.formInstances.delete(targetId);
    }
  }

  destroyAllForms(): void {
    this.formInstances.forEach(formInstance => {
      formInstance.destroy();
    });
    this.formInstances.clear();
  }
}
```

**Usage in Component:**
```typescript
// contact-form.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'app-contact-form',
  template: `<div #contactFormContainer></div>`
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @ViewChild('contactFormContainer', { static: true }) 
  contactFormContainer!: ElementRef;

  constructor(private contactFormService: ContactFormService) {}

  async ngOnInit() {
    await this.contactFormService.createForm(
      this.contactFormContainer.nativeElement,
      {
        theme: 'light',
        labels: { title: "Contact Us" },
        onSubmit: (data) => console.log(data)
      }
    );
  }

  ngOnDestroy() {
    this.contactFormService.destroyForm('contact-form');
  }
}
```

### **Multiple Forms on Same Page**
```typescript
// multi-form.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { createContactForm, Destroyable } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

@Component({
  selector: 'app-multi-form',
  template: `
    <div class="multi-form-page">
      <section class="general-inquiry">
        <h2>General Inquiry</h2>
        <div #generalFormContainer></div>
      </section>
      
      <section class="support-request">
        <h2>Support Request</h2>
        <div #supportFormContainer></div>
      </section>
    </div>
  `
})
export class MultiFormComponent implements OnInit, OnDestroy {
  @ViewChild('generalFormContainer', { static: true }) 
  generalFormContainer!: ElementRef;

  @ViewChild('supportFormContainer', { static: true }) 
  supportFormContainer!: ElementRef;

  private generalForm: Destroyable | null = null;
  private supportForm: Destroyable | null = null;

  async ngOnInit() {
    // General inquiry form
    this.generalForm = await createContactForm({
      target: this.generalFormContainer.nativeElement,
      labels: { title: "General Questions" },
      onSubmit: (data) => console.log('General:', data)
    });
    
    // Support request form
    this.supportForm = await createContactForm({
      target: this.supportFormContainer.nativeElement,
      theme: 'dark',
      labels: { title: "Technical Support" },
      onSubmit: (data) => console.log('Support:', data)
    });
  }

  ngOnDestroy() {
    if (this.generalForm) this.generalForm.destroy();
    if (this.supportForm) this.supportForm.destroy();
  }
}
```

### **Form Validation Handling**
```typescript
// contact-form-validation.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { createContactForm, Destroyable } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

interface ValidationError {
  field: string;
  message: string;
}

@Component({
  selector: 'app-contact-form-validation',
  template: `
    <div class="contact-form-container">
      <div #contactFormContainer></div>
      
      <!-- Custom validation messages -->
      <div *ngIf="validationErrors.length > 0" class="validation-errors">
        <div *ngFor="let error of validationErrors" class="error-item">
          {{ error.message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .validation-errors {
      margin-top: 20px;
      padding: 15px;
      background-color: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 8px;
    }
    
    .error-item {
      color: #991b1b;
      margin-bottom: 8px;
    }
    
    .error-item:last-child {
      margin-bottom: 0;
    }
  `]
})
export class ContactFormValidationComponent implements OnInit, OnDestroy {
  @ViewChild('contactFormContainer', { static: true }) 
  contactFormContainer!: ElementRef;

  validationErrors: ValidationError[] = [];

  private formInstance: Destroyable | null = null;

  async ngOnInit() {
    this.formInstance = await createContactForm({
      target: this.contactFormContainer.nativeElement,
      theme: 'light',
      labels: { title: "Contact Form" },
      onSubmit: this.handleSubmit.bind(this)
    });
  }

  ngOnDestroy() {
    if (this.formInstance) {
      this.formInstance.destroy();
    }
  }

  private async handleSubmit(data: any) {
    // Clear previous errors
    this.validationErrors = [];
    
    // Custom validation
    if (!data.name.trim()) {
      this.validationErrors.push({ field: 'name', message: 'Name is required' });
    }
    
    if (!data.email.includes('@')) {
      this.validationErrors.push({ field: 'email', message: 'Valid email is required' });
    }
    
    if (this.validationErrors.length > 0) {
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

  private async submitToAPI(data: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}
```

## 🔍 **Troubleshooting**

### **Common Issues & Solutions**

#### **1. CKEditor Not Loading**
```typescript
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

/* Or use Angular's ViewEncapsulation */
```

#### **3. Form Not Submitting**
```typescript
// Check if onSubmit handler is properly defined
await createContactForm({
  target: this.contactFormContainer.nativeElement,
  onSubmit: (data) => {
    console.log('Form data:', data); // Verify data is received
    // Your submission logic
  }
});
```

#### **4. EmailJS Errors**
```typescript
// Verify EmailJS configuration
await createContactForm({
  target: this.contactFormContainer.nativeElement,
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
  target: HTMLElement;
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
```typescript
// Use OnPush change detection strategy
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Use trackBy for ngFor loops
trackByField(index: number, error: ValidationError): string {
  return error.field;
}
```

### **2. Accessibility**
```typescript
await createContactForm({
  target: this.contactFormContainer.nativeElement,
  labels: {
    title: "Contact Form",
    name: "Full Name (Required)",
    email: "Email Address (Required)",
    message: "Your Message (Required)"
  }
});
```

### **3. Error Handling**
```typescript
private async handleSubmit(data: any) {
  try {
    await this.submitForm(data);
    this.showSuccess('Message sent successfully!');
  } catch (error) {
    console.error('Form submission error:', error);
    this.showError('Failed to send message. Please try again.');
  }
}
```

## 🚀 **Next Steps**

1. **Install the package**: `npm install website-contact-form@latest`
2. **Import the function**: `import { createContactForm } from 'website-contact-form'`
3. **Add CSS**: `import 'website-contact-form/dist/style.css'`
4. **Create form instance**: Use `createContactForm()` in `ngOnInit`
5. **Clean up**: Call `destroy()` in `ngOnDestroy`
6. **Test thoroughly**: Ensure form submission works in your environment

## 📞 **Support**

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/mnahsanofficial/website-contact-form/issues)
- **Author**: [Nazmul Ahsan](https://www.linkedin.com/in/mn-ahsan/)
- **Company**: [TrioTrix Tech Solutions](https://www.linkedin.com/company/triotrix-tech-solutions/)

---

**Happy coding! 🎉**
