'use client';

import { useEffect, useCallback } from 'react';
import { getUniversityById } from '@/shared/api/universities';
import { useUniversitiesStore } from '../../model/store';

export function useGetUniversityById(universityId: string | null) {
  const {
    currentUniversity,
    isLoadingUniversity,
    universityError,
    setCurrentUniversity,
    setLoadingUniversity,
    setUniversityError,
  } = useUniversitiesStore();

  const fetchUniversity = useCallback(async () => {
    if (!universityId) {
      setCurrentUniversity(null);
      setLoadingUniversity(false);
      setUniversityError(null);
      return;
    }

    try {
      setLoadingUniversity(true);
      setUniversityError(null);

      const response = await getUniversityById(Number(universityId));

      if (response.error) {
        setUniversityError(response.error);
        return;
      }

      setCurrentUniversity(response.data);
    } catch (err) {
      setUniversityError(
        err instanceof Error ? err.message : 'Unknown error occurred'
      );
    } finally {
      setLoadingUniversity(false);
    }
  }, [
    universityId,
    setCurrentUniversity,
    setLoadingUniversity,
    setUniversityError,
  ]);

  useEffect(() => {
    fetchUniversity();
  }, [fetchUniversity]);

  const reloadUniversity = useCallback(() => {
    fetchUniversity();
  }, [fetchUniversity]);

  return {
    university: currentUniversity,
    isLoading: isLoadingUniversity,
    error: universityError,
    reloadUniversity,
  };
}
