"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { UserMenu } from "@/components/user-menu"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AuthModals } from "@/components/auth/auth-modals"

export function GlobalHeader() {
  const { user } = useAuth()
  const router = useRouter()
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const handleLogoClick = () => {
    router.push("/")
  }

  const handleGetStarted = () => {
    router.push("/onboarding")
  }

  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GesS8hmkbGOcNJrrrTNEhJBqgEvVIT.png"
                  alt="PGadmit Logo"
                  className="h-8 w-auto sm:h-10 md:h-12 transition-transform group-hover:scale-105"
                />
              </div>

              {user && (
                <nav className="hidden md:flex items-center gap-6">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/dashboard")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    DASHBOARD
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/universities")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    UNIVERSITY
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/resources")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    RESOURCES
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/community")}
                    className="text-sm font-medium hover:text-primary"
                  >
                    COMMUNITY
                  </Button>
                </nav>
              )}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")} className="md:hidden">
                    Dashboard
                  </Button>
                  <UserMenu />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLoginOpen(true)}
                    className="hidden sm:inline-flex"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleGetStarted}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModals
        loginOpen={loginOpen}
        signupOpen={signupOpen}
        onLoginOpenChange={setLoginOpen}
        onSignupOpenChange={setSignupOpen}
      />
    </>
  )
}
