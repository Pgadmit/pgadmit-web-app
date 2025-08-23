import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, TrendingUp } from "lucide-react"

export function NewsSection() {
  const newsStory = {
    title: "US Universities Report 23% Increase in International Student Applications for Fall 2025",
    summary:
      "New data shows record-breaking interest from Nigerian and Indian students, with STEM programs leading the surge",
    date: "January 8, 2025",
    source: "International Education Weekly",
    category: "Breaking News",
    image: "/international-students-growth.png",
    content: `
      WASHINGTON, D.C. - American universities are experiencing an unprecedented surge in international student applications for the Fall 2025 semester, with a remarkable 23% increase compared to the previous year, according to new data released by the Institute of International Education (IIE).

      **Record-Breaking Numbers**
      
      The surge is particularly pronounced among students from Nigeria and India, who represent 35% and 28% of the total increase respectively. Nigerian applications have jumped by 41%, while Indian applications rose by 31%.

      "We're seeing the strongest international interest in American higher education in over a decade," said Dr. Maria Rodriguez, IIE President. "Students are recognizing the value of a US education, especially in STEM fields where job prospects remain exceptionally strong."

      **STEM Programs Lead the Way**
      
      Computer Science, Engineering, and Data Science programs are driving much of this growth:
      - Computer Science applications: +45%
      - Electrical Engineering: +38% 
      - Data Science/Analytics: +52%
      - Biomedical Engineering: +29%

      **Policy Changes Fuel Interest**
      
      Several factors contribute to this surge:
      - Extended OPT periods for STEM graduates (36 months)
      - Streamlined visa processing for students
      - Increased scholarship opportunities
      - Growing tech industry demand for skilled graduates

      **University Response**
      
      Top universities are expanding their international recruitment efforts. Stanford University increased its international student quota by 15%, while MIT launched new scholarship programs specifically for African and South Asian students.

      "The talent pool from Nigeria and India is exceptional," noted Dr. James Chen, MIT Admissions Director. "These students bring diverse perspectives and strong technical skills that enrich our campus community."

      **Economic Impact**
      
      International students contribute over $44 billion annually to the US economy. The current surge could add an additional $3.2 billion in economic activity, supporting thousands of jobs in university towns across America.

      **Looking Ahead**
      
      Experts predict this trend will continue through 2026, driven by:
      - Strong US job market for STEM graduates
      - Competitive starting salaries ($85,000+ for CS graduates)
      - Clear pathways to permanent residency
      - World-class research opportunities

      For prospective students, the message is clear: while competition is intensifying, opportunities remain abundant for well-prepared candidates with strong academic credentials and clear career goals.
    `,
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">Latest News</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest developments in international education
          </p>
        </div>

        <Card className="bg-background shadow-lg border-0 overflow-hidden">
          <div className="relative">
            <img
              src={newsStory.image || "/placeholder.svg"}
              alt="International students on campus"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 hover:bg-red-700 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                {newsStory.category}
              </Badge>
            </div>
          </div>

          <CardHeader className="p-6 md:p-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{newsStory.date}</span>
              </div>
              <span>•</span>
              <span>{newsStory.source}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground leading-tight">{newsStory.title}</h3>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{newsStory.summary}</p>
          </CardHeader>

          <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="prose prose-sm max-w-none text-muted-foreground mb-6">
              <div className="whitespace-pre-line">{newsStory.content.substring(0, 800)}...</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                Read Full Story
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Share Article
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
