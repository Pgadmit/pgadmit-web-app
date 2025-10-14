'use client';

import { usePathname } from 'next/navigation';
import { GlobalHeader } from '@/components/global-header';

export function ConditionalHeader() {
  const pathname = usePathname();

  // Show header on all pages except AI Chat (which has its own header)
  if (pathname?.startsWith('/ai-chat')) {
    return null;
  }

  return <GlobalHeader />;
}
