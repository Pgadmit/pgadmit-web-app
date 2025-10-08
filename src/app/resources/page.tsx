'use client';

import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  Users,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { ProtectedRoute } from '@/features/auth';

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Study Abroad Resources
            </h1>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Everything you need to succeed in your study abroad journey - from
              application guides to visa preparation
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Application Guides */}
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <BookOpen className='h-8 w-8 text-blue-600' />
                  <div>
                    <CardTitle>Application Guides</CardTitle>
                    <CardDescription>
                      Step-by-step application tutorials
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <FileText className='h-4 w-4 mr-2' />
                  US Application Guide
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <FileText className='h-4 w-4 mr-2' />
                  UK Application Guide
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <FileText className='h-4 w-4 mr-2' />
                  Essay Writing Tips
                </Button>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <Video className='h-8 w-8 text-red-600' />
                  <div>
                    <CardTitle>Video Tutorials</CardTitle>
                    <CardDescription>
                      Visual guides and walkthroughs
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Video className='h-4 w-4 mr-2' />
                  Visa Interview Prep
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Video className='h-4 w-4 mr-2' />
                  Campus Life Tours
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Video className='h-4 w-4 mr-2' />
                  Application Walkthrough
                </Button>
              </CardContent>
            </Card>

            {/* Downloads */}
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <Download className='h-8 w-8 text-green-600' />
                  <div>
                    <CardTitle>Downloads</CardTitle>
                    <CardDescription>Templates and checklists</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Download className='h-4 w-4 mr-2' />
                  Application Checklist
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Download className='h-4 w-4 mr-2' />
                  SOP Template
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Download className='h-4 w-4 mr-2' />
                  Budget Planner
                </Button>
              </CardContent>
            </Card>

            {/* External Links */}
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <ExternalLink className='h-8 w-8 text-purple-600' />
                  <div>
                    <CardTitle>External Resources</CardTitle>
                    <CardDescription>Helpful external websites</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <ExternalLink className='h-4 w-4 mr-2' />
                  Official University Sites
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <ExternalLink className='h-4 w-4 mr-2' />
                  Scholarship Databases
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <ExternalLink className='h-4 w-4 mr-2' />
                  Visa Information
                </Button>
              </CardContent>
            </Card>

            {/* Webinars */}
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <Calendar className='h-8 w-8 text-orange-600' />
                  <div>
                    <CardTitle>Webinars & Events</CardTitle>
                    <CardDescription>
                      Live sessions and workshops
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Calendar className='h-4 w-4 mr-2' />
                  Upcoming Webinars
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Calendar className='h-4 w-4 mr-2' />
                  University Fairs
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Calendar className='h-4 w-4 mr-2' />
                  Expert Sessions
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <MessageCircle className='h-8 w-8 text-teal-600' />
                  <div>
                    <CardTitle>Get Support</CardTitle>
                    <CardDescription>Connect with counselors</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <MessageCircle className='h-4 w-4 mr-2' />
                  Chat with Counselor
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <Users className='h-4 w-4 mr-2' />
                  Book 1-on-1 Session
                </Button>
                <Button
                  variant='outline'
                  className='w-full justify-start bg-transparent'
                >
                  <MessageCircle className='h-4 w-4 mr-2' />
                  FAQ & Help Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
