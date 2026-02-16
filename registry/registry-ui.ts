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
    name: "spark-chart",
    type: "registry:ui",
    title: "Spark Chart",
    description:
      "An interactive sparkline with path-following indicator, dual-path color reveal, gradient fill, and draw-in animation. Pixel-perfect cursor tracking via binary search on SVG path length.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/spark-chart.tsx",
        type: "registry:ui",
        target: "components/ruixen/spark-chart.tsx",
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
      "Progressive reveal feature list with sliding accent indicator, grid-template-rows expand, and staggered entrance.",
    dependencies: [],
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
      "Scroll-aware FAQ with center-zone detection via IntersectionObserver, auto-cascading open, staggered entrance, and grid-template-rows expand.",
    dependencies: [],
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
      "Spring-driven FAQ with a traveling accent bar (layoutId), spring height animation, blur-deblur text reveal, and layout FLIP repositioning.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/faq-auto-accordion.tsx",
        type: "registry:ui",
        target: "components/ruixen/faq-auto-accordion.tsx",
      },
    ],
  },
  {
    name: "faq-chat-accordion",
    type: "registry:ui",
    title: "FAQ Chat Accordion",
    description:
      "Conversational FAQ with right/left message bubbles, typing indicator dots, spring message entrance, and layout FLIP repositioning.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/faq-chat-accordion.tsx",
        type: "registry:ui",
        target: "components/ruixen/faq-chat-accordion.tsx",
      },
    ],
  },
  {
    name: "accordion-editorial",
    type: "registry:ui",
    title: "Editorial Accordion",
    description:
      "A typographic accordion with oversized uppercase titles, numbered items, and a faded-to-primary color transition on expand.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/accordion-editorial.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-editorial.tsx",
      },
    ],
  },
  {
    name: "accordion-indexed",
    type: "registry:ui",
    title: "Indexed Accordion",
    description:
      "A numbered accordion with zero-padded indices, a boxed plus icon that rotates on hover and transforms on expand.",
    dependencies: ["lucide-react"],
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/accordion-indexed.tsx",
        type: "registry:ui",
        target: "components/ruixen/accordion-indexed.tsx",
      },
    ],
  },
  {
    name: "avatar-spring-stack",
    type: "registry:ui",
    title: "Avatar Spring Stack",
    description:
      "An overlapping avatar stack with spring-animated tooltips that reveal labels on hover, plus a +N overflow counter.",
    dependencies: ["motion"],
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-spring-stack.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-spring-stack.tsx",
      },
    ],
  },
  {
    name: "avatar-quick-actions",
    type: "registry:ui",
    title: "Avatar Quick Actions",
    description:
      "An orbital action ring that blooms outward from the avatar with staggered spring emergence — hover any action and the rest dim, drawing the eye.",
    dependencies: ["motion"],
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-quick-actions.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-quick-actions.tsx",
      },
    ],
  },
  {
    name: "avatar-hover-card",
    type: "registry:ui",
    title: "Avatar Hover Card",
    description:
      "An interactive avatar that reveals a profile card on hover with spring physics, staggered content, and delayed open/close.",
    dependencies: ["motion"],
    registryDependencies: ["avatar"],
    files: [
      {
        path: "registry/ruixenui/avatar-hover-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/avatar-hover-card.tsx",
      },
    ],
  },
  {
    name: "variable-text",
    type: "registry:ui",
    title: "Variable Text",
    description:
      "Cursor acts as a focal plane — characters near the pointer sharpen (heavier weight, slight lift, full opacity) while distant characters soften. Depth-of-field for typography.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "registry/ruixenui/variable-text.tsx",
        type: "registry:ui",
        target: "components/ruixen/variable-text.tsx",
      },
    ],
  },
  {
    name: "scramble-text",
    type: "registry:ui",
    title: "Scramble Text",
    description:
      "Hover triggers a decode sequence — characters dissolve into random glyphs then resolve in a directional wave that follows your entry point, each locking in with a spring pop.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "registry/ruixenui/scramble-text.tsx",
        type: "registry:ui",
        target: "components/ruixen/scramble-text.tsx",
      },
    ],
  },
  {
    name: "card-carousel-hero",
    type: "registry:ui",
    title: "Card Carousel Hero",
    description:
      "An interactive hero section featuring a card carousel with smooth animations",
    dependencies: ["motion"],
    registryDependencies: ["button", "card"],
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
    dependencies: ["motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/ruixenui/gradient-hero-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/gradient-hero-showcase.tsx",
      },
    ],
  },
  {
    name: "video-hero-showcase",
    type: "registry:ui",
    title: "Video Hero Showcase",
    description:
      "A dynamic hero section featuring video backgrounds and interactive elements",
    dependencies: ["motion"],
    registryDependencies: ["button", "badge"],
    files: [
      {
        path: "registry/ruixenui/video-hero-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/video-hero-showcase.tsx",
      },
    ],
  },
  {
    name: "split-feature-showcase",
    type: "registry:ui",
    title: "Split Feature Showcase",
    description:
      "Scroll-triggered bento grid with spring-animated message preview and integration cards with ambient gradient glow.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/split-feature-showcase.tsx",
        type: "registry:ui",
        target: "components/ruixen/split-feature-showcase.tsx",
      },
    ],
  },
  {
    name: "product-feature-hero",
    type: "registry:ui",
    title: "Product Feature Hero",
    description:
      "Two-column hero with decorative gradient card and a four-column feature highlights grid.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/product-feature-hero.tsx",
        type: "registry:ui",
        target: "components/ruixen/product-feature-hero.tsx",
      },
    ],
  },
  {
    name: "product-card-hero",
    type: "registry:ui",
    title: "Product Card Hero",
    description:
      "Two-column hero with floating account menu card, pricing bar, and a four-column feature grid with icons.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/product-card-hero.tsx",
        type: "registry:ui",
        target: "components/ruixen/product-card-hero.tsx",
      },
    ],
  },
  {
    name: "integration-and-stats-section",
    type: "registry:ui",
    title: "Integration And Stats Section",
    description:
      "Three-column feature cards with chat, analytics, and polling illustrations",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/integration-and-stats-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/integration-and-stats-section.tsx",
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
    name: "trusted-clients-showcase",
    type: "registry:ui",
    title: "Trusted Clients Showcase",
    description:
      "Spotlight logo grid with staggered blur-up entrance and collective dim hover.",
    dependencies: [],
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
      "Infinite drift marquee with gradient edge masks — logos scroll continuously, pause on hover, and lift with exponential deceleration when focused.",
    dependencies: [],
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
      "Dual ribbon with grayscale bloom — two rows scroll in opposite directions, monochrome at rest, color blooms on hover with spring-bounce lift.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/auto-scrolling-client-carousel.tsx",
        type: "registry:ui",
        target: "components/ruixen/auto-scrolling-client-carousel.tsx",
      },
    ],
  },
  {
    name: "footer-pro",
    type: "registry:ui",
    title: "Footer Pro",
    description:
      "A minimal, typographic footer with brand wordmark, link columns, and quiet social icons.",
    dependencies: ["lucide-react"],
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
      "A card-based corporate footer with decorative watermark, column navigation, and whisper-quiet typography.",
    files: [
      {
        path: "registry/ruixenui/corporate-footer.tsx",
        type: "registry:ui",
        target: "components/ruixen/corporate-footer.tsx",
      },
    ],
  },
  {
    name: "footer-enterprise",
    type: "registry:ui",
    title: "Footer Enterprise",
    description:
      "An enterprise-grade footer with three-tier layout, wide column grid, and whisper-quiet typography.",
    files: [
      {
        path: "registry/ruixenui/footer-enterprise.tsx",
        type: "registry:ui",
        target: "components/ruixen/footer-enterprise.tsx",
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
      "iOS 26 liquid-glass slide-to-confirm track with spring-physics draggable thumb.",
    dependencies: ["motion"],
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
      "iOS 26 liquid-glass link pill with cursor-following radial glow and spring arrow.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/glow-link-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/glow-link-button.tsx",
      },
    ],
  },
  {
    name: "circular-stepper-input",
    type: "registry:ui",
    title: "Circular Stepper Input",
    description:
      "iOS 26 liquid-glass circular stepper with draggable ring, spring-animated arc, and haptic sound feedback.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/circular-stepper-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/circular-stepper-input.tsx",
      },
    ],
  },
  {
    name: "color-picker-input",
    type: "registry:ui",
    title: "Color Picker Input",
    description:
      "iOS 26 liquid-glass color picker with swatch grid, draggable opacity slider, and one-click copy.",
    dependencies: ["motion"],
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
    description:
      "iOS 26 liquid-glass email input with live Gravatar avatar preview and smooth fade-in.",
    dependencies: ["motion", "md5"],
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
    description:
      "iOS 26 liquid-glass number input with floating label, integrated stepper buttons, and haptic sound.",
    dependencies: ["motion"],
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
    description:
      "iOS 26 liquid-glass time picker with column steppers, spring-animated values, and segmented AM/PM toggle.",
    dependencies: ["motion"],
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
    description:
      "iOS 26 liquid-glass copy input with animated clipboard/check icon swap and haptic sound.",
    dependencies: ["motion"],
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
      "iOS 26 liquid-glass tag input with spring-animated pill chips and keyboard-driven add/remove.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/clean-tag-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/clean-tag-input.tsx",
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
    description:
      "Gesture-driven bottom sheet — drag to dismiss, spring physics, structured content sections with staggered cascade.",
    dependencies: ["motion"],
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
      "Centered feedback panel — three SVG faces, contextual comment, spring selection, auto-dismiss thank-you state.",
    dependencies: ["motion"],
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
      "Snap-point bottom sheet — three snap heights (peek, half, full), drag between them, velocity-aware, progressive content reveal.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/bottom-drawers.tsx",
        type: "registry:ui",
        target: "components/ruixen/bottom-drawers.tsx",
      },
    ],
  },
  {
    name: "input-with-select",
    type: "registry:ui",
    title: "Input With Select",
    description:
      "iOS 26 liquid-glass amount input with integrated segmented currency/unit selector and spring-animated knob.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/input-with-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/input-with-select.tsx",
      },
    ],
  },
  {
    name: "url-input",
    type: "registry:ui",
    title: "URL Input",
    description:
      "iOS 26 liquid-glass URL input with live favicon preview, protocol hint, and globe fallback icon.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/url-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/url-input.tsx",
      },
    ],
  },
  {
    name: "password-field",
    type: "registry:ui",
    title: "Password Field",
    description:
      "iOS 26 liquid-glass password input with animated strength bar, validation checklist, and one-click generation.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/password-field.tsx",
        type: "registry:ui",
        target: "components/ruixen/password-field.tsx",
      },
    ],
  },
  {
    name: "notification",
    type: "registry:ui",
    title: "Notification",
    description:
      "Spring toast stack with drag-to-dismiss, rubber-band physics, and glass morphism.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "registry/ruixenui/notification.tsx",
        type: "registry:ui",
        target: "components/ruixen/notification.tsx",
      },
    ],
  },
  {
    name: "notifications-carousel",
    type: "registry:ui",
    title: "Notifications Carousel",
    description:
      "Vertical drum carousel with 3D cylinder rotation, proximity brightness, and spring snap.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "registry/ruixenui/notifications-carousel.tsx",
        type: "registry:ui",
        target: "components/ruixen/notifications-carousel.tsx",
      },
    ],
  },
  {
    name: "notifications-filter",
    type: "registry:ui",
    title: "Notifications Filter",
    description:
      "Spring pill bar with layoutId sliding indicator and staggered item transitions.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "registry/ruixenui/notifications-filter.tsx",
        type: "registry:ui",
        target: "components/ruixen/notifications-filter.tsx",
      },
    ],
  },
  {
    name: "glass-form",
    type: "registry:ui",
    title: "Glass Form",
    description:
      "iOS 26 liquid-glass form system — grouped fields, toggles, segmented controls, and action buttons with backdrop blur.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/glass-form.tsx",
        type: "registry:ui",
        target: "components/ruixen/glass-form.tsx",
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
    name: "event-scheduler",
    type: "registry:ui",
    title: "Event Scheduler",
    description:
      "Inline timeline scheduler — tap a time, type a title, press Enter. Spring animations, sorted list, sound feedback.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/event-scheduler.tsx",
        type: "registry:ui",
        target: "components/ruixen/event-scheduler.tsx",
      },
    ],
  },
  {
    name: "glass-image-editor",
    type: "registry:ui",
    title: "Glass Image Editor",
    description:
      "iOS 26 liquid-glass image editor with drop zone, zoom/pan canvas, thumbnail strip, and toolbar.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/glass-image-editor.tsx",
        type: "registry:ui",
        target: "components/ruixen/glass-image-editor.tsx",
      },
    ],
  },
  {
    name: "glass-image-compare",
    type: "registry:ui",
    title: "Glass Image Compare",
    description:
      "iOS 26 liquid-glass before/after image comparison slider with drag divider, floating labels, and drop-to-load support.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/glass-image-compare.tsx",
        type: "registry:ui",
        target: "components/ruixen/glass-image-compare.tsx",
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
    name: "cloud-background",
    type: "registry:ui",
    title: "Cloud Background",
    description:
      "A flowing cloud background with WebGL shaders and theme support.",
    dependencies: ["ogl"],
    files: [
      {
        path: "registry/ruixenui/cloud-background.tsx",
        type: "registry:ui",
        target: "components/ruixen/cloud-background.tsx",
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
      "Vertical drum pagination with scroll wheel navigation, proximity brightness, and spring physics.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Minimal flip-counter pagination with direction-aware vertical flip, progress bar, and spring physics.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Colorful dot pagination with mouse proximity wave effect, cosine falloff lift, and spring physics.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Liquid metaball pagination with SVG gooey filter, sliding active indicator, and spring physics.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Physical card stack pagination with depth compression, diminishing scale, and spring physics.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Morphing pill dots with spring width animation, horizontal drag scrub, and audio ticks.",
    dependencies: ["motion"],
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
      "Page numbers with sliding pill indicator, proximity brightness, wheel navigation, and spring physics.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Vanishing chat input with rotating placeholders, pixel-scatter submit, and spring-timed interactions.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/ai-chat-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/ai-chat-input.tsx",
      },
    ],
  },
  {
    name: "claude-chat-input",
    type: "registry:ui",
    title: "Claude Chat Input",
    description:
      "Multi-modal chat input with file uploads, model selector, extended thinking toggle, and spring-timed interactions.",
    dependencies: ["lucide-react"],
    registryDependencies: [
      "button",
      "textarea",
      "popover",
      "separator",
      "switch",
      "badge",
    ],
    files: [
      {
        path: "registry/ruixenui/claude-chat-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/claude-chat-input.tsx",
      },
    ],
  },
  {
    name: "gooey-dock",
    type: "registry:ui",
    title: "Gooey Dock",
    description:
      "Horizontal dock with proximity-based magnification — items grow as the cursor approaches, spring physics.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/gooey-dock.tsx",
        type: "registry:ui",
        target: "components/ruixen/gooey-dock.tsx",
      },
    ],
  },
  {
    name: "morphing-expandable-menu",
    type: "registry:ui",
    title: "Morphing Expandable Menu",
    description:
      "A spring-animated pill that morphs into a dock, then expands into search, music player, timer, or note panels.",
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "registry/ruixenui/morphing-expandable-menu.tsx",
        type: "registry:ui",
        target: "components/ruixen/morphing-expandable-menu.tsx",
      },
    ],
  },
  // Audio & Media Components
  {
    name: "music-player-card",
    type: "registry:ui",
    title: "Music Player Card",
    description:
      "A rich music player card with album art, action pills, seekable progress, shuffle, repeat, and full transport controls.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/music-player-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/music-player-card.tsx",
      },
    ],
  },
  {
    name: "live-waveform",
    type: "registry:ui",
    title: "Live Waveform",
    description:
      "Canvas-based real-time waveform visualizer with processing animation, microphone input, and stop controls.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/ruixenui/live-waveform.tsx",
        type: "registry:ui",
        target: "components/ruixen/live-waveform.tsx",
      },
    ],
  },
  {
    name: "visualizer-button",
    type: "registry:ui",
    title: "Visualizer Button",
    description:
      "iOS 26 liquid-glass audio pill with canvas equalizer and Web Audio API integration.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/visualizer-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/visualizer-button.tsx",
      },
    ],
  },
  // Additional Button Components
  {
    name: "hover-preview-button",
    type: "registry:ui",
    title: "Hover Preview Button",
    description:
      "iOS 26 liquid-glass pill with spring-animated hover preview panel.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/hover-preview-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/hover-preview-button.tsx",
      },
    ],
  },
  {
    name: "confetti-button",
    type: "registry:ui",
    title: "Confetti Button",
    description:
      "iOS 26 liquid-glass pill that erupts spring-physics confetti particles on click.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/confetti-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/confetti-button.tsx",
      },
    ],
  },
  {
    name: "badge-button-combo",
    type: "registry:ui",
    title: "Badge Button Combo",
    description:
      "iOS 26 liquid-glass pill with inline chip badge for counts or status labels.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/badge-button-combo.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-button-combo.tsx",
      },
    ],
  },
  {
    name: "badge-morph",
    type: "registry:ui",
    title: "Badge Morph",
    description:
      "A morphing status badge that transitions between states with spring-physics micro-interactions.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/badge-morph.tsx",
        type: "registry:ui",
        target: "components/ruixen/badge-morph.tsx",
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
      "A frosted-glass cookie consent card with rise entrance and shrink-drop dismiss.",
    files: [
      {
        path: "registry/ruixenui/banner-cookie.tsx",
        type: "registry:ui",
        target: "components/ruixen/banner-cookie.tsx",
      },
    ],
  },
  {
    name: "banner-newsletter",
    type: "registry:ui",
    title: "Banner Newsletter",
    description:
      "A newsletter banner with Inline Morphing — one pill that reshapes across input, loading, and confirmation.",
    dependencies: ["lucide-react"],
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
      "A countdown banner with Fluid Numerals — odometer-style rolling digits, colon heartbeat, and height-collapse dismiss.",
    dependencies: ["lucide-react"],
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
      "Inline-expanding collapsible breadcrumb with staggered path reveal.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "registry/ruixenui/breadcrumb-dropdown.tsx",
        type: "registry:ui",
        target: "components/ruixen/breadcrumb-dropdown.tsx",
      },
    ],
  },
  {
    name: "progress-button",
    type: "registry:ui",
    title: "Progress Button",
    description:
      "iOS 26 liquid-glass pill that morphs through idle → loading → done phases.",
    dependencies: ["motion"],
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
      "iOS 26 liquid-glass card-button with icon circle, label, and subtext.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/icon-label-subtext-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/icon-label-subtext-button.tsx",
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
    name: "three-dwall-calendar",
    type: "registry:ui",
    title: "Three D Wall Calendar",
    description:
      "Wall-mounted calendar with physical depth — paper stack layers, page-flip transitions, cells that lift on hover with shadow.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/three-dwall-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/three-dwall-calendar.tsx",
      },
    ],
  },
  {
    name: "calendar-planner",
    type: "registry:ui",
    title: "Calendar Planner",
    description:
      "Vertical day stream — past fades, today glows, events live inline. Select a day, type, press Enter.",
    dependencies: ["motion"],
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
      "Dual-month range picker — click start, hover to preview, click end. Continuous band with smart rounding.",
    dependencies: ["motion"],
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
      "Inline date picker — click to expand, spring-animated calendar grid, today shortcut, click-outside dismiss.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/chrono-select.tsx",
        type: "registry:ui",
        target: "components/ruixen/chrono-select.tsx",
      },
    ],
  },
  {
    name: "calendar-lume",
    type: "registry:ui",
    title: "Calendar Lume",
    description:
      "A depth-zoom calendar — drill from years to months to days with scale-based transitions and staggered grids.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/calendar-lume.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-lume.tsx",
      },
    ],
  },
  {
    name: "calendar-scheduler",
    type: "registry:ui",
    title: "Calendar Scheduler",
    description:
      "Week-strip scheduler — horizontal day ribbon, vertical time ruler, one-tap booking with spring physics.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/calendar-scheduler.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-scheduler.tsx",
      },
    ],
  },
  {
    name: "notification-inbox-popover",
    type: "registry:ui",
    title: "Notification Inbox Popover",
    description:
      "Wave-hover inbox with cosine proximity effect, mark all read, and glass morphism.",
    dependencies: ["motion"],
    registryDependencies: [],
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
      "Inline payment form — four zones separated by hairlines. Auto-format, auto-advance, brand detection.",
    files: [
      {
        path: "registry/ruixenui/credit-card-dialog.tsx",
        type: "registry:ui",
        target: "components/ruixen/credit-card-dialog.tsx",
      },
    ],
  },
  {
    name: "verification-input",
    type: "registry:ui",
    title: "Verification Input",
    description:
      "iOS 26 liquid-glass verification code input — dual-theme cells with spring-animated digit entry and haptic sound.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/verification-input.tsx",
        type: "registry:ui",
        target: "components/ruixen/verification-input.tsx",
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
    name: "neon-circle-grid",
    type: "registry:ui",
    title: "Neon Circle Grid",
    description:
      "A decorative SVG background of neon donut-ring circles with directional fade and colour blending.",
    files: [
      {
        path: "registry/ruixenui/neon-circle-grid.tsx",
        type: "registry:ui",
        target: "components/ruixen/neon-circle-grid.tsx",
      },
    ],
  },
  {
    name: "add-to-cart-button",
    type: "registry:ui",
    title: "Add To Cart Button",
    description:
      "A morphing add-to-cart button with spring physics, slot-machine quantity flip, and live price updates.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/add-to-cart-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/add-to-cart-button.tsx",
      },
    ],
  },
  {
    name: "floating-toolbar",
    type: "registry:ui",
    title: "Floating Toolbar",
    description:
      "A floating toolbar with animated tab switching, cursor glow, and morphing search input.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/floating-toolbar.tsx",
        type: "registry:ui",
        target: "components/ruixen/floating-toolbar.tsx",
      },
    ],
  },
  {
    name: "fine-tune-slider",
    type: "registry:ui",
    title: "Fine Tune Slider",
    description:
      "A slider with pull-away precision mode — drag normally, pull away from the track to fine-tune values.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/fine-tune-slider.tsx",
        type: "registry:ui",
        target: "components/ruixen/fine-tune-slider.tsx",
      },
    ],
  },
  {
    name: "scroll-ruler",
    type: "registry:ui",
    title: "Scroll Ruler",
    description:
      "A ruler-style input for fractional values — scroll or drag to scrub, spring-animated snapping, gradient-masked edges.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/scroll-ruler.tsx",
        type: "registry:ui",
        target: "components/ruixen/scroll-ruler.tsx",
      },
    ],
  },
  {
    name: "drum-picker",
    type: "registry:ui",
    title: "Drum Picker",
    description:
      "A 3D cylindrical drum picker — vertical drag or scroll to cycle, perspective-projected curvature, proximity-scaled brightness, spring snap.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/drum-picker.tsx",
        type: "registry:ui",
        target: "components/ruixen/drum-picker.tsx",
      },
    ],
  },
  {
    name: "scrub-datetime",
    type: "registry:ui",
    title: "Scrub Datetime",
    description:
      "An inline date-time picker where the text IS the interface — drag any segment horizontally to scrub, scroll to increment, click AM/PM to toggle.",
    files: [
      {
        path: "registry/ruixenui/scrub-datetime.tsx",
        type: "registry:ui",
        target: "components/ruixen/scrub-datetime.tsx",
      },
    ],
  },
  {
    name: "range-calendar",
    type: "registry:ui",
    title: "Range Calendar",
    description:
      "A compact calendar grid for date range selection — continuous capsule highlight, hover preview, spring-animated month transitions, today dot.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/range-calendar.tsx",
        type: "registry:ui",
        target: "components/ruixen/range-calendar.tsx",
      },
    ],
  },
  {
    name: "calendar-wave",
    type: "registry:ui",
    title: "Calendar Wave",
    description:
      "A calendar where days rise toward your cursor like water — cosine wave ripple, spring physics, shadow depth.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/calendar-wave.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-wave.tsx",
      },
    ],
  },
  {
    name: "calendar-crest",
    type: "registry:ui",
    title: "Calendar Crest",
    description:
      "Dual-month range picker with physical depth — selected band rises off the surface, endpoints crest highest, proportional shadows.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/calendar-crest.tsx",
        type: "registry:ui",
        target: "components/ruixen/calendar-crest.tsx",
      },
    ],
  },
  {
    name: "share-button",
    type: "registry:ui",
    title: "Share Button",
    description:
      "A morphing share button with four-phase choreography, staggered cascade transitions, and cursor glow.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/share-button.tsx",
        type: "registry:ui",
        target: "components/ruixen/share-button.tsx",
      },
    ],
  },
  {
    name: "rising-glow",
    type: "registry:ui",
    title: "Rising Glow",
    description:
      "Text wrapper with animated rising particles and soft glow effect.",
    dependencies: [],
    files: [
      {
        path: "registry/ruixenui/rising-glow.tsx",
        type: "registry:ui",
        target: "components/ruixen/rising-glow.tsx",
      },
    ],
  },
  {
    name: "add-task-sheet",
    type: "registry:ui",
    title: "Add Task Sheet",
    description:
      "Quick-add task dialog — title input, priority pills, Enter to submit. Three zones, two hairlines.",
    dependencies: ["motion"],
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
    name: "structured-hero-section",
    type: "registry:ui",
    title: "Structured Hero Section",
    description:
      "A clean hero section with announcement pill, overlapping showcase cards, trusted-by logo strip, and dual CTAs.",
    files: [
      {
        path: "registry/ruixenui/structured-hero-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/structured-hero-section.tsx",
      },
    ],
  },
  {
    name: "tabbed-hero-section",
    type: "registry:ui",
    title: "Tabbed Hero Section",
    description:
      "A SaaS hero section with left-aligned headline, tabbed navigation, app screenshot showcase, and trusted-by logo strip.",
    files: [
      {
        path: "registry/ruixenui/tabbed-hero-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/tabbed-hero-section.tsx",
      },
    ],
  },
  {
    name: "split-hero-section",
    type: "registry:ui",
    title: "Split Hero Section",
    description:
      "A split-layout hero section with left-aligned headline, key metrics, app screenshot showcase, and trusted-by logo strip.",
    files: [
      {
        path: "registry/ruixenui/split-hero-section.tsx",
        type: "registry:ui",
        target: "components/ruixen/split-hero-section.tsx",
      },
    ],
  },
  {
    name: "hero-title-animation",
    type: "registry:ui",
    title: "Hero Title Animation",
    description:
      "An animated hero title with phased brand reveal, staggered word blur-in, and highlight box sweep effect.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/hero-title-animation.tsx",
        type: "registry:ui",
        target: "components/ruixen/hero-title-animation.tsx",
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
    name: "glass-ai-card",
    type: "registry:ui",
    title: "Glass AI Card",
    description:
      "iOS 26 liquid-glass content card with animated skeleton lines and hue-rotating gradient AI action button.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/glass-ai-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/glass-ai-card.tsx",
      },
    ],
  },
  {
    name: "glass-shipment-flow",
    type: "registry:ui",
    title: "Glass Shipment Flow",
    description:
      "iOS 26 liquid-glass shipment flow diagram with animated travelling-light SVG paths connecting stacked order cards.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/glass-shipment-flow.tsx",
        type: "registry:ui",
        target: "components/ruixen/glass-shipment-flow.tsx",
      },
    ],
  },
  {
    name: "phone-mockup-card",
    type: "registry:ui",
    title: "Phone Mockup Card",
    description:
      "A minimal phone frame card with pixel-perfect status bar, dynamic island, and typography metrics display.",
    dependencies: ["motion", "react-icons"],
    files: [
      {
        path: "registry/ruixenui/phone-mockup-card.tsx",
        type: "registry:ui",
        target: "components/ruixen/phone-mockup-card.tsx",
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
    name: "button-copy",
    type: "registry:ui",
    title: "Button Copy",
    description:
      "iOS 26 liquid-glass copy pill with AnimatePresence icon crossfade.",
    dependencies: ["motion"],
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
      "iOS 26 liquid-glass pill with spring chevron and staggered glass dropdown.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/button-dropdown.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-dropdown.tsx",
      },
    ],
  },
  {
    name: "button-split",
    type: "registry:ui",
    title: "Button Split",
    description:
      "iOS 26 liquid-glass two-zone pill with primary action and dropdown options.",
    dependencies: ["motion"],
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
      "iOS 26 liquid-glass pill with floating spring-animated notification badge.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/button-badge.tsx",
        type: "registry:ui",
        target: "components/ruixen/button-badge.tsx",
      },
    ],
  },
  {
    name: "checkbox-simple",
    type: "registry:ui",
    title: "Checkbox Simple",
    description:
      "A simple checkbox component with label and optional description.",
    dependencies: ["motion"],
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
    dependencies: ["motion"],
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
    dependencies: ["motion"],
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
    dependencies: ["motion"],
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
    dependencies: ["motion"],
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
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/checkbox-group.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-group.tsx",
      },
    ],
  },
  {
    name: "checkbox-tree",
    type: "registry:ui",
    title: "Checkbox Tree",
    description:
      "A hierarchical tree checkbox for nested selections with expand/collapse.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/ruixenui/checkbox-tree.tsx",
        type: "registry:ui",
        target: "components/ruixen/checkbox-tree.tsx",
      },
    ],
  },
  {
    name: "comment-thread",
    type: "registry:ui",
    title: "Comment Thread",
    description:
      "Threaded comment component with nested replies, colored avatars, and collapsible reply chains.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "registry/ruixenui/comment-thread.tsx",
        type: "registry:ui",
        target: "components/ruixen/comment-thread.tsx",
      },
    ],
  },
];
