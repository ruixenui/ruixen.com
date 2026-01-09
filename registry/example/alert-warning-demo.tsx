import AlertWarning from "@/registry/ruixenui/alert-warning";

export default function AlertWarningDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AlertWarning
          title="Warning"
          message="Some information is missing! Please check your input and try again."
        />
      </div>
    </div>
  );
}
