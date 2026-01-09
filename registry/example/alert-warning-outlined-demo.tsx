import AlertWarningOutlined from "@/registry/ruixenui/alert-warning-outlined";

export default function AlertWarningOutlinedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AlertWarningOutlined
          title="Warning"
          message="Your session is about to expire. Please save your work."
        />
      </div>
    </div>
  );
}
