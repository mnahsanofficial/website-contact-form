# 🚀 Vue.js Installation Guide

## 📦 **Installation**

### **1. Install the Package**
```bash
npm install website-contact-form@latest
```

### **2. Install Peer Dependencies**
```bash
npm install @ckeditor/ckeditor5-build-classic emailjs-com
```

### **3. Install Vue (if not already installed)**
```bash
npm install vue
npm install --save-dev @vue/compiler-sfc
```

## 🎯 **Usage Examples**

### **Basic Vue Component**
```vue
<template>
  <div class="contact-container">
    <div id="contact-form"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

let formInstance: any = null;

const handleSubmit = async (data: { 
  name: string; 
  email: string; 
  messageHtml: string; 
  messageText: string 
}) => {
  console.log('Form submitted:', data);
  // Handle form submission
};

onMounted(async () => {
  formInstance = await createContactForm({
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
    onSubmit: handleSubmit,
    onSuccessMessage: "✅ Thank you! Your message has been sent.",
    onErrorMessage: "❌ Something went wrong. Please try again."
  });
});

onUnmounted(() => {
  if (formInstance) {
    formInstance.destroy();
  }
});
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
```

### **With EmailJS Integration**
```vue
<template>
  <div class="contact-page">
    <div id="contact-form-emailjs"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

let formInstance: any = null;

onMounted(async () => {
  formInstance = await createContactForm({
    target: '#contact-form-emailjs',
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
});

onUnmounted(() => {
  if (formInstance) {
    formInstance.destroy();
  }
});
</script>
```

### **Reactive Form Component**
```vue
<template>
  <div class="contact-form-wrapper">
    <div id="contact-form"></div>
    
    <!-- Custom status display -->
    <div v-if="formStatus" :class="['status-banner', formStatus]">
      <span v-if="formStatus === 'success'">✅ {{ successMessage }}</span>
      <span v-else-if="formStatus === 'error'">❌ {{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const formStatus = ref<'success' | 'error' | null>(null);
const successMessage = ref('');
const errorMessage = ref('');

let formInstance: any = null;

const handleSubmit = async (data: any) => {
  try {
    // Your custom submission logic
    await submitToAPI(data);
    formStatus.value = 'success';
    successMessage.value = 'Message sent successfully!';
  } catch (error) {
    formStatus.value = 'error';
    errorMessage.value = 'Failed to send message. Please try again.';
  }
};

onMounted(async () => {
  formInstance = await createContactForm({
    target: '#contact-form',
    theme: 'light',
    labels: { title: "Let's Talk!" },
    onSubmit: handleSubmit
  });
});

onUnmounted(() => {
  if (formInstance) {
    formInstance.destroy();
  }
});

// Mock API function
const submitToAPI = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};
</script>

<style scoped>
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
</style>
```

## 🔧 **Configuration Options**

### **Theme Options**
```typescript
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
```typescript
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
```typescript
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
```typescript
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

### **Composable Pattern**
```vue
<template>
  <div class="contact-page">
    <div id="contact-form"></div>
  </div>
</template>

<script setup lang="ts">
import { useContactForm } from '@/composables/useContactForm';

const { formInstance, formStatus, submitForm } = useContactForm('#contact-form');
</script>
```

**`composables/useContactForm.ts`**
```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import { createContactForm, type Destroyable } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

export function useContactForm(target: string) {
  const formInstance = ref<Destroyable | null>(null);
  const formStatus = ref<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submitForm = async (data: any) => {
    formStatus.value = 'submitting';
    
    try {
      // Your submission logic
      await submitToAPI(data);
      formStatus.value = 'success';
    } catch (error) {
      formStatus.value = 'error';
    }
  };

  onMounted(async () => {
    formInstance.value = await createContactForm({
      target,
      theme: 'light',
      labels: { title: "Contact Us" },
      onSubmit: submitForm
    });
  });

  onUnmounted(() => {
    if (formInstance.value) {
      formInstance.value.destroy();
    }
  });

  return {
    formInstance,
    formStatus,
    submitForm
  };
}

const submitToAPI = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};
```

### **Multiple Forms on Same Page**
```vue
<template>
  <div class="multi-form-page">
    <section class="general-inquiry">
      <h2>General Inquiry</h2>
      <div id="general-form"></div>
    </section>
    
    <section class="support-request">
      <h2>Support Request</h2>
      <div id="support-form"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

let generalForm: any = null;
let supportForm: any = null;

onMounted(async () => {
  // General inquiry form
  generalForm = await createContactForm({
    target: '#general-form',
    labels: { title: "General Questions" },
    onSubmit: (data) => console.log('General:', data)
  });
  
  // Support request form
  supportForm = await createContactForm({
    target: '#support-form',
    theme: 'dark',
    labels: { title: "Technical Support" },
    onSubmit: (data) => console.log('Support:', data)
  });
});

onUnmounted(() => {
  if (generalForm) generalForm.destroy();
  if (supportForm) supportForm.destroy();
});
</script>
```

### **Form Validation Handling**
```vue
<template>
  <div class="contact-form-container">
    <div id="contact-form"></div>
    
    <!-- Custom validation messages -->
    <div v-if="validationErrors.length > 0" class="validation-errors">
      <div v-for="error in validationErrors" :key="error.field" class="error-item">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

const validationErrors = ref<Array<{ field: string; message: string }>>([]);

let formInstance: any = null;

const handleSubmit = async (data: any) => {
  // Clear previous errors
  validationErrors.value = [];
  
  // Custom validation
  if (!data.name.trim()) {
    validationErrors.value.push({ field: 'name', message: 'Name is required' });
  }
  
  if (!data.email.includes('@')) {
    validationErrors.value.push({ field: 'email', message: 'Valid email is required' });
  }
  
  if (validationErrors.value.length > 0) {
    return; // Don't submit if validation fails
  }
  
  // Submit form
  try {
    await submitToAPI(data);
    console.log('Form submitted successfully');
  } catch (error) {
    console.error('Form submission failed:', error);
  }
};

onMounted(async () => {
  formInstance = await createContactForm({
    target: '#contact-form',
    theme: 'light',
    labels: { title: "Contact Form" },
    onSubmit: handleSubmit
  });
});

onUnmounted(() => {
  if (formInstance) {
    formInstance.destroy();
  }
});

const submitToAPI = async (data: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};
</script>

<style scoped>
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
</style>
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

/* Or use scoped styles in Vue components */
```

#### **3. Form Not Submitting**
```typescript
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
```typescript
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
```vue
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue';

// Use shallowRef for better performance
const formInstance = shallowRef<Destroyable | null>(null);
</script>
```

### **2. Accessibility**
```typescript
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
```typescript
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
2. **Import the function**: `import { createContactForm } from 'website-contact-form'`
3. **Add CSS**: `import 'website-contact-form/dist/style.css'`
4. **Create form instance**: Use `createContactForm()` in `onMounted`
5. **Clean up**: Call `destroy()` in `onUnmounted`
6. **Test thoroughly**: Ensure form submission works in your environment

## 📞 **Support**

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/mnahsanofficial/website-contact-form/issues)
- **Author**: [Nazmul Ahsan](https://www.linkedin.com/in/mn-ahsan/)
- **Company**: [TrioTrix Tech Solutions](https://www.linkedin.com/company/triotrix-tech-solutions/)

---

**Happy coding! 🎉**
