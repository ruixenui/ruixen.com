import FeatureHighlights from "../ruixenui/feature-highlights";

export default function FeatureHighlightsDemo() {
  const features = [
    {
      id: "item-1",
      title: "AI-Powered Automation",
      count: 24,
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png",
      description: "Streamline workflows with cutting-edge AI solutions.",
    },
    {
      id: "item-2",
      title: "Real-Time Analytics",
      count: 12,
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
      description: "Monitor metrics live and make instant decisions.",
    },
    {
      id: "item-3",
      title: "Seamless Integrations",
      count: 18,
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-01.png",
      description: "Connect with tools you already use effortlessly.",
    },
    {
      id: "item-4",
      title: "Scalable Infrastructure",
      count: 30,
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-06.png",
      description: "Grow without limits with enterprise-grade scalability.",
    },
    {
      id: "item-5",
      title: "Advanced Security",
      count: 15,
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/crm-featured.png",
      description: "Protect your data with next-gen encryption & compliance.",
    },
    {
      id: "item-6",
      title: "Collaboration Tools",
      count: 22,
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png",
      description: "Empower teams with seamless communication & sharing.",
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <FeatureHighlights features={features} />
      </div>
    </div>
  );
}
