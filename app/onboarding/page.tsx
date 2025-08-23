"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AIOnboardingFlow } from "@/components/onboarding/ai-onboarding-flow"
import { AuthModals } from "@/components/auth/auth-modals"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

export default function OnboardingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [signupOpen, setSignupOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)

  useEffect(() => {
    if (user) {
      if (!user.onboardingComplete) {
        setOnboardingOpen(true)
      } else {
        // User is already onboarded, redirect to dashboard
        router.push("/dashboard")
      }
    } else {
      // User not logged in, show signup option
      setSignupOpen(true)
    }
  }, [user, router])

  const handleSignupSuccess = () => {
    setSignupOpen(false)
    setOnboardingOpen(true)
  }

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false)
    router.push("/dashboard")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToHome}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>

            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              AI-Powered Onboarding
            </div>

            <h1 className="text-3xl md:text-4xl font-black mb-4 text-foreground">Let's Get You Started</h1>
            <p className="text-lg text-muted-foreground">
              Our AI counselor will guide you through a personalized onboarding experience
            </p>
          </div>

          {/* Welcome Card for Non-Users */}
          {!user && (
            <Card className="shadow-lg border-0 bg-card mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Welcome to PGadmit!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Join thousands of students who have successfully navigated their study abroad journey with our
                  AI-powered platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setSignupOpen(true)} className="bg-primary hover:bg-primary/90">
                    Create Free Account
                  </Button>
                  <Button variant="outline" onClick={() => setLoginOpen(true)}>
                    Already have an account?
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Auth Modals */}
      <AuthModals
        loginOpen={loginOpen}
        signupOpen={signupOpen}
        onLoginOpenChange={setLoginOpen}
        onSignupOpenChange={setSignupOpen}
        onSignupSuccess={handleSignupSuccess}
      />

      {/* AI Onboarding Flow */}
      <AIOnboardingFlow isOpen={onboardingOpen} onClose={handleOnboardingComplete} />
    </div>
  )
}
