import { SalesAiHero } from "@/registry/ruixenui/sales-ai-hero";

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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/testimonial-images/testimonial-01.jpg"
          alt="Sales rep on a customer call"
          className="absolute inset-0 size-full object-cover object-top"
        />
      }
      rightMedia={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/dashboard-images/dashboard-image-01.png"
          alt="Sales analytics dashboard"
          className="absolute inset-0 size-full object-cover object-left-top"
        />
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
