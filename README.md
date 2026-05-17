<div align="center">

<a href="https://ruixen.com">
  <img src="public/readme-preview.png" alt="Ruixen UI Preview" width="100%" />
</a>

<br />

# Ruixen UI

**Marketing UI for shadcn — in any stack.**

240+ React sections and components for landing pages. Drop in with one CLI command. Works with Tailwind v3 or v4, Radix or Base UI.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Components](https://img.shields.io/badge/Components-240+-8b5cf6.svg)](https://ruixen.com/docs)
[![Pro](https://img.shields.io/badge/Pro-pro.ruixen.com-000.svg)](https://pro.ruixen.com)
[![Twitter Follow](https://img.shields.io/twitter/follow/ruixen_ui?style=social)](https://twitter.com/ruixen_ui)

[Sections](https://ruixen.com/docs) &nbsp;&middot;&nbsp; [Components](https://ruixen.com/docs) &nbsp;&middot;&nbsp; [Pro Templates](https://pro.ruixen.com) &nbsp;&middot;&nbsp; [Gradients](https://ruixen.com/gradients) &nbsp;&middot;&nbsp; [Blog](https://ruixen.com/blog)

</div>

<br />

## Why Ruixen

Ruixen ships across four stacks. Every component is generated into **Tailwind v3, Tailwind v4, Radix, and Base UI** variants from one source codebase at build time. Pick the variant that matches your project. Install with one command.

Built for teams that don't want to be locked to a single Tailwind version or primitive library — whether you're pinned to Tailwind v3 for legacy compatibility, evaluating Base UI for accessibility or licensing, or running the latest stack.

<br />

## Quick Start

```bash
# Tailwind v4 + Radix (default)
npx shadcn@latest add "https://ruixen.com/r/staggered-faq-section"

# Tailwind v3 + Radix
npx shadcn@latest add "https://ruixen.com/r/tw3/staggered-faq-section"

# Tailwind v4 + Base UI
npx shadcn@latest add "https://ruixen.com/r/baseui/staggered-faq-section"

# Tailwind v3 + Base UI
npx shadcn@latest add "https://ruixen.com/r/baseui/tw3/staggered-faq-section"
```

The component lands in your project with dependencies resolved. No package to install, no provider to wrap, no global CSS to import.

<br />

## Showcase

<table>
<tr>
<td width="33%" align="center">
<video src="https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/faq-chat-accordion-dark.mp4" width="100%" autoplay loop muted playsinline></video>
<strong>FAQ Chat Accordion</strong><br /><sub>Conversational FAQ section</sub>
</td>
<td width="33%" align="center">
<video src="https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/wordmark-footer-dark.mp4" width="100%" autoplay loop muted playsinline></video>
<strong>Wordmark Footer</strong><br /><sub>Half-cut brand footer with luminance gradient</sub>
</td>
<td width="33%" align="center">
<video src="https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/split-feature-showcase-dark.mp4" width="100%" autoplay loop muted playsinline></video>
<strong>Split Feature Showcase</strong><br /><sub>Side-by-side feature highlight section</sub>
</td>
</tr>
<tr>
<td width="33%" align="center">
<video src="https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/integration-and-stats-section-dark.mp4" width="100%" autoplay loop muted playsinline></video>
<strong>Integration & Stats Section</strong><br /><sub>Logos and metrics block for trust building</sub>
</td>
<td width="33%" align="center">
<video src="https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/rising-glow-dark.mp4" width="100%" autoplay loop muted playsinline></video>
<strong>Rising Glow</strong><br /><sub>Animated particles for hero accents</sub>
</td>
<td width="33%" align="center">
<video src="https://github.com/ruixenui/ruixen.com/raw/refs/heads/main/public/landing-page-previews/badge-morph-dark.mp4" width="100%" autoplay loop muted playsinline></video>
<strong>Badge Morph</strong><br /><sub>Spring-animated status badge</sub>
</td>
</tr>
</table>

<p align="center">
<a href="https://ruixen.com/docs"><strong>Browse all 240+ components &rarr;</strong></a>
</p>

<br />

## What's inside

**Sections** &mdash; front-of-website blocks (51)

| | | | |
|:---|:---|:---|:---|
| Hero Sections | Pricing | FAQs | Footers |
| Navbars | Featured Sections | Client Sections | |

**Components** &mdash; primitives and effects for landing pages (88)

| | | | |
|:---|:---|:---|:---|
| Buttons | Inputs | Cards | Forms |
| Accordions | Avatars | Badges | Banners |
| Backgrounds | Text Effects | Loaders | Carousels |
| AI Chat Inputs | Audio & Media | Image Tools | Video Players |
| Checkboxes | Selects | Sliders | Tabs |
| Charts | Dialogs | Docks | Stepper |

**App UI** &mdash; bonus catalog for app interfaces (39)

| | | | |
|:---|:---|:---|:---|
| Calendars | Event Calendars | Date Pickers | Pagination |
| File Management | Notifications | Drawer | Menu |
| Breadcrumbs | | | |

<br />

## Pro Templates

Need polished, production-grade landing pages?

**[Ruixen Pro](https://pro.ruixen.com)** ships 50+ premium components and full landing-page templates with lifetime updates &mdash; **$59 once, no subscription.**

Apple Mega Nav &middot; Models Carousel &middot; CTA Meteor &middot; Hero Bars &middot; Bloom Text &middot; Voice Recorder &middot; Testimonials Map &middot; Workflow Bento &middot; and more.

<br />

## Gradients

A curated collection of **31 premium gradients** at 4K resolution (3840 &times; 2160) across 6 collections: Shade Shifters, Crimson Aura, Fractional Walls, Hero Gradients, Hue Flows, and Moon Backgrounds.

Free for personal and commercial use.

**[Browse gradients &rarr;](https://ruixen.com/gradients)**

<br />

## A note on motion

A subset of components &mdash; buttons, switches, badges, accordions, and a handful of others &mdash; use `motion/react` springs and a 3ms Web Audio click for a more tactile feel. They render fine without it; opt out per-component with `sound={false}`.

It's a flavor on the interactive primitives, not a universal feature of the catalog.

<br />

## Tech Stack

| | |
|:---|:---|
| **Framework** | Next.js 15 &middot; React 19 &middot; TypeScript 5 |
| **Styling** | Tailwind CSS v3 &amp; v4 &middot; CSS Variables |
| **Animation** | Motion (framer-motion successor) &middot; GSAP &middot; Web Audio API |
| **Primitives** | Radix UI &amp; Base UI (component code is identical; only the wrapper layer differs) |
| **Registry** | shadcn CLI &middot; JSON-based component registry |
| **Build** | One source codebase &rarr; four registry variants generated at build time |

<br />

## Contributing

You only need to change **5 files** to add a new component. It takes about 10 minutes.

```bash
git clone https://github.com/ruixenui/ruixen.com.git
cd ruixen.com
pnpm install
pnpm dev
```

Read the [Contributing Guide](./CONTRIBUTING.md) for the full walkthrough, or study the [example PR](https://github.com/ruixenui/ruixen.com/pull/12) to see exactly which files to touch.

<br />

## Contributors

<a href="https://github.com/ruixenui/ruixen.com/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ruixenui/ruixen.com" />
</a>

<br />
<br />

## Community

<p>
<a href="https://twitter.com/ruixen_ui"><img src="https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>&nbsp;
<a href="https://github.com/ruixenui/ruixen.com"><img src="https://img.shields.io/badge/GitHub-Star-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

<br />

## License

MIT &mdash; see [LICENSE](LICENSE) for details.

<br />

---

<div align="center">
<strong><a href="https://ruixen.com">ruixen.com</a></strong>
<br />
<sub>Marketing UI for shadcn &mdash; in any stack.</sub>
</div>
