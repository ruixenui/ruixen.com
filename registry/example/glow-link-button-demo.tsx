import GlowLinkButton from "@/registry/ruixenui/glow-link-button";

export default function DemoGlowLinkButton() {
  return (
    <main className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
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
