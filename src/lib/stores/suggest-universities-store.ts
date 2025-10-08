import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SuggestUniversitiesState {
  universities: string[];
  loading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  setUniversities: (universities: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  reset: () => void;
}

const initialState: SuggestUniversitiesState = {
  universities: [],
  loading: false,
  error: null,
  isInitialized: false,
  setUniversities: () => {},
  setLoading: () => {},
  setError: () => {},
  setInitialized: () => {},
  reset: () => {},
};

export const useSuggestUniversitiesStore = create<SuggestUniversitiesState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUniversities: (universities: string[]) => {
        set({ universities });
      },
      setLoading: (loading: boolean) => {
        set({ loading });
      },
      setError: (error: string | null) => {
        set({ error });
      },
      setInitialized: (isInitialized: boolean) => {
        set({ isInitialized });
      },
      getUniversities: () => {
        return get().universities;
      },
      getLoading: () => {
        return get().loading;
      },
      getError: () => {
        return get().error;
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'suggest-universities-storage',
      partialize: state => ({
        universities: state.universities,
      }),
    }
  )
);

export const useSuggestUniversities = () => {
  const store = useSuggestUniversitiesStore();
  return {
    universities: store.universities,
    loading: store.loading,
    error: store.error,
    isInitialized: store.isInitialized,
    setUniversities: store.setUniversities,
    setLoading: store.setLoading,
    setError: store.setError,
    setInitialized: store.setInitialized,
    reset: store.reset,
  };
};
