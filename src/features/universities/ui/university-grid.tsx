'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Users, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useGetUniversities } from '@/features/universities';
import { University } from '@/entities/universities';
import { SaveUniversityButton } from '@/features/saved-universities/ui/save-university-button';

interface UniversityGridProps {
  searchParams?: { query: string; type: string };
  className?: string;
}

export function UniversityGrid({
  searchParams,
  className,
}: UniversityGridProps) {
  const router = useRouter();
  const { universities, isLoading, error } = useGetUniversities();
  // Filter universities based on search params
  const filteredUniversities = universities.filter(uni => {
    if (searchParams?.query) {
      const query = searchParams.query.toLowerCase();
      if (
        !uni.name.toLowerCase().includes(query) &&
        !(uni.description?.toLowerCase().includes(query) ?? false)
      ) {
        return false;
      }
    }

    if (searchParams?.type && searchParams.type !== 'all') {
      if (uni.university_type !== searchParams.type) {
        return false;
      }
    }

    return true;
  });

  const viewDetails = (universityId: number) => {
    router.push(`/universities/${universityId}`);
  };

  const formatLocation = (country?: string, city?: string) => {
    const parts = [city, country].filter(Boolean);
    return parts.join(', ');
  };

  const formatStudents = (total?: string, internationalPercent?: number) => {
    if (!total) return 'N/A';

    // Parse students_total from string to number
    const totalStudents = parseInt(total.replace(/[^\d]/g, ''), 10);
    if (isNaN(totalStudents)) return total;

    const international = internationalPercent
      ? Math.round((totalStudents * internationalPercent) / 100)
      : 0;
    return `${totalStudents.toLocaleString()} (${international.toLocaleString()} international)`;
  };

  if (filteredUniversities.length === 0) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-xl font-semibold mb-4'>No universities found</h3>
        <p className='text-muted-foreground mb-6'>
          Try adjusting your search criteria
        </p>
        <Button variant='outline' onClick={() => window.location.reload()}>
          Reset Search
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredUniversities.map((university: University) => {
          const location = formatLocation(university.country, university.city);
          const students = formatStudents(
            university.students_total as string,
            university.international_students_percent
          );

          return (
            <Card
              key={university.id}
              className='bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='text-lg font-semibold text-foreground mb-1'>
                      {university.name}
                    </CardTitle>
                    <div className='flex items-center text-sm text-muted-foreground mb-2'>
                      <MapPin className='h-4 w-4 mr-1' />
                      {location}
                    </div>
                    <Badge variant='secondary' className='text-xs'>
                      {university.university_type}
                    </Badge>
                  </div>
                  <SaveUniversityButton
                    universityId={university.id}
                    variant='ghost'
                    size='sm'
                    showText={false}
                  />
                </div>
              </CardHeader>

              <CardContent className='pt-0'>
                <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
                  {university.description}
                </p>

                <div className='space-y-2 mb-4'>
                  {university.qs_world_ranking && (
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>QS Ranking</span>
                      <span className='font-medium'>
                        #{university.qs_world_ranking}
                      </span>
                    </div>
                  )}

                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>Students</span>
                    <div className='flex items-center'>
                      <Users className='h-4 w-4 mr-1' />
                      <span className='font-medium'>{students}</span>
                    </div>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 cursor-pointer'
                    onClick={() => viewDetails(university.id)}
                  >
                    View Details
                  </Button>
                  {university.website_url && (
                    <Button
                      variant='ghost'
                      size='sm'
                      className='cursor-pointer'
                      onClick={() =>
                        window.open(university.website_url, '_blank')
                      }
                    >
                      <ExternalLink className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
