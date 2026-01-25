import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "step-indicator",
    type: "registry:ui",
    title: "Step Indicator",
    description:
      "A clean step indicator component showing numbered circles with checkmarks for completed steps. Supports horizontal and vertical orientations.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/step-indicator.tsx",
        type: "registry:ui",
        target: "components/ruixen/step-indicator.tsx",
      },
    ],
  },
  {
    name: "wizard-stepper",
    type: "registry:ui",
    title: "Wizard Stepper",
    description:
      "A full-featured wizard stepper with titles and descriptions. Perfect for multi-step forms, checkout flows, and onboarding sequences.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/wizard-stepper.tsx",
        type: "registry:ui",
        target: "components/ruixen/wizard-stepper.tsx",
      },
    ],
  },
  {
    name: "progress-tracker",
    type: "registry:ui",
    title: "Progress Tracker",
    description:
      "A progress tracking component with three variants: segmented bars, continuous progress bar, and dot indicators. Shows step X of Y labels.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/progress-tracker.tsx",
        type: "registry:ui",
        target: "components/ruixen/progress-tracker.tsx",
      },
    ],
  },
  {
    name: "milestone-stepper",
    type: "registry:ui",
    title: "Milestone Stepper",
    description:
      "A vertical timeline-style stepper for showing milestones, order tracking, or project phases. Supports custom icons and multiple variants.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/milestone-stepper.tsx",
        type: "registry:ui",
        target: "components/ruixen/milestone-stepper.tsx",
      },
    ],
  },
  {
    name: "nav-stepper",
    type: "registry:ui",
    title: "Nav Stepper",
    description:
      "A navigable stepper with previous/next buttons. Supports numbered, dot, and bar indicator variants with inline or bottom navigation positioning.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/nav-stepper.tsx",
        type: "registry:ui",
        target: "components/ruixen/nav-stepper.tsx",
      },
    ],
  },
  {
    name: "funnel-chart",
    type: "registry:ui",
    title: "Funnel Chart",
    description:
      "A versatile funnel chart component for visualizing conversion flows, sales pipelines, and sequential data with multiple variants and tooltip styles.",
    dependencies: ["recharts"],
    files: [
      {
        path: "registry/ruixenui/funnel-chart.tsx",
        type: "registry:ui",
        target: "components/ruixen/funnel-chart.tsx",
      },
    ],
  },
  {
    name: "waterfall-chart",
    type: "registry:ui",
    title: "Waterfall Chart",
    description:
      "A versatile waterfall chart component for visualizing cumulative effects, financial changes, and sequential data with multiple variants and tooltip styles.",
    dependencies: ["recharts"],
    files: [
      {
        path: "registry/ruixenui/waterfall-chart.tsx",
        type: "registry:ui",
        target: "components/ruixen/waterfall-chart.tsx",
      },
    ],
  },
  {
    name: "bubble-chart",
    type: "registry:ui",
    title: "Bubble Chart",
    description:
      "A versatile bubble chart component for visualizing three-dimensional data with position (x, y) and size (z) dimensions. Includes multiple variants with labels, legends, grouping, and interactive features.",
    dependencies: ["recharts"],
    files: [
      {
        path: "registry/ruixenui/bubble-chart.tsx",
        type: "registry:ui",
        target: "components/ruixen/bubble-chart.tsx",
      },
    ],
  },
  {
    name: "stream-chart",
    type: "registry:ui",
    title: "Stream Chart",
    description:
      "A versatile stream chart component for visualizing continuous data flows over time. Includes multiple variants: wiggle (streamgraph), silhouette (centered), expanded (100% stacked), stacked (normal), interactive, and legend variants.",
    dependencies: ["recharts"],
    files: [
      {
        path: "registry/ruixenui/stream-chart.tsx",
        type: "registry:ui",
        target: "components/ruixen/stream-chart.tsx",
      },
    ],
  },
  {
    name: "bullet-chart",
    type: "registry:ui",
    title: "Bullet Chart",
    description:
      "A versatile bullet chart component for comparing actual values against targets with qualitative ranges. Includes horizontal, vertical, compact, interactive, legend, and custom color variants.",
    dependencies: ["recharts"],
    files: [
      {
        path: "registry/ruixenui/bullet-chart.tsx",
        type: "registry:ui",
        target: "components/ruixen/bullet-chart.tsx",
      },
    ],
  },
  {
    name: "blurred-stagger-text",
    type: "registry:ui",
    title: "Blurred Stagger Text",
    description:
      "An animated text component with staggered blur reveal effect using Framer Motion.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "components/ui/blurred-stagger-text.tsx",
        type: "registry:ui",
        target: "components/ui/blurred-stagger-text.tsx",
      },
    ],
  },
  {
    name: "staggered-faq-section",
    type: "registry:ui",
    title: "StaggeredFAQSection",
    description:
      "A responsive FAQ component with animated text reveals and customizable content.",
    dependencies: ["motion"],
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/staggered-faq-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/staggered-faq-section.tsx",
      },
      {
        path: "components/ui/blurred-stagger-text.tsx",
        type: "registry:ui",
        target: "components/ui/blurred-stagger-text.tsx",
      },
    ],
  },
  {
    name: "animated-theme-toggler",
    type: "registry:ui",
    title: "Theme Toggler",
    description: "A component for theme changing animation.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/animated-theme-toggler.tsx",
        type: "registry:ui",
        target: "components/ruixen/animated-theme-toggler.tsx",
      },
    ],
    css: {
      "::view-transition-old(root), ::view-transition-new(root)": {
        animation: "none",
        "mix-blend-mode": "normal",
      },
    },
  },
  {
    name: "feature-highlights",
    type: "registry:ui",
    title: "Feature Highlights",
    description:
      "A responsive feature highlights component with expandable accordion sections and images.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/feature-highlights.tsx",
        type: "registry:ui",
        target: "components/ruixen/feature-highlights.tsx",
      },
    ],
  },
  {
    name: "faq-scroll-accordion",
    type: "registry:ui",
    title: "FAQ Scroll Accordion",
    description:
      "A scroll-triggered FAQ accordion component with smooth GSAP animations and auto-expanding items.",
    dependencies: [
      "framer-motion",
      "@radix-ui/react-accordion",
      "lucide-react",
      "gsap",
      "@gsap/react",
    ],
    files: [
      {
        path: "registry/ruixenui/faq-scroll-accordion.tsx",
        type: "registry:ui",
        target: "components/ruixen/faq-scroll-accordion.tsx",
      },
    ],
  },
  {
    name: "faq-auto-accordion",
    type: "registry:ui",
    title: "FAQ Auto Accordion",
    description:
      "A scroll-triggered FAQ accordion component with smooth GSAP animations and auto-expanding items.",
    dependencies: ["@radix-ui/react-accordion"],
    files: [
      {
        path: "registry/ruixenui/faq-auto-accordion.tsx",
        type: "registry:ui",
        target: "components/ruixen/faq-auto-accordion.tsx",
      },
    ],
  },
  {
    name: "compact-accordion",
    type: "registry:ui",
    title: "Compact Accordion",
    description:
      "A clean and minimal accordion component with icons and smooth animations for organizing content in collapsible sections.",
    dependencies: ["@radix-ui/react-accordion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/compact-accordion.tsx",
        type: "registry:ui",
        target: "components/ruixen/compact-accordion.tsx",
      },
    ],
  },
  {
    name: "accordion-simple",
    type: "registry:ui",
    title: "Simple Accordion",
    description:
      "A basic accordion component with clean styling and smooth expand/collapse animations.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/accordion-simple.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-simple.tsx",
      },
    ],
  },
  {
    name: "accordion-bordered",
    type: "registry:ui",
    title: "Bordered Accordion",
    description:
      "An accordion with bordered card-style items and highlighted open state backgrounds.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/accordion-bordered.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-bordered.tsx",
      },
    ],
  },
  {
    name: "accordion-icon",
    type: "registry:ui",
    title: "Icon Accordion",
    description:
      "An accordion with leading icons for each item, perfect for categorized content.",
    registryDependencies: ["accordion"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/accordion-icon.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-icon.tsx",
      },
    ],
  },
  {
    name: "accordion-arrow",
    type: "registry:ui",
    title: "Arrow Accordion",
    description:
      "An accordion with a right-pointing arrow indicator that rotates on expand.",
    dependencies: ["@radix-ui/react-accordion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/accordion-arrow.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-arrow.tsx",
      },
    ],
  },
  {
    name: "accordion-plus",
    type: "registry:ui",
    title: "Plus/Minus Accordion",
    description:
      "An accordion with plus/minus toggle icons for expand and collapse states.",
    dependencies: ["@radix-ui/react-accordion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/accordion-plus.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-plus.tsx",
      },
    ],
  },
  {
    name: "accordion-badge",
    type: "registry:ui",
    title: "Badge Accordion",
    description:
      "An accordion with optional badges on items for highlighting new, important, or beta content.",
    registryDependencies: ["accordion", "badge"],
    files: [
      {
        path: "registry/ruixenui/accordion-badge.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-badge.tsx",
      },
    ],
  },
  {
    name: "accordion-nested",
    type: "registry:ui",
    title: "Nested Accordion",
    description:
      "An accordion that supports nested sub-accordions for hierarchical content organization.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/accordion-nested.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-nested.tsx",
      },
    ],
  },
  {
    name: "accordion-minimal",
    type: "registry:ui",
    title: "Minimal Accordion",
    description:
      "A minimal accordion with show/hide text toggle instead of icons.",
    dependencies: ["@radix-ui/react-accordion"],
    files: [
      {
        path: "registry/ruixenui/accordion-minimal.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-minimal.tsx",
      },
    ],
  },
  {
    name: "accordion-animated",
    type: "registry:ui",
    title: "Animated Accordion",
    description:
      "An accordion with smooth Framer Motion animations for expand/collapse transitions.",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/accordion-animated.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-animated.tsx",
      },
    ],
  },
  {
    name: "alert-warning",
    type: "registry:ui",
    title: "Warning Alert",
    description:
      "A warning alert component with amber background and triangle alert icon.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/alert-warning.tsx",
        type: "registry:ui",
        target: "components/ruixen/alert-warning.tsx",
      },
    ],
  },
  {
    name: "alert-warning-outlined",
    type: "registry:ui",
    title: "Warning Alert Outlined",
    description:
      "A warning alert component with outlined border style and triangle alert icon.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/alert-warning-outlined.tsx",
        type: "registry:ui",
        target: "components/ruixen/alert-warning-outlined.tsx",
      },
    ],
  },
  {
    name: "alert-error",
    type: "registry:ui",
    title: "Error Alert",
    description:
      "An error alert component with red background and circle alert icon.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/alert-error.tsx",
        type: "registry:ui",
        target: "components/ruixen/alert-error.tsx",
      },
    ],
  },
  {
    name: "alert-error-outlined",
    type: "registry:ui",
    title: "Error Alert Outlined",
    description:
      "An error alert component with outlined border style and circle alert icon.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/alert-error-outlined.tsx",
        type: "registry:ui",
        target: "components/ruixen/alert-error-outlined.tsx",
      },
    ],
  },
  {
    name: "alert-success",
    type: "registry:ui",
    title: "Success Alert",
    description:
      "A success alert component with emerald background and circle check icon.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/alert-success.tsx",
        type: "registry:ui",
        target: "components/ruixen/alert-success.tsx",
      },
    ],
  },
  {
    name: "alert-success-outlined",
    type: "registry:ui",
    title: "Success Alert Outlined",
    description:
      "A success alert component with outlined border style and circle check icon.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/alert-success-outlined.tsx",
        type: "registry:ui",
        target: "components/ruixen/alert-success-outlined.tsx",
      },
    ],
  },
  {
    name: "avatar-badge",
    type: "registry:ui",
    title: "Avatar with Badge",
    description:
      "An avatar component with a notification badge showing a count.",
    registryDependencies: ["avatar", "badge"],
    files: [
      {
        path: "registry/ruixenui/avatar-badge.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-badge.tsx",
      },
    ],
  },
  {
    name: "avatar-basic",
    type: "registry:ui",
    title: "Basic Avatar",
    description: "A basic avatar component with image and fallback support.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-basic.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-basic.tsx",
      },
    ],
  },
  {
    name: "avatar-fallback",
    type: "registry:ui",
    title: "Avatar Fallback",
    description: "An avatar component displaying only fallback text initials.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-fallback.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-fallback.tsx",
      },
    ],
  },
  {
    name: "avatar-group",
    type: "registry:ui",
    title: "Avatar Group",
    description:
      "A group of overlapping avatars with hover effects and configurable sizes.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-group.tsx",
      },
    ],
  },
  {
    name: "avatar-group-count",
    type: "registry:ui",
    title: "Avatar Group with Count",
    description:
      "A group of overlapping avatars with a count indicator for remaining members.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-group-count.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-group-count.tsx",
      },
    ],
  },
  {
    name: "avatar-icon",
    type: "registry:ui",
    title: "Avatar with Icon",
    description: "An avatar component with a user icon as fallback.",
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-icon.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-icon.tsx",
      },
    ],
  },
  {
    name: "avatar-online",
    type: "registry:ui",
    title: "Avatar Online",
    description: "An avatar component with an online status indicator.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-online.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-online.tsx",
      },
    ],
  },
  {
    name: "avatar-status",
    type: "registry:ui",
    title: "Avatar with Status",
    description:
      "An avatar component with customizable status indicator (online, offline, busy, away).",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-status.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-status.tsx",
      },
    ],
  },
  {
    name: "avatar-verified",
    type: "registry:ui",
    title: "Verified Avatar",
    description: "An avatar component with a verified badge indicator.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-verified.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-verified.tsx",
      },
    ],
  },
  {
    name: "avatar-trust-badge",
    type: "registry:ui",
    title: "Avatar Trust Badge",
    description:
      "A trust badge component with avatar group and customizable count text.",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-trust-badge.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-trust-badge.tsx",
      },
    ],
  },
  {
    name: "aurora-hero-section",
    type: "registry:ui",
    title: "Aurora Hero Section",
    description:
      "A beautiful hero section with aurora-style background effects and animated elements",
    dependencies: ["@radix-ui/react-slot", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/aurora-hero-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/aurora-hero-section.tsx",
      },
    ],
  },
  {
    name: "card-carousel-hero",
    type: "registry:ui",
    title: "Card Carousel Hero",
    description:
      "An interactive hero section featuring a card carousel with smooth animations",
    dependencies: ["motion", "@radix-ui/react-slot"],
    files: [
      {
        path: "registry/ruixenui/card-carousel-hero.tsx",
        type: "registry:ui",
        target: "components/ruixen/card-carousel-hero.tsx",
      },
    ],
  },
  {
    name: "gradient-hero-showcase",
    type: "registry:ui",
    title: "Gradient Hero Showcase",
    description:
      "A modern hero section with animated gradient background and smooth transitions",
    dependencies: ["motion", "@radix-ui/react-slot"],
    files: [
      {
        path: "registry/ruixenui/gradient-hero-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/gradient-hero-showcase.tsx",
      },
    ],
  },
  {
    name: "spectrum-hero-section",
    type: "registry:ui",
    title: "Spectrum Hero Section",
    description:
      "A vibrant hero section with spectrum color effects and dynamic animations",
    dependencies: ["motion", "@radix-ui/react-slot"],
    files: [
      {
        path: "registry/ruixenui/spectrum-hero-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/spectrum-hero-section.tsx",
      },
    ],
  },
  {
    name: "video-hero-showcase",
    type: "registry:ui",
    title: "Video Hero Showcase",
    description:
      "A dynamic hero section featuring video backgrounds and interactive elements",
    dependencies: ["motion", "@radix-ui/react-slot"],
    files: [
      {
        path: "registry/ruixenui/video-hero-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/video-hero-showcase.tsx",
      },
    ],
  },
  {
    name: "visionary-hero-section",
    type: "registry:ui",
    title: "Visionary Hero Section",
    description:
      "A visionary hero section with elegant design and smooth animations",
    dependencies: ["motion", "@radix-ui/react-slot", "gsap"],
    files: [
      {
        path: "registry/ruixenui/visionary-hero-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/visionary-hero-section.tsx",
      },
    ],
  },
  {
    name: "featured-highlights",
    type: "registry:ui",
    title: "Featured Highlights",
    description:
      "Interactive feature showcase with image preview and hover effects",
    files: [
      {
        path: "registry/ruixenui/featured-highlights.tsx",
        type: "registry:ui",
        target: "components/ruixen/featured-highlights.tsx",
      },
    ],
  },
  {
    name: "feature-grid-section",
    type: "registry:ui",
    title: "Feature Grid Section",
    description: "Grid layout showcasing features with icons and descriptions",
    files: [
      {
        path: "registry/ruixenui/feature-grid-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/feature-grid-section.tsx",
      },
    ],
  },
  {
    name: "feature-tabs-showcase",
    type: "registry:ui",
    title: "Feature Tabs Showcase",
    description:
      "Interactive tabs with animated background and feature showcase",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/feature-tabs-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/feature-tabs-showcase.tsx",
      },
    ],
  },
  {
    name: "composite-feature-showcase",
    type: "registry:ui",
    title: "Composite Feature Showcase",
    description: "Complex dashboard layout with map, charts, and feature cards",
    dependencies: ["dotted-map", "recharts"],
    files: [
      {
        path: "registry/ruixenui/composite-feature-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/composite-feature-showcase.tsx",
      },
    ],
  },
  {
    name: "integration-and-stats-section",
    type: "registry:ui",
    title: "Integration And Stats Section",
    description:
      "Integration showcase with testimonials, stats, and card stack",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/ruixenui/integration-and-stats-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/integration-and-stats-section.tsx",
      },
    ],
  },
  {
    name: "tech-orbit-showcase",
    type: "registry:ui",
    title: "Tech Orbit Showcase",
    description:
      "Animated orbital showcase with rotating tech icons and call-to-action",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/ruixenui/tech-orbit-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/tech-orbit-showcase.tsx",
      },
    ],
    css: {
      "@keyframes spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
  {
    name: "partner-integrations-grid",
    type: "registry:ui",
    title: "Partner Integrations Grid",
    description: "Grid showcase of partner integrations with octagonal design",
    files: [
      {
        path: "registry/ruixenui/partner-integrations-grid.tsx",
        type: "registry:ui",
        target: "components/ruixen/partner-integrations-grid.tsx",
      },
    ],
  },
  {
    name: "analytics-dashboard-stats",
    type: "registry:ui",
    title: "Analytics Dashboard Stats",
    description:
      "Analytics dashboard with statistics and area chart visualization",
    dependencies: ["recharts"],
    files: [
      {
        path: "registry/ruixenui/analytics-dashboard-stats.tsx",
        type: "registry:ui",
        target: "components/ruixen/analytics-dashboard-stats.tsx",
      },
    ],
  },
  {
    name: "ruixen-dashboard-stats",
    type: "registry:ui",
    title: "Ruixen Dashboard Stats",
    description:
      "Dashboard stats with animated counter and chart visualization",
    dependencies: ["recharts", "react-countup"],
    files: [
      {
        path: "registry/ruixenui/ruixen-dashboard-stats.tsx",
        type: "registry:ui",
        target: "components/ruixen/ruixen-dashboard-stats.tsx",
      },
    ],
  },
  {
    name: "feature-carousel",
    type: "registry:ui",
    title: "Feature Carousel",
    description:
      "Interactive carousel showcasing dashboard features with auto-rotation",
    dependencies: ["gsap"],
    files: [
      {
        path: "registry/ruixenui/feature-carousel.tsx",
        type: "registry:ui",
        target: "components/ruixen/feature-carousel.tsx",
      },
    ],
  },
  {
    name: "crm-insights-panel",
    type: "registry:ui",
    title: "CRM Insights Panel",
    description: "CRM dashboard with video preview and feature showcase grid",
    files: [
      {
        path: "registry/ruixenui/crm-insights-panel.tsx",
        type: "registry:ui",
        target: "components/ruixen/crm-insights-panel.tsx",
      },
    ],
  },
  {
    name: "multi-orbit-semi-circle",
    type: "registry:ui",
    title: "Multi Orbit Semi Circle",
    description: "Multi-layered semi-circular orbit animation with tech icons",
    files: [
      {
        path: "registry/ruixenui/multi-orbit-semi-circle.tsx",
        type: "registry:ui",
        target: "components/ruixen/multi-orbit-semi-circle.tsx",
      },
    ],
  },
  {
    name: "rotating-gradient-right",
    type: "registry:ui",
    title: "Rotating Gradient Right",
    description: "Rotating conic gradient animation with centered card content",
    files: [
      {
        path: "registry/ruixenui/rotating-gradient-right.tsx",
        type: "registry:ui",
        target: "components/ruixen/rotating-gradient-right.tsx",
      },
    ],
    css: {
      "@keyframes spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
  {
    name: "automated-tasks-panel",
    type: "registry:ui",
    title: "Automated Tasks Panel",
    description: "Animated task panel with scrolling automation features",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/automated-tasks-panel.tsx",
        type: "registry:ui",
        target: "components/ruixen/automated-tasks-panel.tsx",
      },
    ],
  },
  {
    name: "case-studies",
    type: "registry:ui",
    title: "Case Studies",
    description:
      "Customer case studies with metrics, testimonials, and success stories",
    dependencies: ["react-countup"],
    files: [
      {
        path: "registry/ruixenui/case-studies.tsx",
        type: "registry:ui",
        target: "components/ruixen/case-studies.tsx",
      },
    ],
  },
  {
    name: "trusted-clients-showcase",
    type: "registry:ui",
    title: "Trusted Clients Showcase",
    description: "Showcase trusted clients with logos in a clean grid layout",
    files: [
      {
        path: "registry/ruixenui/trusted-clients-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/trusted-clients-showcase.tsx",
      },
    ],
  },
  {
    name: "client-carousel-showcase",
    type: "registry:ui",
    title: "Client Carousel Showcase",
    description:
      "Interactive carousel showcasing client logos with navigation controls",
    dependencies: ["embla-carousel-react"],
    files: [
      {
        path: "registry/ruixenui/client-carousel-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/client-carousel-showcase.tsx",
      },
    ],
  },
  {
    name: "auto-scrolling-client-carousel",
    type: "registry:ui",
    title: "Auto Scrolling Client Carousel",
    description:
      "Automatically scrolling carousel showcasing client logos with infinite loop",
    files: [
      {
        path: "registry/ruixenui/auto-scrolling-client-carousel.tsx",
        type: "registry:ui",
        target: "components/ruixen/auto-scrolling-client-carousel.tsx",
      },
    ],
    css: {
      "@keyframes scroll": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(calc(-100% - var(--gap)))" },
      },
    },
  },
  {
    name: "footer-pro",
    type: "registry:ui",
    title: "Footer Pro",
    description:
      "A professional footer component with logo, description, contact info, social links, and organized column sections.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/footer-pro.tsx",
        type: "registry:ui",
        target: "components/ruixen/footer-pro.tsx",
      },
    ],
  },
  {
    name: "corporate-footer",
    type: "registry:ui",
    title: "Corporate Footer",
    description:
      "A corporate-style footer with comprehensive navigation and company information.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/corporate-footer.tsx",
        type: "registry:ui",
        target: "components/ruixen/corporate-footer.tsx",
      },
    ],
  },
  {
    name: "footer-extended",
    type: "registry:ui",
    title: "Footer Extended",
    description:
      "An extended footer layout with multiple sections and comprehensive information.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/footer-extended.tsx",
        type: "registry:ui",
        target: "components/ruixen/footer-extended.tsx",
      },
    ],
  },
  {
    name: "footer-enterprise",
    type: "registry:ui",
    title: "Footer Enterprise",
    description:
      "An enterprise-grade footer with advanced features and comprehensive navigation.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/footer-enterprise.tsx",
        type: "registry:ui",
        target: "components/ruixen/footer-enterprise.tsx",
      },
    ],
  },
  {
    name: "footer-mega",
    type: "registry:ui",
    title: "Footer Mega",
    description:
      "A mega footer with extensive navigation and multiple content sections.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/footer-mega.tsx",
        type: "registry:ui",
        target: "components/ruixen/footer-mega.tsx",
      },
    ],
  },
  {
    name: "hover-gradient-navbar",
    type: "registry:ui",
    title: "Hover Gradient Navbar",
    description:
      "A navigation bar with gradient hover effects and smooth transitions.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/hover-gradient-navbar.tsx",
        type: "registry:ui",
        target: "components/ruixen/hover-gradient-navbar.tsx",
      },
    ],
  },
  {
    name: "floating-navbar",
    type: "registry:ui",
    title: "Floating Navbar",
    description:
      "A floating navigation bar that appears on scroll with smooth animations.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/floating-navbar.tsx",
        type: "registry:ui",
        target: "components/ruixen/floating-navbar.tsx",
      },
    ],
  },
  {
    name: "luma-bar",
    type: "registry:ui",
    title: "Luma Bar",
    description:
      "A sleek navigation bar with Luma-inspired design and interactions.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/luma-bar.tsx",
        type: "registry:ui",
        target: "components/ruixen/luma-bar.tsx",
      },
    ],
  },
  {
    name: "promote-header",
    type: "registry:ui",
    title: "Promote Header",
    description:
      "A promotional header component for announcements and marketing messages.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/promote-header.tsx",
        type: "registry:ui",
        target: "components/ruixen/promote-header.tsx",
      },
    ],
  },
  {
    name: "pricing-plans",
    type: "registry:ui",
    title: "Pricing Plans",
    description:
      "A comprehensive pricing plans component with multiple tiers and features.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/pricing-plans.tsx",
        type: "registry:ui",
        target: "components/ruixen/pricing-plans.tsx",
      },
    ],
  },
  {
    name: "pricing-comparison",
    type: "registry:ui",
    title: "Pricing Comparison",
    description:
      "A detailed pricing comparison table with features and plan differences.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/pricing-comparison.tsx",
        type: "registry:ui",
        target: "components/ruixen/pricing-comparison.tsx",
      },
    ],
  },
  {
    name: "subscription-plans",
    type: "registry:ui",
    title: "Subscription Plans",
    description:
      "A subscription-focused pricing component with billing options and features.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/subscription-plans.tsx",
        type: "registry:ui",
        target: "components/ruixen/subscription-plans.tsx",
      },
    ],
  },
  {
    name: "pricing-flow",
    type: "registry:ui",
    title: "Pricing Flow",
    description:
      "An interactive pricing flow with billing toggles and plan selection.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/pricing-flow.tsx",
        type: "registry:ui",
        target: "components/ruixen/pricing-flow.tsx",
      },
    ],
  },
  {
    name: "pricing-with-user-scaling",
    type: "registry:ui",
    title: "Pricing with User Scaling",
    description:
      "A pricing component with user-based scaling and dynamic pricing calculations.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card", "slider"],
    files: [
      {
        path: "registry/ruixenui/pricing-with-user-scaling.tsx",
        type: "registry:ui",
        target: "components/ruixen/pricing-with-user-scaling.tsx",
      },
    ],
  },
  {
    name: "testimonial-tabs",
    type: "registry:ui",
    title: "Testimonial Tabs",
    description:
      "An interactive testimonial component with tabbed navigation and smooth transitions.",
    dependencies: ["motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/testimonial-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/testimonial-tabs.tsx",
      },
    ],
  },
  {
    name: "slide-to-delete-button",
    type: "registry:ui",
    title: "Slide To Delete Button",
    description:
      "A draggable button that requires sliding to confirm deletion action.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/slide-to-delete-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/slide-to-delete-button.tsx",
      },
    ],
  },
  {
    name: "glow-link-button",
    type: "registry:ui",
    title: "Glow Link Button",
    description:
      "A button with a subtle glow effect and animated arrow on hover.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/glow-link-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/glow-link-button.tsx",
      },
    ],
  },
  {
    name: "theme-cycle-button",
    type: "registry:ui",
    title: "Theme Cycle Button",
    description:
      "A button that cycles through different theme modes with smooth transitions.",
    dependencies: ["lucide-react", "next-themes"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/theme-cycle-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/theme-cycle-button.tsx",
      },
    ],
  },
  {
    name: "morphing-github-button",
    type: "registry:ui",
    title: "Morphing Github Button",
    description:
      "A GitHub button that morphs between different states with animations.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/morphing-github-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/morphing-github-button.tsx",
      },
    ],
  },
  {
    name: "circular-stepper-input",
    type: "registry:ui",
    title: "Circular Stepper Input",
    description:
      "A circular input component with increment/decrement functionality.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/circular-stepper-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/circular-stepper-input.tsx",
      },
    ],
  },
  {
    name: "password-strength-input",
    type: "registry:ui",
    title: "Password Strength Input",
    description:
      "A password input with real-time strength validation and visual feedback.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/password-strength-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/password-strength-input.tsx",
      },
    ],
  },
  {
    name: "otp-input",
    type: "registry:ui",
    title: "OTP Input",
    description:
      "A one-time password input component with individual digit fields.",
    files: [
      {
        path: "registry/ruixenui/otp-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/otp-input.tsx",
      },
    ],
  },
  {
    name: "color-picker-input",
    type: "registry:ui",
    title: "Color Picker Input",
    description:
      "A color picker component with opacity control and copy functionality.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/color-picker-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/color-picker-input.tsx",
      },
      {
        path: "hooks/use-copy-to-clipboard.ts",
        type: "registry:hook",
        target: "hooks/use-copy-to-clipboard.ts",
      },
    ],
  },
  {
    name: "gravatar-email-input",
    type: "registry:ui",
    title: "Gravatar Email Input",
    description: "An email input that displays Gravatar avatar preview.",
    dependencies: ["md5"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/gravatar-email-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/gravatar-email-input.tsx",
      },
    ],
  },
  {
    name: "correct-number-input",
    type: "registry:ui",
    title: "Correct Number Input",
    description: "A number input with validation and correction features.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/correct-number-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/correct-number-input.tsx",
      },
    ],
  },
  {
    name: "better-time-picker",
    type: "registry:ui",
    title: "Better Time Picker",
    description: "An enhanced time picker with improved user experience.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/better-time-picker.tsx",
        type: "registry:ui",
        target: "components/ruixen/better-time-picker.tsx",
      },
    ],
  },
  {
    name: "inline-copy-input",
    type: "registry:ui",
    title: "Inline Copy Input",
    description: "An input field with inline copy-to-clipboard functionality.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/inline-copy-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/inline-copy-input.tsx",
      },
    ],
  },
  {
    name: "clean-tag-input",
    type: "registry:ui",
    title: "Clean Tag Input",
    description:
      "A clean and minimal tag input component for adding multiple values.",
    dependencies: ["lucide-react"],
    registryDependencies: ["label"],
    files: [
      {
        path: "registry/ruixenui/clean-tag-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/clean-tag-input.tsx",
      },
    ],
  },
  {
    name: "search-with-category",
    type: "registry:ui",
    title: "Search With Category",
    description:
      "A search input component with category filtering functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label", "select"],
    files: [
      {
        path: "registry/ruixenui/search-with-category.tsx",
        type: "registry:ui",
        target: "components/ruixen/search-with-category.tsx",
      },
    ],
  },
  {
    name: "advanced-context-menu",
    type: "registry:ui",
    title: "Advanced Context Menu",
    description:
      "An advanced context menu component with nested items and keyboard navigation.",
    dependencies: ["@radix-ui/react-dropdown-menu"],
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "registry/ruixenui/advanced-context-menu.tsx",
        type: "registry:ui",
        target: "components/ruixen/advanced-context-menu.tsx",
      },
    ],
  },
  {
    name: "nested-dashboard-menu",
    type: "registry:ui",
    title: "Nested Dashboard Menu",
    description: "A nested navigation menu component for dashboard layouts.",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["menubar"],
    files: [
      {
        path: "registry/ruixenui/nested-dashboard-menu.tsx",
        type: "registry:ui",
        target: "components/ruixen/nested-dashboard-menu.tsx",
      },
    ],
  },
  {
    name: "drawer-inner-content",
    type: "registry:ui",
    title: "Drawer Inner Content",
    description: "A drawer component with customizable inner content layout.",
    dependencies: ["@radix-ui/react-dialog", "motion"],
    registryDependencies: ["drawer", "button", "input", "label"],
    files: [
      {
        path: "registry/ruixenui/drawer-inner-content.tsx",
        type: "registry:ui",
        target: "components/ruixen/drawer-inner-content.tsx",
      },
    ],
  },
  {
    name: "centered-feedback-drawer",
    type: "registry:ui",
    title: "Centered Feedback Drawer",
    description:
      "A centered drawer component designed for feedback collection.",
    dependencies: ["@radix-ui/react-dialog", "motion"],
    registryDependencies: ["drawer", "button", "input", "label", "text-area"],
    files: [
      {
        path: "registry/ruixenui/centered-feedback-drawer.tsx",
        type: "registry:ui",
        target: "components/ruixen/centered-feedback-drawer.tsx",
      },
    ],
  },
  {
    name: "bottom-drawers",
    type: "registry:ui",
    title: "Bottom Drawers",
    description:
      "A bottom drawer component that slides up from the bottom of the screen.",
    dependencies: ["@radix-ui/react-dialog", "motion"],
    registryDependencies: ["drawer", "button", "input", "label", "text-area"],
    files: [
      {
        path: "registry/ruixenui/bottom-drawers.tsx",
        type: "registry:ui",
        target: "components/ruixen/bottom-drawers.tsx",
      },
    ],
  },
  {
    name: "social-card",
    type: "registry:ui",
    title: "Social Card",
    description:
      "A social media style card component with engagement features.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/social-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/social-card.tsx",
      },
    ],
  },
  {
    name: "portfolio-card",
    type: "registry:ui",
    title: "Portfolio Card",
    description:
      "A professional portfolio card component showcasing skills and profile.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/portfolio-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/portfolio-card.tsx",
      },
    ],
  },
  {
    name: "team-project-card",
    type: "registry:ui",
    title: "Team Project Card",
    description:
      "A collaborative project card showing team members and milestones.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/team-project-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/team-project-card.tsx",
      },
    ],
  },
  {
    name: "collab-chat-card",
    type: "registry:ui",
    title: "Collab Chat Card",
    description:
      "A collaborative chat interface card with participant filtering.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/collab-chat-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/collab-chat-card.tsx",
      },
    ],
  },
  {
    name: "goal-tracker-card",
    type: "registry:ui",
    title: "Goal Tracker Card",
    description:
      "An activity and goal tracking card with progress visualization.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/goal-tracker-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/goal-tracker-card.tsx",
      },
    ],
  },
  {
    name: "environment-card",
    type: "registry:ui",
    title: "Environment Card",
    description:
      "A smart home environment control card with device management.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/environment-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/environment-card.tsx",
      },
    ],
  },
  {
    name: "schedule-card",
    type: "registry:ui",
    title: "Schedule Card",
    description:
      "A schedule card component displaying daily events and meetings.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/schedule-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/schedule-card.tsx",
      },
    ],
  },
  {
    name: "showcase-card",
    type: "registry:ui",
    title: "Showcase Card",
    description:
      "A showcase card component for displaying projects and portfolios.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/showcase-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/showcase-card.tsx",
      },
    ],
  },
  {
    name: "order-summary-card",
    type: "registry:ui",
    title: "Order Summary Card",
    description:
      "An order summary card component for e-commerce checkout flows.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/order-summary-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/order-summary-card.tsx",
      },
    ],
  },
  {
    name: "doctor-profile-card",
    type: "registry:ui",
    title: "Doctor Profile Card",
    description: "A doctor profile card component for healthcare applications.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/doctor-profile-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/doctor-profile-card.tsx",
      },
    ],
  },
  {
    name: "gradient-blob-card",
    type: "registry:ui",
    title: "Gradient Blob Card",
    description: "An animated gradient blob card with glassmorphism effects.",
    files: [
      {
        path: "registry/ruixenui/gradient-blob-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/gradient-blob-card.tsx",
      },
    ],
  },
  {
    name: "idea-generator-card",
    type: "registry:ui",
    title: "Idea Generator Card",
    description:
      "An AI-powered idea generator card with input and action buttons.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/idea-generator-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/idea-generator-card.tsx",
      },
    ],
  },
  {
    name: "input-with-select",
    type: "registry:ui",
    title: "Input With Select",
    description:
      "A modern input field with an integrated select dropdown for currency or unit selection.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label", "select"],
    files: [
      {
        path: "registry/ruixenui/input-with-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/input-with-select.tsx",
      },
    ],
  },
  {
    name: "range-slider-input",
    type: "registry:ui",
    title: "Range Slider Input",
    description:
      "A dual-range slider with numeric inputs and increment/decrement controls.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/range-slider-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/range-slider-input.tsx",
      },
    ],
  },
  {
    name: "url-input",
    type: "registry:ui",
    title: "URL Input",
    description:
      "A smart URL input field that automatically displays website favicons.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/url-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/url-input.tsx",
      },
    ],
  },
  {
    name: "floating-input",
    type: "registry:ui",
    title: "Floating Input",
    description:
      "A modern input field with floating label animation and icon support.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/floating-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/floating-input.tsx",
      },
    ],
  },
  {
    name: "time-with-icon",
    type: "registry:ui",
    title: "Time With Icon",
    description:
      "A time input field with dynamic icons that change based on the selected time.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/time-with-icon.tsx",
        type: "registry:ui",
        target: "components/ruixen/time-with-icon.tsx",
      },
    ],
  },
  {
    name: "otp-field",
    type: "registry:ui",
    title: "OTP Field",
    description:
      "A customizable OTP (One-Time Password) input field with auto-focus and paste support.",
    dependencies: ["lucide-react"],
    registryDependencies: ["label"],
    files: [
      {
        path: "registry/ruixenui/otp-field.tsx",
        type: "registry:ui",
        target: "components/ruixen/otp-field.tsx",
      },
    ],
  },
  {
    name: "modern-card-input",
    type: "registry:ui",
    title: "Modern Card Input",
    description:
      "A sophisticated credit card input with real-time validation and card type detection.",
    dependencies: ["react-payment-inputs"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/modern-card-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/modern-card-input.tsx",
      },
    ],
  },
  {
    name: "password-field",
    type: "registry:ui",
    title: "Password Field",
    description:
      "An advanced password input with strength meter, validation checklist, and password generation.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label", "button"],
    files: [
      {
        path: "registry/ruixenui/password-field.tsx",
        type: "registry:ui",
        target: "components/ruixen/password-field.tsx",
      },
    ],
  },
  {
    name: "smart-assist-input",
    type: "registry:ui",
    title: "Smart Assist Input",
    description:
      "An intelligent input field with history tracking, validation, and quick actions.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label"],
    files: [
      {
        path: "registry/ruixenui/smart-assist-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/smart-assist-input.tsx",
      },
    ],
  },
  {
    name: "action-hub-input",
    type: "registry:ui",
    title: "Action Hub Input",
    description:
      "A versatile input field with customizable action buttons and status indicators.",
    dependencies: ["lucide-react"],
    registryDependencies: ["input", "label", "button"],
    files: [
      {
        path: "registry/ruixenui/action-hub-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/action-hub-input.tsx",
      },
    ],
  },
  {
    name: "smart-notify-button",
    type: "registry:ui",
    title: "Smart Notify Button",
    description:
      "A button component that triggers customizable toast notifications with actions and different types.",
    dependencies: ["sonner", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/smart-notify-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/smart-notify-button.tsx",
      },
    ],
  },
  {
    name: "notification-badge",
    type: "registry:ui",
    title: "Notification Badge",
    description:
      "A notification badge component with animated count display and different notification types.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/notification-badge.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification-badge.tsx",
      },
    ],
  },
  {
    name: "notifications-popover",
    type: "registry:ui",
    title: "Notifications Popover",
    description:
      "A dropdown menu component for displaying notifications with different types and read states.",
    dependencies: ["lucide-react"],
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/notifications-popover.tsx",
        type: "registry:ui",
        target: "components/ruixen/notifications-popover.tsx",
      },
    ],
  },
  {
    name: "notification",
    type: "registry:ui",
    title: "Notification",
    description:
      "A clean notification popover component with title, description, and timestamp display.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "card", "badge"],
    files: [
      {
        path: "registry/ruixenui/notification.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification.tsx",
      },
    ],
  },
  {
    name: "notification-alt",
    type: "registry:ui",
    title: "Notification Alt",
    description:
      "An enhanced notification component with info tooltips, clickable links, and different notification types.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "badge", "card", "tooltip"],
    files: [
      {
        path: "registry/ruixenui/notification-alt.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification-alt.tsx",
      },
    ],
  },
  {
    name: "notifications-with-actions",
    type: "registry:ui",
    title: "Notifications With Actions",
    description:
      "Interactive notification component with swipe-to-reveal actions like archive and delete.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["popover", "badge", "card"],
    files: [
      {
        path: "registry/ruixenui/notifications-with-actions.tsx",
        type: "registry:ui",
        target: "components/ruixen/notifications-with-actions.tsx",
      },
    ],
  },
  {
    name: "notifications-carousel",
    type: "registry:ui",
    title: "Notifications Carousel",
    description:
      "A carousel-style notification component that displays one notification at a time with navigation controls.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "badge", "card"],
    files: [
      {
        path: "registry/ruixenui/notifications-carousel.tsx",
        type: "registry:ui",
        target: "components/ruixen/notifications-carousel.tsx",
      },
    ],
  },
  {
    name: "notification-toggle",
    type: "registry:ui",
    title: "Notification Toggle",
    description:
      "A versatile notification component that toggles between carousel and list view modes.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "badge", "card", "button"],
    files: [
      {
        path: "registry/ruixenui/notification-toggle.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification-toggle.tsx",
      },
    ],
  },
  {
    name: "notifications-filter",
    type: "registry:ui",
    title: "Notifications Filter",
    description:
      "A notification component with category filtering to organize notifications by type.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "badge", "button"],
    files: [
      {
        path: "registry/ruixenui/notifications-filter.tsx",
        type: "registry:ui",
        target: "components/ruixen/notifications-filter.tsx",
      },
    ],
  },
  {
    name: "avatar-notifications",
    type: "registry:ui",
    title: "Avatar Notifications",
    description:
      "A notification component that displays user avatars with messages and animated status indicators.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "button", "avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-notifications.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-notifications.tsx",
      },
    ],
  },
  {
    name: "sign-in-form",
    type: "registry:ui",
    title: "Sign In Form",
    description:
      "A professional sign-in form with email/password fields and social login options.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label", "checkbox", "card"],
    files: [
      {
        path: "registry/ruixenui/sign-in-form.tsx",
        type: "registry:ui",
        target: "components/ruixen/sign-in-form.tsx",
      },
    ],
  },
  {
    name: "create-account-form",
    type: "registry:ui",
    title: "Create Account Form",
    description:
      "A modern account creation form with validation and terms acceptance.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "label", "card"],
    files: [
      {
        path: "registry/ruixenui/create-account-form.tsx",
        type: "registry:ui",
        target: "components/ruixen/create-account-form.tsx",
      },
    ],
  },
  {
    name: "newsletter-form",
    type: "registry:ui",
    title: "Newsletter Form",
    description: "A simple newsletter subscription form with success state.",
    registryDependencies: ["button", "input", "label", "card"],
    files: [
      {
        path: "registry/ruixenui/newsletter-form.tsx",
        type: "registry:ui",
        target: "components/ruixen/newsletter-form.tsx",
      },
    ],
  },
  {
    name: "sign-in-card",
    type: "registry:ui",
    title: "Sign In Card",
    description:
      "A Microsoft-inspired sign-in card with clean design and branding.",
    registryDependencies: ["button", "input", "card"],
    files: [
      {
        path: "registry/ruixenui/sign-in-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/sign-in-card.tsx",
      },
    ],
  },
  {
    name: "job-card",
    type: "registry:ui",
    title: "Job Card",
    description:
      "A professional job listing card with company info and action buttons.",
    registryDependencies: ["button", "card", "avatar"],
    files: [
      {
        path: "registry/ruixenui/job-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/job-card.tsx",
      },
    ],
  },
  {
    name: "cookie-notice",
    type: "registry:ui",
    title: "Cookie Notice",
    description:
      "A GDPR-compliant cookie consent notice with customizable preferences.",
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/cookie-notice.tsx",
        type: "registry:ui",
        target: "components/ruixen/cookie-notice.tsx",
      },
    ],
  },
  {
    name: "file-tree-manager",
    type: "registry:ui",
    title: "File Tree Manager",
    description:
      "A comprehensive file tree component with CRUD operations and management features.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "card", "tooltip"],
    files: [
      {
        path: "registry/ruixenui/file-tree-manager.tsx",
        type: "registry:ui",
        target: "components/ruixen/file-tree-manager.tsx",
      },
    ],
  },
  {
    name: "motion-file-tree",
    type: "registry:ui",
    title: "Motion File Tree",
    description:
      "An animated file tree component with smooth expand/collapse transitions.",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/motion-file-tree.tsx",
        type: "registry:ui",
        target: "components/ruixen/motion-file-tree.tsx",
      },
    ],
  },
  {
    name: "magic-tree",
    type: "registry:ui",
    title: "Magic Tree",
    description:
      "A magical file tree with sparkle effects and interactive animations.",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/magic-tree.tsx",
        type: "registry:ui",
        target: "components/ruixen/magic-tree.tsx",
      },
    ],
  },
  {
    name: "tree-node-tooltip",
    type: "registry:ui",
    title: "Tree Node Tooltip",
    description: "A file tree component with tooltip support for each node.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "registry/ruixenui/tree-node-tooltip.tsx",
        type: "registry:ui",
        target: "components/ruixen/tree-node-tooltip.tsx",
      },
    ],
  },
  {
    name: "sortable-table",
    type: "registry:ui",
    title: "Sortable Table",
    description:
      "A sortable and filterable data table with search functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["table", "input", "button", "badge"],
    files: [
      {
        path: "registry/ruixenui/sortable-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/sortable-table.tsx",
      },
    ],
  },
  {
    name: "table-edit",
    type: "registry:ui",
    title: "Table Edit",
    description:
      "An editable table component with inline editing and dropdown menus.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "table",
      "checkbox",
      "badge",
      "button",
      "dropdown-menu",
      "input",
      "select",
    ],
    files: [
      {
        path: "registry/ruixenui/table-edit.tsx",
        type: "registry:ui",
        target: "components/ruixen/table-edit.tsx",
      },
    ],
  },
  {
    name: "table-with-dialog",
    type: "registry:ui",
    title: "Table With Dialog",
    description: "A data table with row details shown in a dialog modal.",
    registryDependencies: ["table", "checkbox", "button", "dialog", "badge"],
    files: [
      {
        path: "registry/ruixenui/table-with-dialog.tsx",
        type: "registry:ui",
        target: "components/ruixen/table-with-dialog.tsx",
      },
    ],
  },
  {
    name: "fixed-header-footer-table",
    type: "registry:ui",
    title: "Fixed Header Footer Table",
    description: "A table with fixed header and footer, and scrollable body.",
    registryDependencies: ["table"],
    files: [
      {
        path: "registry/ruixenui/fixed-header-footer-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/fixed-header-footer-table.tsx",
      },
    ],
  },
  {
    name: "date-time-picker",
    type: "registry:ui",
    title: "Date Time Picker",
    description: "A date and time picker with calendar and time selection.",
    dependencies: ["date-fns", "lucide-react", "react-day-picker"],
    registryDependencies: ["popover", "button", "calendar", "select"],
    files: [
      {
        path: "registry/ruixenui/date-time-picker.tsx",
        type: "registry:ui",
        target: "components/ruixen/date-time-picker.tsx",
      },
    ],
  },
  {
    name: "date-range-picker",
    type: "registry:ui",
    title: "Date Range Picker",
    description: "A date range picker with dual calendar view.",
    dependencies: ["date-fns", "lucide-react", "react-day-picker"],
    registryDependencies: ["button", "calendar", "popover"],
    files: [
      {
        path: "registry/ruixenui/date-range-picker.tsx",
        type: "registry:ui",
        target: "components/ruixen/date-range-picker.tsx",
      },
    ],
  },
  {
    name: "monthly-heatmap-calendar",
    type: "registry:ui",
    title: "Monthly Heatmap Calendar",
    description: "A monthly calendar with event heatmap visualization.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: [
      "card",
      "button",
      "popover",
      "input",
      "select",
      "badge",
    ],
    files: [
      {
        path: "registry/ruixenui/monthly-heatmap-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/monthly-heatmap-calendar.tsx",
      },
    ],
  },
  {
    name: "event-scheduler",
    type: "registry:ui",
    title: "Event Scheduler",
    description:
      "A full-featured event scheduler with event creation and management.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: [
      "button",
      "calendar",
      "popover",
      "select",
      "input",
      "card",
    ],
    files: [
      {
        path: "registry/ruixenui/event-scheduler.tsx",
        type: "registry:ui",
        target: "components/ruixen/event-scheduler.tsx",
      },
    ],
  },
  {
    name: "scheduler",
    type: "registry:ui",
    title: "Scheduler",
    description: "A simple event scheduler with calendar integration.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "popover",
      "calendar",
      "card",
      "label",
      "select",
    ],
    files: [
      {
        path: "registry/ruixenui/scheduler.tsx",
        type: "registry:ui",
        target: "components/ruixen/scheduler.tsx",
      },
    ],
  },
  {
    name: "daily-timeline-scheduler",
    type: "registry:ui",
    title: "Daily Timeline Scheduler",
    description: "A timeline-based daily scheduler with time slot management.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: ["card", "button", "popover", "input", "select"],
    files: [
      {
        path: "registry/ruixenui/daily-timeline-scheduler.tsx",
        type: "registry:ui",
        target: "components/ruixen/daily-timeline-scheduler.tsx",
      },
    ],
  },
  {
    name: "image-cropper",
    type: "registry:ui",
    title: "Image Cropper",
    description: "An image cropping tool with zoom and aspect ratio controls.",
    dependencies: ["react-easy-crop"],
    registryDependencies: ["button", "select", "slider", "card", "input"],
    files: [
      {
        path: "registry/ruixenui/image-cropper.tsx",
        type: "registry:ui",
        target: "components/ruixen/image-cropper.tsx",
      },
    ],
  },
  {
    name: "advanced-image-uploader",
    type: "registry:ui",
    title: "Advanced Image Uploader",
    description: "A drag-and-drop image uploader with cropping functionality.",
    dependencies: ["react-easy-crop", "lucide-react"],
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "registry/ruixenui/advanced-image-uploader.tsx",
        type: "registry:ui",
        target: "components/ruixen/advanced-image-uploader.tsx",
      },
    ],
  },
  {
    name: "reorderable-table",
    type: "registry:ui",
    title: "Reorderable Table",
    description:
      "A feature-rich table with column reordering, visibility toggle, and search functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["table", "button", "checkbox", "popover", "input"],
    files: [
      {
        path: "registry/ruixenui/reorderable-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/reorderable-table.tsx",
      },
    ],
  },
  {
    name: "comparison-table",
    type: "registry:ui",
    title: "Comparison Table",
    description:
      "A comparison table with filtering, search, and side-by-side item comparison.",
    dependencies: ["lucide-react"],
    registryDependencies: ["table", "card", "button", "input", "select"],
    files: [
      {
        path: "registry/ruixenui/comparison-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/comparison-table.tsx",
      },
    ],
  },
  {
    name: "flexi-filter-table",
    type: "registry:ui",
    title: "Flexi Filter Table",
    description:
      "A flexible table with multiple filter options including date range, balance, and location.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "table",
      "checkbox",
      "button",
      "input",
      "badge",
      "dropdown-menu",
      "calendar",
      "popover",
    ],
    files: [
      {
        path: "registry/ruixenui/flexi-filter-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/flexi-filter-table.tsx",
      },
    ],
  },
  {
    name: "table-dialog",
    type: "registry:ui",
    title: "Table Dialog",
    description:
      "An editable table with dialog-based editing and row selection.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "table",
      "checkbox",
      "badge",
      "button",
      "dropdown-menu",
      "dialog",
      "input",
      "select",
    ],
    files: [
      {
        path: "registry/ruixenui/table-dialog.tsx",
        type: "registry:ui",
        target: "components/ruixen/table-dialog.tsx",
      },
    ],
  },
  {
    name: "minimisable-table",
    type: "registry:ui",
    title: "Minimisable Table",
    description:
      "A table with collapsible columns that can be minimized to icons.",
    dependencies: ["lucide-react"],
    registryDependencies: ["table", "button", "dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/minimisable-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/minimisable-table.tsx",
      },
    ],
  },
  {
    name: "inline-analytics-table",
    type: "registry:ui",
    title: "Inline Analytics Table",
    description:
      "A table with inline analytics including progress bars and trend indicators.",
    dependencies: ["lucide-react"],
    registryDependencies: ["table", "progress"],
    files: [
      {
        path: "registry/ruixenui/inline-analytics-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/inline-analytics-table.tsx",
      },
    ],
  },
  {
    name: "column-collaboration-table",
    type: "registry:ui",
    title: "Column Collaboration Table",
    description:
      "A collaborative table with column-level comments and annotations.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "table",
      "button",
      "popover",
      "input",
      "scroll-area",
    ],
    files: [
      {
        path: "registry/ruixenui/column-collaboration-table.tsx",
        type: "registry:ui",
        target: "components/ruixen/column-collaboration-table.tsx",
      },
    ],
  },
  {
    name: "video-player-pro",
    type: "registry:ui",
    title: "Video Player Pro",
    description:
      "A professional video player with custom controls, playback speed, and fullscreen support.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button", "popover", "slider"],
    files: [
      {
        path: "registry/ruixenui/video-player-pro.tsx",
        type: "registry:ui",
        target: "components/ruixen/video-player-pro.tsx",
      },
    ],
  },
  {
    name: "hover-play-card",
    type: "registry:ui",
    title: "Hover Play Card",
    description:
      "A video card that plays on hover with manual play/pause controls.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/hover-play-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/hover-play-card.tsx",
      },
    ],
  },
  {
    name: "wave-background",
    type: "registry:ui",
    title: "Wave Background",
    description:
      "A flowing wave background with WebGL shaders and theme support.",
    dependencies: ["ogl"],
    files: [
      {
        path: "registry/ruixenui/wave-background.tsx",
        type: "registry:ui",
        target: "components/ruixen/wave-background.tsx",
      },
    ],
  },
  {
    name: "aurora-flow",
    type: "registry:ui",
    title: "Aurora Flow",
    description:
      "A beautiful aurora-style background with flowing gradients and noise effects.",
    dependencies: ["ogl"],
    files: [
      {
        path: "registry/ruixenui/aurora-flow.tsx",
        type: "registry:ui",
        target: "components/ruixen/aurora-flow.tsx",
      },
    ],
  },
  {
    name: "aurora-waves",
    type: "registry:ui",
    title: "Aurora Waves",
    description:
      "Aurora-style waves with customizable speed, glow, and theme support.",
    dependencies: ["ogl"],
    files: [
      {
        path: "registry/ruixenui/aurora-waves.tsx",
        type: "registry:ui",
        target: "components/ruixen/aurora-waves.tsx",
      },
    ],
  },
  {
    name: "falling-symbols-background",
    type: "registry:ui",
    title: "Falling Symbols Background",
    description:
      "A Matrix-style falling symbols background with customizable characters and effects.",
    files: [
      {
        path: "registry/ruixenui/falling-symbols-background.tsx",
        type: "registry:ui",
        target: "components/ruixen/falling-symbols-background.tsx",
      },
    ],
  },
  {
    name: "spotlight-background",
    type: "registry:ui",
    title: "Spotlight Background",
    description: "A mouse-following spotlight effect with smooth animations.",
    files: [
      {
        path: "registry/ruixenui/spotlight-background.tsx",
        type: "registry:ui",
        target: "components/ruixen/spotlight-background.tsx",
      },
    ],
  },
  {
    name: "ripple-distortion",
    type: "registry:ui",
    title: "Ripple Distortion",
    description:
      "An interactive image distortion effect with mouse-driven ripples using Three.js.",
    dependencies: ["three"],
    files: [
      {
        path: "registry/ruixenui/ripple-distortion.tsx",
        type: "registry:ui",
        target: "components/ruixen/ripple-distortion.tsx",
      },
    ],
  },
  {
    name: "particle-field",
    type: "registry:ui",
    title: "Particle Field",
    description:
      "An interactive particle field with mouse attraction and connection lines.",
    files: [
      {
        path: "registry/ruixenui/particle-field.tsx",
        type: "registry:ui",
        target: "components/ruixen/particle-field.tsx",
      },
    ],
  },
  {
    name: "particle-text-dots",
    type: "registry:ui",
    title: "Particle Text Dots",
    description:
      "Text rendered as interactive particle dots that react to cursor movement, similar to Gemini's background effect.",
    files: [
      {
        path: "registry/ruixenui/particle-text-dots.tsx",
        type: "registry:ui",
        target: "components/ruixen/particle-text-dots.tsx",
      },
    ],
  },
  {
    name: "rain-background",
    type: "registry:ui",
    title: "Rain Background",
    description: "A neon rain effect with animated streaks and glow orbs.",
    files: [
      {
        path: "registry/ruixenui/rain-background.tsx",
        type: "registry:ui",
        target: "components/ruixen/rain-background.tsx",
      },
    ],
  },
  {
    name: "dual-tone-rain-background",
    type: "registry:ui",
    title: "Dual Tone Rain Background",
    description:
      "A sophisticated rain effect with dual-tone teal-cyan colors and grid overlay.",
    files: [
      {
        path: "registry/ruixenui/dual-tone-rain-background.tsx",
        type: "registry:ui",
        target: "components/ruixen/dual-tone-rain-background.tsx",
      },
    ],
  },
  {
    name: "nested-tabs",
    type: "registry:ui",
    title: "Nested Tabs",
    description:
      "A tab component with nested sub-tabs that expand with smooth animations.",
    dependencies: ["framer-motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/nested-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/nested-tabs.tsx",
      },
    ],
  },
  {
    name: "zoom-depth-tabs",
    type: "registry:ui",
    title: "Zoom Depth Tabs",
    description:
      "A tab component with 3D zoom and depth effects for enhanced visual appeal.",
    dependencies: ["framer-motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/zoom-depth-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/zoom-depth-tabs.tsx",
      },
    ],
  },
  {
    name: "badge-tabs",
    type: "registry:ui",
    title: "Badge Tabs",
    description:
      "Tab component with animated badges showing counts or notifications.",
    dependencies: ["framer-motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/badge-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-tabs.tsx",
      },
    ],
  },
  {
    name: "capsule-tabs",
    type: "registry:ui",
    title: "Capsule Tabs",
    description:
      "Scrollable capsule-style tabs with pagination dots and navigation arrows.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button", "tabs"],
    files: [
      {
        path: "registry/ruixenui/capsule-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/capsule-tabs.tsx",
      },
    ],
  },
  {
    name: "magnetic-tabs",
    type: "registry:ui",
    title: "Magnetic Tabs",
    description:
      "Tab component with magnetic hover effects and smooth indicator animations.",
    dependencies: ["framer-motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/magnetic-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/magnetic-tabs.tsx",
      },
    ],
  },
  {
    name: "fade-slide-tabs",
    type: "registry:ui",
    title: "Fade Slide Tabs",
    description:
      "Tab component with fade and slide animations for smooth content transitions.",
    dependencies: ["framer-motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/fade-slide-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/fade-slide-tabs.tsx",
      },
    ],
  },
  {
    name: "hybrid-tabs",
    type: "registry:ui",
    title: "Hybrid Tabs",
    description:
      "Tab component that shows icons only by default and expands to show labels on hover.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/hybrid-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/hybrid-tabs.tsx",
      },
    ],
  },
  {
    name: "pill-morph-tabs",
    type: "registry:ui",
    title: "Pill Morph Tabs",
    description:
      "Elegant tab component with morphing pill indicator and glassmorphism effects.",
    dependencies: ["framer-motion"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/pill-morph-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/pill-morph-tabs.tsx",
      },
    ],
  },
  {
    name: "sliding-tabs",
    type: "registry:ui",
    title: "Sliding Tabs",
    description:
      "Tab component with sliding gradient indicator and keyboard navigation support.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/sliding-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/sliding-tabs.tsx",
      },
    ],
  },
  {
    name: "wheel-pagination",
    type: "registry:ui",
    title: "Wheel Pagination",
    description:
      "Interactive pagination component with mouse wheel support and animated page numbers.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/wheel-pagination.tsx",
        type: "registry:ui",
        target: "components/ruixen/wheel-pagination.tsx",
      },
    ],
  },
  {
    name: "scroll-pagination",
    type: "registry:ui",
    title: "Scroll Pagination",
    description:
      "Minimalist pagination with mouse wheel navigation and animated number carousel.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/scroll-pagination.tsx",
        type: "registry:ui",
        target: "components/ruixen/scroll-pagination.tsx",
      },
    ],
  },
  {
    name: "icon-pagination",
    type: "registry:ui",
    title: "Icon Pagination",
    description:
      "Pagination component with colorful icon indicators and tooltip labels.",
    dependencies: ["lucide-react"],
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "registry/ruixenui/icon-pagination.tsx",
        type: "registry:ui",
        target: "components/ruixen/icon-pagination.tsx",
      },
    ],
  },
  {
    name: "gooey-pagination",
    type: "registry:ui",
    title: "Gooey Pagination",
    description:
      "Pagination component with liquid gooey effects using SVG filters.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/gooey-pagination.tsx",
        type: "registry:ui",
        target: "components/ruixen/gooey-pagination.tsx",
      },
    ],
  },
  {
    name: "stack-pagination",
    type: "registry:ui",
    title: "Stack Pagination",
    description:
      "3D card stack pagination with flip animations and perspective effects.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button", "card"],
    files: [
      {
        path: "registry/ruixenui/stack-pagination.tsx",
        type: "registry:ui",
        target: "components/ruixen/stack-pagination.tsx",
      },
    ],
  },
  {
    name: "animated-number-flip",
    type: "registry:ui",
    title: "Animated Number Flip",
    description:
      "A card component that displays numbers with smooth flip animations.",
    dependencies: ["framer-motion"],
    registryDependencies: ["card"],
    files: [
      {
        path: "registry/ruixenui/animated-number-flip.tsx",
        type: "registry:ui",
        target: "components/ruixen/animated-number-flip.tsx",
      },
    ],
  },
  {
    name: "morphing-page-dots",
    type: "registry:ui",
    title: "Morphing Page Dots",
    description:
      "Pagination dots that morph in width with ripple effects for the active state.",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/morphing-page-dots.tsx",
        type: "registry:ui",
        target: "components/ruixen/morphing-page-dots.tsx",
      },
    ],
  },
  {
    name: "sliding-pagination",
    type: "registry:ui",
    title: "Sliding Pagination",
    description:
      "Pagination component with sliding underline indicator and smart page grouping.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/sliding-pagination.tsx",
        type: "registry:ui",
        target: "components/ruixen/sliding-pagination.tsx",
      },
    ],
  },
  {
    name: "ai-chat-input",
    type: "registry:ui",
    title: "AI Chat Input",
    description:
      "Advanced chat input with slash commands, emoji picker, file upload, and AI features.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "textarea", "badge", "popover", "command"],
    files: [
      {
        path: "registry/ruixenui/ai-chat-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/ai-chat-input.tsx",
      },
    ],
  },
  {
    name: "magnetic-dock",
    type: "registry:ui",
    title: "Magnetic Dock",
    description:
      "macOS-style dock with magnetic hover effects and smooth icon animations.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["card"],
    files: [
      {
        path: "registry/ruixenui/magnetic-dock.tsx",
        type: "registry:ui",
        target: "components/ruixen/magnetic-dock.tsx",
      },
    ],
  },
  {
    name: "gooey-dock",
    type: "registry:ui",
    title: "Gooey Dock",
    description:
      "Dock component with liquid gooey blob effects using SVG filters.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "registry/ruixenui/gooey-dock.tsx",
        type: "registry:ui",
        target: "components/ruixen/gooey-dock.tsx",
      },
    ],
  },
  {
    name: "tilted-dock",
    type: "registry:ui",
    title: "Tilted Dock",
    description:
      "3D tilted dock with perspective effects and parallax mouse tracking.",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/tilted-dock.tsx",
        type: "registry:ui",
        target: "components/ruixen/tilted-dock.tsx",
      },
    ],
  },
  {
    name: "dock-morph",
    type: "registry:ui",
    title: "Dock Morph",
    description:
      "Morphing dock with glassmorphism bubbles and flexible positioning.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "registry/ruixenui/dock-morph.tsx",
        type: "registry:ui",
        target: "components/ruixen/dock-morph.tsx",
      },
    ],
  },
  {
    name: "dock",
    type: "registry:ui",
    title: "Dock",
    description:
      "Classic dock component with floating animation and glow effects.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "registry/ruixenui/dock.tsx",
        type: "registry:ui",
        target: "components/ruixen/dock.tsx",
      },
    ],
  },
  {
    name: "music-equalizer-upload",
    type: "registry:ui",
    title: "Music Equalizer Upload",
    description:
      "Upload component with animated equalizer bars for audio files.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "registry/ruixenui/music-equalizer-upload.tsx",
        type: "registry:ui",
        target: "components/ruixen/music-equalizer-upload.tsx",
      },
    ],
  },
  {
    name: "sketchpad-dropzone",
    type: "registry:ui",
    title: "Sketchpad Dropzone",
    description:
      "Creative dropzone with sketchpad-style grid background and sticky note file cards.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "registry/ruixenui/sketchpad-dropzone.tsx",
        type: "registry:ui",
        target: "components/ruixen/sketchpad-dropzone.tsx",
      },
    ],
  },
  {
    name: "stacked-cards-upload",
    type: "registry:ui",
    title: "Stacked Cards Upload",
    description:
      "Upload component with stacked card layout and progress indicators.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "registry/ruixenui/stacked-cards-upload.tsx",
        type: "registry:ui",
        target: "components/ruixen/stacked-cards-upload.tsx",
      },
    ],
  },
  {
    name: "timeline-upload",
    type: "registry:ui",
    title: "Timeline Upload",
    description:
      "Upload component with timeline layout showing upload progress and status.",
    dependencies: ["lucide-react"],
    registryDependencies: ["card", "button", "progress"],
    files: [
      {
        path: "registry/ruixenui/timeline-upload.tsx",
        type: "registry:ui",
        target: "components/ruixen/timeline-upload.tsx",
      },
    ],
  },
  // Audio & Media Components
  {
    name: "audio-timeline-with-chapters",
    type: "registry:ui",
    title: "Audio Timeline With Chapters",
    description:
      "Interactive audio player with timeline and chapter navigation.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/audio-timeline-with-chapters.tsx",
        type: "registry:ui",
        target: "components/ruixen/audio-timeline-with-chapters.tsx",
      },
    ],
  },
  {
    name: "playlist-carousel",
    type: "registry:ui",
    title: "Playlist Carousel",
    description:
      "Horizontal scrolling playlist with individual audio players and progress indicators.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/playlist-carousel.tsx",
        type: "registry:ui",
        target: "components/ruixen/playlist-carousel.tsx",
      },
    ],
  },
  {
    name: "voice-message-bubble",
    type: "registry:ui",
    title: "Voice Message Bubble",
    description:
      "Chat-style voice message bubble with waveform visualization and playback controls.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/voice-message-bubble.tsx",
        type: "registry:ui",
        target: "components/ruixen/voice-message-bubble.tsx",
      },
    ],
  },
  {
    name: "visualizer-button",
    type: "registry:ui",
    title: "Visualizer Button",
    description:
      "Compact audio button with animated equalizer bars visualization.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/visualizer-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/visualizer-button.tsx",
      },
    ],
  },
  {
    name: "audio-book-player",
    type: "registry:ui",
    title: "Audio Book Player",
    description:
      "Fixed-position audiobook player with chapter info, speed control, and progress tracking.",
    dependencies: [],
    registryDependencies: ["button", "slider"],
    files: [
      {
        path: "registry/ruixenui/audio-book-player.tsx",
        type: "registry:ui",
        target: "components/ruixen/audio-book-player.tsx",
      },
    ],
  },
  {
    name: "podcast-card-player",
    type: "registry:ui",
    title: "Podcast Card Player",
    description:
      "Card-style podcast player with cover art, episode info, and audio controls.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/podcast-card-player.tsx",
        type: "registry:ui",
        target: "components/ruixen/podcast-card-player.tsx",
      },
    ],
  },
  {
    name: "waveform-player",
    type: "registry:ui",
    title: "Waveform Player",
    description:
      "Audio player with visual waveform representation and seek controls.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/waveform-player.tsx",
        type: "registry:ui",
        target: "components/ruixen/waveform-player.tsx",
      },
    ],
  },
  // Auth/Login Components
  {
    name: "flip-card",
    type: "registry:ui",
    title: "Flip Card",
    description:
      "3D flip card with login form, customizable fields, and success states.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/flip-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/flip-card.tsx",
      },
    ],
  },
  {
    name: "success-login-card",
    type: "registry:ui",
    title: "Success Login Card",
    description:
      "Animated login card with success states and customizable animation types.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/success-login-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/success-login-card.tsx",
      },
    ],
  },
  {
    name: "step-card",
    type: "registry:ui",
    title: "Step Card",
    description: "Multi-step form card with smooth transitions between steps.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/step-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/step-card.tsx",
      },
    ],
  },
  {
    name: "auth-tabs-card",
    type: "registry:ui",
    title: "Auth Tabs Card",
    description:
      "Tabbed authentication card with sign-in/sign-up forms and social login options.",
    dependencies: ["react-icons"],
    files: [
      {
        path: "registry/ruixenui/auth-tabs-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/auth-tabs-card.tsx",
      },
    ],
  },
  // Additional Button Components
  {
    name: "hover-preview-button",
    type: "registry:ui",
    title: "Hover Preview Button",
    description: "Button with hover-triggered preview content display.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/hover-preview-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/hover-preview-button.tsx",
      },
    ],
  },
  {
    name: "segmented-button-group",
    type: "registry:ui",
    title: "Segmented Button Group",
    description:
      "Group of connected buttons for single selection with smooth animations.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/segmented-button-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/segmented-button-group.tsx",
      },
    ],
  },
  {
    name: "confetti-button",
    type: "registry:ui",
    title: "Confetti Button",
    description:
      "Celebration button that triggers animated confetti particles on click.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/confetti-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/confetti-button.tsx",
      },
    ],
  },
  {
    name: "swipe-to-confirm-button",
    type: "registry:ui",
    title: "Swipe To Confirm Button",
    description: "Interactive button requiring swipe gesture for confirmation.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/swipe-to-confirm-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/swipe-to-confirm-button.tsx",
      },
    ],
  },
  {
    name: "status-button",
    type: "registry:ui",
    title: "Status Button",
    description:
      "Button with animated status indicator dot for live/idle/offline states.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/status-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/status-button.tsx",
      },
    ],
  },
  {
    name: "checklist-button",
    type: "registry:ui",
    title: "Checklist Button",
    description: "Toggle button with checkmark animation for task completion.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/checklist-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/checklist-button.tsx",
      },
    ],
  },
  {
    name: "countdown-button",
    type: "registry:ui",
    title: "Countdown Button",
    description:
      "Button with countdown timer that disables for specified duration.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/countdown-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/countdown-button.tsx",
      },
    ],
  },
  {
    name: "icon-grid-button",
    type: "registry:ui",
    title: "Icon Grid Button",
    description: "Button that reveals a grid of icon options on click.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/icon-grid-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/icon-grid-button.tsx",
      },
    ],
  },
  {
    name: "multi-step-button",
    type: "registry:ui",
    title: "Multi Step Button",
    description:
      "Button that cycles through multiple steps/labels on each click.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/multi-step-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/multi-step-button.tsx",
      },
    ],
  },
  {
    name: "tooltip-button",
    type: "registry:ui",
    title: "Tooltip Button",
    description: "Button with integrated tooltip for additional context.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "registry/ruixenui/tooltip-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/tooltip-button.tsx",
      },
    ],
  },
  {
    name: "badge-button-combo",
    type: "registry:ui",
    title: "Badge Button Combo",
    description:
      "Button with notification badge for counts or status indicators.",
    dependencies: [],
    registryDependencies: ["button", "badge"],
    files: [
      {
        path: "registry/ruixenui/badge-button-combo.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-button-combo.tsx",
      },
    ],
  },
  {
    name: "badge-icon",
    type: "registry:ui",
    title: "Badge with Icon",
    description: "Badge component with customizable icon and position.",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "registry/ruixenui/badge-icon.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-icon.tsx",
      },
    ],
  },
  {
    name: "badge-counter",
    type: "registry:ui",
    title: "Badge Counter",
    description: "Compact circular badge for displaying notification counts.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/badge-counter.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-counter.tsx",
      },
    ],
  },
  {
    name: "badge-status",
    type: "registry:ui",
    title: "Badge Status",
    description:
      "Status badge with dot or icon indicator for success, pending, warning, and error states.",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "registry/ruixenui/badge-status.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-status.tsx",
      },
    ],
  },
  {
    name: "badge-removable",
    type: "registry:ui",
    title: "Badge Removable",
    description: "Badge with a remove button for dismissible tags and filters.",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "registry/ruixenui/badge-removable.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-removable.tsx",
      },
    ],
  },
  {
    name: "banner-announcement",
    type: "registry:ui",
    title: "Banner Announcement",
    description:
      "A dismissible announcement banner with multiple variants and action links.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/banner-announcement.tsx",
        type: "registry:ui",
        target: "components/ruixen/banner-announcement.tsx",
      },
    ],
  },
  {
    name: "banner-cookie",
    type: "registry:ui",
    title: "Banner Cookie",
    description:
      "A cookie consent banner with accept, decline, and preferences options.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/banner-cookie.tsx",
        type: "registry:ui",
        target: "components/ruixen/banner-cookie.tsx",
      },
    ],
  },
  {
    name: "banner-promo",
    type: "registry:ui",
    title: "Banner Promo",
    description:
      "A promotional banner with badge, title, and call-to-action button.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/banner-promo.tsx",
        type: "registry:ui",
        target: "components/ruixen/banner-promo.tsx",
      },
    ],
  },
  {
    name: "banner-newsletter",
    type: "registry:ui",
    title: "Banner Newsletter",
    description:
      "A newsletter subscription banner with email input and submit button.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input"],
    files: [
      {
        path: "registry/ruixenui/banner-newsletter.tsx",
        type: "registry:ui",
        target: "components/ruixen/banner-newsletter.tsx",
      },
    ],
  },
  {
    name: "banner-countdown",
    type: "registry:ui",
    title: "Banner Countdown",
    description:
      "A countdown timer banner for sales, launches, and time-sensitive promotions.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/banner-countdown.tsx",
        type: "registry:ui",
        target: "components/ruixen/banner-countdown.tsx",
      },
    ],
  },
  {
    name: "breadcrumb-separator",
    type: "registry:ui",
    title: "Breadcrumb Separator",
    description:
      "Breadcrumb navigation with customizable separators (chevron, slash, dot, arrow, dash).",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/breadcrumb-separator.tsx",
        type: "registry:ui",
        target: "components/ruixen/breadcrumb-separator.tsx",
      },
    ],
  },
  {
    name: "breadcrumb-icon",
    type: "registry:ui",
    title: "Breadcrumb Icon",
    description: "Breadcrumb navigation with icons for each item.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/breadcrumb-icon.tsx",
        type: "registry:ui",
        target: "components/ruixen/breadcrumb-icon.tsx",
      },
    ],
  },
  {
    name: "breadcrumb-dropdown",
    type: "registry:ui",
    title: "Breadcrumb Dropdown",
    description:
      "Breadcrumb navigation that collapses middle items into a dropdown menu.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/breadcrumb-dropdown.tsx",
        type: "registry:ui",
        target: "components/ruixen/breadcrumb-dropdown.tsx",
      },
    ],
  },
  {
    name: "breadcrumb-boxed",
    type: "registry:ui",
    title: "Breadcrumb Boxed",
    description:
      "Breadcrumb navigation wrapped in a styled container with multiple variants.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/breadcrumb-boxed.tsx",
        type: "registry:ui",
        target: "components/ruixen/breadcrumb-boxed.tsx",
      },
    ],
  },
  {
    name: "expandable-content-button",
    type: "registry:ui",
    title: "Expandable Content Button",
    description: "Button that expands to show additional content options.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/expandable-content-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/expandable-content-button.tsx",
      },
    ],
  },
  {
    name: "notification-button",
    type: "registry:ui",
    title: "Notification Button",
    description:
      "Button with notification badge count for alerts and messages.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [
      {
        path: "registry/ruixenui/notification-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification-button.tsx",
      },
    ],
  },
  {
    name: "confirmation-button",
    type: "registry:ui",
    title: "Confirmation Button",
    description:
      "Safety button that requires confirmation before executing destructive actions.",
    dependencies: [],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/confirmation-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/confirmation-button.tsx",
      },
    ],
  },
  {
    name: "avatar-action-button",
    type: "registry:ui",
    title: "Avatar Action Button",
    description: "Button with integrated avatar image for user actions.",
    dependencies: [],
    registryDependencies: ["button", "avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-action-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-action-button.tsx",
      },
    ],
  },
  {
    name: "split-action-button",
    type: "registry:ui",
    title: "Split Action Button",
    description:
      "Button with primary action and dropdown for secondary options.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown"],
    files: [
      {
        path: "registry/ruixenui/split-action-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/split-action-button.tsx",
      },
    ],
  },
  {
    name: "progress-button",
    type: "registry:ui",
    title: "Progress Button",
    description: "Button with built-in progress feedback for async operations.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/progress-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/progress-button.tsx",
      },
    ],
  },
  {
    name: "icon-label-subtext-button",
    type: "registry:ui",
    title: "Icon Label Subtext Button",
    description:
      "Comprehensive button with icon, main label, and subtext for detailed actions.",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "tooltip"],
    files: [
      {
        path: "registry/ruixenui/icon-label-subtext-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/icon-label-subtext-button.tsx",
      },
    ],
  },
  // Additional Auth Components
  {
    name: "gamified-login-card",
    type: "registry:ui",
    title: "Gamified Login Card",
    description:
      "Interactive login card with confetti celebration animation on successful login.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/gamified-login-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/gamified-login-card.tsx",
      },
    ],
  },
  {
    name: "social-auth-card",
    type: "registry:ui",
    title: "Social Auth Card",
    description:
      "Authentication card with social login buttons and traditional form.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/social-auth-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/social-auth-card.tsx",
      },
    ],
  },
  {
    name: "login-card",
    type: "registry:ui",
    title: "Login Card",
    description:
      "Clean and simple login card with customizable inputs and logo support.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/login-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/login-card.tsx",
      },
    ],
  },
  {
    name: "multi-step-login",
    type: "registry:ui",
    title: "Multi Step Login",
    description: "Multi-step authentication form with progress indicator.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/multi-step-login.tsx",
        type: "registry:ui",
        target: "components/ruixen/multi-step-login.tsx",
      },
    ],
  },
  {
    name: "split-login-card",
    type: "registry:ui",
    title: "Split Login Card",
    description:
      "Split-screen login card with branding on one side and form on the other.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/split-login-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/split-login-card.tsx",
      },
    ],
  },
  // Tabs Components
  {
    name: "drag-and-drop-tabs",
    type: "registry:ui",
    title: "Drag And Drop Tabs",
    description:
      "Interactive tabs component with drag-and-drop reordering functionality.",
    dependencies: ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
    registryDependencies: ["tabs"],
    files: [
      {
        path: "registry/ruixenui/drag-and-drop-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/drag-and-drop-tabs.tsx",
      },
    ],
  },
  {
    name: "inbox-calendar",
    type: "registry:ui",
    title: "Inbox Calendar",
    description:
      "Interactive inbox-style calendar with event management and scrollable timeline.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: [
      "card",
      "scroll-area",
      "separator",
      "badge",
      "button",
      "popover",
      "input",
      "textarea",
      "calendar",
    ],
    files: [
      {
        path: "registry/ruixenui/inbox-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/inbox-calendar.tsx",
      },
    ],
  },
  {
    name: "event-constellation-calendar",
    type: "registry:ui",
    title: "Event Constellation Calendar",
    description:
      "Unique starfield-style calendar with constellation connections between events.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: ["card", "button", "popover", "input"],
    files: [
      {
        path: "registry/ruixenui/event-constellation-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/event-constellation-calendar.tsx",
      },
    ],
  },
  {
    name: "three-dwall-calendar",
    type: "registry:ui",
    title: "Three D Wall Calendar",
    description:
      "Interactive 3D wall-style calendar with tilt controls and drag interactions.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: ["card", "button", "input", "popover", "hover-card"],
    files: [
      {
        path: "registry/ruixenui/three-dwall-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/three-dwall-calendar.tsx",
      },
    ],
  },
  {
    name: "task-orbit-calendar",
    type: "registry:ui",
    title: "Task Orbit Calendar",
    description:
      "Orbital calendar view with tasks rotating around a central 'Today' hub.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: ["card", "popover", "button", "input"],
    files: [
      {
        path: "registry/ruixenui/task-orbit-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/task-orbit-calendar.tsx",
      },
    ],
  },
  {
    name: "radial-week-view",
    type: "registry:ui",
    title: "Radial Week View",
    description:
      "Circular week calendar with radial hour markers and event positioning.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: ["card", "popover", "button", "input"],
    files: [
      {
        path: "registry/ruixenui/radial-week-view.tsx",
        type: "registry:ui",
        target: "components/ruixen/radial-week-view.tsx",
      },
    ],
  },
  {
    name: "stacked-bar-calendar",
    type: "registry:ui",
    title: "Stacked Bar Calendar",
    description:
      "Calendar with stacked bar visualization for event categories and filtering.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: [
      "calendar",
      "popover",
      "card",
      "button",
      "input",
      "select",
    ],
    files: [
      {
        path: "registry/ruixenui/stacked-bar-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/stacked-bar-calendar.tsx",
      },
    ],
  },
  {
    name: "heatmap-calendar",
    type: "registry:ui",
    title: "Heatmap Calendar",
    description:
      "GitHub-style heatmap calendar showing event intensity with color gradients.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: ["card", "popover", "button", "input"],
    files: [
      {
        path: "registry/ruixenui/heatmap-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/heatmap-calendar.tsx",
      },
    ],
  },
  {
    name: "event-calendar",
    type: "registry:ui",
    title: "Event Calendar",
    description:
      "Simple and clean event calendar with date selection and event management.",
    dependencies: ["date-fns", "lucide-react", "uuid"],
    registryDependencies: ["calendar", "card", "button", "input"],
    files: [
      {
        path: "registry/ruixenui/event-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/event-calendar.tsx",
      },
    ],
  },
  {
    name: "calendar-planner",
    type: "registry:ui",
    title: "Calendar Planner",
    description:
      "A comprehensive calendar planner with month/year view switching and event information display.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/calendar-planner.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-planner.tsx",
      },
    ],
  },
  {
    name: "calendar-twin",
    type: "registry:ui",
    title: "Calendar Twin",
    description:
      "A dual-view calendar component with month and year selection modes.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/calendar-twin.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-twin.tsx",
      },
    ],
  },
  {
    name: "chrono-select",
    type: "registry:ui",
    title: "Chrono Select",
    description:
      "A date picker with integrated year selection dropdown and calendar view.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: ["button", "popover", "calendar", "select"],
    files: [
      {
        path: "registry/ruixenui/chrono-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/chrono-select.tsx",
      },
    ],
  },
  {
    name: "pill-calendar",
    type: "registry:ui",
    title: "Pill Calendar",
    description:
      "A modern calendar component with pill-shaped date cells and range selection support.",
    dependencies: ["react-aria-components", "@internationalized/date"],
    files: [
      {
        path: "registry/ruixenui/pill-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/pill-calendar.tsx",
      },
    ],
  },
  {
    name: "multi-month-calendar",
    type: "registry:ui",
    title: "Multi Month Calendar",
    description:
      "A calendar component that displays multiple months with year/month dropdowns and range selection support.",
    dependencies: ["react-day-picker", "date-fns", "lucide-react"],
    registryDependencies: ["select"],
    files: [
      {
        path: "registry/ruixenui/multi-month-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/multi-month-calendar.tsx",
      },
    ],
  },
  {
    name: "calendar-with-presets",
    type: "registry:ui",
    title: "Calendar With Presets",
    description:
      "A customizable calendar component with preset date ranges and flexible styling options.",
    dependencies: ["react-day-picker", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/calendar-with-presets.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-with-presets.tsx",
      },
    ],
  },
  {
    name: "universal-date-picker",
    type: "registry:ui",
    title: "Universal Date Picker",
    description:
      "A versatile date picker with single/range mode toggle, preset shortcuts, and year selector.",
    dependencies: ["react-day-picker", "date-fns", "lucide-react"],
    registryDependencies: ["button", "calendar", "label", "card", "popover"],
    files: [
      {
        path: "registry/ruixenui/universal-date-picker.tsx",
        type: "registry:ui",
        target: "components/ruixen/universal-date-picker.tsx",
      },
    ],
  },
  {
    name: "calendar-lume",
    type: "registry:ui",
    title: "Calendar Lume",
    description:
      "An animated calendar with year/month/day step navigation and smooth transitions.",
    dependencies: ["date-fns", "framer-motion"],
    registryDependencies: ["calendar", "button", "scroll-area"],
    files: [
      {
        path: "registry/ruixenui/calendar-lume.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-lume.tsx",
      },
    ],
  },
  {
    name: "date-time-input",
    type: "registry:ui",
    title: "Date Time Input",
    description:
      "A combined date and time picker with calendar popover and time input field.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: ["calendar", "popover", "button", "input", "label"],
    files: [
      {
        path: "registry/ruixenui/date-time-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/date-time-input.tsx",
      },
    ],
  },
  {
    name: "calendar-scheduler",
    type: "registry:ui",
    title: "Calendar Scheduler",
    description:
      "A meeting scheduler with calendar date selection and time slot picker.",
    dependencies: ["date-fns"],
    registryDependencies: ["calendar", "button", "card"],
    files: [
      {
        path: "registry/ruixenui/calendar-scheduler.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-scheduler.tsx",
      },
    ],
  },
  {
    name: "multi-select-calendar-card",
    type: "registry:ui",
    title: "Multi Select Calendar Card",
    description:
      "A calendar card that allows selecting multiple dates with badge display and removal.",
    dependencies: ["date-fns"],
    registryDependencies: ["calendar", "button", "badge", "card"],
    files: [
      {
        path: "registry/ruixenui/multi-select-calendar-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/multi-select-calendar-card.tsx",
      },
    ],
  },
  {
    name: "side-panel-multi-calendar",
    type: "registry:ui",
    title: "Side Panel Multi Calendar",
    description:
      "A multi-select calendar with a side panel showing grouped selected dates by month.",
    dependencies: ["date-fns"],
    registryDependencies: ["calendar", "button", "scroll-area", "card"],
    files: [
      {
        path: "registry/ruixenui/side-panel-multi-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/side-panel-multi-calendar.tsx",
      },
    ],
  },
  {
    name: "dropdown-multi-calendar",
    type: "registry:ui",
    title: "Dropdown Multi Calendar",
    description:
      "A multi-select calendar with year/month dropdowns and badge-based date display.",
    dependencies: ["date-fns"],
    registryDependencies: ["calendar", "button", "badge", "card", "select"],
    files: [
      {
        path: "registry/ruixenui/dropdown-multi-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/dropdown-multi-calendar.tsx",
      },
    ],
  },
  {
    name: "dropdown-range-date-picker",
    type: "registry:ui",
    title: "Dropdown Range Date Picker",
    description:
      "A range date picker with year/month dropdowns in a popover interface.",
    dependencies: ["date-fns", "lucide-react"],
    registryDependencies: ["calendar", "button", "popover", "select"],
    files: [
      {
        path: "registry/ruixenui/dropdown-range-date-picker.tsx",
        type: "registry:ui",
        target: "components/ruixen/dropdown-range-date-picker.tsx",
      },
    ],
  },
  {
    name: "radio-group-card",
    type: "registry:ui",
    title: "Radio Group Card",
    description:
      "A radio group with card-style items featuring icons, titles, descriptions, and animated selection indicator.",
    dependencies: ["@radix-ui/react-radio-group"],
    files: [
      {
        path: "registry/ruixenui/radio-group-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/radio-group-card.tsx",
      },
    ],
  },
  {
    name: "emoji-radio-group",
    type: "registry:ui",
    title: "Emoji Radio Group",
    description:
      "A compact radio group with emoji-based options for quick visual feedback selection.",
    dependencies: ["@radix-ui/react-radio-group"],
    files: [
      {
        path: "registry/ruixenui/emoji-radio-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/emoji-radio-group.tsx",
      },
    ],
  },
  {
    name: "sentiment-radio-group",
    type: "registry:ui",
    title: "Sentiment Radio Group",
    description:
      "A radio group with sentiment cards featuring emojis, titles, and descriptions for feedback collection.",
    dependencies: ["@radix-ui/react-radio-group"],
    files: [
      {
        path: "registry/ruixenui/sentiment-radio-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/sentiment-radio-group.tsx",
      },
    ],
  },
  {
    name: "rating-scale-group",
    type: "registry:ui",
    title: "Rating Scale Group",
    description:
      "A horizontal rating scale radio group with numbered items and green indicator dots.",
    dependencies: ["@radix-ui/react-radio-group"],
    files: [
      {
        path: "registry/ruixenui/rating-scale-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/rating-scale-group.tsx",
      },
    ],
  },
  {
    name: "review-filter-bars",
    type: "registry:ui",
    title: "Review Filter Bars",
    description:
      "A radio group for filtering reviews by star rating with progress bars and counts.",
    dependencies: ["@radix-ui/react-radio-group", "@remixicon/react"],
    files: [
      {
        path: "registry/ruixenui/review-filter-bars.tsx",
        type: "registry:ui",
        target: "components/ruixen/review-filter-bars.tsx",
      },
    ],
  },
  {
    name: "tour-popover",
    type: "registry:ui",
    title: "Tour Popover",
    description:
      "A guided tour popover with steps, progress tracking, and navigation controls.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "popover", "progress", "separator"],
    files: [
      {
        path: "registry/ruixenui/tour-popover.tsx",
        type: "registry:ui",
        target: "components/ruixen/tour-popover.tsx",
      },
    ],
  },
  {
    name: "notification-inbox-popover",
    type: "registry:ui",
    title: "Notification Inbox Popover",
    description:
      "A notification inbox popover with tabs, unread counts, and mark as read functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button", "popover", "tabs"],
    files: [
      {
        path: "registry/ruixenui/notification-inbox-popover.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification-inbox-popover.tsx",
      },
    ],
  },
  {
    name: "credit-card-dialog",
    type: "registry:ui",
    title: "Credit Card Dialog",
    description:
      "A credit card activation dialog with animated card display and form input.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "dialog", "input"],
    files: [
      {
        path: "registry/ruixenui/credit-card-dialog.tsx",
        type: "registry:ui",
        target: "components/ruixen/credit-card-dialog.tsx",
      },
    ],
  },
  {
    name: "identity-verification-dialog",
    type: "registry:ui",
    title: "Identity Verification Dialog",
    description:
      "An identity verification dialog with ID card display and PIN input form.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "dialog", "input"],
    files: [
      {
        path: "registry/ruixenui/identity-verification-dialog.tsx",
        type: "registry:ui",
        target: "components/ruixen/identity-verification-dialog.tsx",
      },
    ],
  },
  {
    name: "verification-card",
    type: "registry:ui",
    title: "Verification Card",
    description:
      "An animated verification card component with customizable background and content.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/verification-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/verification-card.tsx",
      },
    ],
  },
  {
    name: "credit-card-hero",
    type: "registry:ui",
    title: "Credit Card Hero",
    description:
      "A 3D interactive hero section with floating credit cards and mouse tilt effects.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/credit-card-hero.tsx",
        type: "registry:ui",
        target: "components/ruixen/credit-card-hero.tsx",
      },
    ],
  },
  {
    name: "order-tracking-parallax-card",
    type: "registry:ui",
    title: "Order Tracking Parallax Card",
    description:
      "A 3D parallax card for order tracking with delivery status and progress indicator.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/order-tracking-parallax-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/order-tracking-parallax-card.tsx",
      },
    ],
  },
  {
    name: "shirt-parallax-card",
    type: "registry:ui",
    title: "Shirt Parallax Card",
    description:
      "A product card with 3D parallax effects and floating product image with bounce animation.",
    dependencies: ["framer-motion"],
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "registry/ruixenui/shirt-parallax-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/shirt-parallax-card.tsx",
      },
    ],
  },
  {
    name: "elite-plan-card",
    type: "registry:ui",
    title: "Elite Plan Card",
    description:
      "A premium plan card with image parallax, highlights, and call-to-action button.",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/elite-plan-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/elite-plan-card.tsx",
      },
    ],
  },
  {
    name: "product-bounce-card",
    type: "registry:ui",
    title: "Product Bounce Card",
    description:
      "An animated product showcase with bouncing and rotating effects plus shadow.",
    dependencies: ["framer-motion"],
    files: [
      {
        path: "registry/ruixenui/product-bounce-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/product-bounce-card.tsx",
      },
    ],
  },
  {
    name: "loading-circle",
    type: "registry:ui",
    title: "Loading Circle",
    description:
      "A ripple loading animation with multiple concentric circles and gradient effects.",
    files: [
      {
        path: "registry/ruixenui/loading-circle.tsx",
        type: "registry:ui",
        target: "components/ruixen/loading-circle.tsx",
      },
    ],
    css: {
      "loading-circles": {
        "0%": {
          transform: "scale(1)",
          "box-shadow": "0 10px 10px rgba(0, 0, 0, 0.3)",
        },
        "50%": {
          transform: "scale(1.3)",
          "box-shadow": "0 30px 20px rgba(0, 0, 0, 0.3)",
        },
        "100%": {
          transform: "scale(1)",
          "box-shadow": "0 10px 10px rgba(0, 0, 0, 0.3)",
        },
      },
    },
  },
  {
    name: "load-ripple",
    type: "registry:ui",
    title: "Load Ripple",
    description:
      "A simple ripple loader with 5 animated circles and staggered timing.",
    files: [
      {
        path: "registry/ruixenui/load-ripple.tsx",
        type: "registry:ui",
        target: "components/ruixen/load-ripple.tsx",
      },
    ],
    css: {
      "load-ripple": {
        "0%": {
          transform: "scale(0.2)",
          opacity: "0.8",
        },
        "70%": {
          transform: "scale(1)",
          opacity: "0",
        },
        "100%": {
          opacity: "0",
        },
      },
    },
  },
  {
    name: "ripple-circles",
    type: "registry:ui",
    title: "Ripple Circles",
    description:
      "Animated ripple circles loader with gradient backgrounds and backdrop blur.",
    files: [
      {
        path: "registry/ruixenui/ripple-circles.tsx",
        type: "registry:ui",
        target: "components/ruixen/ripple-circles.tsx",
      },
    ],
    css: {
      "ripple-circles": {
        "0%": {
          transform: "scale(1)",
          "box-shadow": "0 10px 10px rgba(0, 0, 0, 0.3)",
        },
        "50%": {
          transform: "scale(1.3)",
          "box-shadow": "0 30px 20px rgba(0, 0, 0, 0.3)",
        },
        "100%": {
          transform: "scale(1)",
          "box-shadow": "0 10px 10px rgba(0, 0, 0, 0.3)",
        },
      },
    },
  },
  {
    name: "mouse-spark",
    type: "registry:ui",
    title: "Mouse Spark",
    description:
      "Interactive mouse-following particle effect with customizable colors and themes.",
    files: [
      {
        path: "registry/ruixenui/mouse-spark.tsx",
        type: "registry:ui",
        target: "components/ruixen/mouse-spark.tsx",
      },
    ],
  },
  {
    name: "rising-glow",
    type: "registry:ui",
    title: "Rising Glow",
    description:
      "Animated rising particle effect with customizable colors and particle count.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/rising-glow.tsx",
        type: "registry:ui",
        target: "components/ruixen/rising-glow.tsx",
      },
    ],
  },
  {
    name: "project-progress-card",
    type: "registry:ui",
    title: "Project Progress Card",
    description:
      "Interactive project progress card with milestone tracking and timeline visualization.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["card", "button", "separator"],
    files: [
      {
        path: "registry/ruixenui/project-progress-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/project-progress-card.tsx",
      },
    ],
  },
  {
    name: "cloud-watch-form",
    type: "registry:ui",
    title: "Cloud Watch Form",
    description:
      "Interactive form with animated cloud character that reacts to user input.",
    files: [
      {
        path: "registry/ruixenui/cloud-watch-form.tsx",
        type: "registry:ui",
        target: "components/ruixen/cloud-watch-form.tsx",
      },
    ],
  },
  {
    name: "add-task-sheet",
    type: "registry:ui",
    title: "Add Task Sheet",
    description:
      "A comprehensive task creation sheet with form fields for task details, assignee, category, due date, and priority.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "input",
      "label",
      "select",
      "sheet",
      "popover",
      "calendar",
    ],
    files: [
      {
        path: "registry/ruixenui/add-task-sheet.tsx",
        type: "registry:ui",
        target: "components/ruixen/add-task-sheet.tsx",
      },
    ],
  },
  {
    name: "pricing-tiers",
    type: "registry:ui",
    title: "Pricing Tiers",
    description:
      "Modern pricing component with customizable tiers, features, and glass morphism design.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/pricing-tiers.tsx",
        type: "registry:ui",
        target: "components/ruixen/pricing-tiers.tsx",
      },
    ],
  },
  {
    name: "app-menu-bar",
    type: "registry:ui",
    title: "App Menu Bar",
    description:
      "Desktop-style application menu bar with File, Edit, View, and Help menus.",
    dependencies: ["lucide-react"],
    registryDependencies: ["menubar"],
    files: [
      {
        path: "registry/ruixenui/app-menu-bar.tsx",
        type: "registry:ui",
        target: "components/ruixen/app-menu-bar.tsx",
      },
    ],
  },
  {
    name: "account-menu",
    type: "registry:ui",
    title: "Account Menu",
    description:
      "User account dropdown menu with profile options, settings, and logout functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/account-menu.tsx",
        type: "registry:ui",
        target: "components/ruixen/account-menu.tsx",
      },
    ],
  },
  {
    name: "user-context-menu",
    type: "registry:ui",
    title: "User Context Menu",
    description:
      "Right-click context menu for user interactions with profile actions and user management options.",
    dependencies: ["lucide-react"],
    registryDependencies: ["avatar", "context-menu"],
    files: [
      {
        path: "registry/ruixenui/user-context-menu.tsx",
        type: "registry:ui",
        target: "components/ruixen/user-context-menu.tsx",
      },
    ],
  },
  {
    name: "action-toolbar",
    type: "registry:ui",
    title: "Action Toolbar",
    description:
      "Versatile toolbar component with action buttons and dropdown menus for common operations.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "dropdown-menu", "badge"],
    files: [
      {
        path: "registry/ruixenui/action-toolbar.tsx",
        type: "registry:ui",
        target: "components/ruixen/action-toolbar.tsx",
      },
    ],
  },
  {
    name: "smart-breadcrumb",
    type: "registry:ui",
    title: "Smart Breadcrumb",
    description:
      "Intelligent breadcrumb navigation with ellipsis for long paths and responsive design.",
    dependencies: ["lucide-react"],
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "registry/ruixenui/smart-breadcrumb.tsx",
        type: "registry:ui",
        target: "components/ruixen/smart-breadcrumb.tsx",
      },
    ],
  },
  {
    name: "solar-loader",
    type: "registry:ui",
    title: "Solar Loader",
    description:
      "Animated solar system loading spinner with orbiting planets and customizable speed.",
    files: [
      {
        path: "registry/ruixenui/solar-loader.tsx",
        type: "registry:ui",
        target: "components/ruixen/solar-loader.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-earth-rotate": "earthRotate 20s linear infinite",
        "animate-atmosphere-glow": "atmosphereGlow 3s ease-in-out infinite",
      },
    },
    css: {
      "@keyframes earthRotate": {
        "0%": {
          "background-position": "0 0",
        },
        "100%": {
          "background-position": "360px 0",
        },
      },
      "@keyframes atmosphereGlow": {
        "0%, 100%": {
          opacity: "0.6",
        },
        "50%": {
          opacity: "0.9",
        },
      },
    },
  },
  {
    name: "container-text-scroll",
    type: "registry:ui",
    title: "Container Text Scroll",
    description:
      "Scroll-triggered text animation component with smooth parallax effects using Framer Motion.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/container-text-scroll.tsx",
        type: "registry:ui",
        target: "components/ruixen/container-text-scroll.tsx",
      },
    ],
  },
  {
    name: "ruixen-moon-chat",
    type: "registry:ui",
    title: "Ruixen Moon Chat",
    description:
      "Modern chat interface with message bubbles, typing indicators, and smooth animations.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "textarea"],
    files: [
      {
        path: "registry/ruixenui/ruixen-moon-chat.tsx",
        type: "registry:ui",
        target: "components/ruixen/ruixen-moon-chat.tsx",
      },
    ],
  },
  {
    name: "globe",
    type: "registry:ui",
    title: "Globe",
    description:
      "Animated 3D Earth globe with rotating continents and atmospheric effects.",
    files: [
      {
        path: "registry/ruixenui/globe.tsx",
        type: "registry:ui",
        target: "components/ruixen/globe.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-earth-rotate": "earthRotate 20s linear infinite",
        "animate-atmosphere-glow": "atmosphereGlow 3s ease-in-out infinite",
      },
    },
    css: {
      "@keyframes earthRotate": {
        "0%": {
          "background-position": "0 0",
        },
        "100%": {
          "background-position": "360px 0",
        },
      },
      "@keyframes atmosphereGlow": {
        "0%, 100%": {
          opacity: "0.6",
        },
        "50%": {
          opacity: "0.9",
        },
      },
    },
  },
  {
    name: "tag-cloud-select",
    type: "registry:ui",
    title: "Tag Cloud Select",
    description:
      "Interactive tag selection component with cloud-style layout and multi-select functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["popover", "select", "button", "scroll-area"],
    files: [
      {
        path: "registry/ruixenui/tag-cloud-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/tag-cloud-select.tsx",
      },
    ],
  },
  {
    name: "color-emotion-select",
    type: "registry:ui",
    title: "Color Emotion Select",
    description:
      "A select component that displays options with color indicators and optional emojis for emotional context.",
    registryDependencies: ["select"],
    files: [
      {
        path: "registry/ruixenui/color-emotion-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/color-emotion-select.tsx",
      },
    ],
  },
  {
    name: "live-preview-style-select",
    type: "registry:ui",
    title: "Live Preview Style Select",
    description:
      "A select component with live preview functionality that shows a visual representation of the selected style option.",
    registryDependencies: ["select"],
    files: [
      {
        path: "registry/ruixenui/live-preview-style-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/live-preview-style-select.tsx",
      },
    ],
  },
  {
    name: "hero-title-slide",
    type: "registry:ui",
    title: "Hero Title Slide",
    description:
      "An animated hero section component with customizable slide animations and preset effects for creating engaging landing page headers.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/hero-title-slide.tsx",
        type: "registry:ui",
        target: "components/ruixen/hero-title-slide.tsx",
      },
    ],
  },
  {
    name: "core-value-stats",
    type: "registry:ui",
    title: "Core Value Stats",
    description:
      "A responsive stats section component showcasing core values with optional images, animated cards, and customizable content.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/core-value-stats.tsx",
        type: "registry:ui",
        target: "components/ruixen/core-value-stats.tsx",
      },
    ],
  },
  {
    name: "hero-section-glass-web",
    type: "registry:ui",
    title: "Hero Section Glass Web",
    description:
      "A modern hero section with glassmorphism effects, image background, and metadata display for professional landing pages.",
    files: [
      {
        path: "registry/ruixenui/hero-section-glass-web.tsx",
        type: "registry:ui",
        target: "components/ruixen/hero-section-glass-web.tsx",
      },
    ],
  },
  {
    name: "interactive-image-gallery",
    type: "registry:ui",
    title: "Interactive Image Gallery",
    description:
      "A responsive image gallery component with hover effects, expandable views, and smooth animations.",
    dependencies: ["motion"],
    registryDependencies: ["card"],
    files: [
      {
        path: "registry/ruixenui/interactive-image-gallery.tsx",
        type: "registry:ui",
        target: "components/ruixen/interactive-image-gallery.tsx",
      },
    ],
  },
  {
    name: "product-image-card",
    type: "registry:ui",
    title: "Product Image Card",
    description:
      "A product showcase card with scrollable image gallery, color selection, and interactive features for e-commerce applications.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "card",
      "scroll-area",
      "aspect-ratio",
      "separator",
    ],
    files: [
      {
        path: "registry/ruixenui/product-image-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/product-image-card.tsx",
      },
    ],
  },
  {
    name: "pricing-section-vertical",
    type: "registry:ui",
    title: "Pricing Section Vertical",
    description:
      "A vertical pricing section component with feature comparisons, plan cards, and call-to-action buttons.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/pricing-section-vertical.tsx",
        type: "registry:ui",
        target: "components/ruixen/pricing-section-vertical.tsx",
      },
    ],
  },
  {
    name: "precision-card",
    type: "registry:ui",
    title: "Precision Card",
    description:
      "A detailed information card component with badges, feature lists, and action buttons for showcasing products or services.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge", "card"],
    files: [
      {
        path: "registry/ruixenui/precision-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/precision-card.tsx",
      },
    ],
  },
  {
    name: "feature-slide-showcase",
    type: "registry:ui",
    title: "Feature Slide Showcase",
    description:
      "A tabbed feature showcase component with image previews and detailed descriptions for highlighting product features.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/feature-slide-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/feature-slide-showcase.tsx",
      },
    ],
  },
  {
    name: "health-stat-card",
    type: "registry:ui",
    title: "Health Stat Card",
    description:
      "An interactive health statistics card with animated progress rings, trend indicators, and detailed metrics display.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["tooltip"],
    files: [
      {
        path: "registry/ruixenui/health-stat-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/health-stat-card.tsx",
      },
    ],
  },
  {
    name: "card-stack",
    type: "registry:ui",
    title: "Card Stack",
    description:
      "An interactive 3D card stack carousel with fan-out animation, drag gestures, and auto-advance support.",
    dependencies: ["framer-motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/card-stack.tsx",
        type: "registry:ui",
        target: "components/ruixen/card-stack.tsx",
      },
    ],
  },
  {
    name: "navbar-simple",
    type: "registry:ui",
    title: "Navbar Simple",
    description:
      "A clean, simple navigation bar with logo, links, and action buttons.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-simple.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-simple.tsx",
      },
    ],
  },
  {
    name: "navbar-centered",
    type: "registry:ui",
    title: "Navbar Centered",
    description:
      "A navigation bar with centered navigation links between logo and actions.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-centered.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-centered.tsx",
      },
    ],
  },
  {
    name: "navbar-with-search",
    type: "registry:ui",
    title: "Navbar With Search",
    description:
      "A navigation bar with integrated search input and keyboard shortcut indicator.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-with-search.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-with-search.tsx",
      },
    ],
  },
  {
    name: "navbar-user-menu",
    type: "registry:ui",
    title: "Navbar User Menu",
    description:
      "A navigation bar with user avatar, dropdown menu, and notification bell.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "avatar", "dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/navbar-user-menu.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-user-menu.tsx",
      },
    ],
  },
  {
    name: "navbar-status",
    type: "registry:ui",
    title: "Navbar Status",
    description:
      "A navigation bar with status indicator and real-time metrics display.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/navbar-status.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-status.tsx",
      },
    ],
  },
  {
    name: "navbar-breadcrumb",
    type: "registry:ui",
    title: "Navbar Breadcrumb",
    description:
      "A navigation bar with breadcrumb navigation for multi-level hierarchy.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "avatar"],
    files: [
      {
        path: "registry/ruixenui/navbar-breadcrumb.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-breadcrumb.tsx",
      },
    ],
  },
  {
    name: "navbar-floating",
    type: "registry:ui",
    title: "Navbar Floating",
    description:
      "A floating pill-shaped navigation bar with rounded corners and backdrop blur.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-floating.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-floating.tsx",
      },
    ],
  },
  {
    name: "navbar-tabs",
    type: "registry:ui",
    title: "Navbar Tabs",
    description:
      "A two-tier navigation bar with main header and tabbed navigation below.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-tabs.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-tabs.tsx",
      },
    ],
  },
  {
    name: "navbar-minimal",
    type: "registry:ui",
    title: "Navbar Minimal",
    description:
      "An ultra-minimal navigation bar with just logo, few links, and single CTA.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-minimal.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-minimal.tsx",
      },
    ],
  },
  {
    name: "navbar-split",
    type: "registry:ui",
    title: "Navbar Split",
    description:
      "A navigation bar with links split between left and right sections.",
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-split.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-split.tsx",
      },
    ],
  },
  {
    name: "navbar-icon-links",
    type: "registry:ui",
    title: "Navbar Icon Links",
    description:
      "A navigation bar with social media icon links and primary CTA.",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/navbar-icon-links.tsx",
        type: "registry:ui",
        target: "components/ruixen/navbar-icon-links.tsx",
      },
    ],
  },
  {
    name: "button-variants",
    type: "registry:ui",
    title: "Button Variants",
    description:
      "A versatile button component with multiple variants including primary, secondary, destructive, outline, ghost, and link.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/button-variants.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-variants.tsx",
      },
    ],
  },
  {
    name: "button-icon",
    type: "registry:ui",
    title: "Button Icon",
    description:
      "Icon-only buttons with multiple variants for toolbar actions and compact UI.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/button-icon.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-icon.tsx",
      },
    ],
  },
  {
    name: "button-loading",
    type: "registry:ui",
    title: "Button Loading",
    description:
      "A button with loading, success, and error states for async operations.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/button-loading.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-loading.tsx",
      },
    ],
  },
  {
    name: "button-social",
    type: "registry:ui",
    title: "Button Social",
    description:
      "Social login buttons for Google, GitHub, Twitter, Facebook, and Apple.",
    files: [
      {
        path: "registry/ruixenui/button-social.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-social.tsx",
      },
    ],
  },
  {
    name: "button-copy",
    type: "registry:ui",
    title: "Button Copy",
    description:
      "A copy-to-clipboard button with visual feedback on copy success.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/button-copy.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-copy.tsx",
      },
    ],
  },
  {
    name: "button-dropdown",
    type: "registry:ui",
    title: "Button Dropdown",
    description:
      "A button with an integrated dropdown menu for action selection.",
    dependencies: ["lucide-react"],
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/button-dropdown.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-dropdown.tsx",
      },
    ],
  },
  {
    name: "button-toggle-group",
    type: "registry:ui",
    title: "Button Toggle Group",
    description: "A toggle group component for single or multiple selections.",
    files: [
      {
        path: "registry/ruixenui/button-toggle-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-toggle-group.tsx",
      },
    ],
  },
  {
    name: "button-file-upload",
    type: "registry:ui",
    title: "Button File Upload",
    description: "A file upload trigger button with customizable accept types.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/button-file-upload.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-file-upload.tsx",
      },
    ],
  },
  {
    name: "button-split",
    type: "registry:ui",
    title: "Button Split",
    description:
      "A split button with primary action and dropdown for secondary options.",
    dependencies: ["lucide-react"],
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "registry/ruixenui/button-split.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-split.tsx",
      },
    ],
  },
  {
    name: "button-badge",
    type: "registry:ui",
    title: "Button Badge",
    description:
      "A button with an integrated badge for notifications or counts.",
    files: [
      {
        path: "registry/ruixenui/button-badge.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-badge.tsx",
      },
    ],
  },
  {
    name: "button-rounded",
    type: "registry:ui",
    title: "Button Rounded",
    description:
      "Pill-shaped buttons with rounded corners for a softer aesthetic.",
    files: [
      {
        path: "registry/ruixenui/button-rounded.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-rounded.tsx",
      },
    ],
  },
  {
    name: "checkbox-simple",
    type: "registry:ui",
    title: "Checkbox Simple",
    description:
      "A simple checkbox component with label and optional description.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-simple.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-simple.tsx",
      },
    ],
  },
  {
    name: "checkbox-indeterminate",
    type: "registry:ui",
    title: "Checkbox Indeterminate",
    description:
      "A checkbox with three states: checked, unchecked, and indeterminate.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-indeterminate.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-indeterminate.tsx",
      },
    ],
  },
  {
    name: "checkbox-colored",
    type: "registry:ui",
    title: "Checkbox Colored",
    description:
      "A checkbox with customizable color themes including blue, green, red, and more.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-colored.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-colored.tsx",
      },
    ],
  },
  {
    name: "checkbox-todo",
    type: "registry:ui",
    title: "Checkbox Todo",
    description:
      "A todo-style checkbox with animated strikethrough effect when checked.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-todo.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-todo.tsx",
      },
    ],
  },
  {
    name: "checkbox-terms",
    type: "registry:ui",
    title: "Checkbox Terms",
    description:
      "A checkbox for accepting terms of service and privacy policy with linked text.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-terms.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-terms.tsx",
      },
    ],
  },
  {
    name: "checkbox-group",
    type: "registry:ui",
    title: "Checkbox Group",
    description:
      "A group of checkboxes for multi-selection with horizontal or vertical layout.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-group.tsx",
      },
    ],
  },
  {
    name: "checkbox-card",
    type: "registry:ui",
    title: "Checkbox Card",
    description:
      "A card-style checkbox with icon, title, and description for rich selections.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-card.tsx",
      },
    ],
  },
  {
    name: "checkbox-tree",
    type: "registry:ui",
    title: "Checkbox Tree",
    description:
      "A hierarchical tree checkbox for nested selections with expand/collapse.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/checkbox-tree.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-tree.tsx",
      },
    ],
  },
];
