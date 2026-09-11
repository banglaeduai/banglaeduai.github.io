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
  /** Path under `public/`, e.g. "/demo/script/script-image-2.png". */
  src?: string;
  /**
   * Path to a silent, faststart MP4 under `public/demo/`. When this is set the
   * figure renders as an autoplaying, muted, looping, inline video — which
   * behaves like a GIF at a fraction of the size — and `src` is ignored.
   *
   * Always point this at a `-web.mp4`: see the note above `scriptFigures` for
   * what those are and how they are produced.
   */
  video?: string;
  /**
   * First frame of `video`, shown instantly while the file loads and left on
   * screen if the browser refuses to autoplay.
   */
  poster?: string;
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
      "The system runs end to end on real scripts. What is shown here is an internal evaluation build: there is no interface yet that anyone outside the project can use.",
    cover: {
      src: "/demo/script/script-image-2.png",
      alt: "The evaluation workspace: a marked handwritten physics script beside the rubric criteria the system awarded and withheld",
      caption:
        "A marked script: every criterion met or lost, and the region of the page behind each verdict.",
      aspect: "16 / 9",
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
      src: "/demo/pedagogical_conv/book-reference.png",
      alt: "A tutoring conversation in Bangla, with the matching figure from the student's own textbook shown alongside",
      caption:
        "A tutoring exchange, grounded in the page of the textbook the student is working from.",
      aspect: "16 / 9",
    },
  },
];

/**
 * Figures for the script-checking project page, in the order they are shown.
 *
 * A note on the video files. Everything under `public/demo/` is a real capture
 * of the working systems. The `-web.mp4` files are what this site actually
 * serves: silent, and with the MP4 index moved to the front so playback can
 * start before the whole file has downloaded. They were produced from the
 * originals by stream copy, so there is no re-encoding loss:
 *
 *   ffmpeg -i script-demo-1.mp4 -c:v copy -an -movflags +faststart \
 *          script-demo-1-web.mp4
 *
 * The `-poster.jpg` beside each one is its first frame. The originals, the
 * `-silent` intermediates and the large `-compressed.gif` versions are all kept
 * in the repository but are not referenced by the site.
 */
export const scriptFigures: Figure[] = [
  {
    // The strongest single asset on the site: a real system finding a real
    // error. Shown first, and shown large.
    src: "/demo/script/script-image-2.png",
    alt: "A marked script: the student's handwritten mean-free-path working, with a red box around the incorrect final value, beside four rubric criteria the system has marked met or lost",
    caption:
      "A handwritten physics answer marked 4 out of 10. The system awards the two criteria the student met, withholds the two they did not, and boxes the incorrect final value on the page \u2014 so the mark can be checked against the evidence rather than taken on trust.",
    aspect: "16 / 9",
  },
  {
    video: "/demo/script/script-demo-1-web.mp4",
    poster: "/demo/script/script-demo-1-poster.jpg",
    alt: "Screen recording of the grading pipeline running on a relative-velocity question, stepping through reading, verifying, synthesising, supervising and examining",
    caption:
      "A full run on a relative-velocity question. The pipeline reads the handwriting, checks the reference solution, synthesises the marking scheme the board never supplied, re-reads the script, and only then marks it step by step.",
    aspect: "16 / 9",
  },
  {
    video: "/demo/script/script-demo-2-web.mp4",
    poster: "/demo/script/script-demo-2-poster.jpg",
    alt: "Screen recording of the same pipeline grading a vector algebra question and locating its evidence on the page",
    caption:
      "The same pipeline on a vector algebra question, ending by pointing each verdict at the exact lines of the script it came from.",
    aspect: "16 / 9",
  },
  {
    src: "/demo/script/script-image-1.png",
    alt: "The evaluation workspace overview, describing a seven-agent grading pipeline",
    caption:
      "Marking is split across seven specialised agents rather than asked of a single model, which is what makes each step separately checkable.",
    aspect: "16 / 9",
  },
];

/** Figures for the tutor project page, in the order they are shown. */
export const tutorFigures: Figure[] = [
  {
    src: "/demo/pedagogical_conv/book-reference.png",
    alt: "The tutor answering a physics question in Bangla, with the cited figure and page from the student's NCTB textbook shown in a panel alongside",
    caption:
      "The student asks in romanised Bangla and is answered in Bangla, alongside the exact figure and page of the national textbook the explanation is drawn from \u2014 the same edition they have in front of them.",
    aspect: "2064 / 1421",
  },
  {
    video: "/demo/pedagogical_conv/geometry-demo-1-web.mp4",
    poster: "/demo/pedagogical_conv/geometry-demo-1-poster.jpg",
    alt: "An animated geometric proof that the diagonals of a parallelogram bisect each other, built up step by step beside the written proof in Bangla",
    caption:
      "A proof that the diagonals of a parallelogram bisect each other, drawn one step at a time against the written argument in Bangla, at a pace the student controls.",
    aspect: "16 / 9",
  },
  {
    video: "/demo/pedagogical_conv/geometry-demo-2-web.mp4",
    poster: "/demo/pedagogical_conv/geometry-demo-2-poster.jpg",
    alt: "An animated construction showing why the three angles of a triangle sum to 180 degrees, beside the written proof in Bangla",
    caption:
      "The angle sum of a triangle: the auxiliary parallel line appears at the moment the proof needs it, rather than being given at the start.",
    aspect: "16 / 9",
  },
  {
    src: "/demo/pedagogical_conv/simulation-example-1.png",
    alt: "An interactive circuit model with sliders for two parallel resistors, a series resistor and the supply voltage, and a task set underneath",
    caption:
      "Where a diagram is not enough, the tutor builds a model the student can manipulate, and then sets them a target to reach with it.",
    aspect: "1475 / 987",
  },
  {
    src: "/demo/pedagogical_conv/math-viz-1.jpg",
    alt: "The tutor deriving the sine addition formula in Bangla, beside an adjustable unit-circle construction of the same identity",
    caption:
      "The sine addition formula worked through in Bangla, beside a construction of the same identity the student can move.",
    aspect: "1280 / 619",
  },
];

/**
 * A short real excerpt from a tutoring session, Bangla with an English gloss.
 *
 * Transcribed from the session captured in
 * `public/demo/pedagogical_conv/book-reference.png`. It is set as real text
 * rather than left to the screenshot alone so that it is selectable, findable
 * and readable by a screen reader.
 *
 * The tutor's opening pleasantries, which recap that particular student's
 * earlier sessions, are trimmed; the physics and the question it ends on are
 * verbatim.
 */
export type TranscriptTurn = {
  speaker: "student" | "tutor";
  bn: string;
  en: string;
  /**
   * BCP 47 tag for the `bn` field. Defaults to Bangla in Bengali script.
   * Students very often type Bangla in Latin letters, which is "bn-Latn" —
   * tagging it correctly stops a screen reader reading it as English.
   */
  lang?: string;
};

export const tutorTranscript: TranscriptTurn[] = [
  {
    speaker: "student",
    lang: "bn-Latn",
    bn: "ekta charghed golok theke ekta uncharged golok ke sporsho korle keno charge probahito hoy?",
    en: "Why does charge flow when a charged sphere is touched to an uncharged one?",
  },
  {
    speaker: "tutor",
    bn: "\u099a\u09be\u09b0\u09cd\u099c \u09aa\u09cd\u09b0\u09ac\u09be\u09b9\u09bf\u09a4 \u09b9\u09af\u09bc \u0995\u09be\u09b0\u09a3 \u09a6\u09c1\u099f\u09bf \u0997\u09cb\u09b2\u0995\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09ac\u09c8\u09a6\u09cd\u09af\u09c1\u09a4\u09bf\u0995 \u09ac\u09bf\u09ad\u09ac\u09c7\u09b0 \u09aa\u09be\u09b0\u09cd\u09a5\u0995\u09cd\u09af \u09a5\u09be\u0995\u09c7\u0964 \u0989\u099a\u09cd\u099a \u09ac\u09bf\u09ad\u09ac\u09c7\u09b0 \u09b6\u09b0\u09c0\u09b0 \u09a5\u09c7\u0995\u09c7 \u09a8\u09bf\u09ae\u09cd\u09a8 \u09ac\u09bf\u09ad\u09ac\u09c7\u09b0 \u09b6\u09b0\u09c0\u09b0\u09c7 \u099a\u09be\u09b0\u09cd\u099c \u09aa\u09cd\u09b0\u09ac\u09be\u09b9\u09bf\u09a4 \u09b9\u09a4\u09c7 \u099a\u09be\u09af\u09bc \u09af\u09a4\u0995\u09cd\u09b7\u09a3 \u09a8\u09be \u0989\u09ad\u09af\u09bc \u09b8\u09cd\u09a5\u09be\u09a8\u09c7\u09b0 \u09ac\u09bf\u09ad\u09ac \u09b8\u09ae\u09be\u09a8 \u09b9\u09af\u09bc\u0964 \u098f\u0987 \u09ac\u09bf\u09ad\u09ac \u09aa\u09be\u09b0\u09cd\u09a5\u0995\u09cd\u09af\u0987 \u099a\u09be\u09b0\u09cd\u099c \u099a\u09b2\u09be\u099a\u09b2\u09c7\u09b0 \u09ae\u09c2\u09b2 \u099a\u09be\u09b2\u09bf\u0995\u09be\u09b6\u0995\u09cd\u09a4\u09bf\u0964",
    en: "Charge flows because there is a difference in electric potential between the two spheres. Charge tends to flow from the body at higher potential to the body at lower potential, until the potential is equal at both. That potential difference is the thing driving the movement of charge.",
  },
  {
    speaker: "tutor",
    bn: "\u09a4\u09cb\u09ae\u09be\u09b0 \u09ae\u09a4\u09c7, \u098f\u0995\u099f\u09bf \u099a\u09be\u09b0\u09cd\u099c\u09bf\u09a4 \u0997\u09cb\u09b2\u0995 \u098f\u09ac\u0982 \u098f\u0995\u099f\u09bf \u099a\u09be\u09b0\u09cd\u099c\u09b9\u09c0\u09a8 \u0997\u09cb\u09b2\u0995\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u0995\u09be\u09b0 \u09ac\u09c8\u09a6\u09cd\u09af\u09c1\u09a4\u09bf\u0995 \u09ac\u09bf\u09ad\u09ac \u09ac\u09c7\u09b6\u09bf \u09b9\u09ac\u09c7?",
    en: "In your view, which will have the higher electric potential \u2014 a charged sphere, or an uncharged one?",
  },
];

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
