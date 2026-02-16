import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/docs/components",
    },
    {
      title: "Templates",
      href: "/templates",
      event: "header_cta_clicked",
      label: "",
    },
    {
      title: "Gradients",
      href: "/gradients",
      event: "gradients_clicked",
      label: "",
    },
    {
      title: "Generator",
      href: "/generator",
      event: "header_cta_clicked",
      label: "",
      items: [
        {
          title: "Glass Morphism",
          href: "/generator/glass-morphism",
        },
        {
          title: "Shadow Generator",
          href: "/generator/shadow-generator",
          label: "",
        },
        {
          title: "CSS Gradient Generator",
          href: "/generator/css-generator",
          label: "",
        },
      ],
    },
    {
      title: "Blog",
      href: "/blog",
      event: "header_cta_clicked",
      label: "",
    },
    {
      title: "Pro",
      href: "https://pro.ruixen.com",
      external: true,
      event: "pro_nav_clicked",
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
        {
          title: "Dual Tailwind",
          href: "/docs/tailwind-v4",
          items: [],
          label: "v3 + v4",
        },
        {
          title: "Swap Primitives",
          href: "/docs/ui-library",
          items: [],
          label: "Radix & Base",
        },
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
          title: "Accordions",
          items: [
            {
              title: "Editorial Accordion",
              href: `/docs/components/accordion-editorial`,
              items: [],
              label: "",
            },
            {
              title: "Indexed Accordion",
              href: `/docs/components/accordion-indexed`,
              items: [],
              label: "",
            },
            {
              title: "Comments",
              items: [
                {
                  title: "Comment Thread",
                  href: `/docs/components/comment-thread`,
                  items: [],
                  label: "",
                },
              ],
            },
          ],
        },
        {
          title: "AI Chat Inputs",
          items: [
            {
              title: "AI Chat Input",
              href: `/docs/components/ai-chat-input`,
              items: [],
              label: "",
            },
            {
              title: "Claude Chat Input",
              href: `/docs/components/claude-chat-input`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Audio & Media",
          items: [
            {
              title: "Music Player Card",
              href: `/docs/components/music-player-card`,
              items: [],
              label: "",
            },
            {
              title: "Live Waveform",
              href: `/docs/components/live-waveform`,
              items: [],
              label: "",
            },
            {
              title: "Visualizer Button",
              href: `/docs/components/visualizer-button`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Avatars",
          items: [
            {
              title: "Avatar Spring Stack",
              href: `/docs/components/avatar-spring-stack`,
              items: [],
              label: "",
            },
            {
              title: "Avatar Hover Card",
              href: `/docs/components/avatar-hover-card`,
              items: [],
              label: "",
            },
            {
              title: "Avatar Quick Actions",
              href: `/docs/components/avatar-quick-actions`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Backgrounds",
          items: [
            {
              title: "Cloud Background",
              href: `/docs/components/cloud-background`,
              items: [],
              label: "",
            },
            {
              title: "Ripple Distortion",
              href: `/docs/components/ripple-distortion`,
              items: [],
              label: "",
            },
            {
              title: "Dual Tone Rain Background",
              href: `/docs/components/dual-tone-rain-background`,
              items: [],
              label: "",
            },
            {
              title: "Mouse Spark",
              href: `/docs/components/mouse-spark`,
              items: [],
              label: "",
            },
            {
              title: "Neon Circle Grid",
              href: `/docs/components/neon-circle-grid`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Text",
          items: [
            {
              title: "Rising Glow",
              href: `/docs/components/rising-glow`,
              items: [],
              label: "Updated",
            },
            {
              title: "Particle Text Dots",
              href: `/docs/components/particle-text-dots`,
              items: [],
              label: "",
            },
            {
              title: "Container Text Scroll",
              href: `/docs/components/container-text-scroll`,
              items: [],
              label: "",
            },
            {
              title: "Variable Text",
              href: `/docs/components/variable-text`,
              items: [],
              label: "New",
            },
            {
              title: "Scramble Text",
              href: `/docs/components/scramble-text`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Badges",
          items: [
            {
              title: "Badge Morph",
              href: `/docs/components/badge-morph`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Banners",
          items: [
            {
              title: "Banner Announcement",
              href: `/docs/components/banner-announcement`,
              items: [],
              label: "",
            },
            {
              title: "Banner Cookie",
              href: `/docs/components/banner-cookie`,
              items: [],
              label: "",
            },
            {
              title: "Banner Newsletter",
              href: `/docs/components/banner-newsletter`,
              items: [],
              label: "",
            },
            {
              title: "Banner Countdown",
              href: `/docs/components/banner-countdown`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Breadcrumbs",
          items: [
            {
              title: "Breadcrumb Separator",
              href: `/docs/components/breadcrumb-separator`,
              items: [],
              label: "",
            },
            {
              title: "Breadcrumb Icon",
              href: `/docs/components/breadcrumb-icon`,
              items: [],
              label: "",
            },
            {
              title: "Breadcrumb Dropdown",
              href: `/docs/components/breadcrumb-dropdown`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Buttons",
          items: [
            {
              title: "Button Copy",
              href: `/docs/components/button-copy`,
              items: [],
              label: "",
            },
            {
              title: "Button Dropdown",
              href: `/docs/components/button-dropdown`,
              items: [],
              label: "",
            },
            {
              title: "Button Split",
              href: `/docs/components/button-split`,
              items: [],
              label: "",
            },
            {
              title: "Button Badge",
              href: `/docs/components/button-badge`,
              items: [],
              label: "",
            },
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
              title: "Hover Preview Button",
              href: `/docs/components/hover-preview-button`,
              items: [],
              label: "",
            },
            {
              title: "Confetti Button",
              href: `/docs/components/confetti-button`,
              items: [],
              label: "",
            },
            {
              title: "Badge Button Combo",
              href: `/docs/components/badge-button-combo`,
              items: [],
              label: "",
            },
            {
              title: "Progress Button",
              href: `/docs/components/progress-button`,
              items: [],
              label: "",
            },
            {
              title: "Icon Label Subtext Button",
              href: `/docs/components/icon-label-subtext-button`,
              items: [],
              label: "",
            },
            {
              title: "Add To Cart Button",
              href: `/docs/components/add-to-cart-button`,
              items: [],
              label: "New",
            },
            {
              title: "Share Button",
              href: `/docs/components/share-button`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Calendars",
          items: [
            {
              title: "Range Calendar",
              href: `/docs/components/range-calendar`,
              items: [],
              label: "",
            },
            {
              title: "Calendar Wave",
              href: `/docs/components/calendar-wave`,
              items: [],
              label: "New",
            },
            {
              title: "Calendar Crest",
              href: `/docs/components/calendar-crest`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Charts",
          label: "",
          items: [
            {
              title: "Spark Chart",
              href: `/docs/components/spark-chart`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Cards",
          items: [
            {
              title: "Glass AI Card",
              href: `/docs/components/glass-ai-card`,
              items: [],
              label: "New",
            },
            {
              title: "Glass Shipment Flow",
              href: `/docs/components/glass-shipment-flow`,
              items: [],
              label: "New",
            },
            {
              title: "Phone Mockup Card",
              href: `/docs/components/phone-mockup-card`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Carousels",
          items: [
            {
              title: "Card Stack",
              href: `/docs/components/card-stack`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Checkboxes",
          items: [
            {
              title: "Checkbox Simple",
              href: `/docs/components/checkbox-simple`,
              items: [],
              label: "",
            },
            {
              title: "Checkbox Indeterminate",
              href: `/docs/components/checkbox-indeterminate`,
              items: [],
              label: "",
            },
            {
              title: "Checkbox Colored",
              href: `/docs/components/checkbox-colored`,
              items: [],
              label: "",
            },
            {
              title: "Checkbox Todo",
              href: `/docs/components/checkbox-todo`,
              items: [],
              label: "",
            },
            {
              title: "Checkbox Terms",
              href: `/docs/components/checkbox-terms`,
              items: [],
              label: "",
            },
            {
              title: "Checkbox Group",
              href: `/docs/components/checkbox-group`,
              items: [],
              label: "",
            },
            {
              title: "Checkbox Tree",
              href: `/docs/components/checkbox-tree`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Date Pickers",
          items: [
            {
              title: "Drum Picker",
              href: `/docs/components/drum-picker`,
              items: [],
              label: "New",
            },
            {
              title: "Scrub Datetime",
              href: `/docs/components/scrub-datetime`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Dialogs",
          items: [
            {
              title: "Credit Card Dialog",
              href: `/docs/components/credit-card-dialog`,
              items: [],
              label: "New",
            },
            {
              title: "Add Task Sheet",
              href: `/docs/components/add-task-sheet`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Docks",
          items: [
            {
              title: "Gooey Dock",
              href: `/docs/components/gooey-dock`,
              items: [],
              label: "",
            },
            {
              title: "Morphing Expandable Menu",
              href: `/docs/components/morphing-expandable-menu`,
              items: [],
              label: "New",
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
        {
          title: "Event Calendars",
          items: [
            {
              title: "Event Scheduler",
              href: `/docs/components/event-scheduler`,
              items: [],
              label: "",
            },
            {
              title: "Three D Wall Calendar",
              href: `/docs/components/three-dwall-calendar`,
              items: [],
              label: "",
            },
            {
              title: "Calendar Planner",
              href: `/docs/components/calendar-planner`,
              items: [],
              label: "",
            },
            {
              title: "Calendar Twin",
              href: `/docs/components/calendar-twin`,
              items: [],
              label: "",
            },
            {
              title: "Chrono Select",
              href: `/docs/components/chrono-select`,
              items: [],
              label: "",
            },
            {
              title: "Calendar Scheduler",
              href: `/docs/components/calendar-scheduler`,
              items: [],
              label: "",
            },
            {
              title: "Calendar Lume",
              href: `/docs/components/calendar-lume`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "File Management",
          items: [
            {
              title: "Motion File Tree",
              href: `/docs/components/motion-file-tree`,
              items: [],
              label: "",
            },
            {
              title: "Magic Tree",
              href: `/docs/components/magic-tree`,
              items: [],
              label: "",
            },
            {
              title: "Tree Node Tooltip",
              href: `/docs/components/tree-node-tooltip`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Forms",
          items: [
            {
              title: "Glass Form",
              href: `/docs/components/glass-form`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Image Tools",
          items: [
            {
              title: "Glass Image Editor",
              href: `/docs/components/glass-image-editor`,
              items: [],
              label: "",
            },
            {
              title: "Glass Image Compare",
              href: `/docs/components/glass-image-compare`,
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
              title: "Verification Input",
              href: `/docs/components/verification-input`,
              items: [],
              label: "New",
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
              title: "Input With Select",
              href: `/docs/components/input-with-select`,
              items: [],
              label: "",
            },
            {
              title: "URL Input",
              href: `/docs/components/url-input`,
              items: [],
              label: "",
            },
            {
              title: "Password Field",
              href: `/docs/components/password-field`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Loaders",
          items: [
            {
              title: "Loading Circle",
              href: `/docs/components/loading-circle`,
              items: [],
              label: "",
            },
            {
              title: "Load Ripple",
              href: `/docs/components/load-ripple`,
              items: [],
              label: "",
            },
            {
              title: "Ripple Circles",
              href: `/docs/components/ripple-circles`,
              items: [],
              label: "",
            },
            {
              title: "Solar Loader",
              href: `/docs/components/solar-loader`,
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
            {
              title: "App Menu Bar",
              href: `/docs/components/app-menu-bar`,
              items: [],
              label: "",
            },
            {
              title: "Account Menu",
              href: `/docs/components/account-menu`,
              items: [],
              label: "",
            },
            {
              title: "Action Toolbar",
              href: `/docs/components/action-toolbar`,
              items: [],
              label: "",
            },
            {
              title: "Floating Toolbar",
              href: `/docs/components/floating-toolbar`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Notifications",
          items: [
            {
              title: "Notification Inbox Popover",
              href: `/docs/components/notification-inbox-popover`,
              items: [],
              label: "",
            },
            {
              title: "Notification",
              href: `/docs/components/notification`,
              items: [],
              label: "",
            },
            {
              title: "Notifications Carousel",
              href: `/docs/components/notifications-carousel`,
              items: [],
              label: "",
            },
            {
              title: "Notifications Filter",
              href: `/docs/components/notifications-filter`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Pagination",
          items: [
            {
              title: "Wheel Pagination",
              href: `/docs/components/wheel-pagination`,
              items: [],
              label: "",
            },
            {
              title: "Scroll Pagination",
              href: `/docs/components/scroll-pagination`,
              items: [],
              label: "",
            },
            {
              title: "Icon Pagination",
              href: `/docs/components/icon-pagination`,
              items: [],
              label: "",
            },
            {
              title: "Gooey Pagination",
              href: `/docs/components/gooey-pagination`,
              items: [],
              label: "",
            },
            {
              title: "Stack Pagination",
              href: `/docs/components/stack-pagination`,
              items: [],
              label: "",
            },
            {
              title: "Animated Number Flip",
              href: `/docs/components/animated-number-flip`,
              items: [],
              label: "",
            },
            {
              title: "Morphing Page Dots",
              href: `/docs/components/morphing-page-dots`,
              items: [],
              label: "",
            },
            {
              title: "Sliding Pagination",
              href: `/docs/components/sliding-pagination`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Sliders",
          items: [
            {
              title: "Fine Tune Slider",
              href: `/docs/components/fine-tune-slider`,
              items: [],
              label: "New",
            },
            {
              title: "Scroll Ruler",
              href: `/docs/components/scroll-ruler`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Stepper",
          label: "",
          items: [
            {
              title: "Step Indicator",
              href: `/docs/components/step-indicator`,
              items: [],
              label: "",
            },
            {
              title: "Wizard Stepper",
              href: `/docs/components/wizard-stepper`,
              items: [],
              label: "",
            },
            {
              title: "Progress Tracker",
              href: `/docs/components/progress-tracker`,
              items: [],
              label: "",
            },
            {
              title: "Milestone Stepper",
              href: `/docs/components/milestone-stepper`,
              items: [],
              label: "",
            },
            {
              title: "Nav Stepper",
              href: `/docs/components/nav-stepper`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Select Components",
          items: [
            {
              title: "Color Emotion Select",
              href: `/docs/components/color-emotion-select`,
              items: [],
              label: "",
            },
            {
              title: "Tag Cloud Select",
              href: `/docs/components/tag-cloud-select`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Tables",
          items: [
            {
              title: "Fixed Header Footer Table",
              href: `/docs/components/fixed-header-footer-table`,
              items: [],
              label: "",
            },
            {
              title: "Reorderable Table",
              href: `/docs/components/reorderable-table`,
              items: [],
              label: "",
            },
            {
              title: "Comparison Table",
              href: `/docs/components/comparison-table`,
              items: [],
              label: "",
            },
            {
              title: "Flexi Filter Table",
              href: `/docs/components/flexi-filter-table`,
              items: [],
              label: "",
            },
            {
              title: "Table Dialog",
              href: `/docs/components/table-dialog`,
              items: [],
              label: "",
            },
            {
              title: "Minimisable Table",
              href: `/docs/components/minimisable-table`,
              items: [],
              label: "",
            },
            {
              title: "Inline Analytics Table",
              href: `/docs/components/inline-analytics-table`,
              items: [],
              label: "",
            },
            {
              title: "Column Collaboration Table",
              href: `/docs/components/column-collaboration-table`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Tabs",
          items: [
            {
              title: "Nested Tabs",
              href: `/docs/components/nested-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Zoom Depth Tabs",
              href: `/docs/components/zoom-depth-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Capsule Tabs",
              href: `/docs/components/capsule-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Magnetic Tabs",
              href: `/docs/components/magnetic-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Fade Slide Tabs",
              href: `/docs/components/fade-slide-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Hybrid Tabs",
              href: `/docs/components/hybrid-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Pill Morph Tabs",
              href: `/docs/components/pill-morph-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Sliding Tabs",
              href: `/docs/components/sliding-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Drag And Drop Tabs",
              href: `/docs/components/drag-and-drop-tabs`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Video Players",
          items: [
            {
              title: "Video Player Pro",
              href: `/docs/components/video-player-pro`,
              items: [],
              label: "",
            },
            {
              title: "Hover Play Card",
              href: `/docs/components/hover-play-card`,
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
              title: "FAQ Chat Accordion",
              href: `/docs/sections/faq-chat-accordion`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Featured Section",
          items: [
            {
              title: "Product Feature Hero",
              href: `/docs/sections/product-feature-hero`,
              items: [],
              label: "",
            },
            {
              title: "Product Card Hero",
              href: `/docs/sections/product-card-hero`,
              items: [],
              label: "",
            },
            {
              title: "Split Feature Showcase",
              href: `/docs/components/split-feature-showcase`,
              items: [],
              label: "New",
            },
            {
              title: "Integration And Stats Section",
              href: `/docs/components/integration-and-stats-section`,
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
              title: "Footer Enterprise",
              href: `/docs/components/footer-enterprise`,
              items: [],
              label: "",
            },
          ],
        },
        {
          title: "Hero Sections",
          items: [
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
              title: "Video Hero Showcase",
              href: `/docs/components/video-hero-showcase`,
              items: [],
              label: "",
            },
            {
              title: "Structured Hero Section",
              href: `/docs/components/structured-hero-section`,
              items: [],
              label: "New",
            },
            {
              title: "Tabbed Hero Section",
              href: `/docs/components/tabbed-hero-section`,
              items: [],
              label: "New",
            },
            {
              title: "Split Hero Section",
              href: `/docs/components/split-hero-section`,
              items: [],
              label: "New",
            },
            {
              title: "Hero Title Animation",
              href: `/docs/components/hero-title-animation`,
              items: [],
              label: "New",
            },
          ],
        },
        {
          title: "Navbars",
          items: [
            {
              title: "Navbar Simple",
              href: `/docs/sections/navbar-simple`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Centered",
              href: `/docs/sections/navbar-centered`,
              items: [],
              label: "",
            },
            {
              title: "Navbar With Search",
              href: `/docs/sections/navbar-with-search`,
              items: [],
              label: "",
            },
            {
              title: "Navbar User Menu",
              href: `/docs/sections/navbar-user-menu`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Status",
              href: `/docs/sections/navbar-status`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Breadcrumb",
              href: `/docs/sections/navbar-breadcrumb`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Floating",
              href: `/docs/sections/navbar-floating`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Tabs",
              href: `/docs/sections/navbar-tabs`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Minimal",
              href: `/docs/sections/navbar-minimal`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Split",
              href: `/docs/sections/navbar-split`,
              items: [],
              label: "",
            },
            {
              title: "Navbar Icon Links",
              href: `/docs/sections/navbar-icon-links`,
              items: [],
              label: "",
            },
            {
              title: "Hover Gradient Navbar",
              href: `/docs/sections/hover-gradient-navbar`,
              items: [],
              label: "",
            },
            {
              title: "Floating Navbar",
              href: `/docs/sections/floating-navbar`,
              items: [],
              label: "",
            },
            {
              title: "Luma Bar",
              href: `/docs/sections/luma-bar`,
              items: [],
              label: "",
            },
            {
              title: "Promote Header",
              href: `/docs/sections/promote-header`,
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
            {
              title: "Pricing Tiers",
              href: `/docs/components/pricing-tiers`,
              items: [],
              label: "",
            },
            {
              title: "Pricing Section Vertical",
              href: `/docs/components/pricing-section-vertical`,
              items: [],
              label: "",
            },
          ],
        },
      ],
    },
  ],
};
