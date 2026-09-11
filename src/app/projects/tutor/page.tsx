import type { Metadata } from "next";
import Link from "next/link";

import { Figure } from "@/components/figure";
import { projects, tutorFigures, tutorTranscript } from "@/lib/site";

const project = projects.find((p) => p.slug === "tutor")!;

export const metadata: Metadata = {
  title: project.title,
  description: project.summary,
  alternates: { canonical: `/projects/${project.slug}/` },
};

export default function TutorPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; BanglaEduAI
      </Link>

      <header className="mt-8">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Project
        </p>
        <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/85">
          {project.intro}
        </p>
      </header>

      {/* A transcript demonstrates the pedagogy better than a screenshot does,
          and needs no image assets. */}
      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          A session, in part
        </h2>
        <p className="mt-3 text-muted-foreground">
          An excerpt from a real tutoring session, in Bangla, with an English
          gloss underneath each turn.
        </p>

        {tutorTranscript.length > 0 ? (
          <ol className="mt-8 space-y-6">
            {tutorTranscript.map((turn, i) => (
              <li
                key={i}
                className={
                  turn.speaker === "tutor"
                    ? "border-l-2 border-primary pl-5"
                    : "border-l-2 border-border pl-5"
                }
              >
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {turn.speaker === "tutor" ? "Tutor" : "Student"}
                </p>
                <p
                  lang={turn.lang ?? "bn"}
                  className="mt-2 text-lg leading-relaxed whitespace-pre-line"
                >
                  {turn.bn}
                </p>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                  {turn.en}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
            Transcript to come.
          </div>
        )}

        <p className="mt-8 leading-relaxed text-muted-foreground">
          This exchange shows the two main ideas behind the project. The
          student writes Bangla in Latin letters, as students often do, and the
          tutor replies in Bangla. It also ends with a question, not an answer.
        </p>
      </section>

      {/* The tutor is a visual system as much as a conversational one, so the
          captures carry weight the transcript cannot. */}
      <section className="mt-20">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What the student sees
        </h2>
        <p className="mt-3 text-muted-foreground">
          Explanations draw on the student&rsquo;s own textbook. Proofs and
          physics concepts are developed step by step instead of simply being
          stated. Every example below comes from the working prototype.
        </p>

        <div className="mt-10 space-y-16 lg:-mx-24">
          {tutorFigures.map((figure, i) => (
            <Figure
              key={figure.caption}
              figure={figure}
              priority={i === 0}
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What we are aiming at
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            A fluent model often answers a student&rsquo;s question immediately
            and in full, but that can get in the way of learning. The challenge
            is knowing when to hold back: first identify what the student has
            misunderstood, then ask the question that will help them recognize
            it themselves.
          </p>
          <p>
            Supporting this kind of learning in Bangla requires more than
            translation. The system must understand how students speak to
            teachers, how Bangla-medium textbooks present problems, and how
            English technical terms appear within Bangla sentences.
          </p>
        </div>
      </section>

      <section className="mt-16 border-t pt-8">
        <h2 className="font-heading text-lg font-medium">Where it stands</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {project.status}
        </p>
      </section>
    </div>
  );
}
