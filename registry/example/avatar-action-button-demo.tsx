import AvatarActionButton from "@/registry/ruixenui/avatar-action-button";

export default function DemoAvatarActionButton() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-4">
      <AvatarActionButton label="Continue as John" size="sm" />
      <AvatarActionButton label="Continue as Jane" size="md" />
      <AvatarActionButton label="Continue as Guest" size="lg" />
    </div>
  );
}
