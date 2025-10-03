import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OnboardingState, UserOnboarding } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { saveUserOnboarding, updateOnboardingCompletion } from "@/lib/profile-utils";

const initialState: Omit<OnboardingState, 'setCurrentStep' | 'updateData' | 'setBudgetSlider' | 'setCompleted' | 'setOpen' | 'reset' | 'getFinalData' | 'clearOnboardingData' | 'hasOnboardingData' | 'syncWithSupabase' | 'loadFromSupabase'> = {
  currentStep: 0,
  data: {
    studyGoal: "",
    fieldOfStudy: "",
    destination: "",
    knowsUniversities: "",
    country: "south-asia",
    gpa: "",
    intake: "",
    budget: "",
    funding: "",
    studyBreak: undefined,
    visaRefusal: undefined,
    segment: "",
  },
  budgetSlider: [30000],
  isCompleted: false,
  isOpen: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      updateData: (updates: Partial<OnboardingState["data"]>) => {
        set((state) => ({
          data: { ...state.data, ...updates },
        }));
      },

      setBudgetSlider: (value: number[]) => {
        set({ budgetSlider: value });
      },

      setCompleted: (completed: boolean) => {
        set({ isCompleted: completed });
      },

      setOpen: (open: boolean) => {
        set({ isOpen: open });
      },

      reset: () => {
        set(initialState);
      },

      getFinalData: () => {
        const state = get();
        return {
          ...state.data,
          segment: state.data.segment ?? "Unknown", // Fallback if segment not set
        };
      },

      clearOnboardingData: () => {
        set(initialState);
      },

      hasOnboardingData: () => {
        const state = get();
        return !!(
          state.data.country &&
          state.data.fieldOfStudy &&
          state.data.budget &&
          state.data.studyGoal &&
          state.data.destination
        );
      },

      syncWithSupabase: async () => {
        const state = get();

        try {
          const supabase = createClient();

          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const onboardingData: Partial<UserOnboarding> = {
            study_goal: state.data.studyGoal,
            destination: state.data.destination,
            knows_universities: state.data.knowsUniversities,
            country: state.data.country,
            field_of_study: state.data.fieldOfStudy || undefined,
            gpa: state.data.gpa || undefined,
            intake: state.data.intake,
            budget: state.data.budget || undefined,
            funding: state.data.funding,
            study_break: state.data.studyBreak,
            visa_refusal: state.data.visaRefusal,
            segment: state.data.segment,
            is_completed: state.isCompleted
          };

          const savedData = await saveUserOnboarding(user.id, onboardingData, supabase);
          if (!savedData) {
            throw new Error('Failed to save onboarding data');
          }

          // Update onboarding_complete status in profiles table if onboarding is completed
          if (state.isCompleted) {
            const profileUpdated = await updateOnboardingCompletion(user.id, true, supabase);
            if (!profileUpdated) {
              console.warn('Failed to update onboarding completion in profile');
            }
          }
        } catch (error) {
          console.error('Error syncing with Supabase:', error);
          throw error;
        }
      },

      loadFromSupabase: async () => {
        try {
          const supabase = createClient();

          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const { data: onboardingData, error } = await supabase
            .from('user_onboarding')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

          if (error) {
            if (error.code === 'PGRST116') {
              return;
            }
            console.error('Error loading onboarding data:', error);
            return;
          }

          if (onboardingData) {
            // Update store with data from Supabase
            set({
              data: {
                studyGoal: onboardingData.study_goal || "",
                destination: onboardingData.destination || "",
                knowsUniversities: onboardingData.knows_universities || "",
                country: onboardingData.country || "south-asia",
                fieldOfStudy: onboardingData.field_of_study || "",
                gpa: onboardingData.gpa || "",
                intake: onboardingData.intake || "",
                budget: onboardingData.budget || "",
                funding: onboardingData.funding || "",
                studyBreak: onboardingData.study_break,
                visaRefusal: onboardingData.visa_refusal,
                segment: onboardingData.segment || "",
              },
              isCompleted: onboardingData.is_completed || false,
            });
          }
        } catch (error) {
          console.error('Error loading from Supabase:', error);
        }
      },
    }),
    {
      name: "onboarding-store", // unique name for localStorage key
      partialize: (state) => ({
        data: state.data,
        currentStep: state.currentStep,
        budgetSlider: state.budgetSlider,
        isCompleted: state.isCompleted,
      }),
    }
  )
);

export const useOnboardingData = () => {
  const store = useOnboardingStore();
  return {
    data: store.data,
    currentStep: store.currentStep,
    budgetSlider: store.budgetSlider,
    isCompleted: store.isCompleted,
    updateData: store.updateData,
    setCurrentStep: store.setCurrentStep,
    setBudgetSlider: store.setBudgetSlider,
    setCompleted: store.setCompleted,
    getFinalData: store.getFinalData,
    clearOnboardingData: store.clearOnboardingData,
    hasOnboardingData: store.hasOnboardingData,
    syncWithSupabase: store.syncWithSupabase,
    loadFromSupabase: store.loadFromSupabase,
  };
};

// Helper hook for onboarding UI state
export const useOnboardingUI = () => {
  const store = useOnboardingStore();
  return {
    isOpen: store.isOpen,
    setOpen: store.setOpen,
    reset: store.reset,
  };
};
