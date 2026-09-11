import Image from "next/image";

import type { Person } from "@/lib/site";

/** "Rifat Shahriyar" -> "RS". Shown while there is no photo. */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/**
 * A person with their photo, bio and links. Every link is optional and simply
 * not rendered when its field is empty, so an unconfirmed email address costs
 * nothing but the line it would have occupied.
 */
export function PersonCard({ person }: { person: Person }) {
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
        {person.role ? (
          <p className="text-sm text-muted-foreground">{person.role}</p>
        ) : null}
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
          {person.link ? (
            <a
              className="text-primary underline decoration-primary/30 hover:decoration-primary"
              href={person.link}
              target="_blank"
              rel="noreferrer"
            >
              BUET profile
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
