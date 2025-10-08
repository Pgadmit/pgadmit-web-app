import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserState, UserActions } from './types';

interface UserStore extends UserState, UserActions {}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      isLoading: false,

      setUser: (user: User | null) => {
        set({
          currentUser: user,
          isLoading: false,
        });
      },

      clearUser: () => {
        set({
          currentUser: null,
          isLoading: false,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().currentUser;
        if (currentUser) {
          set({
            currentUser: { ...currentUser, ...updates },
          });
        }
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: 'pgadmit-user-storage',
      partialize: state => ({
        currentUser: state.currentUser,
      }),
    }
  )
);
