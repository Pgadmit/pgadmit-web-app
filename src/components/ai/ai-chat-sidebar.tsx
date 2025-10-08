'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Home,
  Search,
  MessageCircle,
  ClipboardList,
  User,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: Home, label: 'Home', href: '/dashboard', active: false },
  { icon: Search, label: 'Search', href: '/universities', active: false },
  { icon: MessageCircle, label: 'AI Chat', href: '/ai-chat', active: true },
  {
    icon: ClipboardList,
    label: 'Tracker',
    href: '/applications',
    active: false,
  },
  { icon: User, label: 'Profile', href: '/profile', active: false },
];

export function AIChatSidebar({
  isMobileMenuOpen,
  toggleMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    toggleMobileMenu(); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Overlay with Blur */}
      {isMobileMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm z-40 transition-all duration-300'
          onClick={toggleMobileMenu}
        />
      )}

      {/* Desktop Sidebar */}
      <div className='hidden md:flex w-20 bg-gray-50 border-r border-gray-200 flex-col items-center py-6 space-y-6'>
        {/* Logo */}
        <div className='flex flex-col items-center space-y-1'>
          <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>PG</span>
          </div>
          <span className='text-xs text-gray-600 font-medium'>PGadmit</span>
        </div>

        {/* Navigation Items */}
        <div className='flex flex-col space-y-4'>
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant='ghost'
                size='sm'
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  'w-12 h-12 p-0 flex flex-col items-center justify-center space-y-1 rounded-lg transition-all duration-200',
                  item.active
                    ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Icon className='h-5 w-5' />
                <span className='text-xs font-medium'>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'md:hidden fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out shadow-xl',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>PG</span>
            </div>
            <span className='text-lg font-semibold text-gray-900'>PGadmit</span>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleMobileMenu}
            className='p-2 hover:bg-gray-200 rounded-lg transition-colors'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className='p-4 space-y-1'>
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant='ghost'
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  'w-full justify-start h-12 px-4 text-left transition-all duration-200 rounded-lg',
                  item.active
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Icon className='h-5 w-5 mr-3' />
                <span className='font-medium'>{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Mobile Footer */}
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50'>
          <div className='text-xs text-gray-500 text-center'>
            AI Chat Assistant
          </div>
        </div>
      </div>
    </>
  );
}
