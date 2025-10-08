'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building2, FileText, Award, User } from 'lucide-react';

export function StatsCards() {
  const stats = [
    {
      title: 'Saved Universities',
      value: '12',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Applications',
      value: '5',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Scholarships',
      value: '8',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Profile Complete',
      value: '75%',
      icon: User,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      showProgress: true,
    },
  ];

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8'>
      {stats.map((stat, index) => (
        <Card key={index} className='hover:shadow-md transition-shadow'>
          <CardContent className='p-3 md:p-4 lg:p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex-1 min-w-0'>
                <p className='text-xs md:text-sm font-medium text-gray-600 mb-1 truncate'>
                  {stat.title}
                </p>
                <p className='text-lg md:text-xl lg:text-2xl font-bold text-gray-900'>
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-2 md:p-3 rounded-lg ${stat.bgColor} flex-shrink-0`}
              >
                <stat.icon
                  className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${stat.color}`}
                />
              </div>
            </div>
            {stat.showProgress && (
              <div className='mt-3 md:mt-4'>
                <Progress value={75} className='h-1.5 md:h-2' />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
