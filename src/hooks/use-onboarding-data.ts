import { useState, useEffect, useRef } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useOnboardingLoading } from '@/lib/loading-context';
import { useAuth } from '@/features/auth';
import type { UserOnboarding } from '@/types';

export function useOnboardingData() {
    const [onboardingData, setOnboardingData] = useState<UserOnboarding | null>(null);
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
                const supabase = supabaseBrowser();

                const { data, error } = await supabase
                    .from('user_onboarding')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (!user?.id) {
                    return;
                }

                if (error) {
                    if (error.code === 'PGRST116') {
                        setOnboardingData(null);
                    } else {
                        console.error('❌ [useOnboardingData] Database error:', error);
                        throw error;
                    }
                } else {
                    setOnboardingData(data as UserOnboarding);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch onboarding data';
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