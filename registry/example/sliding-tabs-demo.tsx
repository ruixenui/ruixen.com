import SlidingTabs from "@/registry/ruixenui/sliding-tabs";

export default function DemoOne() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <SlidingTabs
        defaultIndex={0}
        items={[
          {
            key: "overview",
            label: "Overview",
            panel: <div> Overview content goes here</div>,
          },
          {
            key: "activity",
            label: "Activity",
            panel: <div> Recent activity details here</div>,
          },
          {
            key: "settings",
            label: "Settings",
            panel: <div> Settings configuration options</div>,
          },
          {
            key: "profile",
            label: "Profile",
            panel: <div> Profile info and preferences</div>,
          },
        ]}
      />
    </div>
  );
}
