import NotificationButton from "@/registry/ruixenui/notification-button";

export default function DemoNotificationButton() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-4">
      <NotificationButton count={5} />
      <NotificationButton count={12} size="lg" />
      <NotificationButton count={0} />
    </div>
  );
}
