import CountdownButton from "@/registry/ruixenui/countdown-button";

export default function DemoCountdownButton() {
  return (
    <div className="flex gap-4">
      <CountdownButton label="Resend OTP" countdown={20} />
      <CountdownButton label="Retry" countdown={10} size="lg" />
    </div>
  );
}
