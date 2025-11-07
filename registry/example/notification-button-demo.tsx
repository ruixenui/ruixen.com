import NotificationButton from "@/registry/ruixenui/notification-button";

export default function DemoNotificationButton() {
  return (
    <div className="flex gap-4 min-h-screen flex-col items-center justify-center p-6">
      <NotificationButton count={5} />
      <NotificationButton count={12} size="lg" />
      <NotificationButton count={0} />
    </div>
  );
}
