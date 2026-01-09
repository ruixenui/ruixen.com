import AvatarBadge from "@/registry/ruixenui/avatar-badge";

export default function AvatarBadgeDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <AvatarBadge
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        count={6}
      />
    </div>
  );
}
