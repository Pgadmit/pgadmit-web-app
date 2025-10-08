'use client';

import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = '/',
  requireOnboarding = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      router.push(redirectTo);
      return;
    }

    // Only redirect to onboarding if explicitly required
    if (!loading && user && requireOnboarding && !user.onboardingComplete) {
      setIsRedirecting(true);
      router.push('/onboarding');
      return;
    }
  }, [loading, user, router, redirectTo, requireOnboarding]);

  if (loading || isRedirecting) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  return <>{children}</>;
}
