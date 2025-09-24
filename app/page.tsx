import { HeroSection } from "@/components/hero-section";
import { CampusTourSection } from "@/components/campus-tour-section";
import { BlogSection } from "@/components/blog-section";
import { MatchToolSection } from "@/components/match-tool-section";
import { StudentStoriesSection } from "@/components/student-stories-section";
import { AboutSection } from "@/components/about-section";
import { ParentTestimonialsSection } from "@/components/parent-testimonials-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { Footer } from "@/components/footer";
import { StickyBottomNav } from "@/components/sticky-bottom-nav";
// import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  // const supabase = await createClient();
  // const { data: instruments } = await supabase.from("instruments").select();
  return (
    <main className="min-h-screen bg-background">
      {/* <pre>{JSON.stringify(instruments, null, 2)}</pre> */}
      <HeroSection />
      <CampusTourSection />
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
