import { site } from "@/lib/site";

// No "Last updated" line: a date in the footer ages the site the moment it
// stops being bumped, and `site.lastUpdated` is no longer rendered anywhere.
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
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
        </div>
      </div>
    </footer>
  );
}
