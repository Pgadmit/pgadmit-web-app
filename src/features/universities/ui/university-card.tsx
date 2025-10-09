'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UniversityCardData } from '@/entities/universities';
import { SaveUniversityButton } from '@/features/saved-universities/ui/save-university-button';

interface UniversityCardProps {
  university: UniversityCardData;
  index: number;
  isBlurred?: boolean;
  onViewDetails?: (university: UniversityCardData) => void;
  className?: string;
}

export function UniversityCard({
  university,
  index,
  isBlurred = false,
  onViewDetails,
  className,
}: UniversityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatLocation = () => {
    const parts = [university.city, university.country].filter(Boolean);
    return parts.join(', ');
  };

  const formatRanking = () => {
    if (university.qs_world_ranking)
      return `#${university.qs_world_ranking} QS`;
    if (university.us_news_ranking)
      return `#${university.us_news_ranking} US News`;
    return 'Unranked';
  };

  return (
    <Card
      className={cn(
        'p-2',
        'group relative overflow-hidden transition-all duration-300 ease-out',
        'hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1',
        'border border-border/50 hover:border-primary/30',
        'bg-gradient-to-br from-card to-card/80',
        isBlurred && 'blur-sm opacity-60 pointer-events-none',
        'animate-in fade-in-0 slide-in-from-bottom-4',
        'hover:scale-[1.02] cursor-pointer',
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails?.(university)}
    >
      {/* Gradient overlay on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5',
          'opacity-0 transition-opacity duration-300',
          isHovered && 'opacity-100'
        )}
      />

      {/* Save button */}
      <div
        className='absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
        onClick={e => e.stopPropagation()}
      >
        <SaveUniversityButton
          universityId={university.id}
          variant='ghost'
          size='sm'
          showText={false}
          className='p-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-primary/50'
        />
      </div>

      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200'>
              <Building2 className='w-5 h-5 text-primary' />
            </div>
            <div className='flex-1 min-w-0'>
              <CardTitle className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 break-words leading-tight'>
                {university.name}
              </CardTitle>
              {formatLocation() && (
                <div className='flex items-center gap-2 mt-1'>
                  <MapPin className='w-3 h-3 text-muted-foreground' />
                  <span className='text-sm text-muted-foreground'>
                    {formatLocation()}
                  </span>
                </div>
              )}
              <div className='mt-1'>
                <span className='text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded'>
                  {formatRanking()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Additional info */}
      {(university.description || university.students_total) && (
        <div className='px-6 pb-4 space-y-2'>
          {university.description && (
            <p className='text-sm text-muted-foreground line-clamp-2'>
              {university.description}
            </p>
          )}
          {university.students_total && (
            <div className='text-xs text-muted-foreground'>
              {university.students_total.toLocaleString()} students
              {university.international_students_percent && (
                <span>
                  {' '}
                  ({university.international_students_percent}% international)
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Subtle border animation */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl border-2 border-transparent',
          'bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20',
          'opacity-0 transition-opacity duration-300',
          isHovered && 'opacity-100'
        )}
        style={{
          background: 'linear-gradient(45deg, transparent, transparent)',
          backgroundClip: 'padding-box',
          WebkitBackgroundClip: 'padding-box',
        }}
      />
    </Card>
  );
}
