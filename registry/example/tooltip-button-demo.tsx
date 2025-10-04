import TooltipButton from "@/registry/ruixenui/tooltip-button";

export default function DemoTooltipButton() {
  return (
    <div className="flex gap-4">
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
