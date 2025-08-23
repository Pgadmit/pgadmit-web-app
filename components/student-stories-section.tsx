"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, MapPin, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function StudentStoriesSection() {
  const router = useRouter()

  const stories = [
    {
      name: "Adaora Okafor",
      age: 20,
      country: "Nigeria",
      university: "University of Cambridge",
      course: "Computer Science",
      image: "/nigerian-student-cambridge.png",
      story:
        "PGadmit helped me navigate the complex UK application process. The AI guidance felt like having a personal mentor. I got into my dream university and I'm loving every moment here!",
      rating: 5,
      year: "2024",
      achievement: "Full Scholarship Winner",
    },
    {
      name: "Raj Patel",
      age: 19,
      country: "India",
      university: "MIT",
      course: "Mechanical Engineering",
      image: "/mit-indian-student.png",
      story:
        "The AI guidance was incredible. It felt like having a personal counselor throughout my journey. From essay writing to interview prep, PGadmit was there every step of the way.",
      rating: 5,
      year: "2024",
      achievement: "Dean's List",
    },
    {
      name: "Kemi Adebayo",
      age: 21,
      country: "Nigeria",
      university: "Stanford University",
      course: "Business Administration",
      image: "/nigerian-student-stanford.png",
      story:
        "From application to visa, PGadmit supported me every step. The community was amazing - I connected with other Nigerian students before I even arrived. Now I'm living my American dream!",
      rating: 5,
      year: "2023",
      achievement: "Student Body President",
    },
    {
      name: "Arjun Sharma",
      age: 22,
      country: "India",
      university: "Oxford University",
      course: "Medicine",
      image: "/indian-student-portrait.png",
      story:
        "The scholarship guidance was game-changing. PGadmit helped me secure a full scholarship to Oxford. My parents are so proud, and I'm grateful for this life-changing opportunity.",
      rating: 5,
      year: "2023",
      achievement: "Rhodes Scholar",
    },
    {
      name: "Funmi Ogundimu",
      age: 20,
      country: "Nigeria",
      university: "Harvard University",
      course: "International Relations",
      image: "/nigerian-student-portrait.png",
      story:
        "The anxiety support was incredible. Moving from Lagos to Boston felt overwhelming, but the PGadmit community and AI counselor helped me settle in. Harvard feels like home now!",
      rating: 5,
      year: "2024",
      achievement: "Model UN President",
    },
    {
      name: "Vikram Reddy",
      age: 21,
      country: "India",
      university: "University College London",
      course: "Data Science",
      image: "/indian-student-portrait.png",
      story:
        "The tech industry connections through PGadmit were amazing. I landed internships at top London tech companies before graduation. The network is invaluable!",
      rating: 5,
      year: "2023",
      achievement: "Google Intern",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground leading-tight">
            Real Stories, Real Success
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from students just like you who took the leap and are now thriving at top universities worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {stories.map((story, index) => (
            <Card
              key={index}
              className="bg-background shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-primary">{story.year}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-accent/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed pl-6 text-sm">{story.story}</p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {story.name}, {story.age}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{story.country}</span>
                    </div>
                    <p className="text-sm font-medium text-primary">{story.university}</p>
                    <p className="text-xs text-muted-foreground">{story.course}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full">
                  <Star className="h-3 w-3 text-accent" />
                  <span className="text-xs font-medium text-accent">{story.achievement}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-10 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Ready to Write Your Success Story?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who trusted PGadmit to make their study abroad dreams come true
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/onboarding")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4"
              >
                Find My Universities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/onboarding")}
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-4"
              >
                Start Free Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
