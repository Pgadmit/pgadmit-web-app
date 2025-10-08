'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  const navigateToOnboarding = () => {
    router.push('/onboarding');
  };

  const scrollToCampusTour = () => {
    router.push('/onboarding');
  };

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <img
          src='/diverse-students-campus.JPG'
          alt='Diverse international students at university'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60' />
      </div>

      {/* Content */}
      <div className='relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight'>
          Your Dream University
          <br />
          <span className='text-accent bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent'>
            Awaits You
          </span>{' '}
          ✨
        </h1>

        <p className='text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-95 font-medium'>
          Skip the stress. top universities worldwide that actually want YOU.
          <br className='hidden sm:block' />
          <span className='font-bold text-accent'>
            AI-powered. Student-approved.
          </span>
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
          <Button
            variant='outline'
            size='lg'
            onClick={scrollToCampusTour}
            className='cursor-pointer w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-foreground px-8 py-4 text-lg font-semibold group transition-all duration-300 bg-white/10 backdrop-blur-sm'
          >
            <Play className='mr-2 h-5 w-5' />
            Start Your Journey
          </Button>
        </div>

        <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 text-sm sm:text-base'>
          <div className='flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full'>
            <span>🎓</span>
            <span className='font-semibold'>5,000+ Universities</span>
          </div>
          <div className='flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full'>
            <span>🤖</span>
            <span className='font-semibold'>AI-Powered</span>
          </div>
          <div className='flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full'>
            <span>✈️</span>
            <span className='font-semibold'>Visa Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
