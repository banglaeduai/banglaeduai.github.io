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

      {/* The annotated scripts are the argument. A real system finding a real
          error is worth more than any amount of prose, so they come first and
          they are shown large. */}
      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What the system produces
        </h2>
        <p className="mt-3 text-muted-foreground">
          Each run produces a marked script. The system boxes every region it
          reads, links it to the relevant question, and provides evidence for
          its judgement. A human examiner can therefore see both the decision
          and the part of the script behind it. The recordings below show the
          working system at its original speed.
        </p>

        <div className="mt-10 space-y-16 lg:-mx-24">
          {scriptFigures.map((figure, i) => (
            <Figure
              key={figure.caption}
              figure={figure}
              priority={i === 0}
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Why this is hard
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            An exam script is not a structured form. Students write in the
            margins, cross out their work, answer questions out of order, and
            move between Bangla prose, English technical terms, and mathematical
            notation. Before marking can begin, the system must separate the
            page into answers and match each one to the correct question.
          </p>
          <p>
            A correct mark must also be based on the correct evidence. Even if
            a system gives the right grade, it cannot be trusted if it reads the
            wrong part of the page. That is why each judgement includes the
            relevant page region and a confidence score, rather than only a
            single mark.
          </p>
        </div>
      </section>

      <section className="mt-16 border-t pt-8">
        <h2 className="font-heading text-lg font-medium">Where it stands</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {project.status} Every example on this page is output from the working
          system on real scripts, not a mock-up.
        </p>
      </section>
    </div>
  );
}
