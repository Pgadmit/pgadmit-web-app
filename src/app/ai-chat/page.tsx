'use client';

import { AIChatMain } from '@/components/ai/ai-chat-main';
import { ProtectedRoute } from '@/features/auth';
import { LayoutWrapper } from '@/components';

export default function AIChatPage() {
  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <div className='h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]'>
          <AIChatMain />
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  );
}
