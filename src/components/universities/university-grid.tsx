'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Bookmark,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const SAMPLE_UNIVERSITIES = [
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, MA, USA',
    ranking: '#1 Global',
    tuition: '$54,000',
    acceptanceRate: '3.4%',
    students: '23,000',
    image: '/harvard-campus.png',
    programs: ['Business', 'Medicine', 'Law', 'Engineering'],
    applicationDeadline: 'January 1, 2025',
    isBookmarked: false,
    matchPercentage: 85,
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, CA, USA',
    ranking: '#2 Global',
    tuition: '$56,000',
    acceptanceRate: '4.3%',
    students: '17,000',
    image: '/stanford-campus.png',
    programs: ['Computer Science', 'Engineering', 'Business'],
    applicationDeadline: 'January 2, 2025',
    isBookmarked: true,
    matchPercentage: 92,
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    location: 'Cambridge, UK',
    ranking: '#3 Global',
    tuition: '£24,000',
    acceptanceRate: '21%',
    students: '24,000',
    image: '/cambridge-campus.png',
    programs: ['Engineering', 'Medicine', 'Natural Sciences'],
    applicationDeadline: 'October 15, 2024',
    isBookmarked: false,
    matchPercentage: 78,
  },
  {
    id: 'mit',
    name: 'MIT',
    location: 'Cambridge, MA, USA',
    ranking: '#4 Global',
    tuition: '$53,000',
    acceptanceRate: '6.7%',
    students: '11,000',
    image: '/mit-campus.png',
    programs: ['Engineering', 'Computer Science', 'Physics'],
    applicationDeadline: 'January 1, 2025',
    isBookmarked: true,
    matchPercentage: 88,
  },
];

export function UniversityGrid() {
  const [universities, setUniversities] = useState(SAMPLE_UNIVERSITIES);
  const router = useRouter();
  const { toast } = useToast();

  const toggleBookmark = (universityId: string) => {
    setUniversities(prev =>
      prev.map(uni =>
        uni.id === universityId
          ? { ...uni, isBookmarked: !uni.isBookmarked }
          : uni
      )
    );

    const university = universities.find(u => u.id === universityId);
    toast({
      title: university?.isBookmarked
        ? 'Removed from bookmarks'
        : 'Added to bookmarks',
      description: `${university?.name} ${university?.isBookmarked ? 'removed from' : 'added to'} your saved universities`,
    });
  };

  const viewDetails = (universityId: string) => {
    router.push(`/universities/${universityId}`);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {universities.map(university => (
        <Card
          key={university.id}
          className='bg-card shadow-sm hover:shadow-md transition-shadow'
        >
          <CardHeader className='pb-3'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <CardTitle className='text-lg font-bold mb-1'>
                  {university.name}
                </CardTitle>
                <div className='flex items-center gap-1 text-sm text-muted-foreground mb-2'>
                  <MapPin className='h-3 w-3' />
                  {university.location}
                </div>
                <div className='flex items-center gap-2'>
                  <Badge variant='secondary'>{university.ranking}</Badge>
                  <Badge
                    variant='outline'
                    className='text-green-600 border-green-600'
                  >
                    {university.matchPercentage}% match
                  </Badge>
                </div>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => toggleBookmark(university.id)}
                className={
                  university.isBookmarked
                    ? 'text-red-500'
                    : 'text-muted-foreground'
                }
              >
                {university.isBookmarked ? (
                  <Heart className='h-4 w-4 fill-current' />
                ) : (
                  <Bookmark className='h-4 w-4' />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='text-muted-foreground'>Tuition:</span>
                <div className='font-semibold'>{university.tuition}</div>
              </div>
              <div>
                <span className='text-muted-foreground'>Acceptance:</span>
                <div className='font-semibold'>{university.acceptanceRate}</div>
              </div>
            </div>

            <div className='flex items-center gap-1 text-sm text-muted-foreground'>
              <Users className='h-3 w-3' />
              {university.students} students
            </div>

            <div className='flex items-center gap-1 text-sm'>
              <Calendar className='h-3 w-3 text-red-500' />
              <span className='text-red-500 font-medium'>
                Deadline: {university.applicationDeadline}
              </span>
            </div>

            <div className='flex flex-wrap gap-1'>
              {university.programs &&
                university.programs.length > 0 &&
                university.programs.slice(0, 3).map(program => (
                  <Badge key={program} variant='outline' className='text-xs'>
                    {program}
                  </Badge>
                ))}
              {university.programs && university.programs.length > 3 && (
                <Badge variant='outline' className='text-xs'>
                  +{university.programs.length - 3} more
                </Badge>
              )}
            </div>

            <Button
              className='w-full'
              onClick={() => viewDetails(university.id)}
            >
              View Details
              <ExternalLink className='h-4 w-4 ml-2' />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
