import { useState, useEffect, useRef } from 'react';
import { useOnboardingLoading } from '@/lib/loading-context';
import { useAuth } from '@/features/auth';
import type { UserOnboarding } from '@/types';

export function useOnboardingData() {
  const [onboardingData, setOnboardingData] = useState<UserOnboarding | null>(
    null
  );
  const { loading, setLoading } = useOnboardingLoading();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const hasFetched = useRef(false);
  const currentUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setOnboardingData(null);
      setLoading(false);
      setError(null);
      hasFetched.current = false;
      currentUserId.current = null;
      return;
    }

    if (hasFetched.current && currentUserId.current === user.id) {
      return;
    }

    hasFetched.current = true;
    currentUserId.current = user.id;

    const fetchData = async () => {
      if (!user?.id) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/onboarding');

        if (!response.ok) {
          if (response.status === 401) {
            setOnboardingData(null);
            return;
          }

          const errorData = await response.json();
          console.error('❌ [useOnboardingData] API error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch onboarding data');
        }

        if (!user?.id) {
          return;
        }

        const result = await response.json();
        setOnboardingData(result.data as UserOnboarding | null);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to fetch onboarding data';
        console.error('💥 [useOnboardingData] Fetch error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  return { onboardingData, loading, error };
}
