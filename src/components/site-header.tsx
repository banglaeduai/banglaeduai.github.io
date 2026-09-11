import Link from "next/link";

import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-1 px-6 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
        <Link
          href="/"
          className="font-heading text-base font-semibold tracking-tight"
        >
          {site.shortName}
        </Link>

        {/* No hamburger: four links fit, and a menu would mean shipping a
            client component to an otherwise fully static export. */}
        <nav className="-mx-3 flex items-center gap-1 overflow-x-auto text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 whitespace-nowrap text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
