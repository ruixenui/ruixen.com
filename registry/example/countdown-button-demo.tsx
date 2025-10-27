import CountdownButton from "@/registry/ruixenui/countdown-button";

export default function DemoCountdownButton() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center min-h-screen">
      <CountdownButton label="Resend OTP" countdown={20} />
      <CountdownButton label="Retry" countdown={10} size="lg" />
    </div>
  );
}
