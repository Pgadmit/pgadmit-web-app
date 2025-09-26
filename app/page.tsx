import { HeroSection } from "@/components/hero-section";
import { CampusTourSection } from "@/components/campus-tour-section";
// import { AdmissionSection } from "@/components/admission-section";
import { BlogSection } from "@/components/blog-section";
import { MatchToolSection } from "@/components/match-tool-section";
import { StudentStoriesSection } from "@/components/student-stories-section";
import { AboutSection } from "@/components/about-section";
import { ParentTestimonialsSection } from "@/components/parent-testimonials-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { Footer } from "@/components/footer";
import { StickyBottomNav } from "@/components/sticky-bottom-nav";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CampusTourSection />
      {/* <AdmissionSection /> */}
      <MatchToolSection />
      <BlogSection />
      <StudentStoriesSection />
      <ParentTestimonialsSection />
      <AboutSection />
      <SocialProofSection />
      <Footer />
      <StickyBottomNav />
    </main>
  );
}
