import AvatarActionButton from "@/registry/ruixenui/avatar-action-button";

export default function DemoAvatarActionButton() {
  return (
    <div className="flex gap-4">
      <AvatarActionButton label="Continue as John" size="sm" />
      <AvatarActionButton label="Continue as Jane" size="md" />
      <AvatarActionButton label="Continue as Guest" size="lg" />
    </div>
  );
}
