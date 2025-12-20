import NestedTabs, { NestedTabItem } from "@/registry/ruixenui/nested-tabs";

const demoItems: NestedTabItem[] = [
  {
    value: "dashboard",
    label: "Dashboard",
    content: "Main Dashboard Overview",
    subTabs: [
      {
        value: "dash-stats",
        label: "Stats",
        content: "Detailed statistics and metrics.",
      },
      {
        value: "dash-reports",
        label: "Reports",
        content: "Reports and exports section.",
      },
    ],
  },
  {
    value: "settings",
    label: "Settings",
    content: "General settings content",
    subTabs: [
      {
        value: "profile",
        label: "Profile",
        content: "Manage your profile details.",
      },
      {
        value: "account",
        label: "Account",
        content: "Account-related preferences.",
      },
      {
        value: "security",
        label: "Security",
        content: "Security and password settings.",
      },
    ],
  },
  {
    value: "docs",
    label: "Documentation",
    content: "Developer documentation content",
    subTabs: [
      { value: "api", label: "API", content: "API reference with endpoints." },
      {
        value: "guides",
        label: "Guides",
        content: "Step-by-step guides and tutorials.",
      },
    ],
  },
];

export default function DemoOne() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <NestedTabs items={demoItems} defaultValue="dashboard" />
      </div>
    </div>
  );
}
