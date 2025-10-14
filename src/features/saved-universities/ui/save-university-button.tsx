'use client';

import { useState, useCallback } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedUniversities } from '../model/saved-universities-context';
import { cn } from '@/lib/utils';

interface SaveUniversityButtonProps {
  universityId: number;
  universityName?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showText?: boolean;
}

export function SaveUniversityButton({
  universityId,
  variant = 'outline',
  size = 'default',
  className,
  showText = true,
}: SaveUniversityButtonProps) {
  const [isChecking, setIsChecking] = useState(false);
  const { isUniversityInSavedList, toggleUniversity, isSaving } =
    useSavedUniversities();

  const isSaved = isUniversityInSavedList(universityId);
  const isLoading = isSaving || isChecking;

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent event bubbling
      if (isLoading) return; // Prevent multiple clicks

      setIsChecking(true);
      try {
        await toggleUniversity(universityId);
      } finally {
        setIsChecking(false);
      }
    },
    [universityId, toggleUniversity, isLoading]
  );

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'transition-colors cursor-pointer',
        isSaved && 'text-red-500 hover:text-red-600',
        !isSaved && 'text-gray-500 hover:text-red-500',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className='h-4 w-4 animate-spin' />
      ) : (
        <Heart
          className={cn('h-4 w-4 cursor-pointer', isSaved && 'fill-current')}
        />
      )}
      {showText && <span className='ml-2'>{isSaved ? 'Saved' : 'Save'}</span>}
    </Button>
  );
}
