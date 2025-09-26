import type React from "react";
import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { AIProvider } from "@/lib/ai-context";
import { GamificationProvider } from "@/lib/gamification-context";
import { SidebarProvider } from "@/lib/sidebar-context";
import { AchievementCelebration } from "@/components/gamification/achievement-celebration";
import { Toaster } from "@/components/ui/toaster";
import { ConditionalHeader } from "@/components/conditional-header";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "PGadmit - Study Abroad Made Simple",
  description:
    "Your journey to the top universities worldwide starts here. AI-powered guidance for Nigerian and Indian students.",
  generator: "v0.app",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://pgadmit.com'),
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/manifest.json',

  openGraph: {
    type: 'website',
    title: 'PGadmit - Study Abroad Made Simple',
    description: 'Your journey to the top universities worldwide starts here. AI-powered guidance for Nigerian and Indian students.',
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
    description: 'Your journey to the top universities worldwide starts here. AI-powered guidance for Nigerian and Indian students.',
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pgadmit.com';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PGadmit",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/pgadmit-logo.png`,
      "width": 300,
      "height": 60
    },
    "description": "Your journey to the top universities worldwide starts here. AI-powered guidance for Nigerian and Indian students.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/pgadmit",
      "https://linkedin.com/company/pgadmit"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  };

  return (
    <html lang="en" className={`${openSans.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <AuthProvider>
          <GamificationProvider>
            <AIProvider>
              <SidebarProvider>
                <ConditionalHeader />
                {children}
                <AchievementCelebration />
                <Toaster />
              </SidebarProvider>
            </AIProvider>
          </GamificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
