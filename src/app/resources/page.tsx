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
import { LayoutWrapper } from '@/components';

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <LayoutWrapper className='bg-gradient-to-br from-blue-50 to-indigo-100'>
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
                Canada Application Guide
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <FileText className='h-4 w-4 mr-2' />
                Australia Application Guide
              </Button>
            </CardContent>
          </Card>

          {/* Test Preparation */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <FileText className='h-8 w-8 text-green-600' />
                <div>
                  <CardTitle>Test Preparation</CardTitle>
                  <CardDescription>
                    Study materials for standardized tests
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <Download className='h-4 w-4 mr-2' />
                GRE Practice Tests
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <Download className='h-4 w-4 mr-2' />
                TOEFL Study Guide
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <Download className='h-4 w-4 mr-2' />
                IELTS Preparation
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <Download className='h-4 w-4 mr-2' />
                GMAT Resources
              </Button>
            </CardContent>
          </Card>

          {/* Video Tutorials */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <Video className='h-8 w-8 text-purple-600' />
                <div>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Visual learning resources</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Application Walkthrough
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Essay Writing Tips
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Interview Preparation
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Visa Process Guide
              </Button>
            </CardContent>
          </Card>

          {/* Financial Aid */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <Users className='h-8 w-8 text-orange-600' />
                <div>
                  <CardTitle>Financial Aid</CardTitle>
                  <CardDescription>
                    Scholarships and funding options
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
                Scholarship Database
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <FileText className='h-4 w-4 mr-2' />
                Loan Information
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <FileText className='h-4 w-4 mr-2' />
                Work-Study Programs
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <FileText className='h-4 w-4 mr-2' />
                Financial Planning Guide
              </Button>
            </CardContent>
          </Card>

          {/* Events & Webinars */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <Calendar className='h-8 w-8 text-red-600' />
                <div>
                  <CardTitle>Events & Webinars</CardTitle>
                  <CardDescription>Live sessions and workshops</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                University Fair
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Application Workshop
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Alumni Panel
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Visa Information Session
              </Button>
            </CardContent>
          </Card>

          {/* Community Support */}
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <div className='flex items-center gap-3'>
                <MessageCircle className='h-8 w-8 text-teal-600' />
                <div>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>
                    Connect with peers and experts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Discussion Forums
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Mentor Program
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Study Groups
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start bg-transparent'
              >
                <ExternalLink className='h-4 w-4 mr-2' />
                Success Stories
              </Button>
            </CardContent>
          </Card>
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  );
}
