export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  onboardingComplete: boolean;
  createdAt: string;
  role?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
}

export interface UserActions {
  setUser: (user: User | null) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
}
