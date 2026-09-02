import type { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { alumni, people, type Person } from "@/lib/site";

export const metadata: Metadata = {
  title: "People",
  description: "Members of the lab.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function PersonCard({ person }: { person: Person }) {
  const body = (
    <>
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-muted">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-lg font-medium text-muted-foreground">
            {initials(person.name)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-medium">{person.name}</p>
        <p className="text-sm text-muted-foreground">{person.role}</p>
        {person.interests ? (
          <p className="mt-1 text-sm text-muted-foreground">{person.interests}</p>
        ) : null}
      </div>
    </>
  );

  if (person.link) {
    return (
      <a
        href={person.link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-5 rounded-lg p-3 -m-3 transition-colors hover:bg-accent"
      >
        {body}
      </a>
    );
  }

  return <div className="flex items-center gap-5">{body}</div>;
}

export default function PeoplePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        People
      </h1>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {people.map((person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </div>

      {alumni.length > 0 ? (
        <>
          <Separator className="my-14" />
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Alumni
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {alumni.map((person) => (
              <li key={person.name}>
                <span className="text-foreground">{person.name}</span> — {person.role}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
