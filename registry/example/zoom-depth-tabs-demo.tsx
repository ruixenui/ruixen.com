import ZoomDepthTabs from "@/registry/ruixenui/zoom-depth-tabs";

export default function DemoOne() {
  return (
    <ZoomDepthTabs
      defaultValue="overview"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">Dashboard Overview</h2>
              <p className="text-muted-foreground">
                Here you can see a summary of your analytics, quick stats, and
                recent activity.
              </p>
            </div>
          ),
        },
        {
          value: "reports",
          label: "Reports",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">Reports Section</h2>
              <p className="text-muted-foreground">
                Generate detailed reports and export them as PDF, CSV, or Excel.
              </p>
            </div>
          ),
        },
        {
          value: "settings",
          label: "Settings",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">User Settings</h2>
              <p className="text-muted-foreground">
                Manage account preferences, notification settings, and
                integrations.
              </p>
            </div>
          ),
        },
        {
          value: "help",
          label: "Help",
          content: (
            <div>
              <h2 className="text-lg font-medium mb-2">Help & Support</h2>
              <p className="text-muted-foreground">
                Find FAQs, tutorials, or reach out to our support team.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}
