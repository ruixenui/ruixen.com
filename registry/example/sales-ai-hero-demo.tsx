import { SalesAiHero } from "@/registry/ruixenui/sales-ai-hero";

/* ── tiny inline pieces for the portrait overlay card ─────────────── */

type Mark = { x: string; width: number; color: string };

const TOP_MARKS: ReadonlyArray<Mark> = [
  { x: "4%", width: 6, color: "#3b82f6" },
  { x: "14%", width: 18, color: "#34d399" },
  { x: "32%", width: 22, color: "#ec4899" },
  { x: "50%", width: 6, color: "#34d399" },
  { x: "56%", width: 6, color: "#34d399" },
  { x: "66%", width: 6, color: "#3b82f6" },
  { x: "72%", width: 6, color: "#3b82f6" },
  { x: "86%", width: 18, color: "#34d399" },
];

const BOTTOM_MARKS: ReadonlyArray<Mark> = [
  { x: "4%", width: 6, color: "#34d399" },
  { x: "16%", width: 22, color: "#ec4899" },
  { x: "38%", width: 22, color: "#3b82f6" },
  { x: "54%", width: 6, color: "#3b82f6" },
  { x: "62%", width: 6, color: "#3b82f6" },
  { x: "70%", width: 18, color: "#ec4899" },
  { x: "88%", width: 14, color: "#34d399" },
];

function DotTrack({ marks }: { marks: ReadonlyArray<Mark> }) {
  return (
    <div className="relative mt-2 h-1.5 rounded-full bg-zinc-100">
      {marks.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute top-0 h-1.5 rounded-full"
          style={{
            left: m.x,
            width: `${m.width}px`,
            backgroundColor: m.color,
          }}
        />
      ))}
    </div>
  );
}

/* ── demo ─────────────────────────────────────────────────────────── */

export default function SalesAiHeroDemo() {
  return (
    <SalesAiHero
      announcement={{
        label: "240+ Marketing Blocks Now Live In v4",
        href: "https://ruixen.com/docs",
      }}
      title={
        <>
          Ship landing pages <br className="hidden md:block" />
          that look like 2026.
        </>
      }
      description="Heroes that earn the click. Pricing tables that close the deal. Footers customers actually read — every block your modern landing page needs, in one place."
      leftMedia={
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ruixen.com/testimonial-images/testimonial-01.jpg"
            alt="Customer portrait"
            className="absolute inset-0 size-full object-cover object-top"
          />
          <div className="absolute -bottom-3 -right-3 left-[22%] rounded-2xl bg-white p-2.5 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5 sm:-bottom-4 sm:-right-4 sm:left-[26%] sm:p-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ruixen.com/avatar-images/avatar-01.jpg"
                alt=""
                className="size-6 shrink-0 rounded-full object-cover"
              />
              <span className="text-[13px] font-semibold text-zinc-900">
                Jenifer Tim
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-[13px] text-zinc-900">95% Engagement</span>
            </div>
            <DotTrack marks={TOP_MARKS} />

            <div className="mt-3 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ruixen.com/avatar-images/avatar-03.jpg"
                alt=""
                className="size-6 shrink-0 rounded-full object-cover"
              />
              <span className="text-[13px] font-semibold text-zinc-900">
                Andrew
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-[13px] text-zinc-900">75% Engagement</span>
            </div>
            <DotTrack marks={BOTTOM_MARKS} />
          </div>
        </>
      }
      rightMedia={
        <>
          {/* pink gradient matte */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,#ffc6db_0%,transparent_55%),radial-gradient(120%_80%_at_85%_25%,#ef4f97_0%,transparent_55%),radial-gradient(140%_90%_at_50%_100%,#fde6ee_0%,transparent_70%),linear-gradient(180deg,#fbd9e7_0%,#fff3f8_100%)]"
          />
          {/* faint corner-frame hint */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 top-5 h-12 w-12 rounded-tl-2xl border-l border-t border-white/55"
          />
          {/* dashboard screenshot, offset so the matte peeks at top-left
              and the bottom-right bleeds past the rounded clip */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ruixen.com/dashboard-images/dashboard-01.png"
            alt="Dashboard overview"
            className="absolute left-[6%] top-[12%] w-[108%] max-w-none rounded-tl-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
          />
        </>
      }
      trustedBy={{
        prefix: "Powered By ",
        highlight: "240+ Sections",
        suffix: " Across 4 Registry Variants For Every shadcn Stack",
        logos: [
          { name: "Cosmos", src: "https://ruixen.com/logos/cosmos.svg" },
          {
            name: "Geckoboard",
            src: "https://ruixen.com/logos/geckoboard.svg",
          },
          { name: "Gong", src: "https://ruixen.com/logos/gong.svg" },
          { name: "Parade", src: "https://ruixen.com/logos/parade.svg" },
          { name: "Ternary", src: "https://ruixen.com/logos/ternary.svg" },
        ],
      }}
    />
  );
}
