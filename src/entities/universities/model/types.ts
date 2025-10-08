export interface University {
  id: number;
  name: string;
  country?: string;
  state_province?: string;
  city?: string;
  website_url?: string;
  university_type?: string;
  logo_url?: string;
  description?: string;
  programs?: string;
  qs_world_ranking?: number;
  us_news_ranking?: number;
  application_deadline_international?: string;
  application_deadline_early?: string;
  decision_release_date?: string;
  application_fee?: number;
  application_portal_url?: string;
  robots_txt_url?: string;
  minimum_gpa?: string;
  average_gpa_admitted?: number;
  tuition_fees_international?: string;
  living_costs_monthly?: string;
  application_fee_waiver?: boolean;
  accommodation_options?: string;
  campus_size_setting?: string;
  international_support_services?: string;
  students_total?: string;
  international_students_percent?: number;
  countries_represented?: string;
  alumni_network_strength?: string;
  postgrad_work_permit?: string;
  average_graduate_salary?: string;
  top_employers?: string;
  required_documents_ids?: string;
  required_tests_undergrad?: string;
  created_at?: string;
  updated_at?: string;
}

// Search and filter types
export interface UniversitySearchParams {
  search_query?: string;
  country_filter?: string;
  university_type_filter?: string;
  min_qs_ranking?: number;
  max_qs_ranking?: number;
  limit?: number;
  offset?: number;
}

export interface UniversitySearchResult {
  id: number;
  name: string;
  country?: string;
  state_province?: string;
  city?: string;
  website_url?: string;
  university_type?: string;
  logo_url?: string;
  description?: string;
  qs_world_ranking?: number;
  us_news_ranking?: number;
  application_fee?: number;
  minimum_gpa?: string;
  average_gpa_admitted?: number;
  students_total?: string;
  international_students_percent?: number;
}

export interface UniversityStats {
  total_universities: number;
  countries_count: number;
  avg_qs_ranking: number;
  avg_students_total: number;
  avg_international_percent: number;
}

export interface CountryInfo {
  country: string;
  universities_count: number;
}

export interface UniversityTypeInfo {
  university_type: string;
  universities_count: number;
}

// UI-specific types for components
export interface UniversityCardData {
  id: number;
  name: string;
  country?: string;
  city?: string;
  university_type?: string;
  logo_url?: string;
  description?: string;
  qs_world_ranking?: number;
  us_news_ranking?: number;
  application_fee?: number;
  minimum_gpa?: string;
  students_total?: string;
  international_students_percent?: number;
  isBookmarked?: boolean;
}

// Legacy types for backward compatibility (will be removed)
export interface LegacyUniversity {
  id: string;
  name: string;
  location: string;
  founded: number;
  type: string;
  ranking: {
    global: number;
    national: number;
    subject: Record<string, number>;
  };
  stats: {
    students: number;
    internationalStudents: string;
    facultyRatio: string;
    acceptanceRate: string;
    graduationRate: string;
  };
  tuition: {
    undergraduate: number;
    graduate: number;
    currency: string;
  };
  deadlines: {
    earlyAction: string;
    regularDecision: string;
    financialAid: string;
  };
  programs: Array<{
    name: string;
    level: string;
    duration: string;
  }>;
  requirements: {
    undergraduate: Record<string, string>;
    graduate: Record<string, string>;
  };
  scholarships: Array<{
    name: string;
    amount: string;
    eligibility: string;
  }>;
  campusLife: {
    housing: string;
    diningPlans: string;
    clubs: string;
    sports: string;
  };
  images: string[];
  description: string;
  isBookmarked: boolean;
}

