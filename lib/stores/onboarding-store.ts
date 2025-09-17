import { create } from "zustand";

export interface OnboardingState {
  // Current step
  currentStep: number;

  // Form data
  data: {
    studyGoal: "bachelor" | "master" | "second-master" | "";
    fieldOfStudy: string;
    destination: "usa" | "uk" | "";
    knowsUniversities: "yes" | "no" | "";
    country: string;
    gpa: string;
    intake: string;
    budget: string;
    funding: string;
    studyBreak: string;
    visaRefusal: string;
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
}

const initialState = {
  currentStep: 0,
  data: {
    studyGoal: "",
    fieldOfStudy: "",
    destination: "",
    knowsUniversities: "",
    country: "india", // Default to India
    gpa: "",
    intake: "",
    budget: "",
    funding: "",
    studyBreak: "",
    visaRefusal: "",
    segment: "",
  },
  budgetSlider: [30000],
  isCompleted: false,
  isOpen: false,
};

export const useOnboardingStore = create<OnboardingState>()((set, get) => ({
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
      segment: state.data.segment || "Unknown", // Fallback if segment not set
    };
  },
}));

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
