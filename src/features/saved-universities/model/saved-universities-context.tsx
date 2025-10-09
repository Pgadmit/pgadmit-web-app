'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/features/auth';
import {
  addSavedUniversity,
  removeSavedUniversity,
  getSavedUniversities,
  isUniversitySaved,
  getSavedUniversitiesCount,
  toggleSavedUniversity,
} from '@/shared/api/saved-universities';
import type {
  SavedUniversityWithDetails,
  SavedUniversityResponse,
  ToggleSavedUniversityResponse,
  IsSavedResponse,
  SavedUniversitiesCountResponse,
} from '@/shared/types/saved-universities';

interface SavedUniversitiesContextType {
  // Data
  savedUniversities: SavedUniversityWithDetails[];
  savedCount: number;
  isLoading: boolean;
  isSaving: boolean;

  // Actions
  addUniversity: (universityId: number) => Promise<SavedUniversityResponse>;
  removeUniversity: (universityId: number) => Promise<SavedUniversityResponse>;
  toggleUniversity: (
    universityId: number
  ) => Promise<ToggleSavedUniversityResponse>;
  checkIsSaved: (universityId: number) => Promise<boolean>;
  refreshSavedUniversities: () => Promise<void>;
  refreshCount: () => Promise<void>;

  // Utilities
  isUniversityInSavedList: (universityId: number) => boolean;
}

const SavedUniversitiesContext = createContext<
  SavedUniversitiesContextType | undefined
>(undefined);

interface SavedUniversitiesProviderProps {
  children: ReactNode;
}

export function SavedUniversitiesProvider({
  children,
}: SavedUniversitiesProviderProps) {
  const [savedUniversities, setSavedUniversities] = useState<
    SavedUniversityWithDetails[]
  >([]);
  const [savedCount, setSavedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Helper function for error handling
  const handleError = useCallback(
    (error: unknown, message: string) => {
      console.error(message, error);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    },
    [toast]
  );

  // Helper function for success messages
  const showSuccess = useCallback(
    (message: string) => {
      toast({
        title: 'Success',
        description: message,
      });
    },
    [toast]
  );

  // Memoized university IDs set for fast lookup
  const savedUniversityIds = useMemo(
    () => new Set(savedUniversities.map(uni => uni.university_id)),
    [savedUniversities]
  );

  // Initialize data when user is authenticated
  useEffect(() => {
    if (!hasInitialized && user) {
      const initializeData = async () => {
        setIsLoading(true);
        try {
          const [universities, countResponse] = await Promise.all([
            getSavedUniversities(),
            getSavedUniversitiesCount(),
          ]);
          setSavedUniversities(universities);
          if (countResponse.success) {
            setSavedCount(countResponse.count);
          }
        } catch (error) {
          console.error('Error initializing saved universities:', error);
        } finally {
          setIsLoading(false);
          setHasInitialized(true);
        }
      };

      initializeData();
    }
  }, [hasInitialized, user]);

  // Reset state when user logs out
  useEffect(() => {
    if (!user && hasInitialized) {
      setSavedUniversities([]);
      setSavedCount(0);
      setHasInitialized(false);
    }
  }, [user, hasInitialized]);

  const refreshSavedUniversities = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const universities = await getSavedUniversities();
      setSavedUniversities(universities);
    } catch (error) {
      console.error('Error refreshing saved universities:', error);
      if (hasInitialized) {
        toast({
          title: 'Error',
          description: 'Failed to load saved universities',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [toast, hasInitialized, user]);

  const refreshCount = useCallback(async () => {
    if (!user) return;

    try {
      const response = await getSavedUniversitiesCount();
      if (response.success) {
        setSavedCount(response.count);
      }
    } catch (error) {
      console.error('Error refreshing saved count:', error);
    }
  }, [user]);

  const addUniversity = useCallback(
    async (universityId: number): Promise<SavedUniversityResponse> => {
      if (!user) {
        return {
          success: false,
          error: 'User not authenticated',
          code: 'NOT_AUTHENTICATED',
        };
      }

      setIsSaving(true);
      try {
        const response = await addSavedUniversity(universityId);

        if (response.success) {
          await refreshSavedUniversities();
          await refreshCount();
          showSuccess('University added to saved list');
        } else {
          handleError(null, response.error || 'Failed to add university');
        }

        return response;
      } catch (error) {
        handleError(error, 'Failed to add university');
        return {
          success: false,
          error: 'Unexpected error occurred',
          code: 'UNEXPECTED_ERROR',
        };
      } finally {
        setIsSaving(false);
      }
    },
    [refreshSavedUniversities, refreshCount, showSuccess, handleError, user]
  );

  const removeUniversity = useCallback(
    async (universityId: number): Promise<SavedUniversityResponse> => {
      if (!user) {
        return {
          success: false,
          error: 'User not authenticated',
          code: 'NOT_AUTHENTICATED',
        };
      }

      setIsSaving(true);
      try {
        const response = await removeSavedUniversity(universityId);

        if (response.success) {
          await refreshSavedUniversities();
          await refreshCount();
          toast({
            title: 'Success',
            description: 'University removed from saved list',
          });
        } else {
          toast({
            title: 'Error',
            description: response.error || 'Failed to remove university',
            variant: 'destructive',
          });
        }

        return response;
      } catch (error) {
        console.error('Error removing university:', error);
        const errorResponse: SavedUniversityResponse = {
          success: false,
          error: 'Unexpected error occurred',
          code: 'UNEXPECTED_ERROR',
        };

        toast({
          title: 'Error',
          description: 'Failed to remove university',
          variant: 'destructive',
        });

        return errorResponse;
      } finally {
        setIsSaving(false);
      }
    },
    [refreshSavedUniversities, refreshCount, toast, user]
  );

  const toggleUniversity = useCallback(
    async (universityId: number): Promise<ToggleSavedUniversityResponse> => {
      if (!user) {
        return {
          success: false,
          action: 'added',
          is_saved: false,
          data: {
            success: false,
            error: 'User not authenticated',
            code: 'NOT_AUTHENTICATED',
          },
        };
      }

      setIsSaving(true);
      try {
        const response = await toggleSavedUniversity(universityId);

        if (response.success) {
          await refreshSavedUniversities();
          await refreshCount();

          const actionText =
            response.action === 'added' ? 'added to' : 'removed from';
          toast({
            title: 'Success',
            description: `University ${actionText} saved list`,
          });
        } else {
          toast({
            title: 'Error',
            description: response.data?.error || 'Failed to toggle university',
            variant: 'destructive',
          });
        }

        return response;
      } catch (error) {
        console.error('Error toggling university:', error);
        const errorResponse: ToggleSavedUniversityResponse = {
          success: false,
          action: 'added',
          is_saved: false,
          data: {
            success: false,
            error: 'Unexpected error occurred',
            code: 'UNEXPECTED_ERROR',
          },
        };

        toast({
          title: 'Error',
          description: 'Failed to toggle university',
          variant: 'destructive',
        });

        return errorResponse;
      } finally {
        setIsSaving(false);
      }
    },
    [refreshSavedUniversities, refreshCount, toast, user]
  );

  const checkIsSaved = useCallback(
    async (universityId: number): Promise<boolean> => {
      if (!user) return false;

      try {
        const response = await isUniversitySaved(universityId);
        return response.success && response.is_saved;
      } catch (error) {
        console.error('Error checking if university is saved:', error);
        return false;
      }
    },
    [user]
  );

  const isUniversityInSavedList = useCallback(
    (universityId: number): boolean => {
      return savedUniversityIds.has(universityId);
    },
    [savedUniversityIds]
  );

  const contextValue = useMemo(
    () => ({
      // Data
      savedUniversities,
      savedCount,
      isLoading,
      isSaving,

      // Actions
      addUniversity,
      removeUniversity,
      toggleUniversity,
      checkIsSaved,
      refreshSavedUniversities,
      refreshCount,

      // Utilities
      isUniversityInSavedList,
    }),
    [
      savedUniversities,
      savedCount,
      isLoading,
      isSaving,
      addUniversity,
      removeUniversity,
      toggleUniversity,
      checkIsSaved,
      refreshSavedUniversities,
      refreshCount,
      isUniversityInSavedList,
    ]
  );

  return (
    <SavedUniversitiesContext.Provider value={contextValue}>
      {children}
    </SavedUniversitiesContext.Provider>
  );
}

export function useSavedUniversities(): SavedUniversitiesContextType {
  const context = useContext(SavedUniversitiesContext);
  if (context === undefined) {
    throw new Error(
      'useSavedUniversities must be used within a SavedUniversitiesProvider'
    );
  }
  return context;
}
