export const STUDIO_CATEGORIES = [
  "Photo Studios",
  "Film Stages",
  "Podcast Lounges",
  "Music Suites",
  "Art Workshops",
  "Creative Offices",
];

const CATEGORY_ALIASES = {
  "photo studio": "Photo Studios",
  "photo studios": "Photo Studios",
  "photography studio": "Photo Studios",
  "photography studios": "Photo Studios",
  "film stage": "Film Stages",
  "film stages": "Film Stages",
  "sound stage": "Film Stages",
  "sound stages": "Film Stages",
  "podcast lounge": "Podcast Lounges",
  "podcast lounges": "Podcast Lounges",
  "podcast room": "Podcast Lounges",
  "podcast rooms": "Podcast Lounges",
  "music suite": "Music Suites",
  "music suites": "Music Suites",
  "music studio": "Music Suites",
  "music studios": "Music Suites",
  workshop: "Art Workshops",
  workshops: "Art Workshops",
  "art workshop": "Art Workshops",
  "art workshops": "Art Workshops",
  "creative studio": "Creative Offices",
  "creative studios": "Creative Offices",
  "creative office": "Creative Offices",
  "creative offices": "Creative Offices",
  "production space": "Creative Offices",
  "production spaces": "Creative Offices",
};

export function normalizeCategory(value) {
  const category = String(value ?? "").trim();

  if (!category) return "";

  return CATEGORY_ALIASES[category.toLowerCase()] || category;
}
