'use client';

import { ReactNode } from 'react';
import { GlobalSidebar } from '@/components/global-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export function LayoutWrapper({
  children,
  className = '',
}: LayoutWrapperProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen bg-gray-50 flex ${className}`}>
      {/* Desktop Sidebar */}
      <GlobalSidebar />

      {/* Main Content */}
      <main className='flex-1 p-4 md:p-6 lg:p-8 overflow-auto'>
        <div className='max-w-6xl mx-auto'>{children}</div>
      </main>
    </div>
  );
}
