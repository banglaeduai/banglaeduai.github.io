import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Back to home
      </Link>
    </div>
  );
}
