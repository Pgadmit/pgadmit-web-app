'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { University } from '@/entities/universities';
import { SaveUniversityButton } from '@/features/saved-universities/ui/save-university-button';

interface UniversityGridProps {
  universities: University[];
  isLoading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onGoToPage?: (page: number) => void;
  className?: string;
}

export function UniversityGrid({
  universities,
  isLoading = false,
  pagination,
  onNextPage,
  onPrevPage,
  onGoToPage,
  className,
}: UniversityGridProps) {
  const router = useRouter();

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

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <span className='ml-3 text-muted-foreground'>Loading universities...</span>
      </div>
    );
  }

  if (!universities || universities.length === 0) {
    return (
      <div className='text-center py-12'>
        <h3 className='text-xl font-semibold mb-4'>No universities found</h3>
        <p className='text-muted-foreground mb-6'>
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results summary */}
      {pagination && (
        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <p>
            Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)} -{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} universities
          </p>
        </div>
      )}

      {/* Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {universities.map((university: University) => {
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

      {/* Pagination controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 pt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={onPrevPage}
            disabled={!pagination.hasPrev || isLoading}
            className='cursor-pointer'
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            Previous
          </Button>

          <div className='flex items-center gap-1'>
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              // Show first page, last page, current page and nearby pages
              if (pagination.totalPages <= 5) {
                // Show all pages if 5 or less
                return i + 1;
              }
              
              // Always show first page
              if (i === 0) return 1;
              
              // Always show last page
              if (i === 4) return pagination.totalPages;
              
              // Show current page and neighbors
              if (i === 1) {
                if (pagination.page <= 3) return 2;
                return '...';
              }
              
              if (i === 2) {
                if (pagination.page <= 3) return 3;
                if (pagination.page >= pagination.totalPages - 2) {
                  return pagination.totalPages - 2;
                }
                return pagination.page;
              }
              
              if (i === 3) {
                if (pagination.page >= pagination.totalPages - 2) {
                  return pagination.totalPages - 1;
                }
                return '...';
              }
              
              return null;
            }).map((pageNum, i) => {
              if (pageNum === '...') {
                return (
                  <span key={`ellipsis-${i}`} className='px-2 text-muted-foreground'>
                    ...
                  </span>
                );
              }
              
              if (!pageNum) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={pagination.page === pageNum ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => onGoToPage?.(pageNum as number)}
                  disabled={isLoading}
                  className='min-w-[40px] cursor-pointer'
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant='outline'
            size='sm'
            onClick={onNextPage}
            disabled={!pagination.hasNext || isLoading}
            className='cursor-pointer'
          >
            Next
            <ChevronRight className='h-4 w-4 ml-1' />
          </Button>
        </div>
      )}
    </div>
  );
}
