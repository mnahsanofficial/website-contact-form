import React, { useEffect, useRef, useCallback } from 'react';
import { createContactForm, type CreateContactFormOptions, type Destroyable } from './index';

export interface ReactContactFormProps extends Omit<CreateContactFormOptions, 'target'> {
  className?: string;
  style?: React.CSSProperties;
}

export const ReactContactForm: React.FC<ReactContactFormProps> = ({ 
  className, 
  style, 
  ...options 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formInstanceRef = useRef<Destroyable | null>(null);

  const initializeForm = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      // Clean up any existing form
      if (formInstanceRef.current) {
        formInstanceRef.current.destroy();
        formInstanceRef.current = null;
      }

      // Create new form
      formInstanceRef.current = await createContactForm({
        ...options,
        target: containerRef.current
      });
    } catch (error) {
      console.error('Failed to initialize contact form:', error);
    }
  }, [options]);

  useEffect(() => {
    initializeForm();

    // Cleanup on unmount
    return () => {
      if (formInstanceRef.current) {
        formInstanceRef.current.destroy();
        formInstanceRef.current = null;
      }
    };
  }, [initializeForm]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={style}
    />
  );
};

export default ReactContactForm;
