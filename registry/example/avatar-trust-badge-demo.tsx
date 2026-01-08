import AvatarTrustBadge from "@/registry/ruixenui/avatar-trust-badge";

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
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
    alt: "User 5",
    fallback: "EW",
  },
];

export default function AvatarTrustBadgeDemo() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-4">
      <AvatarTrustBadge
        avatars={avatars}
        count="60K+ developers"
        label="Trusted by"
      />
      <AvatarTrustBadge avatars={avatars} count="10K+ teams" label="Used by" />
      <AvatarTrustBadge
        avatars={avatars.slice(0, 3)}
        count="500+ companies"
        label="Loved by"
      />
    </div>
  );
}
