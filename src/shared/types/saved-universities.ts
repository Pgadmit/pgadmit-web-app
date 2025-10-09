export interface SavedUniversity {
  id: number;
  user_id: string;
  university_id: number;
  created_at: string;
  updated_at: string;
}

export interface SavedUniversityWithDetails extends SavedUniversity {
  university_name: string;
  country: string;
  state_province: string | null;
  city: string | null;
  website_url: string | null;
  university_type: string | null;
  logo_url: string | null;
  description: string | null;
  qs_world_ranking: number | null;
  us_news_ranking: number | null;
  application_fee: number | null;
  minimum_gpa: string | null;
  average_gpa_admitted: number | null;
  students_total: string | null;
  international_students_percent: number | null;
}

// RPC Function Response Types
export interface SavedUniversityResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  data?: {
    user_id: string;
    university_id: number;
    created_at?: string;
    deleted_at?: string;
  };
}

export interface ToggleSavedUniversityResponse {
  success: boolean;
  action: 'added' | 'removed';
  is_saved: boolean;
  data: SavedUniversityResponse;
}

export interface IsSavedResponse {
  success: boolean;
  is_saved: boolean;
  university_id: number;
}

export interface SavedUniversitiesCountResponse {
  success: boolean;
  count: number;
}

// API Function Types
export interface SavedUniversitiesApi {
  addSavedUniversity: (
    universityId: number
  ) => Promise<SavedUniversityResponse>;
  removeSavedUniversity: (
    universityId: number
  ) => Promise<SavedUniversityResponse>;
  getSavedUniversities: (
    limit?: number,
    offset?: number
  ) => Promise<SavedUniversityWithDetails[]>;
  isUniversitySaved: (universityId: number) => Promise<IsSavedResponse>;
  getSavedUniversitiesCount: () => Promise<SavedUniversitiesCountResponse>;
  toggleSavedUniversity: (
    universityId: number
  ) => Promise<ToggleSavedUniversityResponse>;
}
