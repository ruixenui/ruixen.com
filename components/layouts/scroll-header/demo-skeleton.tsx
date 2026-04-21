import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholder body content for the ScrollHeader demo pages. The demo's focus
 * is the scroll-linked header animation — real copy would distract from that,
 * so every tab page renders skeleton blocks of enough total height to make
 * the scroll interaction feel real.
 */
export function DemoSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-12">
          {/* Hero */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Two-column paragraph block */}
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            ))}
          </div>

          {/* Card block */}
          <div className="flex flex-col gap-3 rounded-lg border border-border p-6">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <div className="mt-3 grid gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-full" />
              ))}
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-lg border border-border p-5"
              >
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-11 w-32 rounded-lg" />
              <Skeleton className="h-11 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
