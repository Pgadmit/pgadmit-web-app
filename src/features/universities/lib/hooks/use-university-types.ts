'use client';

import { useEffect } from 'react';
import { getUniversityTypes } from '@/shared/api/universities';
import { useUniversitiesStore } from '../../model/store';

export function useUniversityTypes() {
    const {
        universityTypes,
        isLoadingTypes,
        typesError,
        setUniversityTypes,
        setLoadingTypes,
        setTypesError,
    } = useUniversitiesStore();

    // Fetch university types on mount
    useEffect(() => {
        const fetchTypes = async () => {
            if (universityTypes.length > 0) return;

            setLoadingTypes(true);
            setTypesError(null);

            try {
                const response = await getUniversityTypes();

                if (response.error) {
                    setTypesError(response.error);
                } else {
                    setUniversityTypes(response.data);
                }
            } catch (error) {
                setTypesError(error instanceof Error ? error.message : 'Failed to fetch university types');
            } finally {
                setLoadingTypes(false);
            }
        };

        fetchTypes();
    }, [universityTypes.length, setLoadingTypes, setTypesError, setUniversityTypes]);

    return {
        universityTypes,
        isLoadingTypes,
        typesError,
    };
}
