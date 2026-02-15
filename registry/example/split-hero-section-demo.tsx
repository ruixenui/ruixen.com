import { SplitHeroSection } from "@/registry/ruixenui/split-hero-section";

export default function SplitHeroSectionDemo() {
  return (
    <SplitHeroSection
      title="The analytics platform for modern teams"
      description="One tool that does it all. Monitor, analyze, and optimize—right inside your workflow."
      primaryAction={{ href: "#link", label: "Start free trial" }}
      secondaryAction={{ href: "#link", label: "Talk to sales" }}
      stats={[
        {
          value: "99.9",
          unit: "%",
          label: (
            <>
              <strong className="font-medium text-foreground">
                Uptime guarantee
              </strong>{" "}
              across all regions.
            </>
          ),
        },
        {
          value: "3",
          unit: "ms",
          label: (
            <>
              <strong className="font-medium text-foreground">
                Median latency
              </strong>{" "}
              for real-time queries.
            </>
          ),
        },
      ]}
      trustedBy={{
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
            key="stripe"
            className="text-[18px] font-bold tracking-tight whitespace-nowrap"
          >
            stripe
          </span>,
          <span
            key="notion"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Notion
          </span>,
          <span
            key="supabase"
            className="text-[14px] font-bold tracking-tight whitespace-nowrap"
          >
            Supabase
          </span>,
          <span
            key="figma"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Figma
          </span>,
          <span
            key="raycast"
            className="text-[14px] font-semibold tracking-tight whitespace-nowrap"
          >
            Raycast
          </span>,
          <span
            key="resend"
            className="text-[15px] font-semibold tracking-tight whitespace-nowrap"
          >
            Resend
          </span>,
        ],
      }}
    />
  );
}
