import BadgeButtonCombo from "@/registry/ruixenui/badge-button-combo";

export default function DemoBadgeButtonCombo() {
  return (
    <div className="flex p-6 gap-6 flex-col items-center justify-center min-h-screen">
      <BadgeButtonCombo label="Messages" badge={3} />
      <BadgeButtonCombo label="Notifications" badge="New" />
      <BadgeButtonCombo label="Beta Feature" badge="Beta" size="lg" />
    </div>
  );
}
