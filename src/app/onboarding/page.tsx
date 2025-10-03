"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { OnboardingWidget } from "@/components/onboarding";

export default function OnboardingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const hasBasicProfile = user.onboardingComplete;

      if (hasBasicProfile) {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  const handleComplete = () => {
    router.push('/dashboard');
  };

  return <OnboardingWidget onComplete={handleComplete} />;
}
