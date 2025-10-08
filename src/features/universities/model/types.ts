import type {
  University,
  UniversitySearchParams,
  UniversitySearchResult,
} from '@/entities/universities';

export interface UniversitiesState {
  universities: University[];
  searchResults: UniversitySearchResult[];
  currentUniversity: University | null;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchParams: UniversitySearchParams;
  totalCount: number;
  hasMore: boolean;
}

export interface UniversitiesActions {
  // Data fetching
  fetchUniversities: (params?: UniversitySearchParams) => Promise<void>;
  searchUniversities: (params: UniversitySearchParams) => Promise<void>;
  fetchUniversityById: (id: number) => Promise<void>;

  // State management
  setSearchParams: (params: UniversitySearchParams) => void;
  clearError: () => void;
  clearSearchResults: () => void;
  clearCurrentUniversity: () => void;

  // Pagination
  loadMore: () => Promise<void>;
  resetPagination: () => void;
}

export interface UseUniversitiesReturn
  extends UniversitiesState,
    UniversitiesActions {
  // Computed values
  hasUniversities: boolean;
  hasSearchResults: boolean;
  canLoadMore: boolean;

  // Utility functions
  getUniversityById: (id: number) => University | undefined;
  getSearchResultById: (id: number) => UniversitySearchResult | undefined;
}
