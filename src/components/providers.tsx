// src/components/providers.tsx

'use client'; // This is the most important line. It marks the entire file as a Client Component.

import React from 'react';
import { AuthProvider } from '@/features/auth';
import { SavedUniversitiesProvider } from '@/features/saved-universities';
import { LoadingProvider } from '@/lib/loading-context';
import { AIProvider } from '@/lib/ai-context';
import { GamificationProvider } from '@/lib/gamification-context';
import { SidebarProvider } from '@/lib/sidebar-context';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.error("reCAPTCHA site key is missing. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your .env.local file.");
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <LoadingProvider>
        <AuthProvider>
          <SavedUniversitiesProvider>
            <GamificationProvider>
              <AIProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </AIProvider>
            </GamificationProvider>
          </SavedUniversitiesProvider>
        </AuthProvider>
      </LoadingProvider>
    </GoogleReCaptchaProvider>
  );
}