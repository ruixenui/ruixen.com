import { PreviewSwitchHero } from "@/registry/ruixenui/preview-switch-hero";
import { Battery, Signal, Wifi } from "lucide-react";

/* ── minimal phone mock (iPhone frame + a single line of copy) ──── */

function PhonePanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    // iPhone-style frame with a soft bottom fade so it dissolves into the page.
    <div className="relative mx-auto w-full max-w-[400px] px-2 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
      {/* outer bezel */}
      <div className="overflow-hidden rounded-t-[2.5rem] bg-background/75 px-2 pt-2 shadow-md shadow-black/[0.06] ring-1 ring-foreground/10">
        {/* screen — fixed height so switching tabs never resizes the phone */}
        <div className="h-[320px] overflow-hidden rounded-t-[2rem] bg-foreground/[0.03] px-6 ring-1 ring-foreground/10 dark:bg-black">
          {/* status bar */}
          <div className="flex items-center justify-between py-2 text-xs text-foreground">
            <span className="font-semibold">9:41</span>
            <div className="flex items-end gap-1">
              <Signal aria-hidden className="size-4" />
              <Wifi aria-hidden className="size-[18px]" />
              <Battery aria-hidden className="-mb-px size-5" />
            </div>
          </div>

          {/* grabber */}
          <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-foreground/15" />

          {/* small text */}
          <div className="px-2 pt-12 text-center">
            <p className="text-2xl font-semibold tracking-tight text-foreground/80">
              {title}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PANELS = [
  {
    title: "Pick a time",
    subtitle: "Guests book in two taps — no account needed.",
  },
  {
    title: "Always in sync",
    subtitle: "Reads every calendar so you're never double-booked.",
  },
  {
    title: "Zero no-shows",
    subtitle: "Automatic email and SMS nudges before each call.",
  },
  {
    title: "Round-robin",
    subtitle: "Route each booking to whoever's free first.",
  },
];

/* ── client logos (monochrome, theme-adaptive) ─────────────────── */

const LOGO_CLS =
  "w-auto opacity-65 transition-opacity hover:opacity-100 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)]";

const CLIENT_LOGOS = [
  {
    name: "Percy",
    logo: (
      <img src="/logos/percy.svg" alt="Percy" className={`h-5 ${LOGO_CLS}`} />
    ),
  },
  {
    name: "Bitbucket",
    logo: (
      <img
        src="/logos/bitbucket.svg"
        alt="Bitbucket"
        className={`h-4 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Gumroad",
    logo: (
      <img
        src="/logos/gumroad.svg"
        alt="Gumroad"
        className={`h-4 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Gong",
    logo: (
      <img src="/logos/gong.svg" alt="Gong" className={`h-6 ${LOGO_CLS}`} />
    ),
  },
  {
    name: "Geckoboard",
    logo: (
      <img
        src="/logos/geckoboard.svg"
        alt="Geckoboard"
        className={`h-5 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Ternary",
    logo: (
      <img
        src="/logos/ternary.svg"
        alt="Ternary"
        className={`h-5 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Wyre",
    logo: (
      <img src="/logos/wyre.svg" alt="Wyre" className={`h-5 ${LOGO_CLS}`} />
    ),
  },
];

/* ── demo ─────────────────────────────────────────────────────────── */

export default function PreviewSwitchHeroDemo() {
  const tabs = [
    { id: "booking", label: "Booking" },
    { id: "availability", label: "Availability" },
    { id: "reminders", label: "Reminders" },
    { id: "team", label: "Team" },
  ].map((t, i) => ({ ...t, media: <PhonePanel {...PANELS[i]} /> }));

  return (
    <PreviewSwitchHero
      badge={{ tag: "New", label: "Round-robin scheduling for teams" }}
      title="Meetings booked without the back-and-forth"
      description="Share one link, sync every calendar, and let guests pick a time that actually works — no email ping-pong."
      ratings={[
        { source: "Google", score: "4.6" },
        { source: "Trustpilot", score: "4.9" },
        { source: "G2", score: "4.3" },
      ]}
      emailLabel="Enter email address — free forever plan."
      emailPlaceholder="you@company.com"
      primaryCta={{ label: "Get your link" }}
      secondaryCta={{ label: "See a demo", href: "#" }}
      avatars={[
        { initials: "AK" },
        { initials: "MJ" },
        { initials: "RP" },
        { initials: "SL" },
        { initials: "TD" },
        { initials: "EV" },
      ]}
      socialProof="loved by 30,000+ teams"
      tabs={tabs}
      logos={CLIENT_LOGOS}
    />
  );
}
