import React from 'react';
import { ReactContactForm } from 'website-contact-form';
import 'website-contact-form/dist/style.css';

// Example React component using the contact form
export const ContactFormExample: React.FC = () => {
  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      
      <ReactContactForm
        theme="light"
        labels={{
          title: "Send Us a Message",
          name: "Your Name",
          email: "Email Address",
          message: "Your Message"
        }}
        placeholders={{
          name: "John Doe",
          email: "john@example.com",
          message: "Tell us about your project..."
        }}
        buttonText="Send Message"
        emailJS={{
          serviceId: "your_service_id",
          templateId: "your_template_id",
          publicKey: "your_public_key"
        }}
        onSubmit={(data) => {
          console.log('Form submitted:', data);
        }}
        onSuccessMessage="✅ Message sent successfully!"
        onErrorMessage="❌ Failed to send message. Please try again."
        accentGradient="linear-gradient(90deg, #3b82f6, #8b5cf6)"
      />
    </div>
  );
};

// Alternative: Using the vanilla function in useEffect
export const ContactFormVanilla: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const initForm = async () => {
      try {
        const { createContactForm } = await import('website-contact-form');
        const form = await createContactForm({
          target: containerRef.current!,
          theme: 'dark',
          labels: {
            title: "Get in Touch",
            name: "Full Name",
            email: "Email",
            message: "Message"
          },
          buttonText: "Submit",
          onSubmit: (data) => {
            console.log('Form data:', data);
          }
        });

        // Cleanup function
        return () => {
          form.destroy();
        };
      } catch (error) {
        console.error('Failed to initialize form:', error);
      }
    };

    initForm();
  }, []);

  return (
    <div>
      <h2>Contact Form (Vanilla JS)</h2>
      <div ref={containerRef} />
    </div>
  );
};

export default ContactFormExample;
