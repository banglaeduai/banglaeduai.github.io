import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Figure as FigureData } from "@/lib/site";

/**
 * A captioned figure that degrades to a correctly-proportioned placeholder
 * while the real asset is missing, so the layout does not shift once the
 * images land in `public/projects/`.
 */
export function Figure({
  figure,
  className,
  sizes = "(min-width: 768px) 42rem, 100vw",
  priority = false,
  /** "side" puts the caption beside a tall figure instead of under it. */
  layout = "stacked",
}: {
  figure: FigureData;
  className?: string;
  sizes?: string;
  priority?: boolean;
  layout?: "stacked" | "side";
}) {
  return (
    <figure
      className={cn(
        "min-w-0",
        layout === "side" &&
          "grid items-start gap-x-8 gap-y-3 md:grid-cols-[minmax(0,26rem)_1fr]",
        className
      )}
    >
      <div
        className="relative overflow-hidden rounded-lg bg-muted ring-1 ring-border"
        style={{ aspectRatio: figure.aspect }}
      >
        {figure.src ? (
          <Image
            src={figure.src}
            alt={figure.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain"
          />
        ) : (
          <div className="flex size-full items-center justify-center p-6">
            <span className="text-center text-xs text-muted-foreground">
              Figure to come
            </span>
          </div>
        )}
      </div>
      <figcaption
        className={cn(
          "text-sm text-muted-foreground",
          layout === "side" ? "md:pt-1" : "mt-3"
        )}
      >
        {figure.caption}
      </figcaption>
    </figure>
  );
}
