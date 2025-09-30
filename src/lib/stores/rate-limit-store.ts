import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RateLimitState {
    lastOpenAIRequest: number | null;
    lastN8nRequest: number | null;
    isOpenAILimited: boolean;
    isN8nLimited: boolean;
    remainingOpenAITime: number;
    remainingN8nTime: number;

    // Actions
    setLastOpenAIRequest: (timestamp: number) => void;
    setLastN8nRequest: (timestamp: number) => void;
    checkRateLimits: () => void;
    canMakeOpenAIRequest: () => boolean;
    canMakeN8nRequest: () => boolean;
    getRemainingTime: (type: 'openai' | 'n8n') => number;
}

const OPENAI_COOLDOWN = 5 * 60 * 1000; // 5 minutes
const N8N_DEBOUNCE = 5 * 1000; // 5 seconds

export const useRateLimitStore = create<RateLimitState>()(
    persist(
        (set, get) => ({
            lastOpenAIRequest: null,
            lastN8nRequest: null,
            isOpenAILimited: false,
            isN8nLimited: false,
            remainingOpenAITime: 0,
            remainingN8nTime: 0,

            setLastOpenAIRequest: (timestamp: number) => {
                set({ lastOpenAIRequest: timestamp });
                get().checkRateLimits();
            },

            setLastN8nRequest: (timestamp: number) => {
                set({ lastN8nRequest: timestamp });
                get().checkRateLimits();
            },

            checkRateLimits: () => {
                const now = Date.now();
                const { lastOpenAIRequest, lastN8nRequest } = get();

                const openAIRemaining = lastOpenAIRequest
                    ? Math.max(0, OPENAI_COOLDOWN - (now - lastOpenAIRequest))
                    : 0;

                const n8nRemaining = lastN8nRequest
                    ? Math.max(0, N8N_DEBOUNCE - (now - lastN8nRequest))
                    : 0;

                const isOpenAILimited = openAIRemaining > 0;
                const isN8nLimited = n8nRemaining > 0;

                set({
                    isOpenAILimited,
                    isN8nLimited,
                    remainingOpenAITime: openAIRemaining,
                    remainingN8nTime: n8nRemaining,
                });

                // Auto-clear timers when they expire
                if (lastOpenAIRequest && !isOpenAILimited) {
                    set({ lastOpenAIRequest: null });
                }
                if (lastN8nRequest && !isN8nLimited) {
                    set({ lastN8nRequest: null });
                }
            },

            canMakeOpenAIRequest: () => {
                const { lastOpenAIRequest } = get();
                if (!lastOpenAIRequest) return true;
                return Date.now() - lastOpenAIRequest >= OPENAI_COOLDOWN;
            },

            canMakeN8nRequest: () => {
                const { lastN8nRequest } = get();
                if (!lastN8nRequest) return true;
                return Date.now() - lastN8nRequest >= N8N_DEBOUNCE;
            },

            getRemainingTime: (type: 'openai' | 'n8n') => {
                const { lastOpenAIRequest, lastN8nRequest } = get();
                const now = Date.now();

                if (type === 'openai' && lastOpenAIRequest) {
                    return Math.max(0, OPENAI_COOLDOWN - (now - lastOpenAIRequest));
                }

                if (type === 'n8n' && lastN8nRequest) {
                    return Math.max(0, N8N_DEBOUNCE - (now - lastN8nRequest));
                }

                return 0;
            },

        }),
        {
            name: 'rate-limit-storage',
            partialize: (state) => ({
                lastOpenAIRequest: state.lastOpenAIRequest,
                lastN8nRequest: state.lastN8nRequest,
            }),
        }
    )
);
