import { getUniversities } from '@/shared/api/universities/api';
import { useUniversitiesStore } from '../../model/store';
import { useCallback, useEffect } from 'react';

export function useGetUniversities() {
  const {
    universities,
    setUniversities,
    universitiesError,
    isLoadingUniversities,
    setLoadingUniversities,
    setUniversitiesError,
    hasInitializedUniversities,
    setHasInitializedUniversities,
  } = useUniversitiesStore();

  const fetchUniversities = useCallback(async () => {
    try {
      setLoadingUniversities(true);
      setUniversitiesError(null);

      const response = await getUniversities();
      if (response.error) {
        throw new Error(response.error);
      }

      setUniversities(response.data);
      return response.data;
    } catch (error) {
      setUniversitiesError(
        error instanceof Error ? error.message : 'Unknown error'
      );
      return [];
    } finally {
      setLoadingUniversities(false);
    }
  }, [setUniversities, setLoadingUniversities, setUniversitiesError]);

  // Initialize universities data once globally
  useEffect(() => {
    if (!hasInitializedUniversities) {
      fetchUniversities();
      setHasInitializedUniversities(true);
    }
  }, [
    fetchUniversities,
    hasInitializedUniversities,
    setHasInitializedUniversities,
  ]);

  const reloadUniversities = useCallback(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  return {
    isLoading: isLoadingUniversities,
    error: universitiesError,
    universities,
    reloadUniversities,
  };
}
