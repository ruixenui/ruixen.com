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
  {
    name: "input-with-select",
    type: "registry:ui",
    title: "Input With Select",
    description:
      "A modern input field with an integrated select dropdown for currency or unit selection.",
    dependencies: ["lucide-react"],
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
    dependencies: ["lucide-react", "next"],
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
        path: "registry/ruixenui/creat-account-form.tsx",
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
];
