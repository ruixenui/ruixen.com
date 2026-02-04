"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface ShowcaseItem {
  id: string;
  title: string;
  imagePath: string;
  href: string;
}

// Curated selection of best components for showcase
const showcaseItems: ShowcaseItem[] = [
  // Featured - Top Picks
  {
    id: "feature-carousel",
    title: "Feature Carousel",
    imagePath: "featured-sections/feature-carousel",
    href: "/docs/components/feature-carousel",
  },
  {
    id: "pricing-tiers",
    title: "Pricing Tiers",
    imagePath: "pricing-sections/pricing-tiers",
    href: "/docs/components/pricing-tiers",
  },
  {
    id: "card-stack",
    title: "Card Stack",
    imagePath: "cards/card-stack",
    href: "/docs/components/card-stack",
  },
  {
    id: "analytics-dashboard-stats",
    title: "Analytics Dashboard Stats",
    imagePath: "featured-sections/analytics-dashboard-stats",
    href: "/docs/components/analytics-dashboard-stats",
  },
  {
    id: "pill-morph-tabs",
    title: "Pill Morph Tabs",
    imagePath: "tabs/pill-morph-tabs",
    href: "/docs/components/pill-morph-tabs",
  },

  // Hero Sections
  {
    id: "aurora-hero-section",
    title: "Aurora Hero Section",
    imagePath: "hero-sections/aurora-hero-section",
    href: "/docs/components/aurora-hero-section",
  },
  {
    id: "spectrum-hero-section",
    title: "Spectrum Hero Section",
    imagePath: "hero-sections/spectrum-hero-section",
    href: "/docs/components/spectrum-hero-section",
  },
  {
    id: "gradient-hero-showcase",
    title: "Gradient Hero Showcase",
    imagePath: "hero-sections/gradient-hero-showcase",
    href: "/docs/components/gradient-hero-showcase",
  },
  {
    id: "card-carousel-hero",
    title: "Card Carousel Hero",
    imagePath: "hero-sections/card-carousel-hero",
    href: "/docs/components/card-carousel-hero",
  },
  {
    id: "hero-section-glass-web",
    title: "Hero Glass Web",
    imagePath: "hero-sections/hero-section-glass-web",
    href: "/docs/components/hero-section-glass-web",
  },

  // Docks
  {
    id: "gooey-dock",
    title: "Gooey Dock",
    imagePath: "docks/gooey-dock",
    href: "/docs/components/gooey-dock",
  },

  // Backgrounds
  {
    id: "particle-text-dots",
    title: "Particle Text Dots",
    imagePath: "backgrounds/particle-text-dots",
    href: "/docs/components/particle-text-dots",
  },
  {
    id: "mouse-spark",
    title: "Mouse Spark",
    imagePath: "backgrounds/mouse-spark",
    href: "/docs/components/mouse-spark",
  },

  // Event Calendars
  {
    id: "calendar-scheduler",
    title: "Calendar Scheduler",
    imagePath: "event-calendars/calendar-scheduler",
    href: "/docs/components/calendar-scheduler",
  },
  {
    id: "calendar-lume",
    title: "Calendar Lume",
    imagePath: "event-calendars/calendar-lume",
    href: "/docs/components/calendar-lume",
  },
  {
    id: "radial-week-view",
    title: "Radial Week View",
    imagePath: "event-calendars/radial-week-view",
    href: "/docs/components/radial-week-view",
  },
  {
    id: "event-aquarium-calendar",
    title: "Event Aquarium Calendar",
    imagePath: "event-calendars/event-aquarium-calendar",
    href: "/docs/components/event-aquarium-calendar",
  },
  {
    id: "heatmap-calendar",
    title: "Heatmap Calendar",
    imagePath: "event-calendars/heatmap-calendar",
    href: "/docs/components/heatmap-calendar",
  },

  // Cards
  {
    id: "product-bounce-card",
    title: "Product Bounce Card",
    imagePath: "cards/product-bounce-card",
    href: "/docs/components/product-bounce-card",
  },
  {
    id: "portfolio-card",
    title: "Portfolio Card",
    imagePath: "cards/portfolio-card",
    href: "/docs/components/portfolio-card",
  },
  {
    id: "idea-generator-card",
    title: "Idea Generator Card",
    imagePath: "cards/idea-generator-card",
    href: "/docs/components/idea-generator-card",
  },

  // Featured Sections
  {
    id: "tech-orbit-showcase",
    title: "Tech Orbit Showcase",
    imagePath: "featured-sections/tech-orbit-showcase",
    href: "/docs/components/tech-orbit-showcase",
  },
  {
    id: "multi-orbit-semi-circle",
    title: "Multi Orbit Semi Circle",
    imagePath: "featured-sections/multi-orbit-semi-circle",
    href: "/docs/components/multi-orbit-semi-circle",
  },

  // Forms
  {
    id: "gamified-login-card",
    title: "Gamified Login Card",
    imagePath: "forms/gamified-login-card",
    href: "/docs/components/gamified-login-card",
  },
  {
    id: "flip-card",
    title: "Flip Card",
    imagePath: "forms/flip-card",
    href: "/docs/components/flip-card",
  },
  {
    id: "auth-tabs-card",
    title: "Auth Tabs Card",
    imagePath: "forms/auth-tabs-card",
    href: "/docs/components/auth-tabs-card",
  },

  // Inputs
  {
    id: "ai-chat-input",
    title: "AI Chat Input",
    imagePath: "ai-chat-inputs/ai-chat-input",
    href: "/docs/components/ai-chat-input",
  },
  {
    id: "password-strength-input",
    title: "Password Strength Input",
    imagePath: "inputs/password-strength-input",
    href: "/docs/components/password-strength-input",
  },
  {
    id: "color-picker-input",
    title: "Color Picker Input",
    imagePath: "inputs/color-picker-input",
    href: "/docs/components/color-picker-input",
  },
  {
    id: "action-hub-input",
    title: "Action Hub Input",
    imagePath: "inputs/action-hub-input",
    href: "/docs/components/action-hub-input",
  },

  // Tables
  {
    id: "flexi-filter-table",
    title: "Flexi Filter Table",
    imagePath: "tables/flexi-filter-table",
    href: "/docs/components/flexi-filter-table",
  },
  {
    id: "inline-analytics-table",
    title: "Inline Analytics Table",
    imagePath: "tables/inline-analytics-table",
    href: "/docs/components/inline-analytics-table",
  },
  {
    id: "comparison-table",
    title: "Comparison Table",
    imagePath: "tables/comparison-table",
    href: "/docs/components/comparison-table",
  },

  // Steppers
  {
    id: "wizard-stepper",
    title: "Wizard Stepper",
    imagePath: "steppers/wizard-stepper",
    href: "/docs/components/wizard-stepper",
  },
  {
    id: "milestone-stepper",
    title: "Milestone Stepper",
    imagePath: "steppers/milestone-stepper",
    href: "/docs/components/milestone-stepper",
  },
  {
    id: "progress-tracker",
    title: "Progress Tracker",
    imagePath: "steppers/progress-tracker",
    href: "/docs/components/progress-tracker",
  },

  // Charts
  {
    id: "funnel-chart",
    title: "Funnel Chart",
    imagePath: "charts/funnel-chart",
    href: "/docs/components/funnel-chart",
  },
  {
    id: "waterfall-chart",
    title: "Waterfall Chart",
    imagePath: "charts/waterfall-chart",
    href: "/docs/components/waterfall-chart",
  },
  {
    id: "bubble-chart",
    title: "Bubble Chart",
    imagePath: "charts/bubble-chart",
    href: "/docs/components/bubble-chart",
  },

  // Tabs
  {
    id: "magnetic-tabs",
    title: "Magnetic Tabs",
    imagePath: "tabs/magnetic-tabs",
    href: "/docs/components/magnetic-tabs",
  },
  {
    id: "zoom-depth-tabs",
    title: "Zoom Depth Tabs",
    imagePath: "tabs/zoom-depth-tabs",
    href: "/docs/components/zoom-depth-tabs",
  },

  // Pagination
  {
    id: "wheel-pagination",
    title: "Wheel Pagination",
    imagePath: "pagination/wheel-pagination",
    href: "/docs/components/wheel-pagination",
  },
  {
    id: "morphing-page-dots",
    title: "Morphing Page Dots",
    imagePath: "pagination/morphing-page-dots",
    href: "/docs/components/morphing-page-dots",
  },

  // Loaders
  {
    id: "solar-loader",
    title: "Solar Loader",
    imagePath: "cards/solar-loader",
    href: "/docs/components/solar-loader",
  },
  {
    id: "ripple-circles",
    title: "Ripple Circles",
    imagePath: "cards/ripple-circles",
    href: "/docs/components/ripple-circles",
  },

  // Notifications
  {
    id: "notifications-carousel",
    title: "Notifications Carousel",
    imagePath: "notifications/notifications-carousel",
    href: "/docs/components/notifications-carousel",
  },
  {
    id: "notification-inbox-popover",
    title: "Notification Inbox Popover",
    imagePath: "notifications/notification-inbox-popover",
    href: "/docs/components/notification-inbox-popover",
  },

  // Navbars
  {
    id: "floating-navbar",
    title: "Floating Navbar",
    imagePath: "navbars/floating-navbar",
    href: "/docs/components/floating-navbar",
  },
  {
    id: "hover-gradient-navbar",
    title: "Hover Gradient Navbar",
    imagePath: "navbars/hover-gradient-navbar",
    href: "/docs/components/hover-gradient-navbar",
  },
  {
    id: "luma-bar",
    title: "Luma Bar",
    imagePath: "navbars/luma-bar",
    href: "/docs/components/luma-bar",
  },

  // Pricing
  {
    id: "pricing-flow",
    title: "Pricing Flow",
    imagePath: "pricing-sections/pricing-flow",
    href: "/docs/components/pricing-flow",
  },

  // Audio/Media
  {
    id: "audio-book-player",
    title: "Audio Book Player",
    imagePath: "audio-media/audio-book-player",
    href: "/docs/components/audio-book-player",
  },
  {
    id: "waveform-player",
    title: "Waveform Player",
    imagePath: "audio-media/waveform-player",
    href: "/docs/components/waveform-player",
  },

  // Video Players
  {
    id: "video-player-pro",
    title: "Video Player Pro",
    imagePath: "video-players/video-player-pro",
    href: "/docs/components/video-player-pro",
  },
];

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? resolvedTheme : "light";
  const imageSrc = `/preview_images/${item.imagePath}-${theme}.png`;

  return (
    <div className="group break-inside-avoid mb-5">
      <div className="overflow-hidden rounded-2xl border-4 border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-lg">
        {/* Preview Image */}
        <div className="relative w-full overflow-hidden bg-muted/30">
          <Image
            src={imageSrc}
            alt={item.title}
            width={600}
            height={400}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Info Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-medium text-foreground text-sm mb-3">
            {item.title}
          </h3>

          {/* View Component Link */}
          <Link
            href={item.href}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-2 border-t border-border/50 -mx-4 px-4 -mb-4 mt-2 hover:bg-muted/50"
          >
            View Component
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm mb-6">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              <span className="font-semibold">450+ Components</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Trusted by</span>
              <span className="font-semibold">2,500+ devs</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Component Showcase
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Beautifully crafted, production-ready components built with
              Next.js, Tailwind CSS, and Framer Motion.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/docs/components">
                  Browse All Components
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Layout */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:balance]">
            {showcaseItems.map((item) => (
              <ShowcaseCard key={item.id} item={item} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs/components">
                View All Components
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
