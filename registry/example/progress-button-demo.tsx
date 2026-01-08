import ProgressButton from "@/registry/ruixenui/progress-button";

export default function DemoProgressButton() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      <ProgressButton label="Submit" />
      <ProgressButton label="Pay" loadingLabel="Processing Payment" />
      <ProgressButton label="Upload" showBar duration={3000} />
    </div>
  );
}
