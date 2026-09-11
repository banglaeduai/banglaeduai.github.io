import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PersonCard } from "@/components/person-card";
import { collaborators, faculty, projects, site, team } from "@/lib/site";

// Title, description and social card come from the root layout; only the
// canonical URL is per-page. Next.js emits no canonical tag unless a page
// sets one, and setting it in the layout instead would make every page in the
// site inherit it and claim to be the homepage.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

/**
 * One organisation in the collaborators band. Logos are square emblems, so a
 * fixed square frame with `object-contain` fits all of them; an organisation
 * whose branding we cannot use yet renders as text in the same row.
 *
 * `whitespace-nowrap` matters here: a mark that breaks across two lines pulls
 * the whole row out of alignment, and the row is sized so that all four fit
 * side by side without it.
 */
function CollaboratorMark({
  collaborator: c,
}: {
  collaborator: (typeof collaborators)[number];
}) {
  const body = (
    <span className="flex items-center gap-3 whitespace-nowrap">
      {c.logo ? (
        <span className="relative size-9 shrink-0">
          <Image
            src={c.logo}
            alt={c.logoAlt ?? c.name}
            fill
            sizes="36px"
            className="object-contain"
          />
        </span>
      ) : null}
      <span className="flex flex-col leading-snug">
        <span className="font-medium">{c.name}</span>
        <span className="text-xs text-muted-foreground">{c.role}</span>
      </span>
    </span>
  );

  return c.href ? (
    <a
      href={c.href}
      target="_blank"
      rel="noreferrer"
      className="decoration-border underline-offset-4 hover:underline"
    >
      {body}
    </a>
  ) : (
    body
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="h-1 w-16 bg-primary" aria-hidden />
        <h1 className="mt-8 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/85">
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
          credibility-dense thing we can say today.

          No label in front of the row: the four marks read as what they are,
          and dropping it buys back the width that used to push the last two
          onto a second line. The band is also the one element allowed to sit
          wider than the text column, which is what lets all four fit on one
          row; it stays centred on the same axis, so the break reads as
          deliberate rather than as a stray indent. */}
      <section className="-mx-6 border-t border-b px-6 py-7 lg:-mx-24 lg:px-0">
        {/* One centred row once there is room for it; a 2x2 grid below that,
            rather than a flex row that drops a single mark onto a line of its
            own and leaves it hanging under the middle of the row above. */}
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-6 text-sm sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center">
          {collaborators.map((c) => (
            <CollaboratorMark key={c.name} collaborator={c} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 sm:py-20">
        <SectionHeading>Projects</SectionHeading>
        <p className="mt-3 text-muted-foreground">
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
                {/* Fixed 16:9 rather than each cover's own aspect, so the two
                    cards line up. Both covers are wide UI captures. */}
                <div
                  className="relative overflow-hidden rounded-lg bg-muted ring-1 ring-border transition-colors group-hover:ring-primary/40"
                  style={{ aspectRatio: "16 / 9" }}
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

      {/* People. The whole team belongs here, not only on /contact/: that page
          is deliberately unlinked from the nav, so anything that lives there
          alone is unreachable. */}
      <section className="border-t py-16 sm:py-20">
        <SectionHeading>People</SectionHeading>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {faculty.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>

        {team.length > 0 ? (
          <div className="mt-14">
            <h3 className="font-heading text-lg font-medium">Project team</h3>
            <ul className="mt-5 grid gap-x-10 gap-y-2 text-sm sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2">
              {team.map((person) => (
                <li key={person.name}>{person.name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
