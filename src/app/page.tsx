import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { news, researchAreas, site } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <p className="text-sm font-medium text-muted-foreground">
          {site.affiliation}
        </p>
        <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" render={<Link href="/research/" />}>
            Our research
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/publications/" />}>
            Publications
          </Button>
        </div>
      </section>

      {/* Research areas */}
      <section className="border-t py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            What we work on
          </h2>
          <Link
            href="/research/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            All areas →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {researchAreas.slice(0, 4).map((area) => (
            <Card key={area.title}>
              <CardHeader>
                <CardTitle>{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{area.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="border-t py-16">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">News</h2>
        <ul className="mt-8 space-y-4">
          {news.map((item) => (
            <li key={item.date + item.text} className="flex gap-6 text-sm">
              <span className="w-24 shrink-0 tabular-nums text-muted-foreground">
                {item.date}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="border-t py-16">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Join us
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          We are always interested in hearing from prospective students and
          collaborators. Reach out at{" "}
          <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{site.location}</p>
      </section>
    </div>
  );
}
