import {
  AboutSection,
  AdmissionSection,
  BlogSection,
  CampusTourSection,
  Footer,
  HeroSection,
  MatchToolSection,
  SocialProofSection,
  StudentStoriesSection,
} from '@/components';

export default async function HomePage() {
  return (
    <main className='min-h-screen bg-background'>
      <HeroSection />
      <CampusTourSection />
      <AdmissionSection />
      <MatchToolSection />
      <BlogSection />
      <StudentStoriesSection />
      <AboutSection />
      <SocialProofSection />
      <Footer />
    </main>
  );
}
