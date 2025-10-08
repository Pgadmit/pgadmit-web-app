import { useUserStore } from './store';

export const useCurrentUser = () => {
  return useUserStore(state => state.currentUser);
};

export const useUserId = () => {
  return useUserStore(state => state.currentUser?.id);
};

export const useUserRole = () => {
  return useUserStore(state => state.currentUser?.role);
};

export const useUserLoading = () => {
  return useUserStore(state => state.isLoading);
};

export const useUserActions = () => {
  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);
  const updateUser = useUserStore(state => state.updateUser);
  const setLoading = useUserStore(state => state.setLoading);

  return {
    setUser,
    clearUser,
    updateUser,
    setLoading,
  };
};
