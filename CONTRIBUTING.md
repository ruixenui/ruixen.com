# Contributing to Ruixen UI

Thank you for your interest in contributing to Ruixen UI! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component.

Read the [example PR](https://github.com/ruixenui/ruixen.com/pull/12) to learn which files you need to add. **You only need to change 5 files to add a new component or effect** and it only takes around 10 minutes of work!

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/ruixenui/ruixen.com/compare).

## Architecture Overview

Ruixen UI supports **4 registry variants** per component, all generated automatically from your single source file:

| Variant | Primitives | Tailwind | JSON path |
|---------|-----------|----------|-----------|
| Default | Radix UI | v4 | `public/r/<name>.json` |
| TW v3 | Radix UI | v3 | `public/r/tw3/<name>.json` |
| Base UI | Base UI | v4 | `public/r/baseui/<name>.json` |
| Base UI + TW v3 | Base UI | v3 | `public/r/baseui/tw3/<name>.json` |

**You only write code once** (Tailwind v4 + Radix imports). The build system handles:

- **Tailwind v3 transform** — converts `var(--color-*)` to `hsl(var(--*))`, removes v4-only utilities
- **Base UI injection** — swaps Radix primitives (dialog, accordion, etc.) with Base UI equivalents automatically

### Key Rules

1. **Write component code in Tailwind v4 syntax** — the build converts to v3 automatically
2. **Import shadcn primitives via `@/components/ui/*`** — never import `@radix-ui/*` directly in your component
3. **Use `registryDependencies`** for shadcn primitives (button, dialog, input, etc.) — never put `@radix-ui/*` in `dependencies`
4. **Use `dependencies`** only for npm packages your component needs directly (e.g., `motion`, `lucide-react`, `recharts`)

## Getting Started

### Fork and Clone the Repository

1. **Fork this repository**
   Click [here](https://github.com/ruixenui/ruixen.com/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/ruixen.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd ruixen
   ```

4. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-branch
   ```

5. **Install dependencies**

   ```bash
   pnpm i
   ```

6. **Create a `.env.local` file**

   ```bash
   touch .env.local && echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
   ```

7. **Run the project**
   ```bash
   pnpm dev
   ```

## Adding a New Component

To add a new component to Ruixen UI, you will need to modify several files. Follow these steps:

### 1. Create Component

Create the main component in `registry/ruixenui/example-component.tsx`

```typescript
import React from 'react'

export default function ExampleComponent() {
  return (
    <div>
      This is your component.
    </div>
  )
}
```

**If your component uses shadcn primitives** (Button, Dialog, Input, etc.), import them from `@/components/ui/*`:

```typescript
// CORRECT — import from shadcn wrapper layer
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// WRONG — never import Radix directly in Ruixen components
import * as Dialog from "@radix-ui/react-dialog";
```

This is critical because the Base UI build variant swaps these wrappers with Base UI equivalents. If you import Radix directly, the Base UI variant will break.

### 2. Create Component Demo

Provide a basic example to showcase your component in `registry/example/example-component-demo.tsx`

```typescript
import ExampleComponent from '@/registry/ruixenui/example-component'

export default function ExampleComponentDemo() {
  return (
    <div className="relative justify-center">
      <ExampleComponent />
    </div>
  )
}
```

### 3. Update Sidebar

Add your component to the sidebar in `config/docs.ts`

```typescript
{
    title: "Example Component",
    href: `/docs/components/example-component`,
    items: [],
    label: "New",
}
```

### 4. Create docs

Create an MDX file for documenting your component in `content/docs/components/example-component.mdx`

````md
---
title: Example Component
date: 2024-06-01
description: Example component for Ruixen UI
author: ruixen
published: true
---

<ComponentPreview name="example-component-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add "https://ruixen.com/r/example-component"
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="example-component" />

<Step>Update the import paths to match your project setup.</Step>

<Step>Add the required CSS animations</Step>

<Step>Add the following animations to your global CSS file inside the `@theme inline` block (e.g., `app/globals.css` or similar)</Step>

```css title="app/globals.css" {1-2,4-18}
--animate-example: example var(--duration) infinite linear;

@keyframes example {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
```

</Steps>

</TabsContent>

</Tabs>

## Props

| Prop    | Type     | Default  | Description                |
| ------- | -------- | -------- | -------------------------- |
| `color` | `String` | `"blue"` | The color of the component |
````

> **Note:** The install command shown in docs (`https://ruixen.com/r/example-component`) is the default Radix + Tailwind v4 variant. The docs site automatically shows toggles for users to switch between Radix/Base UI and v3/v4 — you don't need to handle this.

### 5. Take a Screenshot

Take a screenshot of your component and add it to the `public/newest/` directory:

1. **Run the dev server** and navigate to your component demo page
2. **Take a screenshot** of the component in action (recommended: 800x600px or similar aspect ratio)
3. **Save the screenshot** as `public/newest/your-component-name.png`

This screenshot will be used to showcase your component in the "Newest" section of the website.

### 6. Update Registry

Export your component and example in the registry files.

In `registry/registry-ui.ts`:

```typescript
export const ui: Registry = [
  // ... existing components ...
  {
    name: "example-component",
    type: "registry:ui",
    title: "Example Component",
    description:
      "A versatile component that can be used to display various types of content.",
    // npm packages your component imports directly
    dependencies: ["motion", "lucide-react"],
    // shadcn primitives your component uses (button, dialog, input, etc.)
    // These get resolved by the shadcn CLI — and swapped for Base UI in baseui variants
    registryDependencies: ["button", "dialog"],
    files: [
      {
        path: "registry/ruixenui/example-component.tsx",
        type: "registry:ui",
        target: "components/ruixen/example-component.tsx",
      },
    ],
    // Optional: CSS variables for the component
    cssVars: {
      theme: {
        "animate-example": "example var(--duration) infinite linear",
      },
    },
    // Optional: CSS keyframes for the component
    css: {
      "@keyframes example": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(calc(-100% - var(--gap)))" },
      },
    },
  },
];
```

**`dependencies` vs `registryDependencies` — this matters:**

| Field | What goes here | Example |
|-------|---------------|---------|
| `dependencies` | npm packages your code imports directly | `["motion", "lucide-react", "recharts"]` |
| `registryDependencies` | shadcn primitive names your code uses via `@/components/ui/*` | `["button", "dialog", "input", "accordion"]` |

**Never put `@radix-ui/*` in `dependencies`**. The 25 Radix-dependent shadcn primitives that the build system handles are: `accordion`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `label`, `menubar`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `sheet`, `slider`, `switch`, `tabs`, `tooltip`.

In `registry/registry-examples.ts`:

```typescript
export const examples: Registry = [
  // ... existing examples ...
  {
    name: "example-component-demo",
    description: "An example of the example-component",
    type: "registry:example",
    registryDependencies: ["example-component"],
    files: [
      {
        path: "registry/example/example-component-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
```

### 7. Build registry

```bash
pnpm build:registry
```

This single command generates all **4 variants** of your component JSON (Radix+v4, Radix+v3, BaseUI+v4, BaseUI+v3). You don't need to do anything else — the build script handles Tailwind v3 transforms and Base UI wrapper injection automatically.

After building, verify your component exists in all 4 directories:
```bash
ls public/r/example-component.json
ls public/r/tw3/example-component.json
ls public/r/baseui/example-component.json
ls public/r/baseui/tw3/example-component.json
```

### 8. Format and fix linting before committing

```bash
pnpm format:write
```

```bash
pnpm lint:fix
```

Make sure to run these two commands before committing your changes.

## Tailwind v3/v4 Compatibility

**Write all component code in Tailwind v4 syntax.** The build system automatically generates v3-compatible versions.

### What the v3 transform does

| Tailwind v4 (what you write) | Tailwind v3 (auto-generated) |
|------------------------------|------------------------------|
| `var(--color-primary)` | `hsl(var(--primary))` |
| `var(--color-muted-foreground)` | `hsl(var(--muted-foreground))` |
| `inset-shadow-sm` | *(removed — v4-only, no v3 equivalent)* |

### What is NOT transformed

- Custom CSS variables like `var(--color-1)`, `var(--color-from)`, `var(--duration)` are **left untouched** — these are not shadcn theme tokens
- Standard Tailwind classes (`bg-primary`, `text-foreground`, `border-border`) work identically in both versions

### Tips

- Prefer shadcn theme tokens (`bg-card`, `text-foreground`, `border-border`) over raw Tailwind colors (`bg-slate-950`, `text-gray-400`) — they work across themes and both v3/v4
- Avoid `inset-shadow-*` utilities unless absolutely necessary (they get stripped in v3)
- If your component uses Tailwind v4-specific patterns that can't be auto-transformed, note it in your PR description

## Radix / Base UI Compatibility

**You don't need to think about Base UI at all.** Just follow the two rules:

1. Import shadcn primitives from `@/components/ui/*` (not from `@radix-ui/*`)
2. List them in `registryDependencies` (not in `dependencies`)

The build system does the rest:

- Detects which shadcn primitives your component uses
- Injects Base UI wrapper files that replace the Radix-based `@/components/ui/*` wrappers
- Adds `@base-ui/react` to the npm dependencies
- Strips any `@radix-ui/*` packages

The 25 Base UI wrappers live in `registry/baseui-wrappers/` (raw `.tsx` text files, not compiled). You do not need to modify these.

### Common Mistakes

| Mistake | Why it breaks | Fix |
|---------|--------------|-----|
| `dependencies: ["@radix-ui/react-dialog"]` | Base UI variant still ships Radix | Use `registryDependencies: ["dialog"]` |
| `import * as Dialog from "@radix-ui/react-dialog"` | Base UI wrapper never gets used | Use `import { Dialog } from "@/components/ui/dialog"` |
| Using `data-[state=open]` in component classes | Base UI uses `data-[open]` instead | This is fine — the wrappers handle the mapping internally |

## Adding to the showcase

### 1. Create your showcase as a MDX file

Create your showcase in `content/showcase/website-name.mdx`

```mdx
---
title: website-name.com
description: Website description
image: /showcase/website-name.png
href: https://website-name.com
featured: true
affiliation: YC S25, raised $10M
---
```

### 2. Create an image

Upload an image of your site to `public/showcase/component-name.png`

## How to use CLI

1. Run CLI script from project `root` folder

```bash
pnpm run install:cli
```

```bash
pnpm run dev:cli
```

```bash
pnpm run build:cli
```

```bash
pnpm run release:cli
```

The CLI in development uses index.json from default `3000` port on localhost. Otherwise [https://ruixen.com](https://ruixen.com/registry/index.json)

## Adding Component Preview Images/Videos

When adding a new component, you should also add a preview image or video that will be displayed in the component gallery. This helps users quickly identify and browse components.

### 1. Upload Preview Assets

Upload your preview image or video to the R2 CDN:
- **Images**: Upload both light and dark theme variants
- **Videos**: A single video works for both themes

**Naming convention:**
```
components-preview/{category}/{component-slug}-light.{jpg|png|webp}
components-preview/{category}/{component-slug}-dark.{jpg|png|webp}
components-preview/{category}/{component-slug}.mp4
```

**Example paths:**
```
components-preview/cards/my-card-light.jpg
components-preview/cards/my-card-dark.jpg
components-preview/buttons/my-button.mp4
```

### 2. Register Preview in Data File

Add your component preview to `lib/component-preview-data.ts`:

1. Find the appropriate category object (e.g., `cardsPreview`, `buttonsPreview`)
2. Add your component entry:

**For images (light + dark):**
```typescript
"my-component": {
  light: `${BASE_URL}/category/my-component-light.jpg`,
  dark: `${BASE_URL}/category/my-component-dark.jpg`,
},
```

**For video only:**
```typescript
"my-component": {
  video: `${BASE_URL}/category/my-component.mp4`,
},
```

**For both image and video:**
```typescript
"my-component": {
  light: `${BASE_URL}/category/my-component-light.jpg`,
  dark: `${BASE_URL}/category/my-component-dark.jpg`,
  video: `${BASE_URL}/category/my-component.mp4`,
},
```

### 3. Preview Requirements

- **Image dimensions**: Recommended 800x600px (4:3 aspect ratio)
- **Image formats**: `.jpg`, `.png`, `.webp` (prefer `.webp` for smaller file size)
- **Video formats**: `.mp4` (H.264 codec recommended)
- **Video duration**: Keep under 10 seconds
- **File size**: Keep images under 200KB, videos under 2MB

### 4. Categories Reference

| Category | Object Name | Path |
|----------|-------------|------|
| Accordions | `accordionsPreview` | `/docs/components/[slug]` |
| Alerts | `alertsPreview` | `/docs/components/[slug]` |
| Cards | `cardsPreview` | `/docs/components/[slug]` |
| Buttons | `buttonsPreview` | `/docs/components/[slug]` |
| Loaders | `loadersPreview` | `/docs/components/[slug]` |
| Dialogs | `dialogsPreview` | `/docs/components/[slug]` |
| Breadcrumb | `breadcrumbPreview` | `/docs/components/[slug]` |
| Audio & Media | `audioMediaPreview` | `/docs/components/[slug]` |
| Select Components | `selectPreview` | `/docs/components/[slug]` |
| Chat Components | `chatPreview` | `/docs/components/[slug]` |
| Inputs | `inputsPreview` | `/docs/components/[slug]` |
| Notifications | `notificationsPreview` | `/docs/components/[slug]` |
| Menu | `menuPreview` | `/docs/components/[slug]` |
| Drawer | `drawerPreview` | `/docs/components/[slug]` |
| Forms | `formsPreview` | `/docs/components/[slug]` |
| File Management | `fileManagementPreview` | `/docs/components/[slug]` |
| Tables | `tablesPreview` | `/docs/components/[slug]` |
| Date Pickers | `datePickersPreview` | `/docs/components/[slug]` |
| Calendars | `calendarsPreview` | `/docs/components/[slug]` |
| Event Calendars | `eventCalendarsPreview` | `/docs/components/[slug]` |
| Image Tools | `imageToolsPreview` | `/docs/components/[slug]` |
| Video Players | `videoPlayersPreview` | `/docs/components/[slug]` |
| Backgrounds | `backgroundsPreview` | `/docs/components/[slug]` |
| Tabs | `tabsPreview` | `/docs/components/[slug]` |
| Pagination | `paginationPreview` | `/docs/components/[slug]` |
| Docks | `docksPreview` | `/docs/components/[slug]` |
| AI Chat Inputs | `aiChatInputsPreview` | `/docs/components/[slug]` |
| FAQs | `faqsPreview` | `/docs/sections/[slug]` |
| Hero Sections | `heroSectionsPreview` | `/docs/components/[slug]` |
| Featured Section | `featuredSectionPreview` | `/docs/components/[slug]` |
| Client Section | `clientSectionPreview` | `/docs/components/[slug]` |
| Footer Section | `footerSectionPreview` | `/docs/components/[slug]` |
| Navigation Section | `navigationSectionPreview` | `/docs/components/[slug]` |
| Pricing Section | `pricingSectionPreview` | `/docs/components/[slug]` |

## Ask for Help

For any help or questions, please open a new GitHub issue.
