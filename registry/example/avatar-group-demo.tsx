import AvatarGroup from "@/registry/ruixenui/avatar-group";

const avatars = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    alt: "User 1",
    fallback: "JD",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
    alt: "User 2",
    fallback: "AS",
  },
  {
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces",
    alt: "User 3",
    fallback: "MK",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    alt: "User 4",
    fallback: "RB",
  },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Small</span>
        <AvatarGroup avatars={avatars} size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Medium</span>
        <AvatarGroup avatars={avatars} size="md" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Large</span>
        <AvatarGroup avatars={avatars} size="lg" />
      </div>
    </div>
  );
}
