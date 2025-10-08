'use client';

import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Heart, Share2, Calendar } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth';

export default function CommunityPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8'>
        <div className='container mx-auto px-4 max-w-6xl'>
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
                    journey was tough but PGadmit's guidance made all the
                    difference. Happy to answer any questions about the
                    application process!
                  </p>
                  <div className='flex items-center gap-4 text-sm text-gray-500'>
                    <Button variant='ghost' size='sm'>
                      <Heart className='h-4 w-4 mr-1' />
                      24 likes
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <MessageCircle className='h-4 w-4 mr-1' />8 comments
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <Share2 className='h-4 w-4 mr-1' />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='flex items-start gap-3'>
                    <Avatar>
                      <AvatarImage src='/placeholder-user.jpg' />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold'>Raj Sharma</h3>
                        <Badge variant='secondary'>South Asia → Europe</Badge>
                      </div>
                      <p className='text-sm text-gray-500'>5 hours ago</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='mb-4'>
                    Any tips for the visa interview? Mine is scheduled for next
                    week and I'm getting nervous. What questions should I
                    prepare for?
                  </p>
                  <div className='flex items-center gap-4 text-sm text-gray-500'>
                    <Button variant='ghost' size='sm'>
                      <Heart className='h-4 w-4 mr-1' />
                      12 likes
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <MessageCircle className='h-4 w-4 mr-1' />
                      15 comments
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <Share2 className='h-4 w-4 mr-1' />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Users className='h-5 w-5' />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Total Members</span>
                    <span className='font-semibold'>12,847</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Active Today</span>
                    <span className='font-semibold'>1,234</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>
                      Success Stories
                    </span>
                    <span className='font-semibold'>3,456</span>
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
                <CardContent className='space-y-4'>
                  <div className='border-l-4 border-blue-500 pl-4'>
                    <h4 className='font-semibold'>Virtual University Fair</h4>
                    <p className='text-sm text-gray-600'>March 15, 2024</p>
                    <p className='text-sm text-gray-500'>
                      Connect with 50+ universities
                    </p>
                  </div>
                  <div className='border-l-4 border-green-500 pl-4'>
                    <h4 className='font-semibold'>Visa Workshop</h4>
                    <p className='text-sm text-gray-600'>March 20, 2024</p>
                    <p className='text-sm text-gray-500'>
                      Expert tips for visa success
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Groups */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Groups</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>🇺🇸 US Bound Students</p>
                      <p className='text-sm text-gray-500'>5,234 members</p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Join
                    </Button>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>🇬🇧 UK Applications</p>
                      <p className='text-sm text-gray-500'>3,456 members</p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Join
                    </Button>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>💰 Scholarship Hunters</p>
                      <p className='text-sm text-gray-500'>2,789 members</p>
                    </div>
                    <Button variant='outline' size='sm'>
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
