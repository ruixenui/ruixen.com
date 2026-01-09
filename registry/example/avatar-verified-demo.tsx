import AvatarVerified from "@/registry/ruixenui/avatar-verified";

export default function AvatarVerifiedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <AvatarVerified
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
      />
    </div>
  );
}
