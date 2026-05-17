/**
 * Enrich MDX frontmatter descriptions with keyword-rich SEO phrasing.
 *
 * - Parses config/docs.ts to map each component slug → sidebar category
 * - For each MDX in content/docs/components and content/docs/sections,
 *   rewrites the `description:` line if it doesn't yet contain the
 *   category keyword phrase.
 * - Caps result at 160 chars on a word boundary.
 *
 * Usage:
 *   pnpm tsx scripts/enrich-mdx-descriptions.mts            # dry-run, prints diff
 *   pnpm tsx scripts/enrich-mdx-descriptions.mts --write    # write changes
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DOCS_CONFIG = path.join(ROOT, "config/docs.ts");
const MDX_DIRS = [
  path.join(ROOT, "content/docs/components"),
  path.join(ROOT, "content/docs/sections"),
];

const WRITE = process.argv.includes("--write");

/**
 * Sidebar category → keyword phrase to inject into descriptions.
 * Tier 1 keywords (strategy §9) use "Shadcn {type}" framing — these are
 * high-volume head terms shadcn-ui.com doesn't own.
 * Tier 5 primitives use "React {component}" framing — shadcn-ui owns the
 * "shadcn button" head term, so we don't fight it; we capture long-tails.
 */
const CATEGORY_KEYWORDS: Record<string, string> = {
  // Tier 1 — section types
  Navbars: "Shadcn navbar",
  "Hero Sections": "Shadcn hero section",
  "Pricing Section": "Shadcn pricing section",
  FAQs: "Shadcn FAQ section",
  "Footer Section": "Shadcn footer",
  "Featured Section": "Shadcn feature section",
  "Client Section": "Shadcn client logos section",
  // Tier 5 — primitives
  Buttons: "React button component",
  Inputs: "React input component",
  Cards: "React card component",
  Forms: "React form component",
  Dialogs: "React dialog component",
  Tabs: "React tabs component",
  Accordions: "React accordion component",
  Checkboxes: "React checkbox component",
  Loaders: "React loader",
  Sliders: "React slider component",
  Stepper: "React stepper component",
  Avatars: "React avatar component",
  Banners: "React banner component",
  Badges: "React badge component",
  Carousels: "React carousel component",
  Selects: "React select component",
  "Select Components": "React select component",
  "Video Players": "React video player",
  "Image Tools": "React image tool",
  "Audio & Media": "React audio player",
  "AI Chat Inputs": "React AI chat input",
  Backgrounds: "React animated background",
  Text: "React animated text",
  "Text Effects": "React animated text",
  Charts: "React chart component",
  Docks: "React dock component",
  // App UI
  "Event Calendars": "React event calendar",
  Pagination: "React pagination component",
  Notifications: "React notification component",
  Calendars: "React calendar component",
  Breadcrumbs: "React breadcrumb component",
  Drawer: "React drawer component",
  "File Management": "React file manager",
  "Date Pickers": "React date picker",
  Menu: "React menu component",
  Effects: "React text effect",
};

/**
 * Slugs of category-INDEX pages (e.g. /docs/components/buttons) that
 * use <CategoryShowcase>. These need a different transform — they're
 * not single components, they're plural category landings. Capturing
 * "shadcn navbar" plural intent on /docs/components/navbars is the
 * highest-leverage SEO win in this batch.
 */
const INDEX_PAGE_MAP: Record<string, string> = {
  accordions: "Accordions",
  "ai-chat-inputs": "AI Chat Inputs",
  "audio-and-media": "Audio & Media",
  avatars: "Avatars",
  backgrounds: "Backgrounds",
  badges: "Badges",
  banners: "Banners",
  breadcrumbs: "Breadcrumbs",
  buttons: "Buttons",
  calendars: "Calendars",
  cards: "Cards",
  carousels: "Carousels",
  charts: "Charts",
  checkboxes: "Checkboxes",
  "client-section": "Client Section",
  "date-pickers": "Date Pickers",
  dialogs: "Dialogs",
  docks: "Docks",
  drawer: "Drawer",
  effects: "Effects",
  "event-calendars": "Event Calendars",
  faqs: "FAQs",
  "featured-section": "Featured Section",
  "file-management": "File Management",
  "footer-section": "Footer Section",
  forms: "Forms",
  "hero-sections": "Hero Sections",
  "image-tools": "Image Tools",
  inputs: "Inputs",
  loaders: "Loaders",
  menu: "Menu",
  navbars: "Navbars",
  notifications: "Notifications",
  pagination: "Pagination",
  "pricing-section": "Pricing Section",
  "select-components": "Select Components",
  sliders: "Sliders",
  stepper: "Stepper",
  tabs: "Tabs",
  text: "Text",
  "video-players": "Video Players",
};

/**
 * Manual category mapping for components that exist as MDX but aren't
 * in the sidebar config. Catches a small number of orphans the parser
 * misses.
 */
const ORPHAN_COMPONENT_MAP: Record<string, string> = {
  "animated-theme-toggler": "Buttons",
  "smart-breadcrumb": "Breadcrumbs",
};

/**
 * Parse config/docs.ts and build slug → category map. Walks the
 * sidebarNav text line-by-line; categories are 2-level (group has
 * inner-list of categories with items). Cheap regex parse — does
 * not need a full TS AST since the file follows a stable shape.
 */
function buildSlugCategoryMap(): Record<string, string> {
  const src = fs.readFileSync(DOCS_CONFIG, "utf8");
  const lines = src.split("\n");
  const map: Record<string, string> = {};

  // Track the most-recently-seen category title at 10-space indent
  // (the level where Hero Sections, Pricing Section, etc. live)
  let currentCategory: string | null = null;

  for (const line of lines) {
    const catMatch = line.match(/^ {10}title: "([^"]+)",$/);
    if (catMatch) {
      currentCategory = catMatch[1];
      continue;
    }
    // hrefs nested under a category have a different indent
    const hrefMatch = line.match(
      /href: `\/docs\/(?:components|sections)\/([a-z0-9-]+)`/,
    );
    if (hrefMatch && currentCategory) {
      map[hrefMatch[1]] = currentCategory;
    }
  }

  return map;
}

interface Frontmatter {
  title?: string;
  description?: string;
}

function parseFrontmatter(raw: string): {
  fm: Frontmatter;
  start: number;
  end: number;
} {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return { fm: {}, start: -1, end: -1 };
  const block = fmMatch[1];
  const fm: Frontmatter = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^(title|description): (.+)$/);
    if (m) {
      const value = m[2].replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
      (fm as Record<string, string>)[m[1]] = value;
    }
  }
  return { fm, start: 0, end: fmMatch[0].length };
}

/**
 * Trim text at a word boundary so the cut doesn't end mid-word.
 * Drops trailing punctuation, then appends a clean period.
 */
function trimToBoundary(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const stem = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(
    /[,;:.\-—]+$/,
    "",
  );
  return `${stem}.`;
}

/**
 * Description for category INDEX pages. Plural framing, captures the
 * "shadcn navbars" / "react buttons" intent — these are the closest
 * thing the codebase has to category landings, so they earn a real
 * keyword-rich description, not a per-component dup.
 */
function buildIndexDescription(keyword: string, title: string): string {
  // Pluralize keyword for category-level framing
  // "React button component" → "React button components"
  // "Shadcn navbar" → "Shadcn navbars"
  // "Shadcn hero section" → "Shadcn hero sections"
  // "Shadcn footer" → "Shadcn footers"
  let plural = keyword;
  if (/\bcomponent$/i.test(plural)) plural = plural.replace(/component$/i, "components");
  else if (/\bsection$/i.test(plural)) plural = plural.replace(/section$/i, "sections");
  else if (/\bnavbar$/i.test(plural)) plural = plural.replace(/navbar$/i, "navbars");
  else if (/\bfooter$/i.test(plural)) plural = plural.replace(/footer$/i, "footers");
  else if (/\bloader$/i.test(plural)) plural = plural.replace(/loader$/i, "loaders");
  else if (/\bcalendar$/i.test(plural)) plural = plural.replace(/calendar$/i, "calendars");
  else if (/\bplayer$/i.test(plural)) plural = plural.replace(/player$/i, "players");
  else if (/\bpicker$/i.test(plural)) plural = plural.replace(/picker$/i, "pickers");
  else if (/\binput$/i.test(plural)) plural = plural.replace(/input$/i, "inputs");
  else if (/\btext$/i.test(plural)) plural = plural; // already category-like
  else if (/\bmanager$/i.test(plural)) plural = plural.replace(/manager$/i, "managers");

  // Avoid "Shadcn X for shadcn projects ... shadcn CLI" stuffing —
  // when the keyword already says Shadcn, drop "for shadcn projects".
  const startsWithShadcn = /^shadcn\b/i.test(keyword);
  const audience = startsWithShadcn ? "" : " for shadcn projects";
  const out = `Browse ${plural}${audience} — copy-paste install via the shadcn CLI. Tailwind v3 or v4, Radix or Base UI.`;
  return trimToBoundary(out, 158);
}

function buildNewDescription(
  original: string,
  keyword: string,
  title: string,
): string {
  // Lowercase the first letter of original if it starts with a determiner
  // so the join reads naturally: "Shadcn navbar — clean navbar with logo…"
  const body = original.replace(
    /^(A|An|The)\s+/i,
    (_m, art) => art.toLowerCase() + " ",
  );

  // If the original already starts by repeating the keyword's
  // tail word (e.g., "navbar"), drop that redundant lead to keep
  // it readable: "Shadcn navbar — clean navbar with…" → "Shadcn navbar with…"
  const kwTail = keyword.split(" ").pop()!.toLowerCase();
  const stripped = body.replace(
    new RegExp(`^(a |an |the )?(clean|simple|modern|minimal)?\\s*${kwTail}\\s*`, "i"),
    "",
  );

  const joined = stripped
    ? `${keyword} — ${stripped.replace(/\.$/, "")}.`
    : `${keyword} for ${title}.`;

  return trimToBoundary(joined, 158);
}

function alreadyEnriched(desc: string, keyword: string): boolean {
  const kwLead = keyword.split(" ").slice(0, 2).join(" ").toLowerCase();
  return desc.toLowerCase().includes(kwLead);
}

function main() {
  const slugToCategory = buildSlugCategoryMap();
  console.log(`📍 Built slug→category map (${Object.keys(slugToCategory).length} entries)\n`);

  let touched = 0;
  let skipped = 0;
  let unmapped = 0;
  const samples: string[] = [];

  for (const dir of MDX_DIRS) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");

      const { fm } = parseFrontmatter(raw);
      if (!fm.description || !fm.title) {
        continue;
      }

      const isIndex = slug in INDEX_PAGE_MAP;
      const category =
        slugToCategory[slug] ||
        INDEX_PAGE_MAP[slug] ||
        ORPHAN_COMPONENT_MAP[slug];
      if (!category) {
        unmapped++;
        continue;
      }
      const keyword = CATEGORY_KEYWORDS[category];
      if (!keyword) {
        unmapped++;
        continue;
      }

      if (alreadyEnriched(fm.description, keyword)) {
        skipped++;
        continue;
      }

      const newDesc = isIndex
        ? buildIndexDescription(keyword, fm.title)
        : buildNewDescription(fm.description, keyword, fm.title);
      if (newDesc === fm.description) {
        skipped++;
        continue;
      }

      if (samples.length < 12) {
        samples.push(
          `  ${slug} [${category}]\n    OLD: ${fm.description}\n    NEW: ${newDesc}`,
        );
      }

      if (WRITE) {
        const oldLine = `description: ${fm.description}`;
        const newLine = `description: ${newDesc}`;
        const updated = raw.replace(oldLine, newLine);
        if (updated === raw) {
          // description was wrapped or escaped differently; skip rather than corrupt
          skipped++;
          continue;
        }
        fs.writeFileSync(filePath, updated, "utf8");
      }

      touched++;
    }
  }

  console.log("📦 Samples:\n");
  console.log(samples.join("\n\n"));
  console.log(
    `\n📊 ${WRITE ? "Wrote" : "Would touch"} ${touched} files · skipped ${skipped} (already enriched) · unmapped ${unmapped}`,
  );
  if (!WRITE) {
    console.log("\nRun with --write to apply.");
  }
}

main();
