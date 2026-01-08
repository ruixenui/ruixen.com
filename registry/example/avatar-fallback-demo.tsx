import AvatarFallbackOnly from "@/registry/ruixenui/avatar-fallback";

export default function AvatarFallbackDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <AvatarFallbackOnly fallback="KK" />
    </div>
  );
}
