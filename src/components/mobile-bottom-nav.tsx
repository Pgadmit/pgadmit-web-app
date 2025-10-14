'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MOBILE_NAVIGATION_ITEMS } from '@/config/navigation';

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show navigation on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-2 z-50'>
      <div className='flex items-center justify-around'>
        {MOBILE_NAVIGATION_ITEMS.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Button
              key={item.href}
              variant='ghost'
              onClick={() => handleNavigation(item.href)}
              className={cn(
                'flex flex-col items-center justify-center p-1 h-14 w-12 transition-colors cursor-pointer',
                active ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
              )}
              title={item.description}
            >
              <Icon className='h-4 w-4 mb-0.5' />
              <span className='text-[10px] font-medium leading-tight text-center'>
                {item.mobileLabel || item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
