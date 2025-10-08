'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardLoading() {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Sidebar Skeleton */}
      <aside className='hidden md:block w-80 bg-white border-r border-gray-200 min-h-screen'>
        <div className='p-6'>
          <div className='space-y-4'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48' />
            <div className='space-y-2'>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className='flex items-center space-x-3 p-3'>
                  <Skeleton className='h-8 w-8 rounded-lg' />
                  <Skeleton className='h-4 w-32' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className='flex-1 p-4 md:p-6 lg:p-8 overflow-auto'>
        <div className='max-w-6xl mx-auto'>
          {/* Welcome Section Skeleton */}
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
              <div className='mb-4 lg:mb-0'>
                <Skeleton className='h-8 w-64 mb-2' />
                <Skeleton className='h-4 w-96 mb-4' />
                <div className='flex flex-wrap gap-2'>
                  <Skeleton className='h-6 w-32' />
                  <Skeleton className='h-6 w-24' />
                </div>
              </div>
              <div className='flex flex-col sm:flex-row gap-2 md:gap-3'>
                <Skeleton className='h-10 w-32' />
                <Skeleton className='h-10 w-28' />
              </div>
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8'>
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className='hover:shadow-md transition-shadow'>
                <CardContent className='p-3 md:p-4 lg:p-6'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1 min-w-0'>
                      <Skeleton className='h-4 w-24 mb-1' />
                      <Skeleton className='h-6 w-16' />
                    </div>
                    <Skeleton className='h-12 w-12 rounded-lg' />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Grid Skeleton */}
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8'>
            <div className='space-y-4 md:space-y-6 lg:space-y-8'>
              {/* Applications Section Skeleton */}
              <Card>
                <div className='p-4 md:p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <Skeleton className='h-6 w-32' />
                    <Skeleton className='h-8 w-20' />
                  </div>
                  <Skeleton className='h-4 w-48 mb-4' />
                  <div className='space-y-3'>
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className='flex items-center justify-between p-3 border border-gray-200 rounded-lg'
                      >
                        <div className='flex-1'>
                          <Skeleton className='h-4 w-40 mb-1' />
                          <Skeleton className='h-3 w-32' />
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Skeleton className='h-6 w-16' />
                          <Skeleton className='h-8 w-8' />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Deadlines Section Skeleton */}
              <Card>
                <div className='p-4 md:p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <Skeleton className='h-6 w-24' />
                    <Skeleton className='h-8 w-20' />
                  </div>
                  <Skeleton className='h-4 w-40 mb-4' />
                  <div className='space-y-3'>
                    {[1, 2].map(i => (
                      <div
                        key={i}
                        className='p-3 border border-gray-200 rounded-lg'
                      >
                        <Skeleton className='h-4 w-32 mb-2' />
                        <Skeleton className='h-3 w-24' />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className='space-y-4 md:space-y-6 lg:space-y-8'>
              {/* Scholarships Section Skeleton */}
              <Card>
                <div className='p-4 md:p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <Skeleton className='h-6 w-28' />
                    <Skeleton className='h-8 w-20' />
                  </div>
                  <Skeleton className='h-4 w-44 mb-4' />
                  <div className='space-y-3'>
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className='p-3 border border-gray-200 rounded-lg'
                      >
                        <Skeleton className='h-4 w-36 mb-2' />
                        <Skeleton className='h-3 w-28' />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* AI Recommendations Skeleton */}
              <Card>
                <div className='p-4 md:p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <Skeleton className='h-6 w-36' />
                    <Skeleton className='h-8 w-24' />
                  </div>
                  <Skeleton className='h-4 w-48 mb-4' />
                  <div className='space-y-3'>
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className='flex items-start space-x-3 p-3 border border-gray-200 rounded-lg'
                      >
                        <Skeleton className='h-8 w-8 rounded-lg' />
                        <div className='flex-1'>
                          <div className='flex items-center justify-between mb-1'>
                            <Skeleton className='h-4 w-32' />
                            <Skeleton className='h-5 w-12' />
                          </div>
                          <Skeleton className='h-3 w-40' />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
