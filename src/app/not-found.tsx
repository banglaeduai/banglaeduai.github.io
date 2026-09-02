import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-6 py-32">
      <p className="font-heading text-sm font-semibold tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 text-muted-foreground">
        That page does not exist, or it has moved.
      </p>
      <Button size="lg" className="mt-8" render={<Link href="/" />}>
        Back to home
      </Button>
    </div>
  );
}
