import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Montserrat } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { AIProvider } from "@/lib/ai-context"
import { GamificationProvider } from "@/lib/gamification-context"
import { AIChatWidget } from "@/components/ai/ai-chat-widget"
import { AchievementCelebration } from "@/components/gamification/achievement-celebration"
import { Toaster } from "@/components/ui/toaster"
import { GlobalHeader } from "@/components/global-header"

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "PGadmit - Study Abroad Made Simple",
  description:
    "Your journey to the best universities in the US and UK starts here. AI-powered guidance for Nigerian and Indian students.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${montserrat.variable}`}>
      <body>
        <AuthProvider>
          <GamificationProvider>
            <AIProvider>
              <GlobalHeader />
              {children}
              <AIChatWidget />
              <AchievementCelebration />
              <Toaster />
            </AIProvider>
          </GamificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
