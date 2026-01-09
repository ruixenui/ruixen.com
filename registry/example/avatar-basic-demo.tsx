import AvatarBasic from "@/registry/ruixenui/avatar-basic";

export default function AvatarBasicDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <AvatarBasic
        src="https://github.com/shadcn.png"
        alt="shadcn"
        fallback="CN"
      />
    </div>
  );
}
