'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Brain,
  Target,
  FileText,
  Search,
  Lightbulb,
} from 'lucide-react';

export function AIRecommendations() {
  const recommendations = [
    {
      title: 'Complete your TOEFL preparation',
      description: 'Based on your target universities, aim for 110+ score',
      icon: Target,
      priority: 'high',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Review your personal statement',
      description: 'AI detected areas for improvement in your Stanford essay',
      icon: FileText,
      priority: 'medium',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Explore backup options',
      description: 'Consider 2-3 safety schools matching your profile',
      icon: Search,
      priority: 'low',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className='mb-6 md:mb-8'>
      <CardHeader className='flex flex-row items-center justify-between p-4 md:p-6'>
        <CardTitle className='text-base md:text-lg font-semibold flex items-center'>
          <Brain className='w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600' />
          AI Recommendations
        </CardTitle>
        <Button
          variant='ghost'
          size='sm'
          className='text-blue-600 hover:text-blue-700 text-xs md:text-sm'
        >
          Get More
          <ArrowRight className='w-3 h-3 md:w-4 md:h-4 ml-1' />
        </Button>
      </CardHeader>
      <CardContent className='p-4 md:p-6 pt-0'>
        <p className='text-xs md:text-sm text-gray-600 mb-4'>
          Personalized suggestions for you
        </p>
        <div className='space-y-3 md:space-y-4'>
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className='flex items-start space-x-2 md:space-x-3 p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div
                className={`p-1.5 md:p-2 rounded-lg ${rec.bgColor} flex-shrink-0`}
              >
                <rec.icon
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 ${rec.color}`}
                />
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between mb-1'>
                  <h4 className='font-medium text-gray-900 text-sm md:text-base truncate'>
                    {rec.title}
                  </h4>
                  <Badge
                    className={`${getPriorityColor(
                      rec.priority
                    )} text-xs flex-shrink-0`}
                  >
                    {rec.priority}
                  </Badge>
                </div>
                <p className='text-xs md:text-sm text-gray-600'>
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
