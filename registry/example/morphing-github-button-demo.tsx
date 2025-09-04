import MorphingGithubButton from "../ruixenui/morphing-github-button";

export default function DemoMorphingGithubButton() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-zinc-50 dark:bg-zinc-900">
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
