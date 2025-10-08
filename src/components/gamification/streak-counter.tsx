'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGamification } from '@/lib/gamification-context';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  compact?: boolean;
}

export function StreakCounter({ compact = false }: StreakCounterProps) {
  const { userStats } = useGamification();

  if (compact) {
    return (
      <div className='flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800'>
        <Flame className='h-4 w-4 text-orange-500' />
        <span className='text-sm font-semibold text-orange-700 dark:text-orange-300'>
          {userStats.currentStreak} day streak
        </span>
      </div>
    );
  }

  return (
    <Card className='bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800'>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='font-semibold text-foreground'>Daily Streak</h3>
          <Flame className='h-5 w-5 text-orange-500' />
        </div>

        <div className='space-y-3'>
          <div className='text-center'>
            <div className='text-3xl font-black text-orange-600 dark:text-orange-400'>
              {userStats.currentStreak}
            </div>
            <div className='text-sm text-muted-foreground'>days in a row</div>
          </div>

          <div className='flex items-center justify-between text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              <span>Best: {userStats.longestStreak} days</span>
            </div>
            {userStats.currentStreak > 0 && (
              <span className='text-orange-600 dark:text-orange-400 font-medium'>
                Keep it up!
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
