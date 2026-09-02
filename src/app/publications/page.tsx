import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { publications } from "@/lib/site";

export const metadata: Metadata = {
  title: "Publications",
  description: "Papers and preprints from the lab.",
};

export default function PublicationsPage() {
  // Group by year, newest first.
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Publications
      </h1>

      <div className="mt-12 space-y-12">
        {years.map((year) => (
          <section key={year}>
            <h2 className="font-heading text-sm font-semibold tracking-widest text-muted-foreground">
              {year}
            </h2>
            <Separator className="mt-3" />
            <ul className="mt-6 space-y-8">
              {publications
                .filter((p) => p.year === year)
                .map((pub) => (
                  <li key={pub.title}>
                    <p className="font-medium">{pub.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pub.authors}
                    </p>
                    <p className="text-sm italic text-muted-foreground">
                      {pub.venue}
                    </p>
                    {pub.links?.length ? (
                      <div className="mt-2 flex flex-wrap gap-3 text-sm">
                        {pub.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="underline underline-offset-4 hover:no-underline"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
