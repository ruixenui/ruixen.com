/**
 * Static snapshot of the pro.ruixen.com `GET /api/v1/products?product_type=TEMPLATE`
 * response, used as the data source / fallback for the OSS `/templates` page
 * while the Pro API is not publicly reachable.
 *
 * Shape matches `ProTemplateList` in `types/pro-templates.ts`, which mirrors
 * the `ProductListResponse` Pydantic schema on the backend
 * (`pro.ruixen.com/backend/schemas/product.py`).
 *
 * Refresh: re-run the SQL dump against the Pro Supabase pooler and paste here.
 * Last synced: 2026-05-15.
 */

import type { ProTemplateList } from "@/types/pro-templates";

export const PRO_TEMPLATES_SNAPSHOT: ProTemplateList = {
  page: 1,
  page_size: 20,
  total: 2,
  total_pages: 1,
  items: [
    {
      id: 5,
      name: "Nguyen – AI Workspace SaaS Landing Page",
      slug: "nguyen-one",
      short_description:
        "A modern SaaS landing page for AI-native team workspaces with dark/light mode, interactive visuals, and Framer Motion animations.",
      long_description:
        "A fully responsive SaaS landing page template designed for AI-native team platforms. Built with Next.js 15, Tailwind CSS 4, and Framer Motion. Features an animated hero with video dialog, bento-grid feature showcase, interactive AI agent routing visuals, testimonial marquee, tiered pricing with billing toggle, accordion FAQs, and a structured footer — all with polished dark and light themes.",
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
      product_type: "template",
      category: {
        id: 2,
        name: "Landing Pages",
        slug: "landing-pages",
        description: "Marketing landing pages and SaaS homepages",
        icon: null,
        display_order: 0,
        is_active: true,
        product_count: null,
      },
      tech_stack: ["nextjs", "react", "tailwind", "framer-motion"],
      price_usd_cents: 2900,
      is_free: false,
      is_included_in_membership: true,
      demo_url: "https://nguyen-one.vercel.app/",
      video_url_light:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/nguyen-one-light.mp4",
      video_url_dark:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/nguyen-one-dark.mp4",
      preview_url: "https://nguyen-one.vercel.app/",
      documentation_url: null,
      what_is_this:
        "A premium SaaS landing page template built for AI-native team workspaces. It showcases AI agent routing, smart mentions, automated workflows, and team collaboration features through polished interactive visuals and animations.",
      who_is_this_for:
        "Founders, indie hackers, and SaaS teams building AI-powered products who need a production-ready landing page with pricing, testimonials, and feature showcases out of the box.",
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
        "next-themes": "^0.4.6",
        tailwindcss: "^4",
        "lucide-react": "^0.513.0",
        "@radix-ui/react-tabs": "^1.1.12",
        "embla-carousel-react": "^8.6.0",
        "@radix-ui/react-dialog": "^1.1.14",
        "@radix-ui/react-accordion": "^1.2.11",
        "@radix-ui/react-navigation-menu": "^1.2.13",
      },
      is_active: true,
      is_featured: true,
      coming_soon: false,
      download_count: 0,
      view_count: 175,
      version: "1.0.0",
      images: [
        {
          id: 6,
          image_url:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/nguyen-one-light.png",
          alt_text: "Nguyen landing page — light theme full preview",
          display_order: 0,
          is_thumbnail: true,
        },
        {
          id: 7,
          image_url:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/nguyen-one-dark.png",
          alt_text: "Nguyen landing page — dark theme full preview",
          display_order: 1,
          is_thumbnail: false,
        },
        {
          id: 8,
          image_url:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/nguyen-one-hero-light.png",
          alt_text: "Hero section — light theme",
          display_order: 2,
          is_thumbnail: false,
        },
      ],
      created_timestamp: "2026-02-23T17:43:02.887091+00:00",
      updated_timestamp: null,
    },
    {
      id: 4,
      name: "Intellune - AI Agent Platform Template",
      slug: "intellune",
      short_description:
        "Production-ready Next.js 15 template for building AI agent platforms with real-time streaming, modern dashboard UI, and seamless deployment infrastructure.",
      long_description:
        "Intellune is a comprehensive Next.js 15 template designed for developers building AI-powered agent platforms. Built with React 19, TypeScript, and Tailwind CSS, this template provides everything you need to launch your AI SaaS product.\n\nThe template features a stunning dark-mode-first design with glass morphism effects, real-time agent streaming capabilities, and a complete dashboard interface. Perfect for AI startups, automation platforms, and developer tools.\n\nIncludes 15+ pre-built sections, authentication flows, pricing pages, and deployment configurations for Vercel and other platforms.",
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
      price_usd_cents: 2900,
      is_free: false,
      is_included_in_membership: true,
      demo_url: "https://intellune-ruixen-com.vercel.app/",
      video_url_light:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/intellune-light-video.mp4",
      video_url_dark:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/intellune-dark-video.mp4",
      preview_url: "https://intellune-ruixen-com.vercel.app/",
      documentation_url: "",
      what_is_this:
        "Intellune is a production-ready Next.js 15 template specifically designed for AI agent platforms and SaaS products. It combines cutting-edge frontend technologies with a stunning visual design to help you launch your AI product faster.",
      who_is_this_for:
        "You're building an AI-powered SaaS product and need a professional frontend that matches the innovation of your technology. Whether you're creating an AI assistant platform, automation tool, or developer API service, Intellune gives you the complete foundation to impress users and investors alike.",
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
        zod: "3.25.34",
        next: "15.5.9",
        react: "19.0.0",
        resend: "4.5.2",
        recharts: "2.15.4",
        typescript: "5.7.3",
        "better-auth": "1.2.8",
        "drizzle-orm": "0.44.2",
        tailwindcss: "4.0.4",
        "@dnd-kit/core": "6.3.1",
        "@xyflow/react": "12.6.1",
        "framer-motion": "12.15.0",
        "react-hook-form": "7.57.0",
        "@radix-ui/react-tabs": "1.1.12",
        "@radix-ui/react-dialog": "1.1.14",
        "@neondatabase/serverless": "1.0.1",
        "@radix-ui/react-accordion": "1.2.11",
        "@radix-ui/react-dropdown-menu": "2.1.15",
      },
      is_active: true,
      is_featured: true,
      coming_soon: false,
      download_count: 2,
      view_count: 277,
      version: "1.0.0",
      images: [
        {
          id: 2,
          image_url:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/intellune-light.png",
          alt_text: "Intellune AI Agent Platform - Light Theme",
          display_order: 0,
          is_thumbnail: true,
        },
        {
          id: 3,
          image_url:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/pro_ruixen_products/intellune-dark.png",
          alt_text: "Intellune AI Agent Platform - Dark Theme",
          display_order: 1,
          is_thumbnail: false,
        },
      ],
      created_timestamp: "2026-01-27T09:44:45.669058+00:00",
      updated_timestamp: null,
    },
  ],
};
