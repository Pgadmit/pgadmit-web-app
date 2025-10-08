'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Heart, Users, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AnxietyReductionSection() {
  const router = useRouter();

  const supportFeatures = [
    {
      icon: CheckCircle,
      title: 'Step-by-Step Guidance',
      description: 'Clear roadmap from application to arrival',
    },
    {
      icon: Users,
      title: '24/7 Community Support',
      description: 'Connect with fellow students and mentors',
    },
    {
      icon: Clock,
      title: 'Deadline Management',
      description: 'Never miss important dates with smart reminders',
    },
    {
      icon: Heart,
      title: 'Emotional Support',
      description: 'AI counselor to help with stress and anxiety',
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-background'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground leading-tight'>
              Worried About the Process?
            </h2>
            <p className='text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed'>
              We understand that studying abroad can feel overwhelming. That's
              why we're here to support you every step of the way, from
              applications to settling into your new life.
            </p>

            <div className='space-y-6 mb-10'>
              {supportFeatures.map((feature, index) => (
                <div key={index} className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                    <feature.icon className='h-6 w-6 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground mb-2 text-lg'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                onClick={() => router.push('/onboarding')}
                className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold'
              >
                Learn More About Our Support
              </Button>
              <Button
                size='lg'
                variant='outline'
                onClick={() => router.push('/onboarding')}
                className='border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold'
              >
                Get Started Today
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='relative'>
            <Card className='bg-card shadow-xl border-0'>
              <CardContent className='p-8'>
                <div className='text-center'>
                  <div className='w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <Heart className='h-10 w-10 text-accent' />
                  </div>
                  <h3 className='text-2xl font-bold text-foreground mb-4'>
                    You're Not Alone
                  </h3>
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    Join thousands of students who have successfully navigated
                    their study abroad journey with PGadmit.
                  </p>
                  <div className='grid grid-cols-3 gap-4 text-center mb-6'>
                    <div>
                      <div className='text-2xl font-bold text-primary'>
                        5,000+
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Students Helped
                      </div>
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-primary'>95%</div>
                      <div className='text-sm text-muted-foreground'>
                        Success Rate
                      </div>
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-primary'>
                        24/7
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Support
                      </div>
                    </div>
                  </div>
                  <Button
                    className='w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold'
                    onClick={() => router.push('/onboarding')}
                  >
                    Join Our Community
                    <Heart className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
