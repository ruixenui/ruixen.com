import AlertSuccess from "@/registry/ruixenui/alert-success";

export default function AlertSuccessDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AlertSuccess
          title="Success"
          message="Your changes have been saved successfully."
        />
      </div>
    </div>
  );
}
