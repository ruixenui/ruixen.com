import { ArcRevealHero } from "@/registry/ruixenui/arc-reveal-hero";

export default function ArcRevealHeroDemo() {
  return (
    <ArcRevealHero>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          First we listen. Then we ship.
        </h1>
        <p className="max-w-md text-balance text-base text-muted-foreground md:text-lg">
          A studio for teams who want the quiet kind of software — considered,
          fast, and built to last.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Start a project
          </button>
          <button
            type="button"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
          >
            See our work
          </button>
        </div>
      </div>
    </ArcRevealHero>
  );
}
