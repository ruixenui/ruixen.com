import { NeonCircleGrid } from "@/registry/ruixenui/neon-circle-grid";

export default function NeonCircleGridDemo() {
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden bg-black">
      <NeonCircleGrid
        color="#3ECF8E"
        colorBright="#D6E8D0"
        fadeFrom="right"
        fadeStart={0.1}
        colorBlend={0.45}
        outerRadius={9}
        innerRadius={3.5}
        gap={20}
      />
    </div>
  );
}
