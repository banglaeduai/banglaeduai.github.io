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
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; BanglaEduAI
      </Link>

      <header className="mt-8 max-w-2xl">
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
      <section className="mt-14 max-w-2xl">
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
                  className="mt-2 text-lg leading-relaxed"
                >
                  {turn.bn}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
          Two things in that exchange are the whole point of the project. The
          student writes Bangla in Latin letters, the way students actually
          type, and is answered in Bangla. And the tutor stops on a question
          rather than on the answer.
        </p>
      </section>

      {/* The tutor is a visual system as much as a conversational one, so the
          captures carry weight the transcript cannot. */}
      <section className="mt-20">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What the student sees
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Explanations are grounded in the student&rsquo;s own textbook, and a
          proof or a piece of physics is built up in front of them rather than
          asserted. The recordings below are of the working prototype.
        </p>

        <div className="mt-10 space-y-16">
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

      <section className="mt-20 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What we are aiming at
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            A fluent model will answer a student&rsquo;s question immediately
            and completely, which is exactly the wrong move. The interesting
            work is in the restraint: deciding what the student has actually
            misunderstood, and choosing the next question that will get them to
            see it themselves.
          </p>
          <p>
            Doing that in Bangla is not a translation problem. The register a
            student uses with a teacher, the way a problem is stated in a
            Bangla-medium textbook, and the English technical vocabulary that
            sits inside otherwise-Bangla sentences all have to be handled as
            they actually occur.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-2xl border-t pt-8">
        <h2 className="font-heading text-lg font-medium">Where it stands</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {project.status}
        </p>
      </section>
    </div>
  );
}
