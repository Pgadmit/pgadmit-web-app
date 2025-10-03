// Base user interface - simplified version
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  onboardingComplete?: boolean;
  createdAt: string;
}

// UserProfile is the same as User for consistency
export interface UserProfile extends User {}

// User onboarding data from user_onboarding table
export interface UserOnboarding {
  id: string;
  study_goal: string;
  destination: string;
  knows_universities: string;
  country: string;
  field_of_study: string;
  gpa: string;
  intake: string;
  budget: string;
  funding: string;
  study_break: boolean;
  visa_refusal: boolean;
  segment: string;
  is_completed: boolean;
  created_at: string;
}

// Combined user with onboarding data
export interface UserWithOnboarding extends User {
  onboardingData?: UserOnboarding;
}

// Base user interface from Supabase (for internal use)
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

// Signup data extends user with password
export interface SignupData extends User {
  password: string;
}

// Cached profile wrapper
export interface CachedProfile {
  data: UserProfile;
  timestamp: number;
  version: string;
}
