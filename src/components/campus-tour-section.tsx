'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, MapPin, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CampusTourSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const navigateToOnboarding = () => {
    router.push('/onboarding');
  };

  const tourDetails = {
    title: 'Real Campus Life: What Studying Abroad Actually Looks Like',
    description:
      'Get the unfiltered truth about campus life! See real students, real dorms, and what your day-to-day experience will actually be like.',
    duration: '15 min',
    views: '1.8M views',
    rating: 4.8,
    location: 'Multiple Universities',
    highlights: [
      'Real Student Interviews 🎤',
      'Dorm Room Reality Check 🏠',
      'Campus Food & Social Life 🍕',
      'Study Spaces & Libraries 📚',
      'International Student Tips 🌍',
      'Budget & Living Costs 💰',
    ],
  };

  const handleWatchTour = () => {
    setIsPlaying(true);
  };

  return (
    <section
      data-section='campus-tour'
      className='py-16 md:py-24 bg-gradient-to-b from-background to-muted/20'
    >
      <div className='container mx-auto px-4 sm:px-6 max-w-7xl'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight'>
            Campus Tours That Hit Different 🎬
          </h2>
          <p className='text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            No boring brochures. Real campus vibes, real student life, real talk
            about what it's actually like.
          </p>
        </div>

        <Card className='bg-card shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500'>
          <div className='relative'>
            {/* Video Player */}
            <div className='relative aspect-video bg-black rounded-t-lg overflow-hidden'>
              {!isPlaying ? (
                <>
                  <img
                    src='https://img.youtube.com/vi/taqXja77r0Q/maxresdefault.jpg'
                    alt='University Campus Life Tour'
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center'>
                    <Button
                      size='lg'
                      onClick={handleWatchTour}
                      className='cursor-pointer bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-6 md:p-8 group transition-all duration-300 transform hover:scale-110 shadow-2xl'
                    >
                      <Play
                        className='h-8 w-8 md:h-10 md:w-10 ml-1 group-hover:scale-110 transition-transform'
                        fill='currentColor'
                      />
                    </Button>
                  </div>
                  <div className='absolute top-4 right-4'>
                    <Badge className='bg-black/80 text-white font-semibold text-sm'>
                      <Clock className='h-3 w-3 mr-1' />
                      {tourDetails.duration}
                    </Badge>
                  </div>
                  <div className='absolute bottom-4 left-4'>
                    <div className='flex items-center gap-2 bg-black/80 text-white px-3 py-2 rounded-full text-sm'>
                      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                      <span className='font-semibold'>
                        {tourDetails.rating}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className='w-full h-full bg-black flex items-center justify-center'>
                  <iframe
                    width='100%'
                    height='100%'
                    src='https://www.youtube.com/embed/taqXja77r0Q?autoplay=1'
                    title='University Campus Life Tour'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    className='w-full h-full'
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-2/3'>
              <CardHeader className='p-6 md:p-8'>
                <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4' />
                    <span>{tourDetails.location}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span>{tourDetails.views}</span>
                  </div>
                </div>

                <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight'>
                  {tourDetails.title}
                </h3>

                <p className='text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed'>
                  {tourDetails.description}
                </p>

                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button
                    onClick={handleWatchTour}
                    className='cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3'
                  >
                    <Play className='mr-2 h-4 w-4' />
                    {isPlaying ? 'Restart Tour' : 'Watch Now'}
                  </Button>
                  <Button
                    onClick={navigateToOnboarding}
                    className='cursor-pointer bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold px-6 py-3'
                  >
                    Start Your Journey
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </CardHeader>
            </div>

            <div className='lg:w-1/3 bg-muted/30'>
              <CardContent className='p-6 md:p-8'>
                <h4 className='font-bold text-foreground mb-6 text-lg'>
                  What You'll See
                </h4>
                <ul className='space-y-3 mb-8'>
                  {tourDetails.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-3 text-sm text-muted-foreground'
                    >
                      <div className='w-2 h-2 bg-accent rounded-full flex-shrink-0'></div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className='space-y-4'>
                  <div className='p-4 bg-background rounded-lg border'>
                    <p className='text-sm text-muted-foreground mb-3'>
                      Love what you see?
                    </p>
                    <Button
                      size='sm'
                      onClick={navigateToOnboarding}
                      className='cursor-pointer w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold'
                    >
                      Get Started Now 📋
                    </Button>
                  </div>

                  <Button
                    size='sm'
                    onClick={navigateToOnboarding}
                    className='cursor-pointer w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold'
                  >
                    Find My Perfect Match
                    <ArrowRight className='ml-2 h-3 w-3' />
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
