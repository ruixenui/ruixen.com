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
    viewAllUrl: "/docs/components/ai-chat-input",
    components: [
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
    viewAllUrl: "/docs/components/card-stack",
    components: [
      {
        id: "card-stack",
        title: "Card Stack",
        summary:
          "Interactive 3D card stack carousel with fan-out animation and drag gestures",
        url: "/docs/components/card-stack",
        image_dark: "/preview_images/cards/card-stack-dark.png",
        image_light: "/preview_images/cards/card-stack-light.png",
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
        id: "glass-image-editor",
        title: "Glass Image Editor",
        summary:
          "iOS 26 liquid-glass image editor with upload, zoom, rotate, and multi-image support",
        url: "/docs/components/glass-image-editor",
        image_dark: "/preview_images/image-tools/glass-image-editor-dark.png",
        image_light: "/preview_images/image-tools/glass-image-editor-light.png",
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
