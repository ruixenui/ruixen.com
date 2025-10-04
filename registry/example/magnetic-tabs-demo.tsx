import MagneticTabs, {
  MagneticTabItem,
} from "@/registry/ruixenui/magnetic-tabs";

const tabItems: MagneticTabItem[] = [
  {
    value: "overview",
    label: "Overview",
    content: "Overview content goes here.",
  },
  {
    value: "activity",
    label: "Activity",
    content: "Activity content goes here.",
  },
  {
    value: "settings",
    label: "Settings",
    content: "Settings content goes here.",
  },
  { value: "faq", label: "FAQ", content: "FAQ content goes here." },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <MagneticTabs
        items={tabItems}
        defaultValue="overview"
        indicatorPadding={8}
        className="max-w-xl"
      />
    </div>
  );
}
