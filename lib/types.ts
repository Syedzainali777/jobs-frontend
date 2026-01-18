// Re-export all types from api.ts for convenience
export type {
  StrapiImage,
  BlockChild,
  Block,
  Category,
  Article,
  StrapiResponse,
} from "./api";

// Navigation categories (static)
export const CATEGORIES = [
  { name: "Jobs", slug: "jobs" },
  { name: "News", slug: "news" },
  { name: "Education", slug: "education" },
  { name: "Scholarships", slug: "scholarships" },
  { name: "Technology", slug: "technology" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

