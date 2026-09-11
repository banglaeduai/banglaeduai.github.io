import type { Metadata } from "next";
import Link from "next/link";

import { PersonCard } from "@/components/person-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faculty, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${site.name} at the ${site.affiliationShort}.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; {site.shortName}
      </Link>

      <header className="mt-8 max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/85">
          We are happy to hear from prospective students at BUET who want to
          work on Bangla language technology or on education systems, and from
          groups doing related work elsewhere. Write to one of us directly, and
          say which of the two projects you are interested in.
        </p>
      </header>

      <section className="mt-14 grid gap-10 border-t pt-10 sm:grid-cols-2">
        <div className="text-sm leading-relaxed">
          <h2 className="font-heading text-lg font-medium">Where we are</h2>
          <p className="mt-4">{site.affiliation}</p>
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

        <div className="text-sm leading-relaxed">
          <h2 className="font-heading text-lg font-medium">Elsewhere</h2>
          <p className="mt-4 text-muted-foreground">
            Code and released artefacts, as they become public, go on GitHub.
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
      </section>

      {/* The people are the contact route that actually works, so they belong
          on this page and not only on the homepage. */}
      <section className="mt-16 border-t pt-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Who to write to
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {faculty.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </section>
    </div>
  );
}
