'use client';

import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  target?: string;
  className?: string;
}

declare global {
  interface Window {
    hbspt: any;
  }
}

export default function HubSpotForm({
  portalId,
  formId,
  target = 'hubspot-form',
  className = ''
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load HubSpot script if not already loaded
    if (!window.hbspt) {
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        createForm();
      };
    } else {
      createForm();
    }

    function createForm() {
      if (window.hbspt && formRef.current) {
        // Clear any existing form
        formRef.current.innerHTML = '';

        window.hbspt.forms.create({
          portalId,
          formId,
          target: `#${target}`,
          onFormReady: (form: unknown) => {
          },
          onFormSubmit: (form: unknown) => {
          },
          onFormSubmitted: (form: unknown) => {
          }
        });
      }
    }

    return () => {
      // Cleanup if needed
      if (formRef.current) {
        formRef.current.innerHTML = '';
      }
    };
  }, [portalId, formId, target]);

  return (
    <div
      ref={formRef}
      id={target}
      className={className}
    />
  );
}
