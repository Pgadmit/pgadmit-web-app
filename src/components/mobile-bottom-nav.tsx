'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Home,
  Search,
  MessageCircle,
  ClipboardList,
  User,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Search, label: 'Search', href: '/universities' },
  { icon: MessageCircle, label: 'AI Chat', href: '/ai-chat' },
  { icon: ClipboardList, label: 'Applications', href: '/applications' },
  { icon: BookOpen, label: 'Resources', href: '/resources' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show navigation on auth pages
  if (pathname.startsWith('/auth')) {
    return null;
  }

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-2 z-50'>
      <div className='flex items-center justify-around'>
        {navigationItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Button
              key={item.href}
              variant='ghost'
              onClick={() => handleNavigation(item.href)}
              className={cn(
                'flex flex-col items-center justify-center p-1 h-14 w-12 transition-colors',
                active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Icon className='h-4 w-4 mb-0.5' />
              <span className='text-[10px] font-medium leading-tight text-center'>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
