import { site } from "@/lib/site";

/** Renders "2 September 2026" from the ISO date in `site.lastUpdated`. */
function formatUpdated(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <div>
          <p className="font-medium text-foreground">{site.name}</p>
          <p className="mt-1">{site.affiliationShort}</p>
          <p className="mt-1">{site.location}</p>
        </div>

        <div className="flex flex-col gap-1 sm:items-end">
          {site.email ? (
            <a className="hover:text-foreground" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          ) : null}
          {site.socials.github ? (
            <a
              className="hover:text-foreground"
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          ) : null}
          <p className="mt-3">Last updated {formatUpdated(site.lastUpdated)}</p>
        </div>
      </div>
    </footer>
  );
}
