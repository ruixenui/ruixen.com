import ProgressButton from "@/registry/ruixenui/progress-button";

export default function DemoProgressButton() {
  return (
    <div className="flex gap-6 flex-wrap p-6 flex-col items-center justify-center min-h-screen">
      <ProgressButton label="Submit" />
      <ProgressButton label="Pay" loadingLabel="Processing Payment" />
      <ProgressButton label="Upload" showBar duration={3000} />
    </div>
  );
}
