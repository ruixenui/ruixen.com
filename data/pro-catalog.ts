/**
 * Pro template catalog — hardcoded mirror of the real pro.ruixen.com catalog.
 *
 * Source of truth (active templates live on pro.ruixen.com):
 *   - Nguyen   → pro.ruixen.com/backend/scripts/add_nguyen.py
 *   - Intellune → pulled from the live Pro product detail JSON
 *                 (pro.ruixen.com/templates/intellune RSC payload)
 *   - Folio / Vertex → pro.ruixen.com/backend/scripts/seed_templates.py
 *   - Coming-soon teaser → pro.ruixen.com/frontend/apps/www/app/templates/page.tsx
 *
 * The OSS site used to fetch /api/v1/products from pro.ruixen.com at build time.
 * That endpoint is unreliable, so everything here is static — the templates
 * page and /docs/templates/<slug> pages never fail to build or show a runtime
 * error. When pro.ruixen.com ships a new product, update this file.
 */

import type { ProCategory, ProTemplate } from "@/types/pro-templates";

const LANDING_PAGES: ProCategory = {
  id: 2,
  name: "Landing Pages",
  slug: "landing-pages",
  description: "Marketing landing pages, SaaS homepages, and product showcases",
  icon: "rocket",
  display_order: 2,
  is_active: true,
};

const R2_BASE =
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products";

function baseTemplate(overrides: Partial<ProTemplate>): ProTemplate {
  return {
    id: 0,
    name: "",
    slug: "",
    short_description: "",
    long_description: null,
    features: null,
    product_type: "template",
    category: null,
    tech_stack: null,
    price_usd_cents: 0,
    is_free: false,
    is_included_in_membership: true,
    demo_url: null,
    video_url_light: null,
    video_url_dark: null,
    preview_url: null,
    documentation_url: null,
    what_is_this: null,
    who_is_this_for: null,
    highlights: null,
    sections_included: null,
    dependencies: null,
    is_active: true,
    is_featured: false,
    coming_soon: false,
    download_count: 0,
    view_count: 0,
    version: null,
    images: [],
    created_timestamp: null,
    updated_timestamp: null,
    ...overrides,
  };
}

export const PRO_CATALOG: ProTemplate[] = [
  baseTemplate({
    id: 2,
    name: "Intellune - AI Agent Platform Template",
    slug: "intellune",
    short_description:
      "Production-ready Next.js 15 template for building AI agent platforms with real-time streaming, modern dashboard UI, and seamless deployment infrastructure.",
    long_description:
      "Intellune is a comprehensive Next.js 15 template designed for developers building AI-powered agent platforms. Built with React 19, TypeScript, and Tailwind CSS, this template provides everything you need to launch your AI SaaS product.\n\nThe template features a stunning dark-mode-first design with glass morphism effects, real-time agent streaming capabilities, and a complete dashboard interface. Perfect for AI startups, automation platforms, and developer tools.\n\nIncludes 15+ pre-built sections, authentication flows, pricing pages, and deployment configurations for Vercel and other platforms.",
    product_type: "template",
    category: null,
    tech_stack: [
      "nextjs",
      "react",
      "typescript",
      "tailwindcss",
      "radix-ui",
      "shadcn-ui",
      "framer-motion",
      "react-hook-form",
      "zod",
    ],
    features: [
      "Complete Next.js 15 application with App Router and React 19",
      "Real-time AI agent streaming interface with typing indicators",
      "Glass morphism UI design with dark/light mode support",
      "15+ pre-built responsive sections and components",
      "Authentication-ready pages (login, signup, forgot password)",
      "Interactive pricing page with toggle animations",
      "Dashboard layout with sidebar navigation",
      "Tailwind CSS with custom animations and effects",
      "TypeScript for type-safe development",
      "SEO optimized with meta tags and OpenGraph",
      "Mobile-first responsive design",
      "One-click Vercel deployment configuration",
    ],
    highlights: [
      "Next.js 15 with App Router and React 19",
      "28+ custom UI components with shadcn/ui and Radix UI",
      "Interactive bento grid feature showcase",
      "World map visualization for global deployment",
      "Live chat interface demo component",
      "Multi-model AI selector with 8+ providers",
      "Real-time analytics charts with Recharts",
      "Testimonial carousel with customer stories",
      "Fully responsive and accessible design",
      "Dark/light theme with smooth transitions",
    ],
    sections_included: [
      "Animated hero with gradient text",
      "AI agent chat interface",
      "Feature showcase bento grid",
      "Interactive pricing cards",
      "Testimonials carousel",
      "Integration partners logo cloud",
      "Dashboard preview section",
      "CTA sections with animations",
      "FAQ accordion",
      "Newsletter signup",
      "Footer with sitemap",
    ],
    dependencies: {
      next: "15.5.9",
      react: "19.0.0",
      typescript: "5.7.3",
      tailwindcss: "4.0.4",
      "framer-motion": "12.15.0",
      "@radix-ui/react-accordion": "1.2.11",
      "@radix-ui/react-dialog": "1.1.14",
      "@radix-ui/react-dropdown-menu": "2.1.15",
      "@radix-ui/react-tabs": "1.1.12",
      recharts: "2.15.4",
      "drizzle-orm": "0.44.2",
      "@neondatabase/serverless": "1.0.1",
      "@xyflow/react": "12.6.1",
      "@dnd-kit/core": "6.3.1",
      zod: "3.25.34",
      "react-hook-form": "7.57.0",
      resend: "4.5.2",
      "better-auth": "1.2.8",
    },
    price_usd_cents: 2900,
    is_free: false,
    is_included_in_membership: true,
    demo_url: "https://intellune-ruixen-com.vercel.app/",
    preview_url: "https://intellune-ruixen-com.vercel.app/",
    video_url_light: `${R2_BASE}/intellune-light-video.mp4`,
    video_url_dark: `${R2_BASE}/intellune-dark-video.mp4`,
    what_is_this:
      "Intellune is a production-ready Next.js 15 template specifically designed for AI agent platforms and SaaS products. It combines cutting-edge frontend technologies with a stunning visual design to help you launch your AI product faster.",
    who_is_this_for:
      "You're building an AI-powered SaaS product and need a professional frontend that matches the innovation of your technology. Whether you're creating an AI assistant platform, automation tool, or developer API service, Intellune gives you the complete foundation to impress users and investors alike.",
    is_active: true,
    is_featured: true,
    coming_soon: false,
    version: "1.0.0",
    images: [
      {
        id: 1,
        image_url: `${R2_BASE}/intellune-light.png`,
        alt_text: "Intellune AI Agent Platform - Light Theme",
        display_order: 0,
        is_thumbnail: true,
      },
      {
        id: 2,
        image_url: `${R2_BASE}/intellune-dark.png`,
        alt_text: "Intellune AI Agent Platform - Dark Theme",
        display_order: 1,
        is_thumbnail: false,
      },
    ],
  }),
  baseTemplate({
    id: 1,
    name: "Nguyen – AI Workspace SaaS Landing Page",
    slug: "nguyen-one",
    short_description:
      "A modern SaaS landing page for AI-native team workspaces with dark/light mode, interactive visuals, and Framer Motion animations.",
    long_description:
      "A fully responsive SaaS landing page template designed for AI-native team platforms. Built with Next.js 15, Tailwind CSS 4, and Framer Motion. Features an animated hero with video dialog, bento-grid feature showcase, interactive AI agent routing visuals, testimonial marquee, tiered pricing with billing toggle, accordion FAQs, and a structured footer — all with polished dark and light themes.",
    product_type: "template",
    category: LANDING_PAGES,
    tech_stack: ["nextjs", "react", "tailwind", "framer-motion"],
    features: [
      "Fully responsive design (mobile, tablet, desktop)",
      "Dark / Light mode with next-themes",
      "Framer Motion animations and micro-interactions",
      "Interactive AI agent routing visual with animated SVG paths",
      "Bento-grid featured section with animated cards",
      "Testimonial marquee carousel",
      "Tiered pricing with monthly/annual billing toggle",
      "Accordion FAQ section",
      "Hero section with embedded video dialog",
      "Scroll-to-section navigation",
    ],
    highlights: [
      "Built with Next.js 15 App Router & React 19",
      "7 hand-crafted sections with rich interactive visuals",
      "One-click deploy to Vercel",
    ],
    sections_included: [
      "Hero",
      "Featured (Bento Grid)",
      "Services (3-row showcase)",
      "Testimonials",
      "Pricing",
      "FAQs",
      "Footer",
    ],
    dependencies: {
      next: "15.4.10",
      react: "^19.2.1",
      motion: "^12.16.0",
      tailwindcss: "^4",
      "next-themes": "^0.4.6",
      "@radix-ui/react-accordion": "^1.2.11",
      "@radix-ui/react-dialog": "^1.1.14",
      "@radix-ui/react-navigation-menu": "^1.2.13",
      "@radix-ui/react-tabs": "^1.1.12",
      "embla-carousel-react": "^8.6.0",
      "lucide-react": "^0.513.0",
    },
    price_usd_cents: 2900,
    is_free: false,
    is_included_in_membership: true,
    demo_url: "https://nguyen-one.vercel.app/",
    preview_url: "https://nguyen-one.vercel.app/",
    video_url_light: `${R2_BASE}/nguyen-one-light.mp4`,
    video_url_dark: `${R2_BASE}/nguyen-one-dark.mp4`,
    what_is_this:
      "A premium SaaS landing page template built for AI-native team workspaces. It showcases AI agent routing, smart mentions, automated workflows, and team collaboration features through polished interactive visuals and animations.",
    who_is_this_for:
      "Founders, indie hackers, and SaaS teams building AI-powered products who need a production-ready landing page with pricing, testimonials, and feature showcases out of the box.",
    is_active: true,
    is_featured: true,
    coming_soon: false,
    version: "1.0.0",
    images: [
      {
        id: 1,
        image_url: `${R2_BASE}/nguyen-one-light.png`,
        alt_text: "Nguyen landing page — light theme full preview",
        display_order: 0,
        is_thumbnail: true,
      },
      {
        id: 2,
        image_url: `${R2_BASE}/nguyen-one-dark.png`,
        alt_text: "Nguyen landing page — dark theme full preview",
        display_order: 1,
        is_thumbnail: false,
      },
      {
        id: 3,
        image_url: `${R2_BASE}/nguyen-one-hero-light.png`,
        alt_text: "Hero section — light theme",
        display_order: 2,
        is_thumbnail: false,
      },
    ],
  }),
  baseTemplate({
    id: 3,
    name: "Folio — Open Source Data Intelligence Landing Template",
    slug: "folio",
    short_description:
      "Production-grade Next.js 15 landing template for open-source data intelligence and AI charting products. Hero with dashboard preview, Bento, How-it-Works, FAQ.",
    long_description:
      "Folio is a polished, production-ready marketing site for open-source data intelligence, BI, and AI-charting products. Built on Next.js 15 App Router, React 19, Tailwind CSS 4, and shadcn/ui, it ships with a Hero featuring an in-page dashboard preview, a Bento feature grid, animated Feature Tabs, a How-it-Works walkthrough, Testimonials, Customers / logo cloud, Pricing, FAQ, and CTA. Pre-built Pricing, Contact, Privacy, Terms, and a custom 404 page. Light/dark mode via next-themes, type-safe env via @t3-oss/env-nextjs, optional Drizzle + Neon Postgres and Resend + React Email scaffolding, Biome for one-command lint and format. Ideal positioning for OSS-first BI tools and natural-language-to-SQL products.",
    product_type: "template",
    category: null,
    tech_stack: ["nextjs", "react", "tailwind"],
    features: [
      "Next.js 15 App Router + Turbopack",
      "React 19 + TypeScript 5.7",
      "Tailwind CSS 4 + shadcn/ui + Radix primitives",
      "Light / Dark mode (next-themes)",
      "Framer Motion animations",
      "Hero with in-page dashboard preview",
      "Bento feature grid + animated Feature Tabs",
      "How-it-Works walkthrough",
      "Testimonials, Customers, Pricing, FAQ, CTA",
      "Pricing, Contact, Privacy, Terms, 404 pages",
      "SEO: dynamic metadata, sitemap, Open Graph",
      "Type-safe env with @t3-oss/env-nextjs",
      "Optional Drizzle ORM + Neon Postgres",
      "Optional Resend + React Email",
      "React Hook Form + Zod forms",
      "Biome lint + format",
    ],
    highlights: [
      "Save 80+ hours of frontend work",
      "Positioning baked in for OSS / data-intelligence products",
      "Hero with embedded dashboard preview",
      "Light + dark mode, fully responsive",
      "Ship to Vercel in minutes",
      "Yours to own — unlimited projects, commercial use",
    ],
    sections_included: [
      "Header with mobile menu + theme toggle",
      "Hero with dashboard preview",
      "Logo Cloud / Customers carousel",
      "Bento feature grid",
      "Feature Tabs (animated)",
      "How-it-Works walkthrough",
      "Services",
      "Product Tabs",
      "Testimonials",
      "Quote",
      "Pricing comparison table",
      "FAQ accordion",
      "CTA",
      "Footer",
    ],
    dependencies: {
      next: "15.5.9",
      react: "19.0.0",
      typescript: "5.7.3",
      tailwindcss: "4.0.4",
      "framer-motion": "12.23.26",
      "drizzle-orm": "0.41.0",
      "better-auth": "1.2.5",
      resend: "4.2.0",
    },
    price_usd_cents: 3900,
    is_free: false,
    is_included_in_membership: true,
    demo_url: "https://folio-topaz-delta.vercel.app",
    preview_url: "https://folio-topaz-delta.vercel.app",
    video_url_light: `${R2_BASE}/folio/folio-light-theme.mp4`,
    video_url_dark: `${R2_BASE}/folio/folio-dark-theme.mp4`,
    what_is_this:
      "Folio is a Next.js 15 marketing template built for open-source data intelligence, business-intelligence, and AI-charting products. It bundles a Hero with an embedded dashboard preview, a Bento grid, animated Feature Tabs, and the supporting pages every OSS landing page needs — so you can launch a credible site without rebuilding the same scaffolding.",
    who_is_this_for:
      "Founders and maintainers launching an open-source data tool, natural-language-to-SQL product, AI-charting library, or BI platform who need a polished marketing site that signals credibility from the first scroll — without spending weeks on design polish, dark-mode QA, and section assembly.",
    is_active: true,
    is_featured: true,
    coming_soon: false,
    version: "1.0.0",
    images: [
      {
        id: 1,
        image_url: `${R2_BASE}/folio/folio-image-01.png`,
        alt_text: "Folio landing — hero with dashboard preview",
        display_order: 0,
        is_thumbnail: true,
      },
      {
        id: 2,
        image_url: `${R2_BASE}/folio/folio-image-02.png`,
        alt_text: "Folio landing — bento grid",
        display_order: 1,
        is_thumbnail: false,
      },
      {
        id: 3,
        image_url: `${R2_BASE}/folio/folio-image-03.png`,
        alt_text: "Folio landing — feature tabs",
        display_order: 2,
        is_thumbnail: false,
      },
      {
        id: 4,
        image_url: `${R2_BASE}/folio/folio-image-04.png`,
        alt_text: "Folio landing — how it works",
        display_order: 3,
        is_thumbnail: false,
      },
      {
        id: 5,
        image_url: `${R2_BASE}/folio/folio-image-05.png`,
        alt_text: "Folio landing — testimonials / customers",
        display_order: 4,
        is_thumbnail: false,
      },
      {
        id: 6,
        image_url: `${R2_BASE}/folio/folio-image-06.png`,
        alt_text: "Folio landing — pricing / CTA",
        display_order: 5,
        is_thumbnail: false,
      },
    ],
  }),
  baseTemplate({
    id: 4,
    name: "Vertex — AI Workflow Automation Landing Template",
    slug: "vertex",
    short_description:
      "Production-grade Next.js 15 landing page for AI workflow automation products. 10+ sections, light/dark, SEO-ready.",
    long_description:
      "Vertex is a polished, production-ready marketing site for AI workflow automation startups, built on Next.js 15 App Router, React 19, Tailwind CSS 4, and shadcn/ui. It ships with a full landing page composed of 10+ section components (Hero with rotating CRM cards, Features, Services, Product Tabs, Customers, Testimonials, Quote, Pricing comparison, FAQ, CTA), plus pre-built Pricing, Contact, Privacy, Terms, and custom 404 pages. Light/dark mode via next-themes, type-safe env via @t3-oss/env-nextjs, optional Drizzle + Neon Postgres and Resend + React Email scaffolding, and Biome for one-command lint and format.",
    product_type: "template",
    category: null,
    tech_stack: ["nextjs", "react", "tailwind"],
    features: [
      "Next.js 15 App Router + Turbopack",
      "React 19 + TypeScript 5.7",
      "Tailwind CSS 4 + shadcn/ui + Radix primitives",
      "Light / Dark mode (next-themes)",
      "Framer Motion animations",
      "10+ pre-built landing sections",
      "Pricing, Contact, Privacy, Terms, 404 pages",
      "SEO: dynamic metadata, sitemap, Open Graph",
      "Type-safe env with @t3-oss/env-nextjs",
      "Optional Drizzle ORM + Neon Postgres",
      "Optional Resend + React Email",
      "React Hook Form + Zod forms",
      "Biome lint + format",
    ],
    highlights: [
      "Save 80+ hours of frontend work",
      "AI-product positioning baked into copy and layout",
      "Light + dark mode, fully responsive",
      "Ship to Vercel in minutes",
      "Yours to own — unlimited projects, commercial use",
    ],
    sections_included: [
      "Header with mobile menu + theme toggle",
      "Hero with rotating CRM cards",
      "Logo Cloud",
      "Features grid",
      "Services",
      "Product Tabs",
      "Customers",
      "Testimonials carousel",
      "Quote",
      "Pricing comparison table",
      "FAQ accordion",
      "CTA",
      "Footer",
    ],
    dependencies: {
      next: "15.5.9",
      react: "19.0.0",
      typescript: "5.7.3",
      tailwindcss: "4.0.4",
      "framer-motion": "12.23.26",
      "drizzle-orm": "0.41.0",
      "better-auth": "1.2.5",
      resend: "4.2.0",
    },
    price_usd_cents: 3900,
    is_free: false,
    is_included_in_membership: true,
    demo_url: "https://vertex-one-lovat.vercel.app",
    preview_url: "https://vertex-one-lovat.vercel.app",
    video_url_light: `${R2_BASE}/vertex/vertex-light-video.mp4`,
    video_url_dark: `${R2_BASE}/vertex/vertex-dark-video.mp4`,
    what_is_this:
      "Vertex is a Next.js 15 marketing template purpose-built for AI workflow automation products. It bundles a complete landing page, supporting pages, and modern tooling so you can launch a credible site without spending weeks on layout, polish, and dark-mode QA.",
    who_is_this_for:
      "Founders and indie hackers launching an AI workflow, agents, or automation product who want a polished, conversion-tuned site running in a day — not a sprint of design, copy structure, and section assembly.",
    is_active: true,
    is_featured: true,
    coming_soon: false,
    version: "1.0.0",
    images: [
      {
        id: 1,
        image_url: `${R2_BASE}/vertex/vertex-image-01.png`,
        alt_text: "Vertex landing — hero",
        display_order: 0,
        is_thumbnail: true,
      },
      {
        id: 2,
        image_url: `${R2_BASE}/vertex/vertex-image-02.png`,
        alt_text: "Vertex landing — features",
        display_order: 1,
        is_thumbnail: false,
      },
      {
        id: 3,
        image_url: `${R2_BASE}/vertex/vertex-image-03.png`,
        alt_text: "Vertex landing — services / product tabs",
        display_order: 2,
        is_thumbnail: false,
      },
      {
        id: 4,
        image_url: `${R2_BASE}/vertex/vertex-image-04.png`,
        alt_text: "Vertex landing — pricing",
        display_order: 3,
        is_thumbnail: false,
      },
      {
        id: 5,
        image_url: `${R2_BASE}/vertex/vertex-image-05.png`,
        alt_text: "Vertex landing — testimonials / CTA",
        display_order: 4,
        is_thumbnail: false,
      },
    ],
  }),
];

// Folio and Vertex shipped as real products — no coming-soon teasers right now.
export const COMING_SOON_CATALOG: ReadonlyArray<{
  name: string;
  description: string;
  image_url: string;
}> = [];

export function getProTemplates(): ProTemplate[] {
  return PRO_CATALOG.filter((t) => t.is_active && !t.coming_soon);
}

export function getProTemplateBySlug(slug: string): ProTemplate | null {
  return (
    PRO_CATALOG.find((t) => t.slug === slug && t.is_active && !t.coming_soon) ??
    null
  );
}
