"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/features/auth"
import { useRouter, useParams } from "next/navigation"
import { UniversityDetailContent } from "@/components/universities/university-detail-content"

// Mock university data - in real app this would come from API
const UNIVERSITY_DATA = {
  harvard: {
    id: "harvard",
    name: "Harvard University",
    location: "Cambridge, Massachusetts, USA",
    founded: 1636,
    type: "Private Research University",
    ranking: {
      global: 1,
      national: 1,
      subject: { business: 1, medicine: 1, law: 1 },
    },
    stats: {
      students: 23000,
      internationalStudents: "25%",
      facultyRatio: "7:1",
      acceptanceRate: "3.4%",
      graduationRate: "98%",
    },
    tuition: {
      undergraduate: 54000,
      graduate: 52000,
      currency: "USD",
    },
    deadlines: {
      earlyAction: "November 1, 2024",
      regularDecision: "January 1, 2025",
      financialAid: "February 1, 2025",
    },
    programs: [
      { name: "Business Administration", level: "Graduate", duration: "2 years" },
      { name: "Medicine", level: "Graduate", duration: "4 years" },
      { name: "Computer Science", level: "Undergraduate", duration: "4 years" },
      { name: "Engineering", level: "Both", duration: "4 years" },
      { name: "Law", level: "Graduate", duration: "3 years" },
    ],
    requirements: {
      undergraduate: {
        gpa: "3.9+",
        sat: "1460-1580",
        act: "33-35",
        toefl: "100+",
        ielts: "7.0+",
      },
      graduate: {
        gpa: "3.7+",
        gre: "320+",
        gmat: "730+",
        toefl: "100+",
        ielts: "7.0+",
      },
    },
    scholarships: [
      { name: "Harvard Financial Aid", amount: "Up to full tuition", eligibility: "Need-based" },
      { name: "International Student Grant", amount: "$25,000", eligibility: "Merit-based" },
      { name: "STEM Excellence Award", amount: "$15,000", eligibility: "STEM majors" },
    ],
    campusLife: {
      housing: "Guaranteed for 4 years",
      diningPlans: "15+ dining halls",
      clubs: "450+ student organizations",
      sports: "42 varsity teams",
    },
    images: ["/harvard-campus-1.png", "/harvard-library.png", "/harvard-students.png"],
    description:
      "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher education in the United States and among the most prestigious in the world.",
    isBookmarked: false,
  },
  stanford: {
    id: "stanford",
    name: "Stanford University",
    location: "Stanford, California, USA",
    founded: 1885,
    type: "Private Research University",
    ranking: {
      global: 2,
      national: 2,
      subject: { engineering: 2, business: 1, computerScience: 1 },
    },
    stats: {
      students: 17000,
      internationalStudents: "22%",
      facultyRatio: "5:1",
      acceptanceRate: "4.3%",
      graduationRate: "95%",
    },
    tuition: {
      undergraduate: 56000,
      graduate: 54000,
      currency: "USD",
    },
    deadlines: {
      earlyAction: "November 1, 2024",
      regularDecision: "January 2, 2025",
      financialAid: "February 15, 2025",
    },
    programs: [
      { name: "Computer Science", level: "Both", duration: "4 years" },
      { name: "Engineering", level: "Both", duration: "4 years" },
      { name: "Business Administration", level: "Graduate", duration: "2 years" },
      { name: "Medicine", level: "Graduate", duration: "4 years" },
    ],
    requirements: {
      undergraduate: {
        gpa: "3.9+",
        sat: "1440-1570",
        act: "32-35",
        toefl: "100+",
        ielts: "7.0+",
      },
      graduate: {
        gpa: "3.7+",
        gre: "325+",
        gmat: "740+",
        toefl: "100+",
        ielts: "7.0+",
      },
    },
    scholarships: [
      { name: "Stanford Financial Aid", amount: "Up to full tuition", eligibility: "Need-based" },
      { name: "Knight-Hennessy Scholars", amount: "Full funding", eligibility: "Graduate students" },
      { name: "Tech Innovation Grant", amount: "$20,000", eligibility: "Tech entrepreneurs" },
    ],
    campusLife: {
      housing: "Guaranteed for 4 years",
      diningPlans: "20+ dining options",
      clubs: "650+ student organizations",
      sports: "36 varsity teams",
    },
    images: ["/stanford-campus-1.png", "/stanford-library.png", "/stanford-students.png"],
    description:
      "Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
    isBookmarked: true,
  },
}

export default function UniversityDetailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const universityId = params.id as string
  const [isRedirecting, setIsRedirecting] = useState(false)

  const university = UNIVERSITY_DATA[universityId as keyof typeof UNIVERSITY_DATA]

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true)
      router.push("/")
      return
    }
  }, [loading, user, router])

  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">University Not Found</h1>
          <button
            onClick={() => router.push("/universities")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg"
          >
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  return <UniversityDetailContent university={university} />
}
