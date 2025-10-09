'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  Heart,
  ExternalLink,
  MapPin,
  Users,
  GraduationCap,
} from 'lucide-react';
import { useSavedUniversities } from '../model/saved-universities-context';
import { SaveUniversityButton } from './save-university-button';

interface SavedUniversitiesListProps {
  className?: string;
  showHeader?: boolean;
  limit?: number;
}

export function SavedUniversitiesList({
  className,
  showHeader = true,
  limit = 10,
}: SavedUniversitiesListProps) {
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

  const displayUniversities = useMemo(() => {
    return savedUniversities.slice(0, limit);
  }, [savedUniversities, limit]);

  const isEmpty = useMemo(() => {
    return savedUniversities.length === 0;
  }, [savedUniversities.length]);

  const showMoreButton = useMemo(() => {
    return savedUniversities.length > limit;
  }, [savedUniversities.length, limit]);

  if (isLoading) {
    return (
      <Card className={className}>
        {showHeader && (
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Heart className='h-5 w-5 text-red-500' />
              Saved Universities
            </CardTitle>
          </CardHeader>
        )}
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
        {showHeader && (
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Heart className='h-5 w-5 text-red-500' />
              Saved Universities
            </CardTitle>
          </CardHeader>
        )}
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
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <Heart className='h-5 w-5 text-red-500' />
              Saved Universities
              <Badge variant='secondary'>{savedUniversities.length}</Badge>
            </CardTitle>
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
        </CardHeader>
      )}
      <CardContent>
        <div className='space-y-4'>
          {displayUniversities.map(university => (
            <div
              key={university.id}
              className='flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors'
            >
              {/* University Logo */}
              <div className='flex-shrink-0'>
                {university.logo_url ? (
                  <img
                    src={university.logo_url}
                    alt={`${university.university_name} logo`}
                    className='w-12 h-12 rounded-lg object-cover'
                  />
                ) : (
                  <div className='w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center'>
                    <GraduationCap className='h-6 w-6 text-gray-400' />
                  </div>
                )}
              </div>

              {/* University Info */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h3 className='font-semibold text-gray-900 truncate'>
                      {university.university_name}
                    </h3>
                    <div className='flex items-center gap-2 text-sm text-gray-500 mt-1'>
                      <MapPin className='h-4 w-4' />
                      <span>
                        {[
                          university.city,
                          university.state_province,
                          university.country,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                  </div>
                  <SaveUniversityButton
                    universityId={university.university_id}
                    variant='ghost'
                    size='sm'
                    showText={false}
                  />
                </div>

                {/* University Details */}
                <div className='mt-2 flex flex-wrap gap-2'>
                  {university.qs_world_ranking && (
                    <Badge variant='outline'>
                      QS #{university.qs_world_ranking}
                    </Badge>
                  )}
                  {university.university_type && (
                    <Badge variant='outline'>
                      {university.university_type}
                    </Badge>
                  )}
                  {university.international_students_percent && (
                    <Badge variant='outline'>
                      <Users className='h-3 w-3 mr-1' />
                      {university.international_students_percent}% international
                    </Badge>
                  )}
                </div>

                {/* Description */}
                {university.description && (
                  <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
                    {university.description}
                  </p>
                )}

                {/* Actions */}
                <div className='flex items-center gap-2 mt-3'>
                  {university.website_url && (
                    <Button variant='ghost' size='sm' asChild>
                      <a
                        href={university.website_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1'
                      >
                        <ExternalLink className='h-4 w-4' />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Show More Button */}
          {showMoreButton && (
            <div className='text-center pt-4'>
              <Button variant='outline'>
                Show All ({savedUniversities.length} universities)
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
