"use client"
import { LoginModal } from "./login-modal"
import { SignupModal } from "./signup-modal"

interface AuthModalsProps {
  loginOpen: boolean
  signupOpen: boolean
  onLoginOpenChange: (open: boolean) => void
  onSignupOpenChange: (open: boolean) => void
  signupInitialData?: {
    country?: string
    fieldOfStudy?: string
    budget?: string
  }
  onSignupSuccess?: () => void // Added callback for successful signup
}

export function AuthModals({
  loginOpen,
  signupOpen,
  onLoginOpenChange,
  onSignupOpenChange,
  signupInitialData,
  onSignupSuccess, // Added onSignupSuccess prop
}: AuthModalsProps) {
  const handleSwitchToSignup = () => {
    onLoginOpenChange(false)
    onSignupOpenChange(true)
  }

  const handleSwitchToLogin = () => {
    onSignupOpenChange(false)
    onLoginOpenChange(true)
  }

  const handleSignupSuccess = () => {
    onSignupOpenChange(false)
    if (onSignupSuccess) {
      onSignupSuccess()
    }
  }

  return (
    <>
      <LoginModal open={loginOpen} onOpenChange={onLoginOpenChange} onSwitchToSignup={handleSwitchToSignup} />
      <SignupModal
        open={signupOpen}
        onOpenChange={onSignupOpenChange}
        onSwitchToLogin={handleSwitchToLogin}
        initialData={signupInitialData}
        onSuccess={handleSignupSuccess} // Pass success callback to signup modal
      />
    </>
  )
}
