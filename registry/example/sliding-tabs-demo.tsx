import SlidingTabs from "@/registry/ruixenui/sliding-tabs";

export default function DemoOne() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <SlidingTabs
        defaultIndex={0}
        items={[
          {
            key: "overview",
            label: "Overview",
            panel: <div>Overview content goes here</div>,
          },
          {
            key: "activity",
            label: "Activity",
            panel: <div>Recent activity details here</div>,
          },
          {
            key: "settings",
            label: "Settings",
            panel: <div>Settings configuration options</div>,
          },
          {
            key: "profile",
            label: "Profile",
            panel: <div>Profile info and preferences</div>,
          },
        ]}
      />
    </div>
  );
}
