'use client';

import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Heart, Share2, Calendar } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth';
import { LayoutWrapper } from '@/components';

export default function CommunityPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <LayoutWrapper className='bg-gradient-to-br from-purple-50 to-pink-100'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            PGadmit Community
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Connect with fellow students, share experiences, and get support
            from peers on the same journey
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Feed */}
          <div className='lg:col-span-2 space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <h2 className='text-2xl font-bold'>Community Feed</h2>
                  <Button>Create Post</Button>
                </div>
              </CardHeader>
            </Card>

            {/* Sample Posts */}
            <Card>
              <CardHeader>
                <div className='flex items-start gap-3'>
                  <Avatar>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>AO</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold'>Adaora Okafor</h3>
                      <Badge variant='secondary'>
                        West Africa → North America
                      </Badge>
                    </div>
                    <p className='text-sm text-gray-500'>2 hours ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='mb-4'>
                  Just got accepted to Stanford for Computer Science! 🎉 The
                  journey was tough but worth it. Happy to answer any questions
                  about the application process.
                </p>
                <div className='flex items-center gap-4 text-sm text-gray-500'>
                  <button className='flex items-center gap-1 hover:text-red-500'>
                    <Heart className='h-4 w-4' />
                    24
                  </button>
                  <button className='flex items-center gap-1 hover:text-blue-500'>
                    <MessageCircle className='h-4 w-4' />8
                  </button>
                  <button className='flex items-center gap-1 hover:text-green-500'>
                    <Share2 className='h-4 w-4' />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className='flex items-start gap-3'>
                  <Avatar>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold'>Raj Kumar</h3>
                      <Badge variant='secondary'>South Asia → Europe</Badge>
                    </div>
                    <p className='text-sm text-gray-500'>5 hours ago</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='mb-4'>
                  Looking for study groups for GRE prep in Mumbai. Anyone
                  interested in forming a study group? We can meet weekly and
                  practice together.
                </p>
                <div className='flex items-center gap-4 text-sm text-gray-500'>
                  <button className='flex items-center gap-1 hover:text-red-500'>
                    <Heart className='h-4 w-4' />
                    12
                  </button>
                  <button className='flex items-center gap-1 hover:text-blue-500'>
                    <MessageCircle className='h-4 w-4' />5
                  </button>
                  <button className='flex items-center gap-1 hover:text-green-500'>
                    <Share2 className='h-4 w-4' />
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Active Members</span>
                  <span className='font-semibold'>2,847</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Posts Today</span>
                  <span className='font-semibold'>156</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600'>Success Stories</span>
                  <span className='font-semibold'>892</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='border-l-4 border-blue-500 pl-3'>
                  <p className='font-medium text-sm'>Virtual Study Group</p>
                  <p className='text-xs text-gray-500'>Tomorrow, 7 PM IST</p>
                </div>
                <div className='border-l-4 border-green-500 pl-3'>
                  <p className='font-medium text-sm'>Application Workshop</p>
                  <p className='text-xs text-gray-500'>Friday, 6 PM IST</p>
                </div>
                <div className='border-l-4 border-purple-500 pl-3'>
                  <p className='font-medium text-sm'>Alumni Meet</p>
                  <p className='text-xs text-gray-500'>Next Sunday, 4 PM IST</p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='outline'>#GRE</Badge>
                  <Badge variant='outline'>#TOEFL</Badge>
                  <Badge variant='outline'>#Visa</Badge>
                  <Badge variant='outline'>#Scholarships</Badge>
                  <Badge variant='outline'>#ComputerScience</Badge>
                  <Badge variant='outline'>#MBA</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  );
}
