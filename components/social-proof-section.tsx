"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Award, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

export function SocialProofSection() {
  const router = useRouter();

  const navigateToOnboarding = () => {
    router.push("/onboarding");
  };

  const socialStats = [
    {
      platform: "Instagram",
      icon: FaInstagram,
      followers: "50K+",
      description: "Daily study abroad tips",
      color: "text-pink-500",
      href: "https://www.instagram.com/pgadmit",
    },
    {
      platform: "TikTok",
      icon: FaTiktok,
      followers: "75K+",
      description: "Campus life content",
      color: "text-black",
      href: "https://www.tiktok.com/@pgadmit",
    },
    {
      platform: "YouTube",
      icon: FaYoutube,
      followers: "25K+",
      description: "University tours & guides",
      color: "text-red-500",
      href: "https://www.youtube.com/@pgadmit",
    },
  ];

  const achievements = [
    {
      icon: Users,
      number: "10,000+",
      label: "Students Helped",
      description: "Across Nigeria & India",
    },
    {
      icon: Award,
      number: "98%",
      label: "Acceptance Rate",
      description: "To top universities",
    },
    {
      icon: Globe,
      number: "500+",
      label: "Universities",
      description: "US & UK partnerships",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
            Join the Community
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Follow us for daily study abroad content, campus tours, and connect
            with thousands of students on their journey
          </p>
          <Button
            onClick={navigateToOnboarding}
            size="lg"
            className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-bold px-8 py-4"
          >
            Join Our Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Social Media Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {socialStats.map((social, index) => (
            <Card
              key={index}
              className="bg-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href={social.href} target="_blank">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-md">
                      <social.icon className={`h-8 w-8 ${social.color}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {social.followers}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-1">
                    {social.platform}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {social.description}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                <achievement.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-4xl font-black text-foreground mb-2">
                {achievement.number}
              </h3>
              <p className="text-lg font-semibold text-primary mb-1">
                {achievement.label}
              </p>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Visual Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/diverse-graduation.png"
              alt="Students celebrating"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/nigerian-student-library.png"
              alt="Student studying"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/indian-students-uk.png"
              alt="UK campus life"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/young-adults-meeting-up-study.jpg"
              alt="Dorm life"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={navigateToOnboarding}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
