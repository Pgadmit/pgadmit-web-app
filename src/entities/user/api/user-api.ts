import type { UserProfile } from '../model/types';

const API_BASE_URL = '/api/profile';

export const getProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Unauthorized - user not logged in');
        return null;
      }

      const errorData = await response.json();
      console.warn('Error fetching profile data:', errorData);
      return null;
    }

    const result = await response.json();
    const data = result.data;

    return {
      id: userId,
      email: '', // Will be filled from session
      name: data?.name || '',
      avatar_url: data?.avatar_url,
      onboardingComplete: data?.onboarding_complete || undefined,
      createdAt: '', // Will be filled from session
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const updateProfile = async (
  userId: string,
  data: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        avatar_url: data.avatar_url,
        onboarding_complete: data.onboardingComplete,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating profile:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

export const createProfile = async (
  userId: string,
  data: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        avatar_url: data.avatar_url,
        onboarding_complete: data.onboardingComplete,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating profile:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating profile:', error);
    return false;
  }
};
