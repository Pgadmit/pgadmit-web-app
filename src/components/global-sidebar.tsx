'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useSidebar } from '@/lib/sidebar-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SIDEBAR_NAVIGATION_ITEMS } from '@/config/navigation';

export function GlobalSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  const handleNavigation = (href: string) => {
    router.push(href);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className='flex flex-col h-full'>
      {/* Navigation Items */}
      <div className='flex-1 p-4 md:p-6'>
        <nav className='space-y-2'>
          {SIDEBAR_NAVIGATION_ITEMS.map(item => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            const Icon = item.icon;

            return (
              <Button
                key={item.href}
                variant='ghost'
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  'w-full justify-start text-left h-10 px-3 cursor-pointer',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
                title={item.description}
              >
                <Icon className='w-4 h-4 mr-3' />
                <span className='text-sm font-medium'>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* AI Counselor Section - hide on AI Chat page */}
      {pathname !== '/ai-chat' && (
        <div className='p-4 md:p-6 border-t border-gray-200'>
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4'>
            <div className='flex items-center space-x-3 mb-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <MessageCircle className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gray-900'>
                  AI Counselor
                </h3>
                <p className='text-xs text-gray-600'>
                  Your personal study abroad guide
                </p>
              </div>
            </div>
            <Button
              className='w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 cursor-pointer'
              onClick={() => handleNavigation('/ai-chat')}
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side='left' className='w-80 p-0'>
          <SheetTitle className='sr-only'>Navigation</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className='hidden md:block w-80 bg-white border-r border-gray-200 min-h-screen'>
      <SidebarContent />
    </aside>
  );
}
