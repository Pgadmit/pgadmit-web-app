import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UniversityTypeInfo, University } from '@/entities/universities';

interface UniversitiesStore {
  // University types
  universityTypes: UniversityTypeInfo[];
  isLoadingTypes: boolean;
  typesError: string | null;

  // Current university
  currentUniversity: University | null;
  isLoadingUniversity: boolean;
  universityError: string | null;

  // Universities list
  universities: University[];
  isLoadingUniversities: boolean;
  universitiesError: string | null;
  hasInitializedUniversities: boolean;

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
  setHasInitializedUniversities: (initialized: boolean) => void;

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
  hasInitializedUniversities: false,
};

export const useUniversitiesStore = create<UniversitiesStore>()(
  devtools(
    persist(
      set => ({
        ...initialState,

        // University types actions
        setUniversityTypes: types => set({ universityTypes: types }),
        setLoadingTypes: loading => set({ isLoadingTypes: loading }),
        setTypesError: error => set({ typesError: error }),

        // Current university actions
        setCurrentUniversity: university =>
          set({ currentUniversity: university }),
        setLoadingUniversity: loading => set({ isLoadingUniversity: loading }),
        setUniversityError: error => set({ universityError: error }),

        // Universities list actions
        setUniversities: universities => set({ universities }),
        setLoadingUniversities: loading =>
          set({ isLoadingUniversities: loading }),
        setUniversitiesError: error => set({ universitiesError: error }),
        setHasInitializedUniversities: initialized =>
          set({ hasInitializedUniversities: initialized }),

        reset: () => set(initialState),
      }),
      {
        name: 'universities-store',
        partialize: state => ({
          universities: state.universities,
          hasInitializedUniversities: state.hasInitializedUniversities,
        }),
      }
    ),
    { name: 'universities-store' }
  )
);
