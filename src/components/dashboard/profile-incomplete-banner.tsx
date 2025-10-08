'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowRight } from 'lucide-react';
import type { UserOnboarding } from '@/types';

interface ProfileIncompleteBannerProps {
  onboardingData: UserOnboarding | null;
  loading?: boolean;
}

export function ProfileIncompleteBanner({
  onboardingData,
  loading = false,
}: ProfileIncompleteBannerProps) {
  const router = useRouter();

  if (loading || onboardingData) {
    return null;
  }

  const handleCompleteProfile = () => {
    router.push('/onboarding');
  };

  return (
    <Alert className='mb-6 border-amber-200 bg-amber-50 text-amber-800'>
      <AlertCircle className='h-4 w-4' />
      <AlertDescription className='flex items-center justify-between'>
        <div>
          <strong>Profile Incomplete:</strong> Complete your profile to unlock
          personalized recommendations and features.
        </div>
        <Button
          onClick={handleCompleteProfile}
          size='sm'
          className='ml-4 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
        >
          Complete Profile
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
