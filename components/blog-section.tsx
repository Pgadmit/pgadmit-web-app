"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ArrowRight, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export function BlogSection() {
  const router = useRouter()

  const blogPosts = [
    {
      title: "Complete Guide to Studying CS in the US",
      excerpt: "Everything you need to know about pursuing a Computer Science degree in America.",
      author: "Dr. Sarah Johnson",
      date: "Dec 15, 2024",
      readTime: "8 min",
      image: "/computer-science-lab.png",
      category: "Academic",
    },
    {
      title: "Visa Application Success Stories",
      excerpt: "Real students share their F-1 visa journey and tips for approval.",
      author: "Michael Chen",
      date: "Dec 12, 2024",
      readTime: "6 min",
      image: "/visa-interview-prep.png",
      category: "Visa",
    },
    {
      title: "Top 10 Universities for International Students",
      excerpt: "Discover the most welcoming campuses with strong support systems.",
      author: "Priya Sharma",
      date: "Dec 10, 2024",
      readTime: "10 min",
      image: "/diverse-students-campus.png",
      category: "Universities",
    },
  ]

  const handleReadMore = (title: string) => {
    console.log(`Reading article: ${title}`)
    // In a real app, this would navigate to the full article
  }

  return (
    <section data-section="blog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground leading-tight">
            Latest Insights 📚
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real stories, expert tips, and insider knowledge from students who made it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-card shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleReadMore(post.title)}
                    className="text-primary hover:text-primary/80 p-0 h-auto font-semibold group"
                  >
                    Read
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => console.log("View all articles")}
              className="bg-background hover:bg-muted border-2 border-primary text-primary hover:text-primary/80 px-8 py-4"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              onClick={() => router.push("/onboarding")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold px-8 py-4"
            >
              Get Personalized Guidance
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
