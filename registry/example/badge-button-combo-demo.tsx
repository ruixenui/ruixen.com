import BadgeButtonCombo from "@/registry/ruixenui/badge-button-combo";

export default function DemoBadgeButtonCombo() {
  return (
    <div className="flex gap-4">
      <BadgeButtonCombo label="Messages" badge={3} />
      <BadgeButtonCombo label="Notifications" badge="New" />
      <BadgeButtonCombo label="Beta Feature" badge="Beta" size="lg" />
    </div>
  );
}
