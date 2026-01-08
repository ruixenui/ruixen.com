import AvatarOnline from "@/registry/ruixenui/avatar-online";

export default function AvatarOnlineDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <AvatarOnline
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
      />
    </div>
  );
}
