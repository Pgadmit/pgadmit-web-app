export interface OnboardingData {
  studyGoal: 'bachelor' | 'master' | 'second-master' | '';
  fieldOfStudy: string | null;
  destination: 'usa' | 'uk' | '';
  knowsUniversities: 'yes' | 'no' | '';
  country: string;
  gpa: string | null;
  intake: string;
  budget: string | null;
  funding: string;
  studyBreak: boolean | undefined;
  visaRefusal: boolean | undefined;
  segment: string;
}

export interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  budgetSlider: number[];
  isCompleted: boolean;
  isOpen: boolean;
  setCurrentStep: (step: number) => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  setBudgetSlider: (value: number[]) => void;
  setCompleted: (completed: boolean) => void;
  setOpen: (open: boolean) => void;
  reset: () => void;
  getFinalData: () => OnboardingData;
  clearOnboardingData: () => void;
  hasOnboardingData: () => boolean;
  syncWithSupabase: () => Promise<void>;
  loadFromSupabase: () => Promise<void>;
}
