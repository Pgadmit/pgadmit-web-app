import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UniversityTypeInfo } from '@/entities/universities';

interface UniversitiesStore {
    // University types (categories)
    universityTypes: UniversityTypeInfo[];
    isLoadingTypes: boolean;
    typesError: string | null;

    // Actions
    setUniversityTypes: (types: UniversityTypeInfo[]) => void;
    setLoadingTypes: (loading: boolean) => void;
    setTypesError: (error: string | null) => void;

    // Reset
    reset: () => void;
}

const initialState = {
    universityTypes: [],
    isLoadingTypes: false,
    typesError: null,
};

export const useUniversitiesStore = create<UniversitiesStore>()(
    devtools(
        (set) => ({
            ...initialState,

            // Actions
            setUniversityTypes: (types) => set({ universityTypes: types }),
            setLoadingTypes: (loading) => set({ isLoadingTypes: loading }),
            setTypesError: (error) => set({ typesError: error }),

            // Reset
            reset: () => set(initialState),
        }),
        {
            name: 'universities-store',
        }
    )
);
