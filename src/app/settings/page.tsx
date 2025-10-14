'use client';

import { useAuth } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, Shield, Palette } from 'lucide-react';
import { ProtectedRoute } from '@/features/auth';
import { LayoutWrapper } from '@/components';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <div className='flex items-center gap-4 mb-6'>
          <Button variant='outline' onClick={() => router.back()}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back
          </Button>
          <h1 className='text-2xl font-bold'>Settings</h1>
        </div>

        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Bell className='h-5 w-5' />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Manage your notification preferences
              </p>
              <Button className='mt-4 bg-transparent' variant='outline'>
                Configure Notifications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5' />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Control your privacy settings and account security
              </p>
              <Button className='mt-4 bg-transparent' variant='outline'>
                Privacy Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Palette className='h-5 w-5' />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Customize your app appearance
              </p>
              <Button className='mt-4 bg-transparent' variant='outline'>
                Theme Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  );
}
