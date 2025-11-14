import {
  AboutSection,
  BlogSection,
  CampusTourSection,
  Footer,
  HeroSection,
  MatchToolSection,
  SocialProofSection,
  StudentStoriesSection,
} from '@/components';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  redirect('/free-search');
  return (
    <main className='min-h-screen bg-background'>
      <HeroSection />
      <CampusTourSection />
      <MatchToolSection />
      <BlogSection />
      <StudentStoriesSection />
      <AboutSection />
      <SocialProofSection />
      <Footer />
    </main>
  );
}
