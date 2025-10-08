'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Search, MessageCircle, ClipboardList, User } from 'lucide-react';
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

export function AIDesktopSidebar() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
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
  );
}
