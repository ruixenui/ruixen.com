# Contributing to RuixenUI

Thank you for your interest in contributing to RuixenUI! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to RuixenUI.

Read the [example PR](https://github.com/ruixenui/ruixen.com/pull/12) to learn which files you need to add. **You only need to change 5 files to add a new component or effect** and it only takes around 10 minutes of work!

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/ruixenui/ruixen.com/compare).

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

To add a new component to RuixenUI, you will need to modify several files. Follow these steps:

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

### 5. Take a Screenshot

Take a screenshot of your component and add it to the `public/newest/` directory:

1. **Run the dev server** and navigate to your component demo page
2. **Take a screenshot** of the component in action (recommended: 800x600px or similar aspect ratio)
3. **Save the screenshot** as `public/newest/your-component-name.png`

This screenshot will be used to showcase your component in the "Newest" section of the website.

### 6. Update Registry

Export your component and example in the registry files:

In `registry/registry-ui.ts`:

```typescript
export const ui: Registry = [
  // ... existing components ...
  {
    name: "example-component",
    type: "registry:ui",
    title: "Example Component",
    description:
      "A versatile component that can be used to display various types of content such as text, images, or videos.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/example-component.tsx",
        type: "registry:ui",
        target: "components/ruixen/example-component.tsx",
      },
    ],
    // Add CSS variables for the component
    cssVars: {
      theme: {
        "animate-example": "example var(--duration) infinite linear",
      },
    },
    // Add CSS keyframes for the component
    css: {
      "@keyframes example": {
        from: {
          transform: "translateX(0)",
        },
        to: {
          transform: "translateX(calc(-100% - var(--gap)))",
        },
      },
    },
  },
];
```

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

Make sure to add any necessary dependencies, tailwind configurations, or other properties as needed for your specific component.

### 7. Build registry

```bash
pnpm build:registry
```

### 8. Format and fix linting before committing

```bash
pnpm format:write
```

```bash
pnpm lint:fix
```

Make sure to run these two commands before committing your changes.

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
| Upload Components | `uploadPreview` | `/docs/components/[slug]` |
| Breadcrumb | `breadcrumbPreview` | `/docs/components/[slug]` |
| Audio & Media | `audioMediaPreview` | `/docs/components/[slug]` |
| Select Components | `selectPreview` | `/docs/components/[slug]` |
| Chat Components | `chatPreview` | `/docs/components/[slug]` |
| Inputs | `inputsPreview` | `/docs/components/[slug]` |
| Notifications | `notificationsPreview` | `/docs/components/[slug]` |
| Menu | `menuPreview` | `/docs/components/[slug]` |
| Context Menu | `contextMenuPreview` | `/docs/components/[slug]` |
| Drawer | `drawerPreview` | `/docs/components/[slug]` |
| Forms | `formsPreview` | `/docs/components/[slug]` |
| File Management | `fileManagementPreview` | `/docs/components/[slug]` |
| Tables | `tablesPreview` | `/docs/components/[slug]` |
| Date Pickers | `datePickersPreview` | `/docs/components/[slug]` |
| Calendars | `calendarsPreview` | `/docs/components/[slug]` |
| Event Calendars | `eventCalendarsPreview` | `/docs/components/[slug]` |
| Image Tools | `imageToolsPreview` | `/docs/components/[slug]` |
| Video Players | `videoPlayersPreview` | `/docs/components/[slug]` |
| Effects | `effectsPreview` | `/docs/components/[slug]` |
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
