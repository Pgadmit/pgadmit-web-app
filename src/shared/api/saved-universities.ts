import type {
  SavedUniversityResponse,
  ToggleSavedUniversityResponse,
  IsSavedResponse,
  SavedUniversitiesCountResponse,
  SavedUniversityWithDetails,
} from '@/shared/types/saved-universities';

const API_BASE_URL = '/api/saved-universities';

export async function addSavedUniversity(
  universityId: number
): Promise<SavedUniversityResponse> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ universityId }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error adding saved university:', data);
      return {
        success: false,
        error: data.error || 'Failed to add university',
        code: data.code || 'API_ERROR',
      };
    }

    return data;
  } catch (error) {
    console.error('Unexpected error adding saved university:', error);
    return {
      success: false,
      error: 'Unexpected error occurred',
      code: 'UNEXPECTED_ERROR',
    };
  }
}

export async function removeSavedUniversity(
  universityId: number
): Promise<SavedUniversityResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}?universityId=${universityId}`,
      {
        method: 'DELETE',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Error removing saved university:', data);
      return {
        success: false,
        error: data.error || 'Failed to remove university',
        code: data.code || 'API_ERROR',
      };
    }

    return data;
  } catch (error) {
    console.error('Unexpected error removing saved university:', error);
    return {
      success: false,
      error: 'Unexpected error occurred',
      code: 'UNEXPECTED_ERROR',
    };
  }
}

export async function getSavedUniversities(
  limit: number = 50,
  offset: number = 0
): Promise<SavedUniversityWithDetails[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      console.error('Error fetching saved universities');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Unexpected error fetching saved universities:', error);
    return [];
  }
}

export async function isUniversitySaved(
  universityId: number
): Promise<IsSavedResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/check?universityId=${universityId}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Error checking if university is saved:', data);
      return {
        success: false,
        is_saved: false,
        university_id: universityId,
      };
    }

    return data;
  } catch (error) {
    console.error('Unexpected error checking saved status:', error);
    return {
      success: false,
      is_saved: false,
      university_id: universityId,
    };
  }
}

export async function getSavedUniversitiesCount(): Promise<SavedUniversitiesCountResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/count`);

    const data = await response.json();

    if (!response.ok) {
      console.error('Error fetching saved universities count:', data);
      return {
        success: false,
        count: 0,
      };
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching count:', error);
    return {
      success: false,
      count: 0,
    };
  }
}

export async function toggleSavedUniversity(
  universityId: number
): Promise<ToggleSavedUniversityResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ universityId }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error toggling saved university:', data);
      return {
        success: false,
        action: 'added',
        is_saved: false,
        data: {
          success: false,
          error: data.error || 'Failed to toggle university',
          code: data.code || 'API_ERROR',
        },
      };
    }

    return data;
  } catch (error) {
    console.error('Unexpected error toggling saved university:', error);
    return {
      success: false,
      action: 'added',
      is_saved: false,
      data: {
        success: false,
        error: 'Unexpected error occurred',
        code: 'UNEXPECTED_ERROR',
      },
    };
  }
}
