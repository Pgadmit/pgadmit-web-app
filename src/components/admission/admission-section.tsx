'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  AlertCircle,
  Loader2,
} from 'lucide-react';

import { useAdmissionForm } from '@/hooks/use-admission-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {  Menu, X } from 'lucide-react'; 

import AdmissionForm from './admission-form'; 
import {
  UniversityCard,
  UniversityCardSkeleton,
} from '@/components/universities';

// --- Header Component ---
export function SiteHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='w-full bg-gradient-to-r from-[#6a11cb] via-[#a742f5] to-[#8a2be2] py-4 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto relative'>
        <nav className='flex items-center justify-between w-full bg-white rounded-full shadow-lg px-4 sm:px-6 py-2'>
          <Link href='/' className='flex-shrink-0 flex items-center gap-2'>
            <GraduationCap className='h-6 w-6 text-[#6a11cb]' />
            <span className='text-lg sm:text-xl font-bold text-gray-800'>
              PGadmit
            </span>
          </Link>

          <div className='hidden md:flex items-center space-x-4'>
            <Button
              variant='link'
              className='text-red-500 font-semibold hover:text-red-600 px-0'
            >
              Log in
            </Button>
            <Button className='rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-semibold px-5 py-2 hover:opacity-90 transition-opacity'>
              Sign Up
            </Button>
          </div>

          <div className='md:hidden'>
            <Button onClick={toggleMobileMenu} variant='ghost' size='icon'>
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div
            className='md:hidden absolute top-full left-0 right-0 mt-2 w-full bg-white rounded-lg shadow-xl p-4'
          >
            <div className='flex flex-col space-y-4'>
              <Button
                variant='outline'
                className='w-full justify-center text-red-500 font-semibold border-red-500'
              >
                Log in
              </Button>
              <Button className='w-full justify-center rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-semibold hover:opacity-90 transition-opacity'>
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


const SiteFooter = () => (
    <footer className='bg-gray-900 text-white'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8'>
           <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <GraduationCap className='h-7 w-7' />
              <span className='text-xl font-bold'>PGadmit</span>
            </div>
            <p className='text-sm text-gray-400'>
              Your AI-powered co-pilot for studying abroad.
            </p>
          </div>
          <div>
            <h3 className='text-sm font-semibold tracking-wider uppercase'>Navigation</h3>
            <ul className='mt-4 space-y-2 text-gray-400'>
              <li><Link href='/about' className='hover:text-white'>About</Link></li>
              <li><Link href='/blog' className='hover:text-white'>Blog</Link></li>
            </ul>
          </div>
           <div>
            <h3 className='text-sm font-semibold tracking-wider uppercase'>Follow Us</h3>
            <p className='mt-4 text-sm text-gray-400'>
              Follow PGadmit for global student tips and stories.
            </p>
            <div className='flex mt-4 space-x-4'>
              <Link href='#' className='text-gray-400 hover:text-white'><Facebook className='h-6 w-6' /></Link>
              <Link href='#' className='text-gray-400 hover:text-white'><Twitter className='h-6 w-6' /></Link>
            </div>
          </div>
        </div>
      </footer>
);

export default function AdmissionSection() {
  const {
    form,
    onSubmit,
    isPending,
    errorMessage,
    loading,
    universities,
    isOpenAILimited,
  } = useAdmissionForm();

  const renderMatchesContent = () => {
    if (errorMessage) {
      return (
        <Alert className='border-red-200 bg-red-50'>
          <AlertCircle className='h-4 w-4 text-red-600' />
          <AlertDescription className='text-red-600'>{errorMessage}</AlertDescription>
        </Alert>
      );
    }
    if (loading) {
      return (
        <div className='space-y-4'>
          <div className='text-center py-8'>
            <Loader2 className='w-8 h-8 text-blue-600 animate-spin mx-auto mb-4' />
            <p className='text-muted-foreground'>Processing your request...</p>
          </div>
          <div className='grid gap-4'>
            {Array.from({ length: 3 }).map((_, index) => <UniversityCardSkeleton key={index} index={index} />)}
          </div>
        </div>
      );
    }
    if (universities.length > 0) {
      return (
        <div className='min-h-[32rem] sm:min-h-[36rem] flex flex-col'>
          <div className='flex-1 grid gap-3 sm:gap-4 p-3 sm:p-4'>
            {universities.map((university, index) => {
              const isBlurred = index >= 3;
              return (
                <div key={university} className={isBlurred ? 'select-none pointer-events-none' : ''}>
                  <UniversityCard name={university} index={index} isBlurred={isBlurred} />
                </div>
              );
            })}
          </div>
          <div className='flex justify-center mt-4 sm:mt-6 px-3 sm:px-4'>
            <Button size='lg' className='px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-primary-blue hover:bg-primary-blue/80 w-full sm:w-auto'>
              Unlock Full Report & Strategy <span className='text-sm'>✨ Premium</span>
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className='bg-gray-50 border border-gray-200 rounded-lg p-8 text-center'>
        <p className='text-muted-foreground text-lg'>
          Your personalized university matches will appear here after form submission
        </p>
      </div>
    );
  };

  const renderDisclaimer = () => {
    if (!universities.length || errorMessage || loading) return null;
    return (
      <div className='space-y-4'>
        <div className='bg-blue-50/20 border border-blue-200 rounded-lg p-4'>
          <p className='text-xs text-muted-foreground'>
            These university suggestions are generated with the assistance of advanced AI.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <section className='bg-gradient-to-b from-muted/20 to-background py-16 md:py-24'>
          <div className='container mx-auto px-4 sm:px-6 max-w-7xl'>
            <div className='text-center mb-12 md:mb-16'>
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight'>
                Get Your Personalized University Matches 🎯
              </h2>
              <p className='text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                Fill out our smart form and get AI-powered university suggestions.
              </p>
            </div>

            {/* --- The JSX from admission-section-content is now directly here --- */}
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
              <div className='w-full lg:w-1/2'>
                <div className='p-6 h-full flex flex-col'>
                  <h3 className='text-2xl font-semibold text-primary-blue mb-6'>Your Matches</h3>
                  <div className='flex-1 flex flex-col justify-between'>
                    <div className='mb-6'>{renderMatchesContent()}</div>
                    {renderDisclaimer()}
                  </div>
                </div>
              </div>
              <Card className='w-full lg:w-1/2 shadow-lg'>
                <CardContent className='p-6'>
                  <h3 className='text-2xl font-semibold text-primary-blue mb-4'>Your Information</h3>
                  {isOpenAILimited && (
                    <div className='mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center'>
                      <span className='text-amber-700 font-medium'>Searching For Your Matches</span>
                    </div>
                  )}
                  <AdmissionForm form={form} onSubmit={onSubmit} isPending={isPending} isRateLimited={isOpenAILimited} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}