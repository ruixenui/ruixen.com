import BadgeButtonCombo from "@/registry/ruixenui/badge-button-combo";

export default function BadgeButtonComboDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <BadgeButtonCombo label="Inbox" badge={3} />
      <BadgeButtonCombo label="Downloads" badge="New" />
      <BadgeButtonCombo label="Updates" badge={12} />
    </div>
  );
}
