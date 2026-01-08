import MorphingGithubButton from "../ruixenui/morphing-github-button";

export default function DemoMorphingGithubButton() {
  return (
    <main className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
      {/* Default */}
      <MorphingGithubButton />

      {/* Custom Label + Link */}
      <MorphingGithubButton
        label="Source Code"
        href="https://github.com/vercel/next.js"
      />

      {/* Custom Tailwind styling */}
      <MorphingGithubButton className="hover:from-indigo-700 hover:to-indigo-900" />
    </main>
  );
}
