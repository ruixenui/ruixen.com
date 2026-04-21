"use client";

import * as React from "react";
import { CheckIcon, ClipboardIcon, SquareArrowOutUpRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ComponentSource } from "@/components/component-source";

interface LayoutPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Registry name (e.g. `layouts-scroll-header`). */
  name: string;
  /** URL the iframe loads for the Preview tab. */
  previewHref: string;
  /** Frame aspect ratio (default 16/10). */
  aspect?: string;
  /** Virtual viewport width the iframe renders at before CSS-scaling to fit
   *  the card. Layouts that need a wide desktop canvas (calendar sidebars,
   *  multi-column grids) look correct when this stays ≥ 1440. */
  virtualWidth?: number;
}

/**
 * Iframe rendered at a fixed desktop-width virtual viewport, then CSS-scaled
 * via `transform: scale(w / virtualWidth)` to fit its container. Keeps the
 * iframe interactive while letting desktop-designed layouts render at their
 * actual breakpoints instead of collapsing into a narrow squish.
 */
function ScaledIframe({
  src,
  title,
  aspectClassName,
  virtualWidth = 1440,
}: {
  src: string;
  title: string;
  aspectClassName: string;
  virtualWidth?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / virtualWidth);
    };
    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(el);
    return () => observer.disconnect();
  }, [virtualWidth]);

  const inverse = scale ? 1 / scale : 1;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-background", aspectClassName)}
    >
      {scale !== null && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="absolute left-0 top-0 block border-0 bg-background"
          style={{
            width: `${inverse * 100}%`,
            height: `${inverse * 100}%`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      )}
    </div>
  );
}

export function LayoutPreview({
  name,
  previewHref,
  aspect = "aspect-[16/10]",
  virtualWidth = 1440,
  className,
  ...props
}: LayoutPreviewProps) {
  const [copied, setCopied] = React.useState(false);
  const installCommand = `npx shadcn@latest add "https://ruixen.com/r/${name}.json"`;

  const onCopyInstall = React.useCallback(() => {
    navigator.clipboard.writeText(installCommand).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [installCommand]);

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="overflow-hidden rounded-2xl border">
          <div className="flex items-center justify-between bg-muted/50 px-4">
            <TabsList className="h-auto gap-3.5 rounded-none bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="h-auto rounded-none border-0 bg-transparent px-0 py-2 text-sm font-medium text-muted-foreground shadow-none ring-0 ring-offset-0 transition-colors hover:text-accent-foreground focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="h-auto rounded-none border-0 bg-transparent px-0 py-2 text-sm font-medium text-muted-foreground shadow-none ring-0 ring-offset-0 transition-colors hover:text-accent-foreground focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:border-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onCopyInstall}
                title="Copy install command"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {copied ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                ) : (
                  <ClipboardIcon className="h-3.5 w-3.5" />
                )}
                <span className="sr-only">Copy install command</span>
              </button>
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Open in new tab"
              >
                <SquareArrowOutUpRight className="h-3.5 w-3.5" />
                <span className="sr-only">Open in new tab</span>
              </a>
            </div>
          </div>

          <TabsContent value="preview" className="mt-0">
            <ScaledIframe
              src={previewHref}
              title={`${name} preview`}
              aspectClassName={aspect}
              virtualWidth={virtualWidth}
            />
          </TabsContent>

          <TabsContent value="code" className="mt-0">
            <div className="max-h-[720px] overflow-auto rounded-t-2xl bg-background p-4">
              <ComponentSource name={name} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
