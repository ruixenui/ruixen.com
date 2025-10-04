import ConfirmationButton from "@/registry/ruixenui/confirmation-button";

export default function DemoConfirmationButton() {
  return (
    <div className="flex gap-4">
      <ConfirmationButton label="Delete" onConfirm={() => alert("Deleted!")} />
      <ConfirmationButton
        label="Archive"
        confirmLabel="Really archive?"
        onConfirm={() => alert("Archived!")}
        size="lg"
      />
    </div>
  );
}
