import { ButtonCopy } from "@/registry/ruixenui/button-copy";

export default function ButtonCopyDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <ButtonCopy value="npm install ruixen-ui" />
      <ButtonCopy value="pnpm add ruixen-ui" showLabel={false} />
    </div>
  );
}
