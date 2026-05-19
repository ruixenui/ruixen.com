"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Play, Quote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface Testimonial {
  name: string;
  designation: string;
  title?: string;
  profile?: string;
  content?: string;
  mediaUrl?: string;
  thumbnail?: string;
}

export interface MultiMediaTestimonialProps {
  items: Testimonial[];
  /** Small monospace kicker rendered above the heading. */
  eyebrow?: React.ReactNode;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  /**
   * Collapsed wall height in px before the "show more" button appears.
   * Set to `0` to render the full wall without a collapse affordance.
   * Default `900`.
   */
  collapsedHeight?: number;
  /** Label for the expand button. Default "Show more testimonials". */
  expandLabel?: React.ReactNode;
  /** Label for the collapse button (shown when expanded). Default "Show less". */
  collapseLabel?: React.ReactNode;
}

function estimateCardHeight(t: Testimonial): number {
  let h = 110;
  if (t.title) h += 28;
  if (t.content) h += Math.max(40, Math.ceil(t.content.length / 38) * 22);
  if (t.mediaUrl) h += 520;
  else if (t.thumbnail) h += 360;
  return h;
}

function distributeToColumns<T>(
  items: T[],
  cols: number,
  weight: (item: T) => number,
): T[][] {
  const buckets: T[][] = Array.from({ length: cols }, () => []);
  const heights = new Array<number>(cols).fill(0);
  for (const item of items) {
    let minIdx = 0;
    for (let i = 1; i < cols; i++) {
      if (heights[i] < heights[minIdx]) minIdx = i;
    }
    buckets[minIdx].push(item);
    heights[minIdx] += weight(item);
  }
  return buckets;
}

function useColumnCount(): number {
  const [cols, setCols] = React.useState(1);
  React.useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => {
      if (lg.matches) setCols(3);
      else if (sm.matches) setCols(2);
      else setCols(1);
    };
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

export function MultiMediaTestimonial({
  items,
  eyebrow,
  heading,
  description,
  className,
  collapsedHeight = 900,
  expandLabel = "Show more testimonials",
  collapseLabel = "Show less",
}: MultiMediaTestimonialProps) {
  const cols = useColumnCount();
  const columns = React.useMemo(
    () => distributeToColumns(items, cols, estimateCardHeight),
    [items, cols],
  );

  const [expanded, setExpanded] = React.useState(false);
  const [naturalHeight, setNaturalHeight] = React.useState<number | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setNaturalHeight(el.scrollHeight);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [columns]);

  const collapseEnabled = collapsedHeight > 0;
  const needsCollapse =
    collapseEnabled &&
    naturalHeight !== null &&
    naturalHeight > collapsedHeight;
  const showCollapseUI = needsCollapse;

  let maxHeight: string | undefined;
  if (!collapseEnabled) {
    maxHeight = undefined;
  } else if (expanded) {
    maxHeight = naturalHeight !== null ? `${naturalHeight}px` : undefined;
  } else if (naturalHeight !== null && naturalHeight <= collapsedHeight) {
    maxHeight = `${naturalHeight}px`;
  } else {
    maxHeight = `${collapsedHeight}px`;
  }

  return (
    <section className={cn("px-6 py-16", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || heading || description) && (
          <div className="mb-14 text-center">
            {eyebrow && (
              <p className="mb-8 font-mono text-sm text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-6 max-w-md text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No testimonials yet.
          </p>
        ) : (
          <>
            <div className="relative">
              <div
                className="overflow-hidden transition-[max-height] duration-500 ease-out motion-reduce:transition-none"
                style={{ maxHeight }}
              >
                <div
                  ref={contentRef}
                  className="grid items-start gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  }}
                >
                  {columns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                      {col.map((item, i) => (
                        <MultiMediaTestimonialCard
                          key={`${item.name}-${ci}-${i}`}
                          testimonial={item}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {showCollapseUI && (
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-500 motion-reduce:transition-none",
                    expanded ? "opacity-0" : "opacity-100",
                  )}
                />
              )}
            </div>

            {showCollapseUI && (
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="group rounded-full px-6"
                >
                  <span>{expanded ? collapseLabel : expandLabel}</span>
                  {expanded ? (
                    <ChevronUp className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export function MultiMediaTestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const { name, profile, title, designation, content, mediaUrl, thumbnail } =
    testimonial;

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [open]);

  const initial = name.charAt(0).toUpperCase();

  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-md",
        className,
      )}
    >
      {title && (
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {title}
        </h3>
      )}

      {mediaUrl ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label={`Play testimonial video from ${name}`}
              className="group/trigger relative block w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {thumbnail ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={thumbnail}
                  alt={name}
                  loading="lazy"
                  className="block h-auto w-full transition-transform duration-500 group-hover/trigger:scale-105"
                />
              ) : (
                <video
                  src={`${mediaUrl}#t=1`}
                  preload="metadata"
                  muted
                  playsInline
                  tabIndex={-1}
                  aria-hidden
                  className="pointer-events-none block h-auto w-full"
                />
              )}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/10 transition-colors duration-300 group-hover/trigger:bg-foreground/25">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/85 ring-1 ring-foreground/10 backdrop-blur-md transition-transform duration-300 group-hover/trigger:scale-110">
                  <Play className="h-6 w-6 translate-x-[1px] fill-foreground text-foreground" />
                </span>
              </div>
            </button>
          </DialogTrigger>

          <DialogContent
            className="block w-fit max-w-[95vw] gap-0 overflow-hidden border-0 bg-black p-0 text-white shadow-none sm:max-w-[min(95vw,1280px)]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogTitle className="sr-only">
              Video testimonial from {name}
            </DialogTitle>
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster={thumbnail}
              className="block h-auto max-h-[90vh] w-auto max-w-[95vw] bg-black"
            >
              <source src={mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </DialogContent>
        </Dialog>
      ) : thumbnail ? (
        <div className="relative overflow-hidden rounded-xl border border-border/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={name}
            loading="lazy"
            className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <Quote
          aria-hidden
          className="h-6 w-6 shrink-0 text-muted-foreground/40"
        />
      )}

      {content && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {content}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 ring-1 ring-foreground/10">
          {profile && <AvatarImage src={profile} alt={name} />}
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {designation}
          </p>
        </div>
      </div>
    </article>
  );
}

export default MultiMediaTestimonial;
