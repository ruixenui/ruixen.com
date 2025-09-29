import SmartNotifyButton from "@/registry/ruixenui/smart-notify-button";

export default function DemoOne() {
  return (
    <div className="flex flex-col gap-6">
      <SmartNotifyButton />
      <SmartNotifyButton
        label="Save Changes"
        message="Data saved successfully!"
        description="Your changes have been stored."
        type="success"
        actionLabel="Undo"
        actionCallback={() => console.log("Undo clicked")}
        position="bottom-left"
      />
    </div>
  );
}
