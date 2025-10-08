'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface LoadingState {
  auth: boolean;
  onboarding: boolean;
  blog: boolean;
  admission: boolean;
  universities: boolean;
}

interface LoadingContextType {
  loading: LoadingState;
  setLoading: (key: keyof LoadingState, value: boolean) => void;
  setMultipleLoading: (updates: Partial<LoadingState>) => void;
  isLoading: (key?: keyof LoadingState) => boolean;
  resetLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const initialLoadingState: LoadingState = {
  auth: false,
  onboarding: false,
  blog: false,
  admission: false,
  universities: false,
};

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoadingState] =
    useState<LoadingState>(initialLoadingState);

  const setLoading = useCallback((key: keyof LoadingState, value: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const setMultipleLoading = useCallback((updates: Partial<LoadingState>) => {
    setLoadingState(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const isLoading = useCallback(
    (key?: keyof LoadingState) => {
      if (key) {
        return loading[key];
      }
      return Object.values(loading).some(Boolean);
    },
    [loading]
  );

  const resetLoading = useCallback(() => {
    setLoadingState(initialLoadingState);
  }, []);

  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
      setMultipleLoading,
      isLoading,
      resetLoading,
    }),
    [loading, setLoading, setMultipleLoading, isLoading, resetLoading]
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

export function useAuthLoading() {
  const { loading, setLoading } = useLoading();
  return {
    loading: loading.auth,
    setLoading: (value: boolean) => setLoading('auth', value),
  };
}

export function useOnboardingLoading() {
  const { loading, setLoading } = useLoading();
  return {
    loading: loading.onboarding,
    setLoading: (value: boolean) => setLoading('onboarding', value),
  };
}

export function useBlogLoading() {
  const { loading, setLoading } = useLoading();
  return {
    loading: loading.blog,
    setLoading: (value: boolean) => setLoading('blog', value),
  };
}

export function useAdmissionLoading() {
  const { loading, setLoading } = useLoading();
  return {
    loading: loading.admission,
    setLoading: (value: boolean) => setLoading('admission', value),
  };
}

export function useUniversitiesLoading() {
  const { loading, setLoading } = useLoading();
  return {
    loading: loading.universities,
    setLoading: (value: boolean) => setLoading('universities', value),
  };
}
