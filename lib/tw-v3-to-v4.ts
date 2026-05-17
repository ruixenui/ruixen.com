/**
 * Tailwind CSS v3 → v4 source code transform.
 *
 * Inverse of `scripts/tw-v3-transform.ts` plus a few additional v3 → v4
 * patterns that show up in real shadcn projects. Conservative: only touches
 * patterns whose meaning is well-defined and unambiguous. Riskier renames
 * (e.g., `shadow` defaults, `ring` default width) are intentionally NOT
 * auto-applied because they silently change visual output.
 */

const SHADCN_THEME_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar-background",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

export type TransformRule = {
  id: string;
  label: string;
  description: string;
};

export type TransformResult = {
  code: string;
  applied: Array<{ rule: TransformRule; count: number }>;
};

export const TW_V3_TO_V4_RULES: TransformRule[] = [
  {
    id: "shadcn-theme-tokens",
    label: "Shadcn theme tokens",
    description: "hsl(var(--token)) → var(--color-token)",
  },
  {
    id: "tailwind-directives",
    label: "@tailwind directives",
    description:
      '@tailwind base / components / utilities → @import "tailwindcss"',
  },
  {
    id: "css-var-arbitrary",
    label: "CSS variable arbitrary values",
    description: "utility-[--var] → utility-(--var)",
  },
  {
    id: "bg-gradient",
    label: "Gradient utility rename",
    description: "bg-gradient-to-* → bg-linear-to-*",
  },
  {
    id: "outline-none",
    label: "outline-none semantics",
    description:
      "outline-none → outline-hidden (accessibility behavior changed in v4)",
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function transformToTw4(source: string): TransformResult {
  let result = source;
  const counts: Record<string, number> = Object.fromEntries(
    TW_V3_TO_V4_RULES.map((r) => [r.id, 0]),
  );

  // 1. Shadcn theme tokens: hsl(var(--<token>)) → var(--color-<token>)
  for (const token of SHADCN_THEME_TOKENS) {
    const pattern = `hsl(var(--${token}))`;
    const re = new RegExp(escapeRegex(pattern), "g");
    const matches = result.match(re);
    if (matches) {
      counts["shadcn-theme-tokens"] += matches.length;
      result = result.replace(re, `var(--color-${token})`);
    }
  }

  // 2. @tailwind base/components/utilities → @import "tailwindcss";
  //    Collapses all three v3 directives into a single v4 import.
  const tailwindDirectivesRegex =
    /@tailwind\s+(?:base|components|utilities)\s*;\s*\n?/g;
  const tailwindMatches = result.match(tailwindDirectivesRegex);
  if (tailwindMatches && tailwindMatches.length > 0) {
    let first = true;
    result = result.replace(tailwindDirectivesRegex, () => {
      if (first) {
        first = false;
        return '@import "tailwindcss";\n';
      }
      return "";
    });
    counts["tailwind-directives"] = tailwindMatches.length;
  }

  // 3. Utility-[--var] → utility-(--var)
  //    v4 introduced parenthesized CSS variable syntax. The bracket form
  //    still works in some cases but the new form is preferred.
  const cssVarArbitraryRegex = /\b([a-z][a-z0-9-]*)-\[(--[a-zA-Z0-9_-]+)\]/g;
  const cssVarMatches = result.match(cssVarArbitraryRegex);
  if (cssVarMatches) {
    result = result.replace(cssVarArbitraryRegex, "$1-($2)");
    counts["css-var-arbitrary"] = cssVarMatches.length;
  }

  // 4. bg-gradient-to-* → bg-linear-to-*
  const bgGradientRegex = /\bbg-gradient-to-([trbl]{1,2})\b/g;
  const bgGradientMatches = result.match(bgGradientRegex);
  if (bgGradientMatches) {
    result = result.replace(bgGradientRegex, "bg-linear-to-$1");
    counts["bg-gradient"] = bgGradientMatches.length;
  }

  // 5. outline-none → outline-hidden
  //    v4 reserves outline-none for "actually no outline" and adds
  //    outline-hidden for the a11y-preserving transparent outline that
  //    v3's outline-none used to render.
  const outlineNoneRegex = /\boutline-none\b/g;
  const outlineNoneMatches = result.match(outlineNoneRegex);
  if (outlineNoneMatches) {
    result = result.replace(outlineNoneRegex, "outline-hidden");
    counts["outline-none"] = outlineNoneMatches.length;
  }

  const applied = TW_V3_TO_V4_RULES.map((rule) => ({
    rule,
    count: counts[rule.id],
  })).filter((a) => a.count > 0);

  return { code: result, applied };
}
