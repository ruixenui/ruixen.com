import { PricingLandingHero } from "@/registry/ruixenui/pricing-landing-hero";

/* ── demo ─────────────────────────────────────────────────────── */

export default function PricingLandingHeroDemo() {
  return (
    <PricingLandingHero
      title={
        <>
          Ship your SaaS
          <br />
          in a weekend
        </>
      }
      description="A production-ready React boilerplate with auth, billing, and email flows. Skip 200 hours of setup and start shipping."
      phone={{
        time: "9:41",
        items: [
          {
            title: "Stripe billing",
            description: "Subscriptions wired up in minutes.",
          },
          {
            title: "Magic link auth",
            description: "Email, OAuth, and sessions handled.",
          },
          {
            title: "Live by Monday",
            description: "Your MVP online before the next standup.",
          },
        ],
      }}
      price={{ current: "$149", original: "$399" }}
      availability="Lifetime deal — ends Sunday"
      primaryAction={{ label: "Grab the boilerplate", href: "#" }}
      secondaryAction={{ label: "See what's inside", href: "#" }}
      trustedBy={{
        heading: "Used by builders shipping at",
        logos: [
          <span
            key="linear"
            className="text-base font-semibold tracking-tight whitespace-nowrap"
          >
            Linear
          </span>,
          <span
            key="vercel"
            className="text-base font-semibold tracking-tight whitespace-nowrap"
          >
            ▲ Vercel
          </span>,
          <span
            key="raycast"
            className="text-base font-semibold tracking-tight whitespace-nowrap"
          >
            Raycast
          </span>,
        ],
      }}
    />
  );
}
