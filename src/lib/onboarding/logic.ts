export function gpaPlaceholderForCountry(country: string): string {
  if (country === 'india') return 'Enter your % (e.g. 85%)';
  return 'Enter GPA (e.g. 3.7/4.0)';
}

export interface SegmentInput {
  studyGoal: 'bachelor' | 'master' | 'second-master' | '';
  knowsUniversities: 'yes' | 'no' | '';
  budget: string | null;
  intake: string;
  funding?: string;
  studyBreak?: boolean;
  visaRefusal?: boolean;
}

export function inferSegment(input: SegmentInput): string {
  if (input.studyGoal === 'bachelor') {
    return input.knowsUniversities === 'yes'
      ? 'Bachelor - Focused Applicant'
      : 'Bachelor - Early Planner';
  }
  if (input.studyGoal === 'master') {
    if (!input.budget) return 'Master — Budget-sensitive';
    if (input.funding === 'employer') return 'Master — Sponsored / Gap-year';
    if (input.studyBreak === true && input.visaRefusal === true)
      return 'Master — Gap-year';
    return 'Master - Planned Candidate';
  }
  return 'Master - Planned Candidate';
}
