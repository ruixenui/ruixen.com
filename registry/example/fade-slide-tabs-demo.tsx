// This is a demo file for FadeSlideTabs
// Users will see this in the preview

import FadeSlideTabs from "@/registry/ruixenui/fade-slide-tabs";

export default function Demo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <FadeSlideTabs
        defaultValue="overview"
        className="max-w-lg"
        items={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <div className="text-center">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="text-sm text-muted-foreground">
                  This is the overview section of your app.
                </p>
              </div>
            ),
          },
          {
            value: "activity",
            label: "Activity",
            content: (
              <div className="text-center">
                <h2 className="text-lg font-semibold">Activity</h2>
                <p className="text-sm text-muted-foreground">
                  Track your recent actions and updates here.
                </p>
              </div>
            ),
          },
          {
            value: "settings",
            label: "Settings",
            content: (
              <div className="text-center">
                <h2 className="text-lg font-semibold">Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Customize your preferences and configurations.
                </p>
              </div>
            ),
          },
          {
            value: "faq",
            label: "FAQ",
            content: (
              <div className="text-center">
                <h2 className="text-lg font-semibold">FAQ</h2>
                <p className="text-sm text-muted-foreground">
                  Find answers to the most common questions.
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
