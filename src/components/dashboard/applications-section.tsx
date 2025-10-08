'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Eye, Clock, CheckCircle } from 'lucide-react';

export function ApplicationsSection() {
  const applications = [
    {
      university: 'Stanford University',
      program: 'MS Computer Science',
      status: 'In Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      statusIcon: Clock,
    },
    {
      university: 'MIT',
      program: 'MS Data Science',
      status: 'Submitted',
      statusColor: 'bg-green-100 text-green-800',
      statusIcon: CheckCircle,
    },
    {
      university: 'UC Berkeley',
      program: 'MS AI/ML',
      status: 'Draft',
      statusColor: 'bg-gray-100 text-gray-800',
      statusIcon: Clock,
    },
  ];

  return (
    <Card className='mb-6 md:mb-8'>
      <CardHeader className='flex flex-row items-center justify-between p-4 md:p-6'>
        <CardTitle className='text-base md:text-lg font-semibold'>
          My Applications
        </CardTitle>
        <Button
          variant='ghost'
          size='sm'
          className='text-blue-600 hover:text-blue-700 text-xs md:text-sm'
        >
          View All
          <ArrowRight className='w-3 h-3 md:w-4 md:h-4 ml-1' />
        </Button>
      </CardHeader>
      <CardContent className='p-4 md:p-6 pt-0'>
        <p className='text-xs md:text-sm text-gray-600 mb-4'>
          Track your application progress
        </p>
        <div className='space-y-3 md:space-y-4'>
          {applications.map((app, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='flex-1 min-w-0'>
                <h4 className='font-medium text-gray-900 text-sm md:text-base truncate'>
                  {app.university}
                </h4>
                <p className='text-xs md:text-sm text-gray-600 truncate'>
                  {app.program}
                </p>
              </div>
              <div className='flex items-center space-x-2 md:space-x-3 flex-shrink-0'>
                <Badge className={`${app.statusColor} text-xs`}>
                  <app.statusIcon className='w-2.5 h-2.5 md:w-3 md:h-3 mr-1' />
                  {app.status}
                </Badge>
                <Button variant='ghost' size='sm' className='p-1 md:p-2'>
                  <Eye className='w-3 h-3 md:w-4 md:h-4' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
