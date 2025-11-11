// src/app/layout.tsx

import React from 'react';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Open_Sans, Montserrat } from 'next/font/google';
import './globals.css';


import { AppProviders } from '@/components/providers';


import { AchievementCelebration } from '@/components/gamification/achievement-celebration';
import { Toaster } from '@/components/ui/toaster';
import { ConditionalHeader } from '@/components/conditional-header';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { GlobalLoading } from '@/components/global-loading';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'PGadmit - Study Abroad Made Simple',
  description:
    'Your journey to the top universities worldwide starts here. AI-powered guidance for international students.',
  generator: 'v0.app',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://pgadmit.com'
  ),

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  manifest: '/manifest.json',

  openGraph: {
    type: 'website',
    title: 'PGadmit - Study Abroad Made Simple',
    description:
      'Your journey to the top universities worldwide starts here. AI-powered guidance for Nigerian and Indian students.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://pgadmit.com',
    siteName: 'PGadmit',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'PGadmit - Study Abroad Made Simple',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PGadmit - Study Abroad Made Simple',
    description:
      'Your journey to the top universities worldwide starts here. AI-powered guidance for Nigerian and Indian students.',
    images: ['/opengraph-image.png'],
    creator: '@pgadmit',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- Your schema logic remains unchanged ---
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pgadmit.com';
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PGadmit',
    url: baseUrl,
    // ... other schema properties
  };

  return (
    <html lang='en' className={`${openSans.variable} ${montserrat.variable}`}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>
        {/* --- 2. WRAP EVERYTHING WITH YOUR NEW AppProviders COMPONENT --- */}
        <AppProviders>
          <ConditionalHeader />
          {children}
          <AchievementCelebration />
          <Toaster />
          <MobileBottomNav />
          <GlobalLoading />
        </AppProviders>
      </body>
    </html>
  );
}