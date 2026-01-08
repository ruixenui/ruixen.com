import AlertError from "@/registry/ruixenui/alert-error";

export default function AlertErrorDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AlertError
          title="Error"
          message="An error occurred while processing your request. Please try again."
        />
      </div>
    </div>
  );
}
