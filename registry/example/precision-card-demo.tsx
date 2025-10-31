import PrecisionCard from "@/registry/ruixenui/precision-card";

export default function PrecisionDemoPage() {
  return (
    <div className="p-10 flex items-center justify-center min-h-screen">
      <PrecisionCard
        leftSubtitle="Why Reliability Matters"
        leftTitle="Building next-gen platforms with unmatched stability"
        leftDescription="Modern digital systems demand reliability and scalability from day one. With adaptive infrastructure and intelligent monitoring, we ensure every deployment performs flawlessly at scale."
        tags={["Scalability", "Resilience", "Automation", "Cloud", "Security"]}
        leftButton="Get Started"
        rightTitle="Redefining Digital Excellence."
        rightDescription="Empowering teams to innovate faster, deploy safer, and deliver exceptional user experiences — all powered by automation and real-time intelligence."
        rightItems={["Uptime", "Scalability", "Innovation", "Performance"]}
        certificationText="ISO Certified Infrastructure"
        rightButton="Explore Solutions →"
      />
    </div>
  );
}
