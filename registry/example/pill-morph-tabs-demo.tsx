import PillMorphTabs from "@/registry/ruixenui/pill-morph-tabs";

export default function DemoOne() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <PillMorphTabs
        defaultValue="overview"
        className="w-full max-w-md"
        items={[
          {
            value: "overview",
            label: "Overview",
            panel: (
              <div className="p-4 text-left">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="text-sm text-muted-foreground">
                  This is the overview section of your app.
                </p>
              </div>
            ),
          },
          {
            value: "features",
            label: "Features",
            panel: (
              <div className="p-4 text-left">
                <h2 className="text-lg font-semibold">Features</h2>
                <p className="text-sm text-muted-foreground">
                  Cool features listed here.
                </p>
              </div>
            ),
          },
          {
            value: "pricing",
            label: "Pricing",
            panel: (
              <div className="p-4 text-left">
                <h2 className="text-lg font-semibold">Pricing</h2>
                <p className="text-sm text-muted-foreground">
                  Choose the best plan for you.
                </p>
              </div>
            ),
          },
          {
            value: "faq",
            label: "FAQ",
            panel: (
              <div className="p-4 text-left">
                <h2 className="text-lg font-semibold">FAQ</h2>
                <p className="text-sm text-muted-foreground">
                  Find answers to common questions here.
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
