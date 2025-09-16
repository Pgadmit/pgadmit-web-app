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
] as const

export type FieldOption = (typeof FIELD_OPTIONS)[number]

export function labelForField(value: FieldOption | string): string {
  switch (value) {
    case "computer-science":
      return "💻 Computer Science"
    case "business":
      return "💼 Business"
    case "engineering":
      return "⚙️ Engineering"
    case "medicine-health":
      return "🧬 Medicine & Health"
    case "arts-design":
      return "🎨 Arts & Design"
    case "social-sciences":
      return "🌍 Social Sciences"
    case "natural-sciences":
      return "🔬 Natural Sciences"
    case "law-legal":
      return "⚖️ Law & Legal Studies"
    default:
      return "📚 Other"
  }
}

export const DESTINATION_OPTIONS = [
  { v: "usa", l: "🇺🇸 USA" },
  { v: "uk", l: "🇬🇧 UK" },
] as const

export const COUNTRY_OPTIONS = [
  { v: "india", l: "India (auto detected)" },
  { v: "nigeria", l: "Nigeria" },
  { v: "ghana", l: "Ghana" },
  { v: "kenya", l: "Kenya" },
  { v: "other", l: "Other" },
] as const


