import { useOnboardingStore } from './onboarding-store';
import { useSuggestUniversitiesStore } from './suggest-universities-store';
import { useRateLimitStore } from './rate-limit-store';

export function clearAllStores() {
    try {
        useOnboardingStore.getState().clearOnboardingData();
        useSuggestUniversitiesStore.getState().reset();

        const rateLimitStore = useRateLimitStore.getState();
        rateLimitStore.setLastOpenAIRequest(0);
        rateLimitStore.setLastN8nRequest(0);

        // Clear only necessary localStorage keys
        const keysToRemove = [
            'onboarding-store',
            'suggest-universities-storage',
            'rate-limit-storage'
        ];

        keysToRemove.forEach(key => {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.warn(`Failed to remove localStorage key ${key}:`, error);
            }
        });

    } catch (error) {
        console.error('Error clearing stores:', error);
    }
}

export function useClearAllStores() {
    return clearAllStores;
}
