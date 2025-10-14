import { createClient } from '@/utils/supabase/client';
import type { User } from '@/types';

export async function syncOnboardingData(userData: User) {
  try {
    const { useOnboardingStore } = await import('./stores/onboarding-store');
    const store = useOnboardingStore.getState();

    if (!userData.onboardingComplete && store.isCompleted) {
      await store.syncWithSupabase();
      const supabase = createClient();
      const {
        data: { user: refreshedUser },
      } = await supabase.auth.getUser();
      if (refreshedUser) {
        const { fetchUserProfile } = await import('./profile-utils');
        const refreshedUserData = await fetchUserProfile(refreshedUser);
        return refreshedUserData;
      }
    } else {
      await store.loadFromSupabase();
    }
  } catch (error) {
    console.error('Error syncing onboarding:', error);
  }
  return userData;
}
