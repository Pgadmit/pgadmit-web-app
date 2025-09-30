'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface UniversityCardSkeletonProps {
  index: number;
}

export function UniversityCardSkeleton({ index }: UniversityCardSkeletonProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "animate-in fade-in-0 slide-in-from-bottom-4",
        "bg-gradient-to-br from-card to-card/80"
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Icon skeleton */}
            <Skeleton className="w-9 h-9 rounded-lg" />

            <div className="flex-1 space-y-2">
              {/* Title skeleton */}
              <Skeleton className="h-5 w-3/4" />
              {/* Location skeleton */}
            </div>
          </div>
        </div>
      </CardHeader>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </Card>
  );
}
