import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { fetchUserOnboarding } from '@/lib/profile-utils';
import { useOnboardingLoading } from '@/lib/loading-context';
import { useAuth } from '@/lib/auth-context';
import type { UserOnboarding } from '@/types';

export function useOnboardingData(userId: string | null) {
    const [onboardingData, setOnboardingData] = useState<UserOnboarding | null>(null);
    const { loading, setLoading } = useOnboardingLoading();
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        // Reset state if no user
        if (!userId) {
            setOnboardingData(null);
            setLoading(false);
            setError(null);
            return;
        }

        if (user && !user.onboardingComplete) {
            setOnboardingData(null);
            setLoading(false);
            setError(null);
            return;
        }

        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const supabase = createClient();
                const data = await fetchUserOnboarding(userId, supabase);

                if (isMounted) {
                    setOnboardingData(data);
                }
            } catch (err) {
                if (isMounted) {
                    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch onboarding data';
                    setError(errorMessage);
                    console.error('Error fetching onboarding data:', err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [userId, user]);

    return { onboardingData, loading, error };
}   