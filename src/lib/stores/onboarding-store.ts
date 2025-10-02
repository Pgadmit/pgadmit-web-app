import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OnboardingState {
  // Current step
  currentStep: number;

  // Form data
  data: {
    studyGoal: "bachelor" | "master" | "second-master" | "";
    fieldOfStudy: string | null;
    destination: "usa" | "uk" | "";
    knowsUniversities: "yes" | "no" | "";
    country: string;
    gpa: string | null;
    intake: string;
    budget: string | null;
    funding: string;
    studyBreak: boolean | undefined;
    visaRefusal: boolean | undefined;
    segment: string;
  };

  // Budget slider state
  budgetSlider: number[];

  // UI state
  isCompleted: boolean;
  isOpen: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  updateData: (updates: Partial<OnboardingState["data"]>) => void;
  setBudgetSlider: (value: number[]) => void;
  setCompleted: (completed: boolean) => void;
  setOpen: (open: boolean) => void;
  reset: () => void;
  getFinalData: () => OnboardingState["data"];
  clearOnboardingData: () => void;
  hasOnboardingData: () => boolean;
}

const initialState: Omit<OnboardingState, 'setCurrentStep' | 'updateData' | 'setBudgetSlider' | 'setCompleted' | 'setOpen' | 'reset' | 'getFinalData' | 'clearOnboardingData' | 'hasOnboardingData'> = {
  currentStep: 0,
  data: {
    studyGoal: "",
    fieldOfStudy: "",
    destination: "",
    knowsUniversities: "",
    country: "south-asia", // Default to South Asia
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

// Helper hook for easy access to onboarding data
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
