"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, PiggyBank, Calculator, TrendingUp, Download, BookOpen, Users } from "lucide-react"

export function CostBreakdownSection() {
  const costComparison = [
    {
      country: "United States",
      tuition: "$25,000 - $55,000",
      living: "$12,000 - $18,000",
      total: "$37,000 - $73,000",
      currency: "per year",
      flag: "/usa-flag.png",
      savings: "Save up to $20K with scholarships",
      popular: "Most Popular",
    },
    {
      country: "United Kingdom",
      tuition: "£15,000 - £35,000",
      living: "£9,000 - £15,000",
      total: "£24,000 - £50,000",
      currency: "per year",
      flag: "/uk-flag.png",
      savings: "Save up to £15K with funding",
      popular: "Best Value",
    },
  ]

  const scholarships = [
    {
      name: "Merit Scholarships",
      amount: "Up to $20,000",
      description: "Based on academic excellence and leadership",
      eligibility: "GPA 3.5+ or equivalent",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      name: "Need-Based Aid",
      amount: "Up to $15,000",
      description: "Financial assistance for deserving students",
      eligibility: "Family income criteria",
      icon: Users,
      color: "text-green-600",
    },
    {
      name: "Diversity Grants",
      amount: "Up to $10,000",
      description: "Supporting international student diversity",
      eligibility: "International students",
      icon: BookOpen,
      color: "text-purple-600",
    },
  ]

  const scrollToMatchTool = () => {
    const element = document.querySelector('[data-section="match-tool"]')
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20" data-section="cost-breakdown">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <PiggyBank className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Financial Planning Made Simple</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">Plan Your Investment 💰</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transparent cost breakdown and scholarship opportunities to make your dream affordable.
            <span className="font-semibold text-primary"> Over 80% of our students receive financial aid!</span>
          </p>
        </div>

        {/* Cost Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {costComparison.map((country, index) => (
            <Card
              key={index}
              className="bg-card shadow-xl border-0 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                {country.popular}
              </div>

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
                  <CardTitle className="text-xl font-bold">{country.country}</CardTitle>
                </div>
                <p className="text-sm text-green-600 font-medium">{country.savings}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Tuition Fees</span>
                  <span className="font-bold text-lg">{country.tuition}</span>
                </div>
                <div className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground font-medium">Living Expenses</span>
                  <span className="font-bold text-lg">{country.living}</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-primary/10 to-accent/10 px-4 rounded-lg border-2 border-primary/20">
                  <span className="font-bold text-foreground text-lg">Total Investment</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary">{country.total}</div>
                    <div className="text-sm text-muted-foreground font-medium">{country.currency}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scholarship Opportunities */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Scholarship Opportunities 🎓</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't let finances hold you back! Explore these funding opportunities specifically available for international students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scholarships.map((scholarship, index) => {
              const IconComponent = scholarship.icon
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-background to-muted/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-8 w-8 ${scholarship.color}`} />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{scholarship.name}</h4>
                    <div className="text-2xl font-black text-primary mb-3">{scholarship.amount}</div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{scholarship.description}</p>
                    <div className="inline-flex items-center gap-1 bg-primary/10 px-3 py-2 rounded-full border border-primary/20">
                      <span className="text-xs font-semibold text-primary">{scholarship.eligibility}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Financial Planning Tools */}
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-lg border-4 border-primary/20">
                <Calculator className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Free Financial Planning Kit 📊</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Get our comprehensive guide with cost calculators, scholarship databases, budgeting templates, and
              personalized financial roadmaps for international students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  window.open("/financial-planning-kit.pdf", "_blank")
                }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Free Kit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 bg-background shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={scrollToMatchTool}
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Get Personalized Cost Estimate
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>✅ No hidden fees</span>
              <span>✅ 100% transparent</span>
              <span>✅ Updated for 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
