'use client';

import { UniversityDiscovery } from '@/widgets/universities';
import { ProtectedRoute } from '@/features/auth';

export default function UniversitiesPage() {
  return (
    <ProtectedRoute>
      <UniversityDiscovery />
    </ProtectedRoute>
  );
}
