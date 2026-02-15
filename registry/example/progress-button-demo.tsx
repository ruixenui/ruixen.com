import ProgressButton from "@/registry/ruixenui/progress-button";

export default function ProgressButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-6">
      <ProgressButton label="Submit" />
      <ProgressButton
        label="Upload"
        loadingLabel="Uploading..."
        duration={3000}
      />
    </div>
  );
}
