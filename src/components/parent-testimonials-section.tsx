'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Heart, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function ParentTestimonialsSection() {
  const router = useRouter();

  const parentTestimonials = [
    {
      name: 'Mrs. Chioma Okafor',
      relation: "Adaora's Mother",
      location: 'West Africa',
      image: '/nigerian-mother-headshot.png',
      testimonial:
        "As a parent, I was worried about sending my daughter abroad. PGadmit provided constant updates and support. Now she's thriving at Cambridge, and I have peace of mind.",
      rating: 5,
      highlight: 'Peace of Mind',
    },
    {
      name: 'Mr. Suresh Patel',
      relation: "Raj's Father",
      location: 'South Asia',
      image: '/indian-businessman-father.png',
      testimonial:
        "The transparency in the process was incredible. Every step was explained, costs were clear, and the support team kept us informed. Worth every rupee for our son's future at MIT.",
      rating: 5,
      highlight: 'Transparent Process',
    },
    {
      name: 'Mrs. Priya Sharma',
      relation: "Ananya's Mother",
      location: 'South Asia',
      image: '/indian-mother-doctor-headshot.png',
      testimonial:
        'The financial planning guidance was exceptional. They helped us understand all costs upfront and even suggested scholarship opportunities. Our daughter is now at Oxford!',
      rating: 5,
      highlight: 'Financial Clarity',
    },
  ];

  return (
    <section className='py-16 md:py-24 bg-muted/20'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='text-center mb-12 md:mb-16'>
          <div className='inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6'>
            <Heart className='h-4 w-4 text-accent' />
            <span className='text-sm font-medium text-accent'>For Parents</span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground leading-tight'>
            Parents Trust PGadmit
          </h2>
          <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Hear from parents who trusted us with their children's future and
            found peace of mind throughout the journey
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16'>
          {parentTestimonials.map((parent, index) => (
            <Card
              key={index}
              className='bg-background shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105'
            >
              <CardContent className='p-6'>
                <div className='flex items-center gap-1 mb-4'>
                  {[...Array(parent.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='h-4 w-4 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>

                <div className='relative mb-6'>
                  <Quote className='h-8 w-8 text-accent/20 absolute -top-2 -left-2' />
                  <p className='text-muted-foreground leading-relaxed pl-6 text-sm'>
                    {parent.testimonial}
                  </p>
                </div>

                <div className='flex items-center gap-4 mb-4'>
                  <img
                    src={parent.image || '/placeholder.svg'}
                    alt={parent.name}
                    className='w-12 h-12 rounded-full object-cover'
                  />
                  <div>
                    <h4 className='font-semibold text-foreground'>
                      {parent.name}
                    </h4>
                    <p className='text-sm text-muted-foreground'>
                      {parent.relation}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {parent.location}
                    </p>
                  </div>
                </div>

                <div className='inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full'>
                  <Shield className='h-3 w-3 text-primary' />
                  <span className='text-xs font-medium text-primary'>
                    {parent.highlight}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Parent Concerns Addressed */}
        <div className='bg-background rounded-2xl p-8 md:p-10 shadow-lg'>
          <h3 className='text-2xl md:text-3xl font-bold text-center mb-10 text-foreground'>
            We Address Every Parent's Concern
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Shield className='h-6 w-6 text-green-600' />
              </div>
              <h4 className='font-semibold text-foreground mb-2'>
                Safety First
              </h4>
              <p className='text-sm text-muted-foreground'>
                24/7 emergency support and campus safety guidance
              </p>
            </div>
            <div className='text-center'>
              <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Heart className='h-6 w-6 text-blue-600' />
              </div>
              <h4 className='font-semibold text-foreground mb-2'>
                Regular Updates
              </h4>
              <p className='text-sm text-muted-foreground'>
                Weekly progress reports and milestone notifications
              </p>
            </div>
            <div className='text-center'>
              <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Quote className='h-6 w-6 text-purple-600' />
              </div>
              <h4 className='font-semibold text-foreground mb-2'>
                Transparent Costs
              </h4>
              <p className='text-sm text-muted-foreground'>
                No hidden fees, clear pricing from day one
              </p>
            </div>
            <div className='text-center'>
              <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Star className='h-6 w-6 text-orange-600' />
              </div>
              <h4 className='font-semibold text-foreground mb-2'>
                Proven Results
              </h4>
              <p className='text-sm text-muted-foreground'>
                Proven track record with top-tier universities
              </p>
            </div>
          </div>

          <div className='text-center mt-10 pt-8 border-t border-muted'>
            <h4 className='text-xl md:text-2xl font-semibold text-foreground mb-4'>
              Want to Learn More About Our Process?
            </h4>
            <p className='text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed'>
              Schedule a free consultation to discuss your child's study abroad
              journey with our expert counselors
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                onClick={() => router.push('/onboarding')}
                className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4'
              >
                Schedule Free Consultation
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                onClick={() => router.push('/onboarding')}
                className='border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4'
              >
                Get University Matches
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
