import type { Metadata } from "next";
import Link from "next/link";

import { Figure } from "@/components/figure";
import { projects, scriptFigures } from "@/lib/site";

const project = projects.find((p) => p.slug === "script-checking")!;

export const metadata: Metadata = {
  title: project.title,
  description: project.summary,
  alternates: { canonical: `/projects/${project.slug}/` },
};

export default function ScriptCheckingPage() {
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

      {/* The annotated scripts are the argument. A real system finding a real
          error is worth more than any amount of prose, so they come first and
          they are shown large. */}
      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What the system produces
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The output of a run is an annotated script. Each region the system has
          read is boxed, mapped to the question it answers, and given a
          judgement with a confidence attached &mdash; so a human examiner can
          see not just what the system decided but what it was looking at.
        </p>

        <div className="mt-10 space-y-14">
          {scriptFigures.map((figure, i) => (
            <Figure
              key={figure.caption}
              figure={figure}
              priority={i === 0}
              layout="side"
              sizes="(min-width: 768px) 26rem, 100vw"
            />
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Why this is hard
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            A script is not a form. Students write across margins, cross work
            out, answer questions out of order, and switch between Bangla
            prose, English technical terms, and notation that belongs to
            neither. Before anything can be marked, the page has to be segmented
            into answers and each answer matched to the question it belongs to.
          </p>
          <p>
            Marking then has to be right for the right reason. A system that
            gets the grade correct while reading the wrong part of the page is
            not a system anyone can put in front of an examination board, which
            is why every judgement is tied back to a region and a confidence
            rather than reported as a single number.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-2xl border-t pt-8">
        <h2 className="font-heading text-lg font-medium">Where it stands</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {project.status} What is shown on this page is output from the working
          system on real scripts, not a mock-up.
        </p>
      </section>
    </div>
  );
}
