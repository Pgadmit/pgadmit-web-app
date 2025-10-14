'use client';

import { UniversityDiscovery } from '@/widgets/universities';
import { ProtectedRoute } from '@/features/auth';
import { LayoutWrapper } from '@/components';

export default function UniversitiesPage() {
  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <UniversityDiscovery />
      </LayoutWrapper>
    </ProtectedRoute>
  );
}
