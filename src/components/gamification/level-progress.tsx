'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/lib/gamification-context';
import { Star, TrendingUp } from 'lucide-react';

interface LevelProgressProps {
  compact?: boolean;
}

export function LevelProgress({ compact = false }: LevelProgressProps) {
  const { userStats } = useGamification();

  const currentLevelPoints = (userStats.level - 1) * 100;
  const nextLevelPoints = userStats.level * 100;
  const progressInLevel = userStats.totalPoints - currentLevelPoints;
  const progressPercentage = (progressInLevel / 100) * 100;

  if (compact) {
    return (
      <div className='flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20'>
        <Star className='h-4 w-4 text-primary' />
        <span className='text-sm font-semibold text-primary'>
          Level {userStats.level}
        </span>
        <div className='flex-1 max-w-16'>
          <Progress value={progressPercentage} className='h-1' />
        </div>
      </div>
    );
  }

  return (
    <Card className='bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20'>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='font-semibold text-foreground'>Your Level</h3>
          <Star className='h-5 w-5 text-primary' />
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-2xl font-black text-primary'>
                Level {userStats.level}
              </div>
              <div className='text-sm text-muted-foreground'>
                {userStats.totalPoints} total points
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm font-medium text-foreground'>
                {progressInLevel}/100 XP
              </div>
              <div className='text-xs text-muted-foreground'>to next level</div>
            </div>
          </div>

          <Progress value={progressPercentage} className='h-2' />

          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <TrendingUp className='h-3 w-3' />
            <span>Keep completing tasks to level up!</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
