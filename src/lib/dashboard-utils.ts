export interface ApplicationStage {
  id: string
  name: string
  description: string
  status: "not-started" | "in-progress" | "completed"
  order: number
}

export const APPLICATION_STAGES: ApplicationStage[] = [
  {
    id: "profile",
    name: "Complete Profile",
    description: "Build your academic and personal profile",
    status: "not-started",
    order: 1,
  },
  {
    id: "school-selection",
    name: "School Selection",
    description: "Research and shortlist universities",
    status: "not-started",
    order: 2,
  },
  {
    id: "application",
    name: "Applications",
    description: "Submit applications and documents",
    status: "not-started",
    order: 3,
  },
  {
    id: "visa",
    name: "Visa Process",
    description: "Apply for student visa",
    status: "not-started",
    order: 4,
  },
  {
    id: "pre-departure",
    name: "Pre-Departure",
    description: "Prepare for your journey",
    status: "not-started",
    order: 5,
  },
  {
    id: "arrival",
    name: "Arrival & Settlement",
    description: "Settle into your new life",
    status: "not-started",
    order: 6,
  },
]

export function getUserStages(user: any): ApplicationStage[] {
  // Mock logic to determine user's current stage based on profile completeness
  const stages = [...APPLICATION_STAGES]

  // If user has basic info, mark profile as in-progress or completed
  if (user.country && user.fieldOfStudy && user.budget) {
    stages[0].status = "completed"
    stages[1].status = "in-progress"
  } else if (user.country) {
    stages[0].status = "in-progress"
  }

  return stages
}

export function getCurrentStage(stages: ApplicationStage[]): ApplicationStage {
  const inProgress = stages.find((stage) => stage.status === "in-progress")
  if (inProgress) return inProgress

  const notStarted = stages.find((stage) => stage.status === "not-started")
  return notStarted || stages[0]
}

export function getNextSteps(currentStage: ApplicationStage, user: any) {
  const steps = {
    profile: [
      { task: "Complete academic background", urgent: true },
      { task: "Add test scores (SAT/GRE/IELTS)", urgent: false },
      { task: "Upload transcripts", urgent: false },
    ],
    "school-selection": [
      { task: "Use AI matching tool", urgent: true },
      { task: "Research 10-15 universities", urgent: true },
      { task: "Create shortlist of 5-8 schools", urgent: false },
    ],
    application: [
      { task: "Write personal statement", urgent: true },
      { task: "Request recommendation letters", urgent: true },
      { task: "Submit applications", urgent: false },
    ],
    visa: [
      { task: "Gather visa documents", urgent: true },
      { task: "Schedule visa interview", urgent: true },
      { task: "Attend visa appointment", urgent: false },
    ],
    "pre-departure": [
      { task: "Book flights", urgent: true },
      { task: "Arrange accommodation", urgent: true },
      { task: "Get health insurance", urgent: false },
    ],
    arrival: [
      { task: "Complete university enrollment", urgent: true },
      { task: "Open bank account", urgent: false },
      { task: "Join student communities", urgent: false },
    ],
  }

  return steps[currentStage.id as keyof typeof steps] || []
}
