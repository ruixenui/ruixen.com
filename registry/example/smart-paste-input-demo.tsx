"use client";

import * as React from "react";
import {
  SmartPasteInput,
  type PasteAttachment,
} from "@/registry/ruixenui/smart-paste-input";

const SPEC = `# Command menu spec

A single entry point for everything: navigation, actions, and search. It should feel instant, never animated on open, and always predictable.

## Behavior

- Opens with cmd+k from anywhere in the app
- Results are ranked by recency first, then fuzzy match score
- Arrow keys move the selection, enter runs it, escape closes
- The input keeps focus for as long as the menu is open

## Sections

Recent, Actions, Navigation, then Help — always in that order. A section disappears entirely when it has no results, and group headers are never focusable.

## Empty state

Show the three most common actions instead of a blank panel. Never show a spinner: if a source is slow, render what has already arrived and fill the rest in as it lands.

## Out of scope

Nested menus, drag to reorder, and per-user pinned commands. Revisit all three after the first release ships.`;

const INITIAL: PasteAttachment[] = [{ id: "spec", content: SPEC }];

export default function SmartPasteInputDemo() {
  const [sent, setSent] = React.useState<string | null>(null);

  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-5 bg-background px-6 py-12">
      <SmartPasteInput
        defaultAttachments={INITIAL}
        onSubmit={({ text, attachments }) =>
          setSent(
            `Sent${text ? ` "${text}"` : ""} with ${attachments.length} attachment${
              attachments.length === 1 ? "" : "s"
            }`,
          )
        }
      />

      <p className="text-sm text-muted-foreground">
        {sent ??
          "Click the card to edit it, or paste a long block of text to attach one."}
      </p>
    </div>
  );
}
