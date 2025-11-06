import type { User as SupabaseUser } from '@supabase/supabase-js';
import { connectionMonitor } from './connection-monitor';
import type { UserProfile, UserOnboarding } from '@/types';

const API_BASE_URL = '/api';

export async function fetchUserProfile(
  supabaseUser: SupabaseUser
): Promise<UserProfile> {
  if (!connectionMonitor.isOnline()) {
    console.warn('No internet connection, using cached profile if available');
    throw new Error('No internet connection and no cached profile available');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/profile`);

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const result = await response.json();
    const profileData = result.data;

    const userProfile: UserProfile = {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name:
        profileData?.name ||
        supabaseUser.user_metadata?.full_name ||
        supabaseUser.user_metadata?.name ||
        supabaseUser.email!.split('@')[0],
      avatar_url:
        profileData?.avatar_url || supabaseUser.user_metadata?.avatar_url,
      onboardingComplete:
        profileData?.onboarding_complete || supabaseUser.onboarding_complete,
      createdAt: supabaseUser.created_at,
    };
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);

    const fallbackProfile: UserProfile = {
      id: supabaseUser.id,
      email: supabaseUser.email!,
      name:
        supabaseUser.user_metadata?.full_name ||
        supabaseUser.user_metadata?.name ||
        supabaseUser.email!.split('@')[0],
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      onboardingComplete: supabaseUser.onboarding_complete,
      createdAt: supabaseUser.created_at,
    };

    return fallbackProfile;
  }
}

export async function fetchUserOnboarding(
  userId: string
): Promise<UserOnboarding | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/onboarding`);

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error('Failed to fetch onboarding data');
    }

    const result = await response.json();
    return result.data as UserOnboarding | null;
  } catch (error) {
    console.error('Error fetching user onboarding:', error);
    return null;
  }
}

export async function saveUserOnboarding(
  userId: string,
  onboardingData: Partial<UserOnboarding>
): Promise<UserOnboarding | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/onboarding/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(onboardingData),
    });

    if (!response.ok) {
      throw new Error('Failed to save onboarding data');
    }

    const result = await response.json();
    return result.data as UserOnboarding;
  } catch (error) {
    console.error('Error saving user onboarding:', error);
    return null;
  }
}

export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`);

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.data?.onboarding_complete || false;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

export async function updateOnboardingCompletion(
  userId: string,
  isCompleted: boolean
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        onboarding_complete: isCompleted,
      }),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating onboarding completion:', error);
    return false;
  }
}
