'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';
import { UserMenu } from '@/components/user-menu';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/lib/sidebar-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

export function GlobalHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleGetStarted = () => {
    router.push('/onboarding');
  };

  return (
    <header className='bg-background/95 backdrop-blur-sm border-b border-border'>
      <div className='container mx-auto px-4 py-3 max-w-7xl'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={handleLogoClick}
              className='flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity'
            >
              <img
                src='/logo.png'
                alt='PGadmit Logo'
                className='max-w-[120px] sm:max-w-[140px] md:max-w-[160px] h-auto object-contain transition-transform hover:scale-105'
              />
            </button>
          </div>

          {/* Navigation Actions */}
          <div className='flex items-center space-x-4'>
            {user ? (
              <>
                {/* Mobile Menu Button */}
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={toggleSidebar}
                  className='md:hidden p-2'
                >
                  <Menu className='h-5 w-5' />
                </Button>

                {/* User Menu */}
                <UserMenu />
              </>
            ) : (
              <Button
                onClick={handleGetStarted}
                className='bg-blue-600 hover:bg-blue-700 text-white'
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
