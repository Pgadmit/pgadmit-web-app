import { supabaseBrowser } from '@/lib/supabase/client';
import type {
  SavedUniversityResponse,
  ToggleSavedUniversityResponse,
  IsSavedResponse,
  SavedUniversitiesCountResponse,
  SavedUniversityWithDetails,
} from '@/shared/types/saved-universities';

export async function addSavedUniversity(
  universityId: number
): Promise<SavedUniversityResponse> {
  try {
    const { data, error } = await supabaseBrowser().rpc(
      'add_saved_university',
      {
        university_id_param: universityId,
      }
    );

    if (error) {
      console.error('Error adding saved university:', error);
      return {
        success: false,
        error: error.message,
        code: 'SUPABASE_ERROR',
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
    const { data, error } = await supabaseBrowser().rpc(
      'remove_saved_university',
      {
        university_id_param: universityId,
      }
    );

    if (error) {
      console.error('Error removing saved university:', error);
      return {
        success: false,
        error: error.message,
        code: 'SUPABASE_ERROR',
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
    const { data, error } = await supabaseBrowser().rpc(
      'get_saved_universities',
      {
        limit_count: limit,
        offset_count: offset,
      }
    );

    if (error) {
      console.error('Error fetching saved universities:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching saved universities:', error);
    return [];
  }
}

export async function isUniversitySaved(
  universityId: number
): Promise<IsSavedResponse> {
  try {
    const { data, error } = await supabaseBrowser().rpc('is_university_saved', {
      university_id_param: universityId,
    });

    if (error) {
      console.error('Error checking if university is saved:', error);
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
    const { data, error } = await supabaseBrowser().rpc(
      'get_saved_universities_count'
    );

    if (error) {
      console.error('Error fetching saved universities count:', error);
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
    const { data, error } = await supabaseBrowser().rpc(
      'toggle_saved_university',
      {
        university_id_param: universityId,
      }
    );

    if (error) {
      console.error('Error toggling saved university:', error);
      return {
        success: false,
        action: 'added',
        is_saved: false,
        data: {
          success: false,
          error: error.message,
          code: 'SUPABASE_ERROR',
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
