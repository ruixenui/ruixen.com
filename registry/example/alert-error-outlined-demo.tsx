import AlertErrorOutlined from "@/registry/ruixenui/alert-error-outlined";

export default function AlertErrorOutlinedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AlertErrorOutlined
          title="Error"
          message="Failed to save changes. Please check your connection and try again."
        />
      </div>
    </div>
  );
}
