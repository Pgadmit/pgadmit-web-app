'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGamification } from '@/lib/gamification-context';
import { X, Sparkles } from 'lucide-react';

export function AchievementCelebration() {
  const { showCelebration, celebrationMessage, dismissCelebration } =
    useGamification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showCelebration) {
      setIsVisible(true);
    }
  }, [showCelebration]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(dismissCelebration, 300); // Wait for animation
  };

  if (!showCelebration) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <Card
        className={`mx-4 max-w-md bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <CardContent className='p-6 text-center'>
          <div className='mb-4'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
              <Sparkles className='h-8 w-8 text-primary animate-pulse' />
            </div>
            <h3 className='text-xl font-bold text-foreground mb-2'>
              {celebrationMessage}
            </h3>
            <p className='text-muted-foreground text-sm'>
              Keep up the great work on your study abroad journey!
            </p>
          </div>

          <div className='flex gap-2 justify-center'>
            <Button
              onClick={handleDismiss}
              className='bg-primary hover:bg-primary/90'
            >
              Awesome!
            </Button>
            <Button variant='ghost' size='sm' onClick={handleDismiss}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
