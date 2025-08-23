import { HeroSection } from "@/components/hero-section"
import { CampusTourSection } from "@/components/campus-tour-section"
import { BlogSection } from "@/components/blog-section"
import { MatchToolSection } from "@/components/match-tool-section"
import { StudentStoriesSection } from "@/components/student-stories-section"
import { NewsSection } from "@/components/news-section"
import { AboutSection } from "@/components/about-section"
import { AnxietyReductionSection } from "@/components/anxiety-reduction-section"
import { ParentTestimonialsSection } from "@/components/parent-testimonials-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CostBreakdownSection } from "@/components/cost-breakdown-section"
import { Footer } from "@/components/footer"
import { StickyBottomNav } from "@/components/sticky-bottom-nav"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CampusTourSection />
      <SocialProofSection />
      <BlogSection />
      <MatchToolSection />
      <StudentStoriesSection />
      <ParentTestimonialsSection />
      <CostBreakdownSection />
      <NewsSection />
      <AboutSection />
      <AnxietyReductionSection />
      <Footer />
      <StickyBottomNav />
    </main>
  )
}
