import TooltipButton from "@/registry/ruixenui/tooltip-button";

export default function DemoTooltipButton() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      <TooltipButton
        label="Info"
        tooltip="More information about this action"
      />
      <TooltipButton
        label="Help"
        tooltip="Get help or documentation"
        size="lg"
      />
      <TooltipButton
        label="Settings"
        tooltip="Adjust your preferences"
        size="sm"
      />
    </div>
  );
}
