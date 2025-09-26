export const FIELD_OPTIONS = [
  "computer-science",
  "business",
  "engineering",
  "medicine-health",
  "arts-design",
  "social-sciences",
  "natural-sciences",
  "law-legal",
  "other",
] as const;

export type FieldOption = (typeof FIELD_OPTIONS)[number];

export function labelForField(value: FieldOption | string): string {
  switch (value) {
    case "computer-science":
      return "💻 Computer Science";
    case "business":
      return "💼 Business";
    case "engineering":
      return "⚙️ Engineering";
    case "medicine-health":
      return "🧬 Medicine & Health";
    case "arts-design":
      return "🎨 Arts & Design";
    case "social-sciences":
      return "🌍 Social Sciences";
    case "natural-sciences":
      return "🔬 Natural Sciences";
    case "law-legal":
      return "⚖️ Law & Legal Studies";
    default:
      return "📚 Other";
  }
}

export const DESTINATION_OPTIONS = [
  { v: "usa", l: "🇺🇸 USA" },
  { v: "uk", l: "🇬🇧 UK" },
] as const;

export const COUNTRY_OPTIONS = [
  { v: "south-asia", l: "South Asia" },
  { v: "west-africa", l: "West Africa" },
  { v: "east-africa", l: "East Africa" },
  { v: "other", l: "Other" },
] as const;

export const FUNDING_OPTIONS = [
  { v: "myself", l: "Myself" },
  { v: "family", l: "Family" },
  { v: "employer", l: "Employer / Sponsor" },
  { v: "loan", l: "Loan" },
  { v: "scholarships", l: "Scholarships" },
] as const;

export const BREAK_OPTIONS = [
  { v: "no", l: "No" },
  { v: "yes", l: "Yes" },
] as const;

export const VISA_REFUSAL_OPTIONS = [
  { v: "no", l: "No, I have never been refused a visa" },
  { v: "yes", l: "Yes, I have been refused before" },
] as const;
