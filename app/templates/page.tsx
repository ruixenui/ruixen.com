import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TemplateProClickTracker } from "@/components/template-pro-click-tracker";

/**
 * Build the Pro-site preview URL with UTM + ref attribution so we can
 * measure every template-card click in PostHog/GA4. Free templates keep
 * their external vercel/github URLs unchanged.
 */
function buildPreviewHref(template: Template): string {
  if (template.price === "free") return template.previewUrl;
  try {
    const url = new URL(template.previewUrl);
    url.searchParams.set("ref", "oss_templates");
    url.searchParams.set("utm_source", "ruixen");
    url.searchParams.set("utm_medium", "template_card");
    url.searchParams.set("utm_campaign", "bridge");
    url.searchParams.set("slug", template.id);
    return url.toString();
  } catch {
    return template.previewUrl;
  }
}

function buildGetProHref(slug: string): string {
  return `https://pro.ruixen.com/pricing?ref=oss_templates_get_pro&slug=${encodeURIComponent(
    slug,
  )}`;
}

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Beautiful, responsive templates built with modern web technologies.",
};

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  previewUrl: string;
  githubUrl?: string;
  price: "free" | "pro";
  technologies: string[];
  features: string[];
  author: string;
  publishedAt: string;
  category?: string;
}

const templates: Template[] = [
  // ============================================
  // FREE TEMPLATES
  // ============================================
  {
    id: "portfolio",
    title: "Creative Portfolio Template",
    description:
      "A sleek portfolio template to highlight your creative journey and accomplishments.",
    image: "/portfolio-preview.jpg",
    video: "/portfolio.mp4",
    previewUrl: "https://portfolio-ruixens-projects.vercel.app/",
    githubUrl: "https://github.com/ruixenui/portfolio",
    price: "free",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
    ],
    features: [
      "Hero Section with Introduction",
      "Skills Section",
      "Experience Section",
      "Portfolio/Projects Section",
      "Certifications Section",
      "Achievements Section",
      "Testimonials Section",
      "Contact Section",
      "Blog",
    ],
    author: "srinathg",
    publishedAt: "2024-08-10",
    category: "Full Templates",
  },

  // ============================================
  // PRO HERO SECTIONS
  // ============================================
  {
    id: "hero-bars",
    title: "Hero Bars",
    description:
      "Animated vertical bars with wave effects and centered title overlay. Visually striking hero background with symmetrical scaling.",
    image: "/showcase/hero-bars-light.mp4",
    video: "/showcase/hero-bars-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/hero-bars",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Animated vertical bars with wave motion",
      "Symmetrical scaling from center",
      "Customizable gradient colors",
      "Adjustable wave intensity and timing",
      "Optional centered title overlay",
      "Toggle animation on/off",
    ],
    author: "ruixen",
    publishedAt: "2025-01-10",
    category: "Hero Sections",
  },
  {
    id: "hero-mobile-showcase",
    title: "Hero Mobile Showcase",
    description:
      "A hero section with animated split text and centered mobile phone mockup. Perfect for app landing pages.",
    image: "/showcase/hero-mobile-showcase-light.mp4",
    video: "/showcase/hero-mobile-showcase-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/hero-mobile-showcase",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Animated split text effect",
      "Centered mobile phone mockup",
      "Smooth entrance animations",
      "Responsive design",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-01-12",
    category: "Hero Sections",
  },
  {
    id: "hero-cursor-cards",
    title: "Hero Cursor Cards",
    description:
      "A hero section with floating cursor pointers, following cursor effect, three overlapping cards in diamond layout, and logo cloud.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/hero-cursor-cards",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Floating cursor pointers",
      "Mouse-following effect",
      "Overlapping diamond card layout",
      "Logo cloud integration",
      "Smooth animations",
    ],
    author: "ruixen",
    publishedAt: "2025-01-14",
    category: "Hero Sections",
  },
  {
    id: "hero-dot-pattern",
    title: "Hero Dot Pattern",
    description:
      "A hero section with dot pattern background, fixed navbar with scroll-aware styling, logo cloud slider, and themed dashboard preview.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/hero-dot-pattern",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "next-themes",
    ],
    features: [
      "Dot pattern background",
      "Scroll-aware fixed navbar",
      "Logo cloud slider",
      "Dashboard preview mockup",
      "Theme support",
    ],
    author: "ruixen",
    publishedAt: "2025-01-16",
    category: "Hero Sections",
  },
  {
    id: "hero-tabs-dashboard",
    title: "Hero Tabs Dashboard",
    description:
      "A hero section with tabbed feature navigation, dashboard sidebar preview, junction dot accents, and crosshatch background pattern.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/hero-tabs-dashboard",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide React",
    ],
    features: [
      "Tabbed feature navigation",
      "Dashboard sidebar preview",
      "Junction dot accents",
      "Crosshatch background pattern",
      "Responsive layout",
    ],
    author: "ruixen",
    publishedAt: "2025-01-18",
    category: "Hero Sections",
  },

  // ============================================
  // PRO TESTIMONIALS
  // ============================================
  {
    id: "testimonials-split-tabs",
    title: "Testimonials Split Tabs",
    description:
      "An elegant split-view testimonial component with animated image tabs that expand on hover. Perfect for showcasing client feedback.",
    image: "/showcase/testimonials-split-tabs-light.mp4",
    video: "/showcase/testimonials-split-tabs-dark.mp4",
    previewUrl:
      "https://pro.ruixen.com/docs/components/testimonials-split-tabs",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Smooth hover-to-activate animations",
      "Split-view layout with image and quote",
      "Keyboard navigation support",
      "Responsive mobile/desktop design",
      "Customizable height and flex ratios",
      "Accessible ARIA attributes",
    ],
    author: "ruixen",
    publishedAt: "2025-01-15",
    category: "Testimonials",
  },
  {
    id: "testimonials-map",
    title: "Testimonials World Map",
    description:
      "A stunning world map visualization that displays testimonials distributed by country. Features 3D globe effect on mobile.",
    image: "/showcase/map-location-picker-light.mp4",
    video: "/showcase/map-location-picker-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/testimonials-map",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Interactive world map visualization",
      "Country-based testimonial placement",
      "3D globe curve effect on mobile",
      "Hover tooltips with details",
      "Responsive scaling",
      "100+ country support",
    ],
    author: "ruixen",
    publishedAt: "2025-01-20",
    category: "Testimonials",
  },

  // ============================================
  // PRO ANIMATIONS & EFFECTS
  // ============================================
  {
    id: "scroll-fx",
    title: "Scroll FX Gallery",
    description:
      "A Three.js-powered cinematic scroll-driven media gallery with focus detection and dynamic text. Infinite scroll with images and videos.",
    image: "/showcase/scroll-fx-light.mp4",
    video: "/showcase/scroll-fx-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/scroll-fx",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "Three.js",
      "@react-three/fiber",
      "@react-three/drei",
    ],
    features: [
      "Mixed images and videos (MP4, WebM)",
      "Infinite scrolling",
      "Automatic focus detection",
      "Dynamic text labels",
      "Smooth wheel + drag interaction",
      "Sharp WebGL rendering",
    ],
    author: "ruixen",
    publishedAt: "2025-01-22",
    category: "Animations",
  },
  {
    id: "scroll-fx-timeline",
    title: "Scroll FX Timeline",
    description:
      "A scroll-driven timeline component with visual effects and animated progress indicators.",
    image: "/showcase/scroll-fx-timeline-light.mp4",
    video: "/showcase/scroll-fx-timeline-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/scroll-fx-timeline",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Scroll-driven animations",
      "Timeline progress indicator",
      "Visual effects on scroll",
      "Responsive design",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-01-24",
    category: "Animations",
  },
  {
    id: "scroll-split-video-gallery",
    title: "Scroll Split Video Gallery",
    description:
      "A split-screen video gallery with scroll interaction and responsive design. Perfect for showcasing video content.",
    image: "/showcase/scroll-split-video-gallery-light.mp4",
    video: "/showcase/scroll-split-video-gallery-dark.mp4",
    previewUrl:
      "https://pro.ruixen.com/docs/components/scroll-split-video-gallery",
    price: "pro",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Split-screen layout",
      "Scroll-driven video playback",
      "Responsive design",
      "Smooth transitions",
      "Video autoplay on focus",
    ],
    author: "ruixen",
    publishedAt: "2025-01-26",
    category: "Animations",
  },
  {
    id: "bloom-text",
    title: "Bloom Text",
    description:
      "Text with blooming flower animation effect. A beautiful way to highlight important text with organic motion.",
    image: "/showcase/bloom-text-light.mp4",
    video: "/showcase/bloom-text-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/bloom-text",
    price: "pro",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Blooming flower animation",
      "CSS-only animations",
      "Dark mode support",
      "Customizable timing",
      "Lightweight implementation",
    ],
    author: "ruixen",
    publishedAt: "2025-01-28",
    category: "Animations",
  },
  {
    id: "cta-meteor",
    title: "CTA Meteor",
    description:
      "A cinematic CTA section with meteor animation that falls and expands. Features gradient effects and particle animations.",
    image: "/showcase/cta-meteor-light.mp4",
    video: "/showcase/cta-meteor-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/cta-meteor",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    features: [
      "Cinematic meteor falling animation",
      "Width expansion effect after impact",
      "Floating particle system",
      "Large gradient background text",
      "Primary and secondary CTA buttons",
      "Viewport-triggered animation",
    ],
    author: "ruixen",
    publishedAt: "2025-02-01",
    category: "CTA Sections",
  },
  {
    id: "project-title-morph",
    title: "Project Title Morph",
    description:
      "A morphing project title animation component with button interaction. Text transforms smoothly between states.",
    image: "/showcase/project-title-morph-light.mp4",
    video: "/showcase/project-title-morph-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/project-title-morph",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    features: [
      "Text morphing animation",
      "Button interaction trigger",
      "Smooth state transitions",
      "Customizable text content",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-02-03",
    category: "Animations",
  },

  // ============================================
  // PRO NAVIGATION
  // ============================================
  {
    id: "apple-mega-nav",
    title: "Apple Mega Nav",
    description:
      "Apple-style mega navigation menu with accordion and sheet support. Clean, minimal design with smooth animations.",
    image: "/showcase/apple-mega-nav-light.mp4",
    video: "/showcase/apple-mega-nav-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/apple-mega-nav",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "@radix-ui/react-navigation-menu",
      "Lucide React",
    ],
    features: [
      "Apple-style mega menu",
      "Accordion support",
      "Mobile sheet navigation",
      "Smooth animations",
      "Accessible keyboard navigation",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-02-05",
    category: "Navigation",
  },

  // ============================================
  // PRO INTERACTIVE COMPONENTS
  // ============================================
  {
    id: "instagram-stories",
    title: "Instagram Stories",
    description:
      "A fully-featured Instagram Stories component with progress bars, video support, swipe navigation, and like/reply actions.",
    image: "/showcase/instagram-stories-light.mp4",
    video: "/showcase/instagram-stories-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/instagram-stories",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    features: [
      "Animated avatar trigger with gradient ring",
      "Progress bars for each story",
      "Support for images and videos",
      "Swipe/tap navigation",
      "Hold to pause functionality",
      "Keyboard navigation",
    ],
    author: "ruixen",
    publishedAt: "2025-02-07",
    category: "Interactive",
  },
  {
    id: "map-location-picker",
    title: "Map Location Picker",
    description:
      "An interactive map component with location cards, pagination, and real-time selection using Leaflet.",
    image: "/showcase/map-location-picker-light.mp4",
    video: "/showcase/map-location-picker-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/map-location-picker",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "react-leaflet",
      "Leaflet",
    ],
    features: [
      "Interactive map with markers",
      "Location cards with details",
      "Pagination support",
      "Real-time selection",
      "Customizable markers",
      "Responsive design",
    ],
    author: "ruixen",
    publishedAt: "2025-02-09",
    category: "Interactive",
  },
  {
    id: "models-carousel",
    title: "Models Carousel",
    description:
      "A carousel component for displaying models like AI models or product variants with smooth transitions.",
    image: "/showcase/models-carousel-light.mp4",
    video: "/showcase/models-carousel-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/models-carousel",
    price: "pro",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Smooth carousel transitions",
      "Model/variant display",
      "Navigation controls",
      "Responsive design",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-02-11",
    category: "Interactive",
  },
  {
    id: "accordion-with-image-tooltip",
    title: "Accordion with Image Tooltip",
    description:
      "An accordion component with image tooltips on hover. Combines information hierarchy with visual previews.",
    image: "/showcase/accordion-with-image-tooltip-light.mp4",
    video: "/showcase/accordion-with-image-tooltip-dark.mp4",
    previewUrl:
      "https://pro.ruixen.com/docs/components/accordion-with-image-tooltip",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    features: [
      "Accordion with tooltips",
      "Image preview on hover",
      "Smooth expand/collapse",
      "Accessible keyboard support",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-02-13",
    category: "Interactive",
  },

  // ============================================
  // PRO FOOTER SECTIONS
  // ============================================
  {
    id: "flicker-footer",
    title: "Flicker Footer",
    description:
      "A sticky reveal footer with tube light flicker animation effect on headline text. Eye-catching and memorable.",
    image: "/showcase/flicker-footer-light.mp4",
    video: "/showcase/flicker-footer-dark.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/flicker-footer",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Sticky reveal on scroll",
      "Tube light flicker animation",
      "Headline text effect",
      "Navigation links",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-02-15",
    category: "Footers",
  },
  {
    id: "footer-reveal",
    title: "Footer Reveal",
    description:
      "A sticky reveal footer with navigation, hero typography, and optional images that reveals on scroll.",
    image: "/showcase/flicker-footer-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/footer-reveal",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    features: [
      "Sticky reveal animation",
      "Hero typography",
      "Optional background images",
      "Navigation links",
      "Social media icons",
    ],
    author: "ruixen",
    publishedAt: "2025-02-17",
    category: "Footers",
  },

  // ============================================
  // PRO BENTO GRIDS & SERVICES
  // ============================================
  {
    id: "feature-bento-grid",
    title: "Feature Bento Grid",
    description:
      "A beautiful bento grid layout for showcasing features with corner accents, dot patterns, and various card styles.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/feature-bento-grid",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Bento grid layout",
      "Corner plus accents",
      "Dot pattern backgrounds",
      "Multiple card types",
      "Dark mode support",
      "Responsive design",
    ],
    author: "ruixen",
    publishedAt: "2025-02-19",
    category: "Bento Grids",
  },
  {
    id: "services-bento-grid",
    title: "Services Bento Grid",
    description:
      "A bento grid layout for services with dashboard preview, stats, testimonial, kanban board, and resource usage cards.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/services-bento-grid",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide React",
    ],
    features: [
      "Dashboard preview card",
      "Stats display",
      "Testimonial integration",
      "Kanban board card",
      "Resource usage display",
    ],
    author: "ruixen",
    publishedAt: "2025-02-21",
    category: "Bento Grids",
  },
  {
    id: "workflow-bento-grid",
    title: "Workflow Bento Grid",
    description:
      "A bento grid layout showcasing workflow automation features with connected cards, status indicators, and dot patterns.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/workflow-bento-grid",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Connected workflow cards",
      "Visual connection lines",
      "Status indicators with AI badges",
      "Multiple card types",
      "Responsive design",
    ],
    author: "ruixen",
    publishedAt: "2025-02-23",
    category: "Bento Grids",
  },
  {
    id: "services-interactive-cards",
    title: "Services Interactive Cards",
    description:
      "A services section with three interactive cards showcasing AI task breakdown, team workflow diagram, and automated engagement.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl:
      "https://pro.ruixen.com/docs/components/services-interactive-cards",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "SignalCard with AI task breakdown",
      "SequenceCard with workflow diagram",
      "AutomateCard with carousel",
      "Smooth motion animations",
      "Responsive grid layout",
    ],
    author: "ruixen",
    publishedAt: "2025-02-25",
    category: "Services",
  },
  {
    id: "services-scroll",
    title: "Services Scroll",
    description:
      "A scroll-driven services section with animated cards that stack and transform as you scroll.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/services-scroll",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Scroll-driven animations",
      "Stacking card effect",
      "Transform on scroll",
      "Responsive design",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-02-27",
    category: "Services",
  },

  // ============================================
  // PRO STATS & COUNTERS
  // ============================================
  {
    id: "stats-counter",
    title: "Stats Counter",
    description:
      "An animated stats section with scroll-triggered number counters, customizable values, and responsive grid layout.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/stats-counter",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "@number-flow/react",
    ],
    features: [
      "Scroll-triggered animation",
      "Smooth number counter animation",
      "Customizable stats with suffixes",
      "Configurable animation delays",
      "Responsive grid layout",
      "Gradient border separators",
    ],
    author: "ruixen",
    publishedAt: "2025-03-01",
    category: "Stats",
  },
  {
    id: "stats-row",
    title: "Stats Row",
    description:
      "A horizontal stats section with staggered animations, vertical dividers, and descriptions for each metric.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/stats-row",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "@number-flow/react",
    ],
    features: [
      "Horizontal layout",
      "Staggered animations",
      "Vertical dividers",
      "Metric descriptions",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-03-03",
    category: "Stats",
  },

  // ============================================
  // PRO MISCELLANEOUS
  // ============================================
  {
    id: "logo-cloud-animated",
    title: "Logo Cloud Animated",
    description:
      "An animated logo cloud with cycling logos, grid layout, and corner plus icons. Perfect for showcasing partners.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/logo-cloud-animated",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    features: [
      "Cycling logo animation",
      "Grid layout",
      "Corner plus icons",
      "Customizable timing",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-03-05",
    category: "Logo Clouds",
  },
  {
    id: "integrations-grid",
    title: "Integrations Grid",
    description:
      "A responsive grid layout showcasing integration cards with brand logos, titles, and descriptions.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/integrations-grid",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    features: [
      "Integration cards",
      "Brand logos support",
      "Responsive grid",
      "Hover animations",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-03-07",
    category: "Grids",
  },
  {
    id: "masonry-grid",
    title: "Masonry Grid",
    description:
      "A responsive masonry grid layout with scroll-driven animations and hover effects using GSAP.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/masonry-grid",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "imagesloaded",
    ],
    features: [
      "Masonry layout",
      "Scroll-driven animations",
      "Hover effects",
      "GSAP powered",
      "Responsive design",
    ],
    author: "ruixen",
    publishedAt: "2025-03-09",
    category: "Grids",
  },
  {
    id: "changelog",
    title: "Changelog Section",
    description:
      "A changelog section component with version badges, dates, and entry cards. Track your product updates beautifully.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/changelog",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide React",
    ],
    features: [
      "Version badges",
      "Date display",
      "Entry cards",
      "Categorized updates",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-03-11",
    category: "Sections",
  },
  {
    id: "faq-section",
    title: "FAQ Section",
    description:
      "A customizable FAQ accordion section with multiple variants, icons, and smooth animations.",
    image: "/showcase/hero-bars-light.mp4",
    previewUrl: "https://pro.ruixen.com/docs/components/faq-section",
    price: "pro",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "@radix-ui/react-accordion",
      "Lucide React",
    ],
    features: [
      "Multiple variants",
      "Icon support",
      "Smooth animations",
      "Accessible",
      "Dark mode support",
    ],
    author: "ruixen",
    publishedAt: "2025-03-13",
    category: "Sections",
  },
];

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-none border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Content */}
        <div className="p-6 space-y-4">
          <CardHeader className="p-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{template.title}</CardTitle>
                {template.category && (
                  <Badge variant="outline" className="text-[10px] font-normal">
                    {template.category}
                  </Badge>
                )}
              </div>
              <CardDescription>{template.description}</CardDescription>
            </div>
          </CardHeader>

          <div className="flex flex-wrap gap-1">
            {template.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {template.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{template.technologies.length - 4} more
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Key Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {template.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
              {template.features.length > 3 && (
                <li className="text-xs text-muted-foreground/70">
                  +{template.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>

          <div className="flex gap-2">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link
                href={buildPreviewHref(template)}
                target="_blank"
                data-pro-template-preview={
                  template.price === "pro" ? template.id : undefined
                }
              >
                Live Preview
                <ExternalLinkIcon className="size-4" />
              </Link>
            </Button>

            {template.price === "free" && template.githubUrl ? (
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link href={template.githubUrl} target="_blank">
                  Download
                  <GitHubLogoIcon className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link
                  href={buildGetProHref(template.id)}
                  target="_blank"
                  data-pro-template-get-pro={template.id}
                >
                  Get Pro
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
            <span>By {template.author}</span>
            <span>{new Date(template.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Right Video/Image */}
        <div className="relative hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:backdrop-blur-sm transition-all duration-300 rounded-3xl cursor-pointer">
          {template.video ? (
            <video
              autoPlay
              loop
              muted
              className="w-full h-[26rem] rounded-3xl hover:scale-[1.06] transition-all duration-300 object-cover"
              src={template.video}
            />
          ) : (
            <Image
              src={template.image}
              alt={template.title}
              width={800}
              height={600}
              className="w-full h-full rounded-lg object-cover"
            />
          )}
          <div className="absolute top-4 right-4">
            <Badge
              variant={template.price === "free" ? "secondary" : "default"}
              className="bg-[#bef853]"
            >
              {template.price === "free" ? "Free" : "Pro"}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function TemplatesPage() {
  const freeTemplates = templates.filter((t) => t.price === "free");
  const proTemplates = templates.filter((t) => t.price === "pro");

  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <TemplateProClickTracker />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Templates
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Beautiful, responsive templates built with modern web technologies.
            Perfect for developers and designers looking to jumpstart their
            projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">
              {templates.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Templates Available
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">
              {freeTemplates.length}
            </div>
            <div className="text-sm text-muted-foreground">Free Templates</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">
              Mobile Responsive
            </div>
          </div>
        </div>

        {/* Free Templates */}
        {freeTemplates.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Free Templates</h2>
            <div className="space-y-8">
              {freeTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Pro Templates */}
        {proTemplates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Pro Templates</h2>
            <div className="space-y-8">
              {proTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Pro Templates CTA */}
        <div className="relative py-16 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            {/* Thin separator */}
            <div className="mx-auto mb-10 h-px w-10 bg-foreground/15" />

            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-5">
              Ruixen Pro
            </p>

            <h2 className="text-[1.75rem] md:text-[2.25rem] font-[590] leading-[1.15] tracking-[-0.025em] text-foreground">
              Ship faster with
              <br />
              premium templates
            </h2>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground/70 max-w-sm mx-auto">
              {proTemplates.length}+ production-ready components, templates, and
              blocks. Lifetime updates included.
            </p>

            {/* Price */}
            <div className="mt-7 flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-[580] tracking-tight text-foreground">
                $59
              </span>
              <span className="text-sm text-muted-foreground/50">one-time</span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://pro.ruixen.com/pricing?ref=oss_templates_footer"
                target="_blank"
                data-pro-template-get-pro="__footer__"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-6 text-[13px] font-medium text-background transition-all duration-200 hover:opacity-85"
              >
                Get Pro Access
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://github.com/ruixenui/ruixen.com"
                target="_blank"
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-foreground/[0.12] px-6 text-[13px] font-medium text-muted-foreground transition-all duration-200 hover:border-foreground/25 hover:text-foreground"
              >
                <GitHubLogoIcon className="size-3.5" />
                Star on GitHub
              </Link>
            </div>

            {/* Thin separator */}
            <div className="mx-auto mt-10 h-px w-10 bg-foreground/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
