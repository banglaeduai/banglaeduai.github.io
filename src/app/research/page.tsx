import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { researchAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas and ongoing projects.",
  alternates: { canonical: "/research/" },
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Research
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Our work spans language modelling, assessment, and speech, held together
        by one question: what does it take for AI systems to actually help a
        Bangla-speaking student learn?
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {researchAreas.map((area) => (
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
    </div>
  );
}
