import { useState, useCallback, useEffect, useRef } from 'react';
import {
  searchUniversities,
  UniversitySearchParams,
} from '@/shared/api/universities/api';
import type { University } from '@/entities/universities';
import debounce from 'lodash.debounce';

interface SearchState {
  universities: University[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const initialPagination = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrev: false,
};

export function useSearchUniversities(initialParams?: UniversitySearchParams) {
  const [state, setState] = useState<SearchState>({
    universities: [],
    isLoading: false,
    error: null,
    pagination: initialPagination,
  });

  const [searchParams, setSearchParams] = useState<UniversitySearchParams>(
    initialParams || { page: 1, limit: 12 }
  );

  const abortControllerRef = useRef<AbortController | null>(null);

  const performSearch = useCallback(async (params: UniversitySearchParams) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await searchUniversities(params);

      if (result.error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Failed to search universities',
        }));
        return;
      }

      setState({
        universities: result.data,
        isLoading: false,
        error: null,
        pagination: result.pagination,
      });
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }, []);

  // Debounced search for query changes (500ms delay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((params: UniversitySearchParams) => {
      performSearch(params);
    }, 500),
    [performSearch]
  );

  // Effect to trigger search when params change
  useEffect(() => {
    // If only query changed, use debounced search
    const isQueryChange = searchParams.query !== undefined;

    if (isQueryChange) {
      debouncedSearch(searchParams);
    } else {
      // For other changes (pagination, filters), search immediately
      performSearch(searchParams);
    }

    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchParams, performSearch, debouncedSearch]);

  const search = useCallback((params: Partial<UniversitySearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...params,
      // Reset to page 1 when search params change
      page: params.page !== undefined ? params.page : 1,
    }));
  }, []);

  const nextPage = useCallback(() => {
    if (state.pagination.hasNext) {
      setSearchParams(prev => ({
        ...prev,
        page: (prev.page || 1) + 1,
      }));
    }
  }, [state.pagination.hasNext]);

  const prevPage = useCallback(() => {
    if (state.pagination.hasPrev) {
      setSearchParams(prev => ({
        ...prev,
        page: Math.max((prev.page || 1) - 1, 1),
      }));
    }
  }, [state.pagination.hasPrev]);

  const goToPage = useCallback((page: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: Math.max(1, page),
    }));
  }, []);

  const reset = useCallback(() => {
    setSearchParams({ page: 1, limit: 12 });
  }, []);

  return {
    universities: state.universities,
    isLoading: state.isLoading,
    error: state.error,
    pagination: state.pagination,
    searchParams,
    search,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}
