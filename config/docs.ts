import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components/social-card",
    },
    {
      title: "Templates",
      href: "https://ruixen.com",
      event: "header_cta_clicked",
      label: "",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            {
              title: "Next.js",
              href: `/docs/installation/next`,
              items: [],
            },
            {
              title: "Vite",
              href: `/docs/installation/vite`,
              items: [],
            },
            {
              title: "Remix",
              href: `/docs/installation/remix`,
              items: [],
            },
            {
              title: "Astro",
              href: `/docs/installation/astro`,
              items: [],
            },
            {
              title: "Laravel",
              href: `/docs/installation/laravel`,
              items: [],
            },
            {
              title: "Gatsby",
              href: `/docs/installation/gatsby`,
              items: [],
            },
            {
              title: "Manual",
              href: `/docs/installation/manual`,
              items: [],
            },
          ],
        },
        // {
        //   title: "Tailwind v4",
        //   href: "/docs/tailwind-v4",
        //   items: [],
        //   label: "",
        // },
        // {
        //   title: "MCP",
        //   href: "/docs/mcp",
        //   items: [],
        //   label: "",
        // },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          title: "Portfolio",
          href: `/docs/templates/portfolio`,
          items: [],
          label: "",
          event: "template_portfolio_clicked",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Cards",
          items: [
            {
              title: "Social Card",
              href: `/docs/components/social-card`,
              items: [],
              label: "",
            },
            {
              title: "Portfolio Card",
              href: `/docs/components/portfolio-card`,
              items: [],
              label: "",
            },
            {
              title: "Team Project Card",
              href: `/docs/components/team-project-card`,
              items: [],
              label: "",
            },
            {
              title: "Collab Chat Card",
              href: `/docs/components/collab-chat-card`,
              items: [],
              label: "",
            },
            {
              title: "Goal Tracker Card",
              href: `/docs/components/goal-tracker-card`,
              items: [],
              label: "",
            },
            {
              title: "Environment Card",
              href: `/docs/components/environment-card`,
              items: [],
              label: "",
            },
            {
              title: "Schedule Card",
              href: `/docs/components/schedule-card`,
              items: [],
              label: "",
            },
            {
              title: "Showcase Card",
              href: `/docs/components/showcase-card`,
              items: [],
              label: "",
            },
            {
              title: "Order Summary Card",
              href: `/docs/components/order-summary-card`,
              items: [],
              label: "",
            },
            {
              title: "Doctor Profile Card",
              href: `/docs/components/doctor-profile-card`,
              items: [],
              label: "",
            },
            {
              title: "Gradient Blob Card",
              href: `/docs/components/gradient-blob-card`,
              items: [],
              label: "",
            },
            {
              title: "Idea Generator Card",
              href: `/docs/components/idea-generator-card`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Buttons",
          items: [
            {
              title: "Slide To Delete Button",
              href: `/docs/components/slide-to-delete-button`,
              items: [],
              label: "",
            },
            {
              title: "Glow Link Button",
              href: `/docs/components/glow-link-button`,
              items: [],
              label: "",
            },
            {
              title: "Theme Cycle Button",
              href: `/docs/components/theme-cycle-button`,
              items: [],
              label: "",
            },
            {
              title: "Morphing Github Button",
              href: `/docs/components/morphing-github-button`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Inputs",
          items: [
            {
              title: "Circular Stepper Input",
              href: `/docs/components/circular-stepper-input`,
              items: [],
              label: "",
            },
            {
              title: "Password Strength Input",
              href: `/docs/components/password-strength-input`,
              items: [],
              label: "",
            },
            {
              title: "OTP Input",
              href: `/docs/components/otp-input`,
              items: [],
              label: "",
            },
            {
              title: "Color Picker Input",
              href: `/docs/components/color-picker-input`,
              items: [],
              label: "",
            },
            {
              title: "Gravatar Email Input",
              href: `/docs/components/gravatar-email-input`,
              items: [],
              label: "",
            },
            {
              title: "Correct Number Input",
              href: `/docs/components/correct-number-input`,
              items: [],
              label: "",
            },
            {
              title: "Better Time Picker",
              href: `/docs/components/better-time-picker`,
              items: [],
              label: "",
            },
            {
              title: "Inline Copy Input",
              href: `/docs/components/inline-copy-input`,
              items: [],
              label: "",
            },
            {
              title: "Clean Tag Input",
              href: `/docs/components/clean-tag-input`,
              items: [],
              label: "",
            },
            {
              title: "Search With Category",
              href: `/docs/components/search-with-category`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Menu",
          items: [
            {
              title: "Nested Dashboard Menu",
              href: `/docs/components/nested-dashboard-menu`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Context Menu",
          items: [
            {
              title: "Advanced Context Menu",
              href: `/docs/components/advanced-context-menu`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Drawer",
          items: [
            {
              title: "Drawer Inner Content",
              href: `/docs/components/drawer-inner-content`,
              items: [],
              label: "",
            },
            {
              title: "Centered Feedback Drawer",
              href: `/docs/components/centered-feedback-drawer`,
              items: [],
              label: "",
            },
            {
              title: "Bottom Drawers",
              href: `/docs/components/bottom-drawers`,
              items: [],
              label: "",
            },
          ],
        },
      ],
    },
    {
      title: "Section",
      items: [
        {
          title: "FAQs",
          items: [
            {
              title: "StaggeredFAQSection",
              href: `/docs/sections/staggered-faq-section`,
              items: [],
              label: "",
            },
            {
              title: "FeatureHighlights",
              href: `/docs/sections/feature-highlights`,
              items: [],
              label: "",
            },
            {
              title: "FAQ Scroll Accordion",
              href: `/docs/sections/faq-scroll-accordion`,
              items: [],
              label: "",
            },
            {
              title: "FAQ Auto Accordion",
              href: `/docs/sections/faq-auto-accordion`,
              items: [],
              label: "",
            },
            {
              title: "Compact Accordion",
              href: `/docs/sections/compact-accordion`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Hero Sections",
          items: [
            {
              title: "Aurora Hero Section",
              href: `/docs/components/aurora-hero-section`,
              items: [],
              label: "",
            },
            {
              title: "Card Carousel Hero",
              href: `/docs/components/card-carousel-hero`,
              items: [],
              label: "",
            },
            {
              title: "Gradient Hero Showcase",
              href: `/docs/components/gradient-hero-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Spectrum Hero Section",
              href: `/docs/components/spectrum-hero-section`,
              items: [],
              label: "",
            },
            {
              title: "Video Hero Showcase",
              href: `/docs/components/video-hero-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Visionary Hero Section",
              href: `/docs/components/visionary-hero-section`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Featured Section",
          items: [
            {
              title: "Featured Highlights",
              href: `/docs/components/featured-highlights`,
              items: [],
              label: "",
            },
            {
              title: "Feature Grid Section",
              href: `/docs/components/feature-grid-section`,
              items: [],
              label: "",
            },
            {
              title: "Feature Tabs Showcase",
              href: `/docs/components/feature-tabs-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Composite Feature Showcase",
              href: `/docs/components/composite-feature-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Integration And Stats Section",
              href: `/docs/components/integration-and-stats-section`,
              items: [],
              label: "",
            },
            {
              title: "Tech Orbit Showcase",
              href: `/docs/components/tech-orbit-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Partner Integrations Grid",
              href: `/docs/components/partner-integrations-grid`,
              items: [],
              label: "",
            },
            {
              title: "Analytics Dashboard Stats",
              href: `/docs/components/analytics-dashboard-stats`,
              items: [],
              label: "",
            },
            {
              title: "Ruixen Dashboard Stats",
              href: `/docs/components/ruixen-dashboard-stats`,
              items: [],
              label: "",
            },
            {
              title: "Feature Carousel",
              href: `/docs/components/feature-carousel`,
              items: [],
              label: "",
            },
            {
              title: "CRM Insights Panel",
              href: `/docs/components/crm-insights-panel`,
              items: [],
              label: "",
            },
            {
              title: "Multi Orbit Semi Circle",
              href: `/docs/components/multi-orbit-semi-circle`,
              items: [],
              label: "",
            },
            {
              title: "Rotating Gradient Right",
              href: `/docs/components/rotating-gradient-right`,
              items: [],
              label: "",
            },
            {
              title: "Automated Tasks Panel",
              href: `/docs/components/automated-tasks-panel`,
              items: [],
              label: "",
            },
            {
              title: "Case Studies",
              href: `/docs/components/case-studies`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Client Section",
          items: [
            {
              title: "Trusted Clients Showcase",
              href: `/docs/components/trusted-clients-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Client Carousel Showcase",
              href: `/docs/components/client-carousel-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Auto Scrolling Client Carousel",
              href: `/docs/components/auto-scrolling-client-carousel`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Footer Section",
          items: [
            {
              title: "Footer Pro",
              href: `/docs/components/footer-pro`,
              items: [],
              label: "",
            },
            {
              title: "Corporate Footer",
              href: `/docs/components/corporate-footer`,
              items: [],
              label: "",
            },
            {
              title: "Footer Extended",
              href: `/docs/components/footer-extended`,
              items: [],
              label: "",
            },
            {
              title: "Footer Enterprise",
              href: `/docs/components/footer-enterprise`,
              items: [],
              label: "",
            },
            {
              title: "Footer Mega",
              href: `/docs/components/footer-mega`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Navigation Section",
          items: [
            {
              title: "Hover Gradient Navbar",
              href: `/docs/components/hover-gradient-navbar`,
              items: [],
              label: "",
            },
            {
              title: "Floating Navbar",
              href: `/docs/components/floating-navbar`,
              items: [],
              label: "",
            },
            {
              title: "Luma Bar",
              href: `/docs/components/luma-bar`,
              items: [],
              label: "",
            },
            {
              title: "Promote Header",
              href: `/docs/components/promote-header`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Pricing Section",
          items: [
            {
              title: "Pricing Plans",
              href: `/docs/components/pricing-plans`,
              items: [],
              label: "",
            },
            {
              title: "Pricing Comparison",
              href: `/docs/components/pricing-comparison`,
              items: [],
              label: "",
            },
            {
              title: "Subscription Plans",
              href: `/docs/components/subscription-plans`,
              items: [],
              label: "",
            },
            {
              title: "Pricing Flow",
              href: `/docs/components/pricing-flow`,
              items: [],
              label: "",
            },
            {
              title: "Pricing with User Scaling",
              href: `/docs/components/pricing-with-user-scaling`,
              items: [],
              label: "",
            },
          ],
        },
      ],
    },
  ],
};
