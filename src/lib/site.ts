/**
 * Single source of truth for site content.
 *
 * Edit this file to update the site — the pages read everything from here,
 * so you rarely need to touch the components themselves.
 *
 * Anything marked TODO is a real placeholder: it is either unconfirmed or
 * waiting on an asset. Empty strings are handled gracefully by the pages
 * (the corresponding link or line is simply not rendered), so it is safe to
 * ship with them empty rather than guessing at a value.
 */

export const site = {
  name: "BanglaEduAI",
  shortName: "BanglaEduAI",
  tagline: "AI for Bangla-medium education",
  description:
    "We build AI systems that work in Bangla and are useful in a real classroom: software that marks handwritten exam scripts, and a tutor that works through a problem with a student instead of answering it for them.",
  // Used for <link rel="canonical"> and social cards.
  // TODO: confirm — banglaeduai.github.io, or a path under cse.buet.ac.bd?
  // A custom domain later is just a CNAME file; a subpath under an existing
  // site would additionally need basePath and assetPrefix in next.config.ts.
  url: "https://banglaeduai.github.io",
  // TODO: Anindya Iqbal's BUET address. Left empty deliberately — not guessed.
  email: "",
  affiliation:
    "Department of Computer Science and Engineering, Bangladesh University of Engineering and Technology",
  affiliationShort: "Department of CSE, BUET",
  location: "Dhaka 1000, Bangladesh",
  // TODO: building and room number for the Contact section.
  room: "",
  campusMap: "https://maps.app.goo.gl/",
  // Shown in the footer. Bump this whenever the content changes.
  lastUpdated: "2026-09-11",
  socials: {
    github: "https://github.com/banglaeduai",
    scholar: "",
    twitter: "",
  },
} as const;

// `/contact/` is deliberately absent: the page is wired out of the nav but
// still exported, so it stays live at /contact/ and nothing links to it.
// Same arrangement as /research/, /people/ and /publications/ below.
export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects/script-checking/", label: "Script checking" },
  { href: "/projects/tutor/", label: "Tutor" },
] as const;

/* -------------------------------------------------------------------------- */
/* Collaborators and funding                                                   */
/* -------------------------------------------------------------------------- */

export type Collaborator = {
  name: string;
  role: string;
  href?: string;
  /**
   * Path under `public/logos/`. Optional: an organisation with no logo here
   * renders as text in the same row, which is the correct behaviour for one
   * whose branding we are not yet cleared to use.
   */
  logo?: string;
  /** Alt text for the logo. Required whenever `logo` is set. */
  logoAlt?: string;
};

export const collaborators: Collaborator[] = [
  {
    name: "BUET",
    role: "Department of CSE",
    href: "https://cse.buet.ac.bd/",
    logo: "/logos/buet.svg",
    logoAlt: "Bangladesh University of Engineering and Technology",
  },
  {
    // The Secondary and Higher Education Division of the ministry is the
    // executing agency for ICSETEP. Both use the Government Seal.
    name: "Ministry of Education",
    role: "Secondary and Higher Education Division",
    href: "https://moedu.gov.bd/",
    logo: "/logos/bangladesh-govt-seal.svg",
    logoAlt: "Government Seal of Bangladesh",
  },
  {
    name: "University Grants Commission",
    role: "Implementing agency",
    href: "https://ugc.gov.bd/",
    logo: "/logos/ugc.svg",
    logoAlt: "University Grants Commission of Bangladesh",
  },
  {
    // This lab's grant is an ICSETEP Research & Development Grant sub-project.
    // No standalone ICSETEP logo exists: the only published mark is a wide
    // site header banner (fetched to public/logos/icsetep-header.png), which
    // does not sit in a row of square logos. Renders as text until we are
    // given a proper one.
    // TODO: ask the ICSETEP PMU (pd-icsetep@ugc.gov.bd) for a logo file.
    name: "ICSETEP",
    role: "Research & Development Grant",
    href: "https://rdgicsetep.ugc.gov.bd/",
  },
  {
    // TODO: exact funder wording and grant number — check the tender documents.
    // Grant numbers are sometimes an acknowledgement requirement.
    //
    // Deliberately no logo. ADB controls its branding tightly and ADB-funded
    // projects have visibility rules to follow; the ICSETEP PMU has to confirm
    // which logo set and acknowledgement wording they approve before we use
    // the mark. Until then the name alone is the safe thing to show.
    name: "Asian Development Bank",
    role: "Funding",
    href: "https://www.adb.org/",
  },
];

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type Figure = {
  /** Put the file in `public/projects/` and set e.g. "/projects/script-1.jpg". */
  src?: string;
  alt: string;
  caption: string;
  /** CSS aspect ratio for the frame, so placeholders match the real asset. */
  aspect: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line, used on the homepage card. */
  summary: string;
  /** Two or three sentences, used at the top of the project page. */
  intro: string;
  /** Short, honest statement of where the work actually stands. */
  status: string;
  /** Lead figure for the homepage card. */
  cover: Figure;
};

export const projects: Project[] = [
  {
    slug: "script-checking",
    title: "Automated script checking",
    summary:
      "Reading and marking handwritten exam scripts, with every judgement tied to a place on the page and a confidence score.",
    intro:
      "Marking is the part of a national examination system that scales worst. A script-checking system reads a student's handwritten answer, works out which question it is answering, and decides whether it is right — pointing at the exact region of the page it based that decision on. The output is not a bare grade but an annotated script a human examiner can audit.",
    status:
      "The underlying system is mature and evaluated on real scripts. There is no public interface yet, and no online demo.",
    cover: {
      // TODO: drop the annotated script images in `public/projects/`.
      src: "",
      alt: "An annotated exam script with bounding boxes over the student's answer",
      caption:
        "An annotated script: each detected answer region is boxed and scored.",
      aspect: "1 / 1.414",
    },
  },
  {
    slug: "tutor",
    title: "Pedagogical conversational agent",
    summary:
      "A Bangla-speaking tutor that works a student through a problem rather than handing over the answer.",
    intro:
      "A student who is given the answer learns very little. This project builds a conversational tutor in Bangla that responds to what a student has actually misunderstood — asking the next useful question, holding back the solution, and staying on the pedagogy rather than simply being fluent.",
    status:
      "A working prototype exists and has been used in real tutoring sessions. Wider evaluation is ongoing.",
    cover: {
      src: "",
      alt: "A tutoring conversation in Bangla between a student and the agent",
      caption: "A tutoring exchange: the agent narrows in rather than resolving.",
      aspect: "4 / 3",
    },
  },
];

/** Extra annotated-script figures for the script-checking project page. */
export const scriptFigures: Figure[] = [
  {
    // TODO: the example catching a wrong chemistry formula — the strongest
    // single asset we have. Show it large.
    src: "",
    alt: "An annotated script where the system has flagged an incorrect chemistry formula written by the student",
    caption:
      "The system flags an incorrect chemistry formula in a student's answer, with the region it is judging and its confidence in the judgement.",
    aspect: "1 / 1.414",
  },
  {
    src: "",
    alt: "An annotated script showing detected answer regions across a full page",
    caption:
      "Answer regions detected across a full page, each mapped back to the question it responds to.",
    aspect: "1 / 1.414",
  },
];

/**
 * A short real excerpt from a tutoring session, Bangla with an English gloss.
 * TODO: paste the real transcript here. Until then the project page shows a
 * placeholder in its place rather than invented dialogue.
 */
export type TranscriptTurn = {
  speaker: "student" | "tutor";
  bn: string;
  en: string;
};

export const tutorTranscript: TranscriptTurn[] = [];

/* -------------------------------------------------------------------------- */
/* Approach                                                                    */
/* -------------------------------------------------------------------------- */

export type Theme = {
  title: string;
  summary: string;
};

/**
 * Derived from the two projects — not aspirational areas.
 *
 * No longer rendered: the "How we work" section was taken off the homepage.
 * Kept here so the copy is not lost and can be dropped onto a page later.
 */
export const approach: Theme[] = [
  {
    title: "Bangla first, not Bangla last",
    summary:
      "Bangla handwriting, orthography and classroom register are the starting point, not a translation layer bolted onto an English system. Most of what makes these problems hard is specific to the language and to how it is written by hand under exam conditions.",
  },
  {
    title: "Judgements a teacher can check",
    summary:
      "Every automated decision carries its evidence: the region of the page it came from and how confident the system is. A marking system a teacher cannot audit is not usable in an examination, however accurate it is on average.",
  },
  {
    title: "Built for the classroom that exists",
    summary:
      "The constraints we design against are the real ones — the volume of scripts a board actually processes, and what a student can do with a tutor on the device they already own.",
  },
];

/* -------------------------------------------------------------------------- */
/* People                                                                      */
/* -------------------------------------------------------------------------- */

export type Person = {
  name: string;
  role: string;
  // Optional: put an image in `public/people/` and set e.g. "/people/asha.jpg".
  image?: string;
  interests?: string;
  bio?: string;
  email?: string;
  scholar?: string;
  link?: string;
};

// Photos, Scholar URLs and BUET profile links are confirmed (notes/004.md).
// The Scholar links printed on the BUET profile pages are both broken — one
// malformed, one truncated — so these are the working URLs, not the ones the
// department site links to.
//
// TODO before publishing: confirm the bio wording and the email address with
// each person individually, and confirm permission to host their photo here.
export const faculty: Person[] = [
  {
    name: "Rifat Shahriyar",
    role: "Professor, Department of CSE, BUET",
    bio: "Works on natural language processing for Bangla and on software engineering. Co-leads BanglaEduAI's work on language technology for Bangla-medium classrooms.",
    image: "/people/rifat-shahriyar.jpg",
    // TODO: BUET address. Left empty deliberately — not guessed.
    email: "",
    scholar: "https://scholar.google.com/citations?user=p-w4hOUAAAAJ",
    link: "https://cse.buet.ac.bd/faculty/faculty_detail/rifat",
  },
  {
    name: "Anindya Iqbal",
    role: "Professor, Department of CSE, BUET",
    bio: "Works on machine learning and software engineering. Co-leads BanglaEduAI, and is the point of contact for the lab.",
    image: "/people/anindya-iqbal.jpg",
    // TODO: BUET address. Left empty deliberately — not guessed.
    email: "",
    scholar: "https://scholar.google.com/citations?user=jAuiNFgAAAAJ",
    link: "https://cse.buet.ac.bd/faculty/faculty_detail/anindyaiqbal",
  },
];

/* -------------------------------------------------------------------------- */
/* Template content — no longer linked from `nav`.                             */
/*                                                                             */
/* The arrays below are placeholder content that shipped with the template.    */
/* They describe work this lab does not do. They are kept only because         */
/* /research/, /people/ and /publications/ still import them and would fail to */
/* build without them. Those three pages are unlinked but STILL EXPORTED, so   */
/* this content is live at those URLs. Removing it needs an explicit go-ahead. */
/* -------------------------------------------------------------------------- */

export type ResearchArea = {
  title: string;
  summary: string;
  tags: string[];
};

export const researchAreas: ResearchArea[] = [
  {
    title: "Low-resource Bangla NLP",
    summary:
      "Pretraining, tokenization, and evaluation for Bangla and its dialects, with a focus on data-efficient methods that work without web-scale corpora.",
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
      "Short-answer and essay grading for Bangla-medium classrooms, including calibration, rubric alignment, and fairness across dialects.",
    tags: ["Assessment", "Fairness"],
  },
  {
    title: "Speech and literacy",
    summary:
      "Speech recognition and reading-fluency feedback for early-grade literacy, designed for low-bandwidth and offline classroom deployment.",
    tags: ["Speech", "Literacy"],
  },
];

export const people: Person[] = faculty;

export const alumni: Person[] = [];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  links?: { label: string; href: string }[];
};

export const publications: Publication[] = [];

export type NewsItem = { date: string; text: string };

export const news: NewsItem[] = [];
