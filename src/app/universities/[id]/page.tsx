'use client';

import { useEffect } from 'react';
import { useAuth } from '@/features/auth';
import { useRouter, useParams } from 'next/navigation';
import { UniversityDetail } from '@/features/universities';
import { useGetUniversityById } from '@/features/universities';
import { Loader2 } from 'lucide-react';

export default function UniversityDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const universityId = params?.id as string;
  const { university, isLoading, error } = useGetUniversityById(universityId);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <span>Loading university details...</span>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>
            {error ? 'Error Loading University' : 'University Not Found'}
          </h1>
          <p className='text-muted-foreground mb-6'>
            {error || 'The university you are looking for does not exist.'}
          </p>
          <button
            onClick={() => router.push('/universities')}
            className='bg-primary text-primary-foreground px-6 py-3 rounded-lg cursor-pointer'
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return <UniversityDetail university={university} />;
}
