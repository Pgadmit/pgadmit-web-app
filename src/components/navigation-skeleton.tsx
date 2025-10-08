'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function NavigationSkeleton() {
  return (
    <nav className='hidden md:flex items-center gap-2'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className='h-9 w-20' />
      ))}
    </nav>
  );
}

export function MobileNavigationSkeleton() {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className='h-9 w-24 md:hidden' />
    </div>
  );
}
