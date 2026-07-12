"use client";

import {
  ChapterScrubber,
  type Chapter,
} from "@/registry/ruixenui/chapter-scrubber";

const CHAPTERS: Chapter[] = [
  {
    id: "clone",
    title: "clone the repo and read the layout",
    description:
      "Pulled the branch and mapped the workspace — the scroll feature lives under registry/ruixenui.",
    meta: "00:00",
  },
  {
    id: "reproduce",
    title: "reproduce the reported bug",
    description:
      "Confirmed the rail flickers on fast pointer moves between adjacent lines. Traced it to state churn.",
    meta: "00:14",
  },
  {
    id: "grep",
    title: "grep for the hover handler",
    description:
      "Found two pointer listeners fighting over the same index every frame.",
    meta: "00:21",
  },
  {
    id: "read-test",
    title: "read the failing snapshot test",
    description:
      "The snapshot expected a clamped card position; the component placed it unclamped near the edges.",
    meta: "00:33",
  },
  {
    id: "hypothesis",
    title: "form a hypothesis",
    description:
      "The card top was never clamped to the rail bounds, so it overshot on the first and last chapters.",
    meta: "00:41",
  },
  {
    id: "magnify",
    title: "drive the rail off one pointer value",
    description:
      "Replaced per-line state with a single spring; each tick reads its rise from the cursor's distance.",
    meta: "00:52",
  },
  {
    id: "falloff",
    title: "shape the falloff",
    description:
      "Swapped the linear ramp for a raised-cosine bump so the wave has no seams at its edges.",
    meta: "01:07",
  },
  {
    id: "dedupe",
    title: "collapse hover and focus into one source",
    description:
      "Hover and keyboard now feed the same pointer value. No more dueling listeners, no more flicker.",
    meta: "01:19",
  },
  {
    id: "keyboard",
    title: "add roving tabindex + arrow keys",
    description:
      "Up/Down walk the rail, Home/End jump to the ends, Enter selects. Only one tick is tabbable at a time.",
    meta: "01:38",
  },
  {
    id: "reduced-motion",
    title: "honor prefers-reduced-motion",
    description:
      "Kept the spatial wave but dropped the springs, so the rise is instant instead of eased.",
    meta: "01:50",
  },
  {
    id: "flip",
    title: "auto-flip the card near the edge",
    description:
      "Compared room on each side against the card width and flipped toward the roomier one.",
    meta: "02:04",
  },
  {
    id: "run-tests",
    title: "run the test suite",
    description:
      "24 passed, 0 failed. The snapshot matches the clamped layout.",
    meta: "02:22",
  },
  {
    id: "lint",
    title: "lint and typecheck",
    description:
      "Clean. Tightened the ref callback and dropped an unused import.",
    meta: "02:30",
  },
  {
    id: "self-review",
    title: "re-read my own diff",
    description:
      "Skimmed the change end to end and trimmed a comment that no longer matched the code.",
    meta: "02:41",
  },
  {
    id: "commit",
    title: "commit the fix",
    description:
      "fix(scrubber): magnify the rail from a single pointer spring.",
    meta: "02:48",
  },
  {
    id: "push",
    title: "push and open the PR",
    description: "Opened PR #11148 against main and requested review.",
    meta: "02:55",
  },
  {
    id: "update-desc",
    title: "ok update pr desc with bullet points for what was done",
    description:
      "Updated PR #11148 with accurate implementation bullets, including its opt-in scope and browser fallback.",
    meta: "03:10",
  },
  {
    id: "respond",
    title: "respond to review comments",
    description:
      "Reviewer asked about touch devices — added a note that the rail falls back to focus + tap.",
    meta: "03:26",
  },
  {
    id: "green",
    title: "wait for CI to go green",
    description:
      "All checks passed on the second run after the flaky network mock settled.",
    meta: "03:44",
  },
  {
    id: "done",
    title: "hand off — ready to merge",
    description:
      "Left a summary comment and marked the PR ready. Waiting on the final approval.",
    meta: "03:51",
  },
];

export default function ChapterScrubberDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center bg-background px-6 py-12">
      <ChapterScrubber
        chapters={CHAPTERS}
        onSelect={(chapter) => {
          // Wire this to navigation, scroll-to, or replay in a real app.
          void chapter;
        }}
      />
    </div>
  );
}
