"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/events";

type FooterLink = { label: string; href: string };
type FooterColumn = { heading: string; links: FooterLink[] };

const sectionColumns: FooterColumn[] = [
  {
    heading: "Navbars",
    links: [
      { label: "Navbar Simple", href: "/docs/sections/navbar-simple" },
      { label: "Navbar Centered", href: "/docs/sections/navbar-centered" },
      { label: "Floating Navbar", href: "/docs/sections/floating-navbar" },
      {
        label: "Hover Gradient Navbar",
        href: "/docs/sections/hover-gradient-navbar",
      },
      {
        label: "Expandable Menu",
        href: "/docs/sections/expandable-menu-navbar",
      },
      {
        label: "Navbar With Search",
        href: "/docs/sections/navbar-with-search",
      },
      { label: "Promote Header", href: "/docs/sections/promote-header" },
    ],
  },
  {
    heading: "Hero Sections",
    links: [
      {
        label: "Gradient Hero",
        href: "/docs/components/gradient-hero-showcase",
      },
      { label: "Video Hero", href: "/docs/components/video-hero-showcase" },
      {
        label: "Structured Hero",
        href: "/docs/components/structured-hero-section",
      },
      { label: "Grid Frame Hero", href: "/docs/components/grid-frame-hero" },
      { label: "Split Hero", href: "/docs/components/split-hero-section" },
      {
        label: "Card Carousel Hero",
        href: "/docs/components/card-carousel-hero",
      },
      {
        label: "Pricing Landing Hero",
        href: "/docs/components/pricing-landing-hero",
      },
    ],
  },
  {
    heading: "Pricing Sections",
    links: [
      { label: "Pricing Plans", href: "/docs/components/pricing-plans" },
      {
        label: "Pricing Comparison",
        href: "/docs/components/pricing-comparison",
      },
      {
        label: "Feature Matrix",
        href: "/docs/components/pricing-feature-matrix",
      },
      {
        label: "Subscription Plans",
        href: "/docs/components/subscription-plans",
      },
      { label: "Pricing Tiers", href: "/docs/components/pricing-tiers" },
      { label: "Pricing Flow", href: "/docs/components/pricing-flow" },
      {
        label: "Pricing Cards Tooltip",
        href: "/docs/components/pricing-cards-tooltip",
      },
    ],
  },
  {
    heading: "FAQ Sections",
    links: [
      {
        label: "Scroll Accordion FAQ",
        href: "/docs/sections/faq-scroll-accordion",
      },
      {
        label: "Auto Accordion FAQ",
        href: "/docs/sections/faq-auto-accordion",
      },
      {
        label: "Chat Accordion FAQ",
        href: "/docs/sections/faq-chat-accordion",
      },
      { label: "Grouped FAQ", href: "/docs/sections/grouped-faq-section" },
      {
        label: "Staggered FAQ",
        href: "/docs/sections/staggered-faq-section",
      },
      {
        label: "Feature Highlights",
        href: "/docs/sections/feature-highlights",
      },
    ],
  },
  {
    heading: "Featured Sections",
    links: [
      {
        label: "Product Feature Hero",
        href: "/docs/sections/product-feature-hero",
      },
      { label: "Product Card Hero", href: "/docs/sections/product-card-hero" },
      {
        label: "Split Feature Showcase",
        href: "/docs/components/split-feature-showcase",
      },
      {
        label: "Integration & Stats",
        href: "/docs/components/integration-and-stats-section",
      },
      {
        label: "Rotating Gradient",
        href: "/docs/components/rotating-gradient-right",
      },
      {
        label: "Automated Tasks Panel",
        href: "/docs/components/automated-tasks-panel",
      },
    ],
  },
  {
    heading: "Footers",
    links: [
      { label: "Footer Pro", href: "/docs/components/footer-pro" },
      { label: "Corporate Footer", href: "/docs/components/corporate-footer" },
      {
        label: "Footer Enterprise",
        href: "/docs/components/footer-enterprise",
      },
      { label: "Wordmark Footer", href: "/docs/components/wordmark-footer" },
    ],
  },
  {
    heading: "Client Sections",
    links: [
      {
        label: "Trusted Clients",
        href: "/docs/components/trusted-clients-showcase",
      },
      {
        label: "Client Carousel",
        href: "/docs/components/client-carousel-showcase",
      },
      {
        label: "Auto Scrolling Carousel",
        href: "/docs/components/auto-scrolling-client-carousel",
      },
      {
        label: "Bordered Clients Grid",
        href: "/docs/components/bordered-clients-grid",
      },
    ],
  },
];

const componentColumns: FooterColumn[] = [
  {
    heading: "Buttons",
    links: [
      { label: "Button Copy", href: "/docs/components/button-copy" },
      { label: "Confetti Button", href: "/docs/components/confetti-button" },
      {
        label: "Slide To Delete",
        href: "/docs/components/slide-to-delete-button",
      },
      { label: "Glow Link Button", href: "/docs/components/glow-link-button" },
      {
        label: "Hover Preview Button",
        href: "/docs/components/hover-preview-button",
      },
      { label: "Progress Button", href: "/docs/components/progress-button" },
      { label: "Share Button", href: "/docs/components/share-button" },
    ],
  },
  {
    heading: "Inputs",
    links: [
      { label: "Color Picker", href: "/docs/components/color-picker-input" },
      { label: "Time Picker", href: "/docs/components/better-time-picker" },
      { label: "Tag Input", href: "/docs/components/clean-tag-input" },
      { label: "Password Field", href: "/docs/components/password-field" },
      {
        label: "Verification Input",
        href: "/docs/components/verification-input",
      },
      { label: "URL Input", href: "/docs/components/url-input" },
      {
        label: "Inline Copy Input",
        href: "/docs/components/inline-copy-input",
      },
    ],
  },
  {
    heading: "Cards & Forms",
    links: [
      { label: "Glass AI Card", href: "/docs/components/glass-ai-card" },
      { label: "Profile Card", href: "/docs/components/profile-card" },
      {
        label: "Phone Mockup Card",
        href: "/docs/components/phone-mockup-card",
      },
      { label: "Glass Form", href: "/docs/components/glass-form" },
      { label: "Spark Chart", href: "/docs/components/spark-chart" },
      {
        label: "Glass Shipment Flow",
        href: "/docs/components/glass-shipment-flow",
      },
    ],
  },
  {
    heading: "Text & Backgrounds",
    links: [
      { label: "Scroll Text Rise", href: "/docs/components/scroll-text-rise" },
      {
        label: "Particle Text Dots",
        href: "/docs/components/particle-text-dots",
      },
      { label: "Scramble Text", href: "/docs/components/scramble-text" },
      { label: "Cloud Background", href: "/docs/components/cloud-background" },
      {
        label: "Ripple Distortion",
        href: "/docs/components/ripple-distortion",
      },
      { label: "Neon Circle Grid", href: "/docs/components/neon-circle-grid" },
    ],
  },
  {
    heading: "AI & Media",
    links: [
      { label: "AI Chat Input", href: "/docs/components/ai-chat-input" },
      {
        label: "Claude Chat Input",
        href: "/docs/components/claude-chat-input",
      },
      {
        label: "Music Player Card",
        href: "/docs/components/music-player-card",
      },
      { label: "Live Waveform", href: "/docs/components/live-waveform" },
      {
        label: "Visualizer Button",
        href: "/docs/components/visualizer-button",
      },
      { label: "Video Player Pro", href: "/docs/components/video-player-pro" },
    ],
  },
  {
    heading: "Interactive",
    links: [
      {
        label: "Banner Announcement",
        href: "/docs/components/banner-announcement",
      },
      { label: "Cookie Banner", href: "/docs/components/banner-cookie" },
      {
        label: "Avatar Hover Card",
        href: "/docs/components/avatar-hover-card",
      },
      {
        label: "Theme Toggler",
        href: "/docs/components/animated-theme-toggler",
      },
      { label: "Badge Morph", href: "/docs/components/badge-morph" },
      { label: "Magnetic Tabs", href: "/docs/components/magnetic-tabs" },
    ],
  },
];

const resourceColumns: FooterColumn[] = [
  {
    heading: "Multi-Stack",
    links: [
      { label: "Tailwind v3 Support", href: "/tailwind-v3-shadcn" },
      { label: "Base UI Support", href: "/base-ui-shadcn" },
      { label: "Dual Tailwind", href: "/docs/tailwind-v4" },
      { label: "Swap Primitives", href: "/docs/ui-library" },
      { label: "MCP Server", href: "/docs/mcp" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Templates", href: "/templates" },
      { label: "Layouts", href: "/layouts" },
      { label: "Showcase", href: "/showcase" },
      { label: "Roadmap", href: "/docs" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "All Tools", href: "/tools" },
      { label: "Glassmorphism Generator", href: "/generator/glass-morphism" },
      { label: "CSS Gradient Generator", href: "/generator/css-generator" },
      { label: "Shadow Generator", href: "/generator/shadow-generator" },
      { label: "Gradient Gallery", href: "/gradients" },
      { label: "Extrude", href: "/tools/extrude" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Community",
    links: [
      {
        label: "Ruixen Pro",
        href: "https://pro.ruixen.com/pricing?ref=oss_footer",
      },
      { label: "GitHub", href: "https://github.com/ruixenui/ruixen.com" },
      { label: "Twitter", href: "https://x.com/ruixen_ui" },
    ],
  },
];

function FooterColumns({
  columns,
  cols,
}: {
  columns: FooterColumn[];
  cols: string;
}) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 ${cols} gap-8 mb-12`}>
      {columns.map((section, i) => (
        <div key={i}>
          <h4 className="font-medium mb-4">{section.heading}</h4>
          <ul className="space-y-3">
            {section.links.map((link, j) => (
              <li key={j}>
                <a
                  href={link.href}
                  onClick={() => {
                    if (link.label === "Ruixen Pro") {
                      trackEvent({
                        name: "oss_pro_cta_clicked",
                        properties: { surface: "footer" },
                      });
                    }
                  }}
                  className="flex items-center text-muted-foreground hover:text-foreground transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative bg-gray-50 dark:bg-black pt-24 pb-12 overflow-hidden text-sm text-black dark:text-white">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 space-y-4 md:space-y-0 border-b pb-6">
          <div className="flex items-center space-x-1">
            <Image
              src={"/ruixen-ui-nw-light.png"}
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 dark:block hidden"
            />
            <Image
              src={"/ruixen-ui-nw.png"}
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 dark:hidden block"
            />
            <span className="font-semibold text-lg text-foreground">
              Ruixen UI
            </span>
          </div>
          <p className="md:max-w-xl text-gray-500">
            Marketing UI for shadcn — in any stack. 240+ React sections and
            components for landing pages. Tailwind v3 or v4. Radix or Base UI.
          </p>
        </div>

        <h3 className="text-foreground/80 mb-6 text-xs font-semibold uppercase tracking-wider">
          Sections
        </h3>
        <FooterColumns columns={sectionColumns} cols="lg:grid-cols-7" />

        <h3 className="text-foreground/80 mb-6 text-xs font-semibold uppercase tracking-wider">
          Components
        </h3>
        <FooterColumns columns={componentColumns} cols="lg:grid-cols-6" />

        <h3 className="text-foreground/80 mb-6 text-xs font-semibold uppercase tracking-wider">
          Stack & Resources
        </h3>
        <FooterColumns columns={resourceColumns} cols="lg:grid-cols-4" />

        <div className="border-t border-black/10 dark:border-black/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Ruixen UI. All rights reserved.
          </span>
          <a
            href="https://twitter.com/ruixen_ui"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Follow the build &rarr; @ruixen_ui
          </a>
        </div>
      </div>
    </footer>
  );
}
