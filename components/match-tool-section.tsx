"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AuthModals } from "@/components/auth/auth-modals"
import { AIOnboardingFlow } from "@/components/onboarding/ai-onboarding-flow"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function MatchToolSection() {
  const [formData, setFormData] = useState({
    country: "",
    fieldOfStudy: "",
    budget: "",
  })
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [signupOpen, setSignupOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (!formData.country || !formData.fieldOfStudy || !formData.budget) {
      toast({
        title: "Please complete all fields",
        description: "We need all information to find your perfect matches.",
        variant: "destructive",
      })
      return
    }

    router.push("/onboarding")
  }

  const handleSignupSuccess = () => {
    setSignupOpen(false)
    setOnboardingOpen(true)
  }

  return (
    <section data-section="match-tool" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Matching
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">
            Discover Your Perfect University
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Let our AI-powered tool guide you to universities that fit your aspirations, budget, and academic profile.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0 bg-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">Free University Match Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-semibold text-foreground">
                    Where are you from?
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field" className="text-sm font-semibold text-foreground">
                    Field of Study
                  </Label>
                  <Select
                    value={formData.fieldOfStudy}
                    onValueChange={(value) => setFormData({ ...formData, fieldOfStudy: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose your field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="arts">Arts & Humanities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-semibold text-foreground">
                    Annual Budget (USD)
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-20k">Under $20,000</SelectItem>
                      <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                      <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                      <SelectItem value="over-60k">Over $60,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold group transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Get Started with AI Matching
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {user ? "Your personalized matches are ready!" : "Sign up required to view results. Free forever."}
              </p>
            </CardContent>
          </Card>
        </div>

        <AuthModals
          loginOpen={loginOpen}
          signupOpen={signupOpen}
          onLoginOpenChange={setLoginOpen}
          onSignupOpenChange={setSignupOpen}
          signupInitialData={formData}
          onSignupSuccess={handleSignupSuccess}
        />

        <AIOnboardingFlow isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} initialData={formData} />
      </div>
    </section>
  )
}
