"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = "/",
  requireOnboarding = false
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }

      if (requireOnboarding && !user.onboardingComplete) {
        router.push("/onboarding");
        return;
      }
    }
  }, [user, loading, router, redirectTo, requireOnboarding]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireOnboarding && !user.onboardingComplete) {
    return null;
  }

  return <>{children}</>;
}
