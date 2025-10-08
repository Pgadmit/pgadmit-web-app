import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UniversityTypeInfo, University } from '@/entities/universities';

interface UniversitiesStore {
  // University types (categories)
  universityTypes: UniversityTypeInfo[];
  isLoadingTypes: boolean;
  typesError: string | null;

  // Single university
  currentUniversity: University | null;
  isLoadingUniversity: boolean;
  universityError: string | null;

  // Universities
  universities: University[];
  isLoadingUniversities: boolean;
  universitiesError: string | null;

  // Actions
  setUniversityTypes: (types: UniversityTypeInfo[]) => void;
  setLoadingTypes: (loading: boolean) => void;
  setTypesError: (error: string | null) => void;

  setCurrentUniversity: (university: University | null) => void;
  setLoadingUniversity: (loading: boolean) => void;
  setUniversityError: (error: string | null) => void;

  setUniversities: (universities: University[]) => void;
  setLoadingUniversities: (loading: boolean) => void;
  setUniversitiesError: (error: string | null) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  universityTypes: [],
  isLoadingTypes: false,
  typesError: null,
  currentUniversity: null,
  isLoadingUniversity: false,
  universityError: null,
  universities: [],
  isLoadingUniversities: false,
  universitiesError: null,
};

export const useUniversitiesStore = create<UniversitiesStore>()(
  devtools(
    set => ({
      ...initialState,

      // Actions
      setUniversityTypes: types => set({ universityTypes: types }),
      setLoadingTypes: loading => set({ isLoadingTypes: loading }),
      setTypesError: error => set({ typesError: error }),

      setCurrentUniversity: university =>
        set({ currentUniversity: university }),
      setLoadingUniversity: loading => set({ isLoadingUniversity: loading }),
      setUniversityError: error => set({ universityError: error }),

      // Universities
      setUniversities: universities => set({ universities: universities }),
      setLoadingUniversities: loading =>
        set({ isLoadingUniversities: loading }),
      setUniversitiesError: error => set({ universitiesError: error }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'universities-store',
    }
  )
);
