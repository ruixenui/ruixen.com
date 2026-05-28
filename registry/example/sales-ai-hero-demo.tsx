import { SalesAiHero } from "@/registry/ruixenui/sales-ai-hero";

/* ── engagement dot-tracks for the floating card ─────────────────── */

type Mark = { x: string; width: number; tone: string };

const TOP_MARKS: ReadonlyArray<Mark> = [
  { x: "4%", width: 6, tone: "bg-sky-500" },
  { x: "14%", width: 18, tone: "bg-emerald-500" },
  { x: "32%", width: 22, tone: "bg-pink-500" },
  { x: "50%", width: 6, tone: "bg-emerald-500" },
  { x: "56%", width: 6, tone: "bg-emerald-500" },
  { x: "66%", width: 6, tone: "bg-sky-500" },
  { x: "72%", width: 6, tone: "bg-sky-500" },
  { x: "86%", width: 18, tone: "bg-emerald-500" },
];

const BOTTOM_MARKS: ReadonlyArray<Mark> = [
  { x: "4%", width: 6, tone: "bg-emerald-500" },
  { x: "16%", width: 22, tone: "bg-pink-500" },
  { x: "38%", width: 22, tone: "bg-sky-500" },
  { x: "54%", width: 6, tone: "bg-sky-500" },
  { x: "62%", width: 6, tone: "bg-sky-500" },
  { x: "70%", width: 18, tone: "bg-pink-500" },
  { x: "88%", width: 14, tone: "bg-emerald-500" },
];

function DotTrack({ marks }: { marks: ReadonlyArray<Mark> }) {
  return (
    <div className="relative mt-2 h-1.5 rounded-full bg-muted">
      {marks.map((m, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute top-0 h-1.5 rounded-full ${m.tone}`}
          style={{ left: m.x, width: `${m.width}px` }}
        />
      ))}
    </div>
  );
}

function Initials({ children }: { children: string }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
      {children}
    </span>
  );
}

/* ── inline analytics mock (self-contained, theme-aware) ─────────── */

const STATS = [
  { label: "Pipeline", value: "$1.4M" },
  { label: "Win rate", value: "63%" },
  { label: "Replies", value: "1,208" },
];

const BARS = [38, 52, 44, 67, 58, 80, 72, 95, 64];

function DashboardMock() {
  return (
    <div className="absolute inset-0 flex flex-col p-5 sm:p-6">
      {/* window chrome */}
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-3 h-2.5 w-28 rounded-full bg-foreground/10" />
      </div>

      {/* stat tiles */}
      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-background/70 p-3 ring-1 ring-border/60"
          >
            <div className="text-[11px] text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-base font-semibold text-foreground sm:text-lg">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* bar chart */}
      <div className="mt-auto flex h-20 items-end gap-1.5 sm:h-28 sm:gap-2">
        {BARS.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-md ${
              i === BARS.length - 2 ? "bg-foreground/70" : "bg-foreground/15"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── demo ─────────────────────────────────────────────────────────── */

export default function SalesAiHeroDemo() {
  return (
    <SalesAiHero
      announcement={{
        label: "New — AI replies that sound like your best rep",
        href: "#",
      }}
      title={
        <>
          Turn every conversation <br className="hidden md:block" />
          into your next closed deal.
        </>
      }
      description="Sales AI that drafts replies, scores intent, and surfaces the next best action — so your team spends time selling, not searching."
      leftMedia={
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent"
          />
          {/* live badge */}
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/80 px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-border/60 backdrop-blur sm:left-4 sm:top-4">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Live engagement
          </div>
          {/* floating engagement card */}
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-card p-2.5 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.18)] ring-1 ring-border/60 sm:inset-x-4 sm:bottom-4 sm:p-3">
            <div className="flex items-center gap-2">
              <Initials>JT</Initials>
              <span className="text-[13px] font-semibold text-foreground">
                Jenifer Tan
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-[13px] text-foreground">95% engaged</span>
            </div>
            <DotTrack marks={TOP_MARKS} />

            <div className="mt-3 flex items-center gap-2">
              <Initials>AM</Initials>
              <span className="text-[13px] font-semibold text-foreground">
                Andrew M.
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-[13px] text-foreground">75% engaged</span>
            </div>
            <DotTrack marks={BOTTOM_MARKS} />
          </div>
        </>
      }
      rightMedia={
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
          />
          <DashboardMock />
        </>
      }
      trustedBy={{
        prefix: "Trusted by revenue teams at ",
        highlight: "fast-growing",
        suffix: " companies",
        logos: [
          { name: "Northwind" },
          { name: "Lumina" },
          { name: "Apex" },
          { name: "Cobalt" },
          { name: "Meridian" },
        ],
      }}
    />
  );
}
