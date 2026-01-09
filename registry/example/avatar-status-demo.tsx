import AvatarStatus from "@/registry/ruixenui/avatar-status";

export default function AvatarStatusDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center gap-4 p-4">
      <AvatarStatus
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        status="online"
      />
      <AvatarStatus
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        status="busy"
      />
      <AvatarStatus
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        status="away"
      />
      <AvatarStatus
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
        status="offline"
      />
    </div>
  );
}
