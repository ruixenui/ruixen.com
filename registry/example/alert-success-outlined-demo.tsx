import AlertSuccessOutlined from "@/registry/ruixenui/alert-success-outlined";

export default function AlertSuccessOutlinedDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AlertSuccessOutlined
          title="Success"
          message="Your account has been verified successfully."
        />
      </div>
    </div>
  );
}
