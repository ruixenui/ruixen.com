import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "staggered-faq-section",
    type: "registry:ui",
    title: "StaggeredFAQSection",
    description:
      "A responsive FAQ component with animated text reveals and customizable content.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/staggered-faq-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/staggered-faq-section.tsx",
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
    ],
  },
  {
    name: "gravatar-email-input",
    type: "registry:ui",
    title: "Gravatar Email Input",
    description: "An email input that displays Gravatar avatar preview.",
    dependencies: ["md5"],
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
];
