import { TabbedHeroSection } from "@/registry/ruixenui/tabbed-hero-section";
import { Globe, BarChart3, Sparkles, Layers } from "lucide-react";

/* ── demo ─────────────────────────────────────────────────────── */

export default function TabbedHeroSectionDemo() {
  return (
      <TabbedHeroSection
        title="Ship products your customers will love"
        description="From analytics to AI-powered workflows, everything your team needs to build, measure, and iterate — faster than ever."
        primaryAction={{ href: "#", label: "Get Started" }}
        secondaryAction={{ href: "#", label: "Book a Demo" }}
        tabs={[
          { icon: <Globe />, label: "Overview" },
          { icon: <BarChart3 />, label: "Analytics" },
          { icon: <Sparkles />, label: "Workflows" },
          { icon: <Layers />, label: "Integrations" },
        ]}
        activeTab={1}
        trustedBy={{
          description: (
            <p>
              Trusted by teams at{" "}
              <span className="text-foreground font-medium">
                YC startups,
              </span>{" "}
              <span className="text-foreground font-medium">
                Fortune 500 companies,
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">
                leading agencies
              </span>
            </p>
          ),
          logos: [
            <span
              key="vercel"
              className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
            >
              Vercel
            </span>,
            <span
              key="linear"
              className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
            >
              Linear
            </span>,
            <span
              key="notion"
              className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
            >
              Notion
            </span>,
            <span
              key="stripe"
              className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
            >
              Stripe
            </span>,
            <span
              key="figma"
              className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
            >
              Figma
            </span>,
          ],
        }}
      />
  );
}
