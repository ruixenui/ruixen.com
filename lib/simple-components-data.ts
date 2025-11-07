export interface ComponentItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_dark: string;
  image_light: string;
}

export interface ComponentCategory {
  id: string;
  name: string;
  viewAllUrl: string;
  components: ComponentItem[];
}

export const componentsData: ComponentCategory[] = [
  {
    id: "popular",
    name: "Popular Components",
    viewAllUrl: "/docs/components/ruixen-moon-chat",
    components: [
      {
        id: "ruixen-moon-chat",
        title: "Ruixen Moon Chat",
        summary:
          "Chat interface with moon-inspired design and smooth animations",
        url: "/docs/components/ruixen-moon-chat",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ruixen-moon-chat.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ruixen-moon-chat.jpg",
      },
      {
        id: "globe",
        title: "Globe",
        summary:
          "Button with globe animation for global actions and achievements",
        url: "/docs/components/globe",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/globe-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/globe-light.jpg",
      },
      {
        id: "three-dwall-calendar",
        title: "Three D Wall Calendar",
        summary:
          "Interactive card with smooth 3D flip animation revealing additional content",
        url: "/docs/components/three-dwall-calendar",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/three-dwall-calendar-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/three-dwall-calendar-light.jpg",
      },
      {
        id: "tag-cloud-select",
        title: "Tag Cloud Select",
        summary: "Tag cloud with smooth animations and hover effects",
        url: "/docs/components/tag-cloud-select",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/tag-cloud-select-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/tag-cloud-select-light.jpg",
      },
      {
        id: "ripple-distortion",
        title: "Ripple Distortion",
        summary: "Ripple distortion with smooth animations and hover effects",
        url: "/docs/components/ripple-distortion",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ripple-distortion-dark.png",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/popular/ripple-distortion-light.jpg",
      },
    ],
  },
  {
    id: "new components",
    name: "New Components",
    viewAllUrl: "/docs/components/interactive-image-gallery",
    components: [
      {
        id: "precision-card",
        title: "Precision Card",
        summary: "Precision card with smooth animations and hover effects",
        url: "/docs/components/precision-card",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/precision-card-dark.webp",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/precision-card-light.webp",
      },
      {
        id: "rising-text",
        title: "Lumina Text",
        summary:
          "Modern card with animated gradient blob background for visual appeal",
        url: "/docs/components/rising-glow",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/texts/lumina-dark.png",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/texts/lumina-light.png",
      },
      {
        id: "product-image-card",
        title: "Product Image Card",
        summary:
          "Interactive media card with play button overlay and hover animations",
        url: "/docs/components/product-image-card",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/product-image-card-dark.webp",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/product-image-card-light.webp",
      },
      {
        id: "interactive-image-gallery",
        title: "Interactive Image Gallery",
        summary:
          "Interactive image gallery with smooth animations and hover effects",
        url: "/docs/components/interactive-image-gallery",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/images/interactive-image-gallery-dark.webp",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/images/interactive-image-gallery-light.webp",
      },
    ],
  },
  {
    id: "cards",
    name: "Card Components",
    viewAllUrl: "/docs/components/elite-plan-card",
    components: [
      {
        id: "elite-plan-card",
        title: "Elite Plan Card",
        summary:
          "Modern card with animated gradient blob background for visual appeal",
        url: "/docs/components/elite-plan-card",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/elite-plan-card-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/elite-plan-card-light.jpg",
      },
      {
        id: "shirt-parallax-card",
        title: "Shirt Parallax Card",
        summary:
          "Engaging product card with bounce animation and interactive elements",
        url: "/docs/components/shirt-parallax-card",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/shirt-parallax-card-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/shirt-parallax-card-light.jpg",
      },
      {
        id: "hover-play-card",
        title: "Hover Play Card",
        summary:
          "Interactive media card with play button overlay and hover animations",
        url: "/docs/components/health-stat-card",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/health-stats-card-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/health-stats-card-light.jpg",
      },
      {
        id: "credit-card-hero",
        title: "Credit Card Hero",
        summary: "Credit card hero with smooth animations and hover effects",
        url: "/docs/components/credit-card-hero",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/credit-card-hero-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/cards/credit-card-hero-light.jpg",
      },
    ],
  },
  {
    id: "inputs",
    name: "Input Components",
    viewAllUrl: "/docs/components/input-with-select",
    components: [
      {
        id: "input-with-select",
        title: "Input With Select",
        summary:
          "Intelligent chat input with AI-powered suggestions and auto-completion features",
        url: "/docs/components/input-with-select",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/input-with-select-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/input-with-select-light.jpg",
      },
      {
        id: "url-input",
        title: "URL Input",
        summary:
          "Minimalist tag input component with smooth animations and keyboard shortcuts",
        url: "/docs/components/url-input",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/url-input-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/url-input-light.jpg",
      },
      {
        id: "otp-input",
        title: "OTP Input",
        summary: "OTP input with smooth animations and keyboard shortcuts",
        url: "/docs/components/otp-input",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/otp-input-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/otp-input-light.jpg",
      },
      {
        id: "password-field",
        title: "Password Field",
        summary:
          "Elegant floating label input with smooth animations and validation states",
        url: "/docs/components/password-field",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/password-field-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/password-field-light.jpg",
      },
      {
        id: "modern-card-input",
        title: "Modern Card Input",
        summary:
          "Modern card input with smooth animations and keyboard shortcuts",
        url: "/docs/components/modern-card-input",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/modern-card-input-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/inputs/modern-card-input-light.jpg",
      },
    ],
  },
  {
    id: "buttons",
    name: "Button Components",
    viewAllUrl: "/docs/components/confetti-button",
    components: [
      {
        id: "confetti-button",
        title: "Confetti Button",
        summary:
          "Interactive button with countdown timer for time-sensitive actions",
        url: "/docs/components/confetti-button",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/confetti-button-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/confetti-button-light.jpg",
      },
      {
        id: "countdown-button",
        title: "Countdown Button",
        summary:
          "Button with integrated progress indicator for long-running operations",
        url: "/docs/components/countdown-button",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/countdown-button-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/countdown-button-light.jpg",
      },
      {
        id: "checklist-button",
        title: "Checklist Button",
        summary:
          "Versatile button with primary action and dropdown menu for additional options",
        url: "/docs/components/checklist-button",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/checklist-button-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/checklist-button-light.jpg",
      },
      {
        id: "icon-grid-button",
        title: "Icon Grid Button",
        summary:
          "Icon grid button with smooth animations and keyboard shortcuts",
        url: "/docs/components/icon-grid-button",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/icon-grid-button-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/buttons/icon-grid-button-light.jpg",
      },
    ],
  },
  {
    id: "calendars",
    name: "Calendar Components",
    viewAllUrl: "/docs/components/priority-pyramid-calendar",
    components: [
      {
        id: "priority-pyramid-calendar",
        title: "Priority Pyramid Calendar",
        summary:
          "Visual calendar with priority pyramid display for activity tracking and analytics",
        url: "/docs/components/priority-pyramid-calendar",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/priority-pyramid-calendar-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/priority-pyramid-calendar-light.jpg",
      },
      {
        id: "inbox-calendar",
        title: "Inbox Calendar",
        summary:
          "Advanced calendar component displaying multiple months with navigation",
        url: "/docs/components/inbox-calendar",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/inbox-calendar-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/inbox-calendar-light.jpg",
      },
      {
        id: "event-calendar",
        title: "Event Calendar",
        summary:
          "Feature-rich calendar for managing events, appointments, and scheduling",
        url: "/docs/components/event-calendar",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/event-calendar-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/event-calendar-light.jpg",
      },
      {
        id: "wheel-of-time-calendar",
        title: "Wheel of Time Calendar",
        summary:
          "Intuitive date range selection with calendar popup and preset options",
        url: "/docs/components/wheel-of-time-calendar",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/wheel-of-time-calendar-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/wheel-of-time-calendar-light.jpg",
      },
      {
        id: "event-constellation-calendar",
        title: "Event Constellation Calendar",
        summary:
          "Intuitive date range selection with calendar popup and preset options",
        url: "/docs/components/event-constellation-calendar",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/event-constellation-calendar-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/calendars/event-constellation-calendar-light.jpg",
      },
    ],
  },
  {
    id: "pagination",
    name: "Pagination Components",
    viewAllUrl: "/docs/components/magnetic-tabs",
    components: [
      {
        id: "sliding-pagination",
        title: "Sliding Pagination",
        summary:
          "Interactive tabs with magnetic hover effects and smooth transitions",
        url: "/docs/components/sliding-pagination",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/sliding-pagination-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/sliding-pagination-light.jpg",
      },
      {
        id: "stack-pagination",
        title: "Stack Pagination",
        summary:
          "Modern floating navigation bar with blur effects and responsive design",
        url: "/docs/components/stack-pagination",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/stack-pagination-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/stack-pagination-light.jpg",
      },
      {
        id: "gooey-pagination",
        title: "Gooey Pagination",
        summary:
          "Smooth sliding tab navigation with animated indicators and transitions",
        url: "/docs/components/gooey-pagination",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/gooey-pagination-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/gooey-pagination-light.jpg",
      },
      {
        id: "icon-pagination",
        title: "Icon Pagination",
        summary:
          "Clean breadcrumb navigation with hover effects and responsive design",
        url: "/docs/components/icon-pagination",
        image_dark:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/icon-pagination-dark.jpg",
        image_light:
          "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview/paginations/icon-pagination-light.jpg",
      },
    ],
  },
];
