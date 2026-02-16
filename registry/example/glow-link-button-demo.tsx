import GlowLinkButton from "@/registry/ruixenui/glow-link-button";

export default function GlowLinkButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] gap-4">
      <GlowLinkButton label="Visit Docs" href="https://ruixen.com" />
      <GlowLinkButton label="GitHub" href="https://github.com" />
    </div>
  );
}
