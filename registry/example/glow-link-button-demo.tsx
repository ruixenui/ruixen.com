import GlowLinkButton from "../ruixenui/glow-link-button";

export default function DemoGlowLinkButton() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-zinc-50 dark:bg-zinc-900">
      {/* Custom label + link */}
      <GlowLinkButton label="Visit Docs" href="https://docs.ruixenui.com" />

      {/* Custom styles */}
      <GlowLinkButton
        className="bg-blue-600 text-white border-blue-700 hover:shadow-lg"
        label="Get Started"
        href="https://ruixenui.com/get-started"
      />
    </main>
  );
}
