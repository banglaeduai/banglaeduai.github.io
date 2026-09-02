import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="hover:text-foreground" href={`mailto:${site.email}`}>
            {site.email}
          </a>
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
          {site.socials.scholar ? (
            <a
              className="hover:text-foreground"
              href={site.socials.scholar}
              target="_blank"
              rel="noreferrer"
            >
              Scholar
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
