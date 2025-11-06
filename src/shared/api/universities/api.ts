import type { UniversityTypeInfo, University } from '@/entities/universities';

const API_BASE_URL = '/api/universities';

export interface UniversitySearchParams {
  query?: string;
  type?: string;
  country?: string;
  page?: number;
  limit?: number;
}

export interface UniversitySearchResponse {
  data: University[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

export async function searchUniversities(
  params: UniversitySearchParams = {}
): Promise<UniversitySearchResponse> {
  try {
    const searchParams = new URLSearchParams();

    if (params.query) searchParams.set('query', params.query);
    if (params.type) searchParams.set('type', params.type);
    if (params.country) searchParams.set('country', params.country);
    searchParams.set('page', String(params.page || 1));
    searchParams.set('limit', String(params.limit || 12));

    const response = await fetch(`${API_BASE_URL}/search?${searchParams}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 12,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
        error: errorData.error || 'Failed to search universities',
      };
    }

    const result = await response.json();
    return {
      data: result.data || [],
      pagination: result.pagination,
    };
  } catch (error) {
    console.error('Universities search error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getUniversities(): Promise<{
  data: University[];
  error?: string;
}> {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      return {
        data: [],
        error: errorData.error || 'Failed to fetch universities',
      };
    }

    const result = await response.json();
    return { data: result.data || [] };
  } catch (error) {
    console.error('Universities retrieval error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getUniversityById(id: number): Promise<{
  data: University | null;
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', {
        error: errorData.error,
        id,
      });
      return { data: null, error: errorData.error || 'University not found' };
    }

    const result = await response.json();
    return { data: result.data };
  } catch (error) {
    console.error('Unexpected error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      id,
      timestamp: new Date().toISOString(),
    });
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getUniversityTypes(): Promise<{
  data: UniversityTypeInfo[];
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/types`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error:', errorData);
      return {
        data: [],
        error: errorData.error || 'Failed to fetch university types',
      };
    }

    const result = await response.json();
    return { data: result.data || [] };
  } catch (error) {
    console.error('Unexpected error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
