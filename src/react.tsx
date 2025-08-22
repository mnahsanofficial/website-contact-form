import React, { useEffect, useRef, useCallback, useState } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeForm = useCallback(async () => {
    if (!containerRef.current || isInitialized) return;

    try {
      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100));

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
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize contact form:', error);
    }
  }, [options, isInitialized]);

  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeForm();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (formInstanceRef.current) {
        formInstanceRef.current.destroy();
        formInstanceRef.current = null;
      }
      setIsInitialized(false);
    };
  }, [initializeForm]);

  // Re-initialize when options change
  useEffect(() => {
    if (isInitialized) {
      initializeForm();
    }
  }, [options, initializeForm, isInitialized]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={style}
    />
  );
};

export default ReactContactForm;
