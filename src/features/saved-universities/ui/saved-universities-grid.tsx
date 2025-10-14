'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { UniversityCard } from '@/features/universities/ui/university-card';
import { useSavedUniversities } from '../model/saved-universities-context';
import { Loader2, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SavedUniversitiesGridProps {
  className?: string;
  limit?: number;
}

export function SavedUniversitiesGrid({
  className,
  limit = 20,
}: SavedUniversitiesGridProps) {
  const router = useRouter();
  const { savedUniversities, isLoading, refreshSavedUniversities } =
    useSavedUniversities();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await refreshSavedUniversities();
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshSavedUniversities, isRefreshing]);

  // Convert saved universities to UniversityCardData format
  const universityCards = useMemo(() => {
    return savedUniversities.slice(0, limit).map(uni => ({
      id: uni.university_id,
      name: uni.university_name,
      city: uni.city || undefined,
      country: uni.country,
      description: uni.description || undefined,
      qs_world_ranking: uni.qs_world_ranking || undefined,
      us_news_ranking: uni.us_news_ranking || undefined,
      students_total: uni.students_total || undefined,
      international_students_percent:
        uni.international_students_percent || undefined,
      university_type: uni.university_type || undefined,
      website_url: uni.website_url || undefined,
      logo_url: uni.logo_url || undefined,
      isBookmarked: true, // All saved universities are bookmarked
    }));
  }, [savedUniversities, limit]);

  const handleViewDetails = useCallback(
    (university: any) => {
      router.push(`/universities/${university.id}`);
    },
    [router]
  );

  // Memoize empty state check
  const isEmpty = useMemo(() => {
    return savedUniversities.length === 0;
  }, [savedUniversities.length]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent>
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='h-6 w-6 animate-spin' />
            <span className='ml-2'>Loading saved universities...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card className={className}>
        <CardContent>
          <div className='text-center py-8'>
            <Heart className='h-12 w-12 text-gray-300 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No saved universities yet
            </h3>
            <p className='text-gray-500 mb-4'>
              Start exploring universities and save your favorites to see them
              here.
            </p>
            <Button variant='outline' onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with refresh button */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-foreground'>
            {savedUniversities.length} Saved Universities
          </h3>
          <p className='text-sm text-muted-foreground'>
            Universities you've bookmarked for future reference
          </p>
        </div>
        <Button
          className={`${isRefreshing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          variant='ghost'
          size='sm'
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            'Refresh'
          )}
        </Button>
      </div>

      {/* University cards grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {universityCards.map((university, index) => (
          <UniversityCard
            key={university.id}
            university={university}
            index={index}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Show more button if there are more universities */}
      {savedUniversities.length > limit && (
        <div className='text-center pt-4'>
          <Button variant='outline'>
            Show All ({savedUniversities.length} universities)
          </Button>
        </div>
      )}
    </div>
  );
}
