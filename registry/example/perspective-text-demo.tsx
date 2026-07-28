import { PerspectiveText } from "@/registry/ruixenui/perspective-text";

export default function PerspectiveTextDemo() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden px-6 py-24">
      <PerspectiveText
        as="h2"
        className="text-[clamp(2rem,9vw,6rem)] text-foreground"
        text="FOLLOWERS"
      />
    </div>
  );
}
