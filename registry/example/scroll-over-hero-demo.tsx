import { ScrollOverHero } from "@/registry/ruixenui/scroll-over-hero";

const DASHBOARD =
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-image-01.png";

export default function ScrollOverHeroDemo() {
  return (
    <ScrollOverHero
      eyebrow={
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Real-time analytics
        </span>
      }
      title="Every metric that matters, in one view."
      description="Real-time dashboards that turn raw events into decisions — no spreadsheets, no waiting on the data team."
      actions={
        <>
          <button
            type="button"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Start free
          </button>
          <button
            type="button"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book a demo
          </button>
        </>
      }
      media={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={DASHBOARD}
          alt="Product dashboard"
          className="aspect-[1826/1007] w-full object-cover"
        />
      }
    />
  );
}
