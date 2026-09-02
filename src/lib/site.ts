/**
 * Single source of truth for site content.
 *
 * Edit this file to update the site — the pages read everything from here,
 * so you rarely need to touch the components themselves.
 */

export const site = {
  name: "Bengali EduAI Lab",
  shortName: "Bengali EduAI",
  tagline: "Language technology for Bengali education",
  description:
    "We build natural language processing and AI systems that make quality education accessible to Bengali-speaking learners.",
  // Used for <link rel="canonical"> and social cards.
  url: "https://bengalieduai.github.io",
  email: "contact@example.org",
  affiliation: "Department of Computer Science, Your University",
  location: "Dhaka, Bangladesh",
  socials: {
    github: "https://github.com/bengalieduai",
    scholar: "",
    twitter: "",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/research/", label: "Research" },
  { href: "/people/", label: "People" },
  { href: "/publications/", label: "Publications" },
] as const;

export type ResearchArea = {
  title: string;
  summary: string;
  tags: string[];
};

export const researchAreas: ResearchArea[] = [
  {
    title: "Low-resource Bengali NLP",
    summary:
      "Pretraining, tokenization, and evaluation for Bengali and its dialects, with a focus on data-efficient methods that work without web-scale corpora.",
    tags: ["NLP", "Pretraining", "Evaluation"],
  },
  {
    title: "AI tutoring systems",
    summary:
      "Conversational tutors that reason about a student's misconceptions in their own language, and that stay pedagogically grounded rather than just fluent.",
    tags: ["Education", "Dialogue", "LLMs"],
  },
  {
    title: "Automated assessment",
    summary:
      "Short-answer and essay grading for Bengali-medium classrooms, including calibration, rubric alignment, and fairness across dialects.",
    tags: ["Assessment", "Fairness"],
  },
  {
    title: "Speech and literacy",
    summary:
      "Speech recognition and reading-fluency feedback for early-grade literacy, designed for low-bandwidth and offline classroom deployment.",
    tags: ["Speech", "Literacy"],
  },
];

export type Person = {
  name: string;
  role: string;
  // Optional: put an image in `public/people/` and set e.g. "/people/asha.jpg".
  image?: string;
  interests?: string;
  link?: string;
};

export const people: Person[] = [
  {
    name: "Your Name",
    role: "Principal Investigator",
    interests: "Bengali NLP, educational AI, evaluation",
    link: "",
  },
  {
    name: "PhD Student",
    role: "PhD Student",
    interests: "Automated assessment, calibration",
  },
  {
    name: "Research Assistant",
    role: "Research Assistant",
    interests: "Speech recognition, dataset construction",
  },
];

export const alumni: Person[] = [
  { name: "Former Member", role: "MSc, 2025 — now at Somewhere" },
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  links?: { label: string; href: string }[];
};

export const publications: Publication[] = [
  {
    title: "A Benchmark for Bengali Short-Answer Grading",
    authors: "Your Name, PhD Student, Collaborator",
    venue: "Proceedings of Somewhere",
    year: 2026,
    links: [
      { label: "PDF", href: "#" },
      { label: "Code", href: "#" },
    ],
  },
  {
    title: "Data-Efficient Pretraining for Low-Resource Bengali",
    authors: "PhD Student, Your Name",
    venue: "Workshop on Low-Resource NLP",
    year: 2025,
    links: [{ label: "arXiv", href: "#" }],
  },
];

export type NewsItem = { date: string; text: string };

export const news: NewsItem[] = [
  { date: "Sep 2026", text: "The lab website is live." },
  { date: "Aug 2026", text: "New paper accepted at Somewhere." },
  { date: "Jul 2026", text: "We are recruiting MSc and PhD students." },
];
