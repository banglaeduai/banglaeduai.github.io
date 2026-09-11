import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  approach,
  collaborators,
  faculty,
  projects,
  site,
  type Person,
} from "@/lib/site";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex gap-5">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border sm:size-24">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes="(min-width: 640px) 96px, 80px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-lg font-medium text-muted-foreground">
            {initials(person.name)}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-heading text-lg font-medium">{person.name}</h3>
        <p className="text-sm text-muted-foreground">{person.role}</p>
        {person.bio ? <p className="mt-3 text-sm">{person.bio}</p> : null}

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {person.email ? (
            <a
              className="text-primary underline decoration-primary/30 hover:decoration-primary"
              href={`mailto:${person.email}`}
            >
              {person.email}
            </a>
          ) : null}
          {person.scholar ? (
            <a
              className="text-primary underline decoration-primary/30 hover:decoration-primary"
              href={person.scholar}
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="h-1 w-16 bg-primary" aria-hidden />
        <h1 className="mt-8 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
          Bangladesh&rsquo;s classrooms run in Bangla; almost none of the
          language technology reshaping education elsewhere does. We build AI
          systems that work in Bangla and hold up in a real classroom &mdash;
          software that reads and marks handwritten exam scripts, and a tutor
          that works through a problem with a student instead of handing over
          the answer.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          {site.affiliation}
          <br />
          {site.location}
        </p>
      </section>

      {/* Collaborators & funding — high on the page, because it is the most
          credibility-dense thing we can say today. */}
      <section className="border-t border-b py-5">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            With
          </span>
          {collaborators.map((c) => {
            const label = (
              <>
                <span className="font-medium">{c.name}</span>
                <span className="text-muted-foreground"> · {c.role}</span>
              </>
            );
            return c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="decoration-border underline-offset-4 hover:underline"
              >
                {label}
              </a>
            ) : (
              <span key={c.name}>{label}</span>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-20">
        <SectionHeading>Projects</SectionHeading>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Two systems, both aimed at the parts of Bangla-medium schooling that
          scale worst.
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="flex flex-col">
              <Link
                href={`/projects/${project.slug}/`}
                className="group block"
                aria-label={project.title}
              >
                <div
                  className="relative overflow-hidden rounded-lg bg-muted ring-1 ring-border transition-colors group-hover:ring-primary/40"
                  style={{ aspectRatio: "4 / 3" }}
                >
                  {project.cover.src ? (
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      sizes="(min-width: 640px) 22rem, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center p-6">
                      <span className="text-xs text-muted-foreground">
                        Figure to come
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <h3 className="font-heading mt-5 text-xl font-medium tracking-tight">
                <Link
                  href={`/projects/${project.slug}/`}
                  className="hover:text-primary"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <Link
                href={`/projects/${project.slug}/`}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="border-t py-16 sm:py-20">
        <SectionHeading>How we work</SectionHeading>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {approach.map((theme) => (
            <div key={theme.title}>
              <div className="h-px w-10 bg-primary" aria-hidden />
              <h3 className="font-heading mt-4 text-base font-medium">
                {theme.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {theme.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* People */}
      <section className="border-t py-16 sm:py-20">
        <SectionHeading>People</SectionHeading>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {faculty.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t py-16 sm:py-20">
        <SectionHeading>Contact</SectionHeading>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div className="text-sm leading-relaxed">
            <p>{site.affiliation}</p>
            {site.room ? <p className="mt-1">{site.room}</p> : null}
            <p className="mt-1 text-muted-foreground">{site.location}</p>

            <div className="mt-4 flex flex-col gap-1">
              {site.email ? (
                <a
                  className="text-primary underline decoration-primary/30 hover:decoration-primary"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              ) : (
                <span className="text-muted-foreground">
                  Email address to be added.
                </span>
              )}
              {site.campusMap ? (
                <a
                  className="text-primary underline decoration-primary/30 hover:decoration-primary"
                  href={site.campusMap}
                  target="_blank"
                  rel="noreferrer"
                >
                  Campus map
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We are happy to hear from prospective students at BUET who want to
              work on Bangla language technology or on education systems, and
              from groups doing related work elsewhere. Write to one of us
              directly, and say which of the two projects you are interested in.
            </p>
            {site.socials.github ? (
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
