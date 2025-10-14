import type { UniversityTypeInfo, University } from '@/entities/universities';

const API_BASE_URL = '/api/universities';

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
