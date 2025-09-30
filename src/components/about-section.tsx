import { GraduationCap, Brain, Globe, Shield } from "lucide-react"

export function AboutSection() {
  const benefits = [
    {
      icon: Brain,
      title: "AI Guidance",
      description: "Smart recommendations tailored to your profile",
    },
    {
      icon: GraduationCap,
      title: "Broad School List",
      description: "5,000+ universities worldwide",
    },
    {
      icon: Globe,
      title: "Visa Support",
      description: "Complete assistance with visa applications",
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Secure and reliable guidance every step",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">About PGadmit</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We simplify the study abroad process with AI-powered guidance, turning your dream of international education
            into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
