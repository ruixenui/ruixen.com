/**
 * Centralized component preview data
 * Contains all preview image/video URLs for components and sections
 *
 * To add a new component preview:
 * 1. Add the component slug to the appropriate category object below
 * 2. Provide either image or video URL (at least one required)
 * 3. For images: provide both light and dark variants
 * 4. For videos: provide a single video URL (works for both themes)
 *
 * @see CONTRIBUTING.md for detailed instructions
 */

const BASE_URL =
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/components-preview";

export interface ComponentPreview {
  /** Light theme image URL */
  light?: string;
  /** Dark theme image URL */
  dark?: string;
  /** Video URL (used for both themes) */
  video?: string;
}

export type ComponentPreviewMap = Record<string, ComponentPreview>;

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Accordions - Expandable accordion components
 * Path: /docs/components/[slug]
 */
export const accordionsPreview: ComponentPreviewMap = {
  "accordion-editorial": {
    light: `/preview_images/accordions/accordion-editorial-light.png`,
    dark: `/preview_images/accordions/accordion-editorial-dark.png`,
  },
  "accordion-indexed": {
    light: `/preview_images/accordions/accordion-indexed-light.png`,
    dark: `/preview_images/accordions/accordion-indexed-dark.png`,
  },
};

/**
 * Avatars - Avatar components with various styles and status indicators
 * Path: /docs/components/[slug]
 */
export const avatarsPreview: ComponentPreviewMap = {
  "avatar-hover-card": {
    light: `/preview_images/avatars/avatar-hover-card-light.png`,
    dark: `/preview_images/avatars/avatar-hover-card-dark.png`,
  },
  "avatar-spring-stack": {
    light: `/preview_images/avatars/avatar-spring-stack-light.png`,
    dark: `/preview_images/avatars/avatar-spring-stack-dark.png`,
  },
  "avatar-quick-actions": {
    light: `/preview_images/avatars/avatar-quick-actions-light.png`,
    dark: `/preview_images/avatars/avatar-quick-actions-dark.png`,
  },
  "comment-thread": {
    light: `/preview_images/accordions/comment-thread-light.png`,
    dark: `/preview_images/accordions/comment-thread-dark.png`,
  },
};

/**
 * Badges - Badge components with icons, counters, and status indicators
 * Path: /docs/components/[slug]
 */
export const badgesPreview: ComponentPreviewMap = {
  "badge-morph": {
    light: `/preview_images/badges/badge-morph-light.png`,
    dark: `/preview_images/badges/badge-morph-dark.png`,
  },
};

/**
 * Banners - Banner components for announcements, promotions, and notifications
 * Path: /docs/components/[slug]
 */
export const bannersPreview: ComponentPreviewMap = {
  "banner-announcement": {
    light: `/preview_images/banners/banner-announcement-light.png`,
    dark: `/preview_images/banners/banner-announcement-dark.png`,
  },
  "banner-cookie": {
    light: `/preview_images/banners/banner-cookie-light.png`,
    dark: `/preview_images/banners/banner-cookie-dark.png`,
  },
  "banner-newsletter": {
    light: `/preview_images/banners/banner-newsletter-light.png`,
    dark: `/preview_images/banners/banner-newsletter-dark.png`,
  },
  "banner-countdown": {
    light: `/preview_images/banners/banner-countdown-light.png`,
    dark: `/preview_images/banners/banner-countdown-dark.png`,
  },
};

/**
 * Breadcrumbs - Breadcrumb navigation components
 * Path: /docs/components/[slug]
 */
export const breadcrumbsPreview: ComponentPreviewMap = {
  "breadcrumb-separator": {
    light: `/preview_images/breadcrumbs/breadcrumb-separator-light.png`,
    dark: `/preview_images/breadcrumbs/breadcrumb-separator-dark.png`,
  },
  "breadcrumb-icon": {
    light: `/preview_images/breadcrumbs/breadcrumb-icon-light.png`,
    dark: `/preview_images/breadcrumbs/breadcrumb-icon-dark.png`,
  },
  "breadcrumb-dropdown": {
    light: `/preview_images/breadcrumbs/breadcrumb-dropdown-light.png`,
    dark: `/preview_images/breadcrumbs/breadcrumb-dropdown-dark.png`,
  },
};

/**
 * Navbars - Navigation bar components
 * Path: /docs/sections/[slug]
 */
export const navbarsPreview: ComponentPreviewMap = {
  "navbar-simple": {
    light: `/preview_images/navbars/navbar-simple-light.png`,
    dark: `/preview_images/navbars/navbar-simple-dark.png`,
  },
  "navbar-centered": {
    light: `/preview_images/navbars/navbar-centered-light.png`,
    dark: `/preview_images/navbars/navbar-centered-dark.png`,
  },
  "navbar-with-search": {
    light: `/preview_images/navbars/navbar-with-search-light.png`,
    dark: `/preview_images/navbars/navbar-with-search-dark.png`,
  },
  "navbar-user-menu": {
    light: `/preview_images/navbars/navbar-user-menu-light.png`,
    dark: `/preview_images/navbars/navbar-user-menu-dark.png`,
  },
  "navbar-status": {
    light: `/preview_images/navbars/navbar-status-light.png`,
    dark: `/preview_images/navbars/navbar-status-dark.png`,
  },
  "navbar-breadcrumb": {
    light: `/preview_images/navbars/navbar-breadcrumb-light.png`,
    dark: `/preview_images/navbars/navbar-breadcrumb-dark.png`,
  },
  "navbar-floating": {
    light: `/preview_images/navbars/navbar-floating-light.png`,
    dark: `/preview_images/navbars/navbar-floating-dark.png`,
  },
  "navbar-tabs": {
    light: `/preview_images/navbars/navbar-tabs-light.png`,
    dark: `/preview_images/navbars/navbar-tabs-dark.png`,
  },
  "navbar-minimal": {
    light: `/preview_images/navbars/navbar-minimal-light.png`,
    dark: `/preview_images/navbars/navbar-minimal-dark.png`,
  },
  "navbar-split": {
    light: `/preview_images/navbars/navbar-split-light.png`,
    dark: `/preview_images/navbars/navbar-split-dark.png`,
  },
  "navbar-icon-links": {
    light: `/preview_images/navbars/navbar-icon-links-light.png`,
    dark: `/preview_images/navbars/navbar-icon-links-dark.png`,
  },
  // Navigation sections (formerly separate)
  "hover-gradient-navbar": {
    light: `/preview_images/navbars/hover-gradient-navbar-light.png`,
    dark: `/preview_images/navbars/hover-gradient-navbar-dark.png`,
  },
  "floating-navbar": {
    light: `/preview_images/navbars/floating-navbar-light.png`,
    dark: `/preview_images/navbars/floating-navbar-dark.png`,
  },
  "luma-bar": {
    light: `/preview_images/navbars/luma-bar-light.png`,
    dark: `/preview_images/navbars/luma-bar-dark.png`,
  },
  "promote-header": {
    light: `/preview_images/navbars/promote-header-light.png`,
    dark: `/preview_images/navbars/promote-header-dark.png`,
  },
};

/**
 * Cards - Card components for various use cases
 * Path: /docs/components/[slug]
 */
export const cardsPreview: ComponentPreviewMap = {
  "glass-ai-card": {
    light: `/preview_images/cards/glass-ai-card-light.png`,
    dark: `/preview_images/cards/glass-ai-card-dark.png`,
  },
  "glass-shipment-flow": {
    light: `/preview_images/cards/glass-shipment-flow-light.png`,
    dark: `/preview_images/cards/glass-shipment-flow-dark.png`,
  },
  "phone-mockup-card": {
    light: `/preview_images/cards/phone-mockup-card-light.png`,
    dark: `/preview_images/cards/phone-mockup-card-dark.png`,
  },
};

/**
 * Carousels - Carousel and stack components
 * Path: /docs/components/[slug]
 */
export const carouselsPreview: ComponentPreviewMap = {
  "card-stack": {
    light: `/preview_images/cards/card-stack-light.png`,
    dark: `/preview_images/cards/card-stack-dark.png`,
  },
};

/**
 * Buttons - Interactive button components
 * Path: /docs/components/[slug]
 */
export const buttonsPreview: ComponentPreviewMap = {
  "slide-to-delete-button": {
    light: `/preview_images/buttons/slide-to-delete-button-light.png`,
    dark: `/preview_images/buttons/slide-to-delete-button-dark.png`,
  },
  "glow-link-button": {
    light: `/preview_images/buttons/glow-link-button-light.png`,
    dark: `/preview_images/buttons/glow-link-button-dark.png`,
  },
  "multi-state-morph-button": {
    light: `/preview_images/buttons/multi-state-morph-button-light.png`,
    dark: `/preview_images/buttons/multi-state-morph-button-dark.png`,
  },
  "dynamic-status-button": {
    light: `/preview_images/buttons/dynamic-status-button-light.png`,
    dark: `/preview_images/buttons/dynamic-status-button-dark.png`,
  },
  "hover-preview-button": {
    light: `/preview_images/buttons/hover-preview-button-light.png`,
    dark: `/preview_images/buttons/hover-preview-button-dark.png`,
  },
  "confetti-button": {
    light: `${BASE_URL}/buttons/confetti-button-light.jpg`,
    dark: `${BASE_URL}/buttons/confetti-button-dark.jpg`,
  },
  "badge-button-combo": {
    light: `/preview_images/buttons/badge-button-combo-light.png`,
    dark: `/preview_images/buttons/badge-button-combo-dark.png`,
  },
  "progress-button": {
    light: `/preview_images/buttons/progress-button-light.png`,
    dark: `/preview_images/buttons/progress-button-dark.png`,
  },
  "icon-label-subtext-button": {
    light: `/preview_images/buttons/icon-label-subtext-button-light.png`,
    dark: `/preview_images/buttons/icon-label-subtext-button-dark.png`,
  },
  "button-copy": {
    light: `/preview_images/buttons/button-copy-light.png`,
    dark: `/preview_images/buttons/button-copy-dark.png`,
  },
  "button-dropdown": {
    light: `/preview_images/buttons/button-dropdown-light.png`,
    dark: `/preview_images/buttons/button-dropdown-dark.png`,
  },
  "button-split": {
    light: `/preview_images/buttons/button-split-light.png`,
    dark: `/preview_images/buttons/button-split-dark.png`,
  },
  "button-badge": {
    light: `/preview_images/buttons/button-badge-light.png`,
    dark: `/preview_images/buttons/button-badge-dark.png`,
  },
};

/**
 * Checkboxes - Checkbox components with various styles
 * Path: /docs/components/[slug]
 */
export const checkboxesPreview: ComponentPreviewMap = {
  "checkbox-simple": {
    light: `/preview_images/checkboxes/checkbox-simple-light.png`,
    dark: `/preview_images/checkboxes/checkbox-simple-dark.png`,
  },
  "checkbox-colored": {
    light: `/preview_images/checkboxes/checkbox-colored-light.png`,
    dark: `/preview_images/checkboxes/checkbox-colored-dark.png`,
  },
  "checkbox-group": {
    light: `/preview_images/checkboxes/checkbox-group-light.png`,
    dark: `/preview_images/checkboxes/checkbox-group-dark.png`,
  },
  "checkbox-indeterminate": {
    light: `/preview_images/checkboxes/checkbox-indeterminate-light.png`,
    dark: `/preview_images/checkboxes/checkbox-indeterminate-dark.png`,
  },
  "checkbox-terms": {
    light: `/preview_images/checkboxes/checkbox-terms-light.png`,
    dark: `/preview_images/checkboxes/checkbox-terms-dark.png`,
  },
  "checkbox-todo": {
    light: `/preview_images/checkboxes/checkbox-todo-light.png`,
    dark: `/preview_images/checkboxes/checkbox-todo-dark.png`,
  },
  "checkbox-tree": {
    light: `/preview_images/checkboxes/checkbox-tree-light.png`,
    dark: `/preview_images/checkboxes/checkbox-tree-dark.png`,
  },
};

/**
 * Loaders - Loading and spinner components
 * Path: /docs/components/[slug]
 */
export const loadersPreview: ComponentPreviewMap = {
  "loading-circle": {
    light: `/preview_images/loaders/loading-circle-light.png`,
    dark: `/preview_images/loaders/loading-circle-dark.png`,
  },
  "load-ripple": {
    light: `/preview_images/loaders/load-ripple-light.png`,
    dark: `/preview_images/loaders/load-ripple-dark.png`,
  },
  "ripple-circles": {
    light: `/preview_images/loaders/ripple-circles-light.png`,
    dark: `/preview_images/loaders/ripple-circles-dark.png`,
  },
  "solar-loader": {
    light: `/preview_images/loaders/solar-loader-light.png`,
    dark: `/preview_images/loaders/solar-loader-dark.png`,
  },
};

/**
 * Dialogs - Modal and dialog components
 * Path: /docs/components/[slug]
 */
export const dialogsPreview: ComponentPreviewMap = {
  "credit-card-dialog": {
    light: `/preview_images/dialogs/credit-card-dialog-light.png`,
    dark: `/preview_images/dialogs/credit-card-dialog-dark.png`,
  },
  "verification-input": {
    light: `/preview_images/inputs/verification-input-light.png`,
    dark: `/preview_images/inputs/verification-input-dark.png`,
  },
  "add-task-sheet": {
    light: `/preview_images/dialogs/add-task-sheet-light.png`,
    dark: `/preview_images/dialogs/add-task-sheet-dark.png`,
  },
};


/**
 * Breadcrumb - Navigation breadcrumb components
 * Path: /docs/components/[slug]
 */
export const breadcrumbPreview: ComponentPreviewMap = {
  "smart-breadcrumb": {
    light: `/preview_images/breadcrumb/smart-breadcrumb-light.png`,
    dark: `/preview_images/breadcrumb/smart-breadcrumb-dark.png`,
  },
};

/**
 * Audio & Media - Audio player and media components
 * Path: /docs/components/[slug]
 */
export const audioMediaPreview: ComponentPreviewMap = {
  "music-player-card": {
    light: `/preview_images/audio-media/music-player-card-light.png`,
    dark: `/preview_images/audio-media/music-player-card-dark.png`,
  },
  "live-waveform": {
    light: `/preview_images/audio-media/live-waveform-light.png`,
    dark: `/preview_images/audio-media/live-waveform-dark.png`,
  },
  "visualizer-button": {
    light: `/preview_images/audio-media/visualizer-button-light.png`,
    dark: `/preview_images/audio-media/visualizer-button-dark.png`,
  },
};

/**
 * Select Components - Dropdown and select components
 * Path: /docs/components/[slug]
 */
export const selectPreview: ComponentPreviewMap = {
  "color-emotion-select": {
    light: `/preview_images/select/color-emotion-select-light.png`,
    dark: `/preview_images/select/color-emotion-select-dark.png`,
  },
  "tag-cloud-select": {
    light: `${BASE_URL}/popular/tag-cloud-select-light.jpg`,
    dark: `${BASE_URL}/popular/tag-cloud-select-dark.jpg`,
  },
};

/**
 * Chat Components - Chat and messaging components
 * Path: /docs/components/[slug]
 */
export const chatPreview: ComponentPreviewMap = {};

/**
 * Inputs - Form input components
 * Path: /docs/components/[slug]
 */
export const inputsPreview: ComponentPreviewMap = {
  "circular-stepper-input": {
    light: `/preview_images/inputs/circular-stepper-input-light.png`,
    dark: `/preview_images/inputs/circular-stepper-input-dark.png`,
  },
  "color-picker-input": {
    light: `/preview_images/inputs/color-picker-input-light.png`,
    dark: `/preview_images/inputs/color-picker-input-dark.png`,
  },
  "gravatar-email-input": {
    light: `/preview_images/inputs/gravatar-email-input-light.png`,
    dark: `/preview_images/inputs/gravatar-email-input-dark.png`,
  },
  "correct-number-input": {
    light: `/preview_images/inputs/correct-number-input-light.png`,
    dark: `/preview_images/inputs/correct-number-input-dark.png`,
  },
  "better-time-picker": {
    light: `/preview_images/inputs/better-time-picker-light.png`,
    dark: `/preview_images/inputs/better-time-picker-dark.png`,
  },
  "inline-copy-input": {
    light: `/preview_images/inputs/inline-copy-input-light.png`,
    dark: `/preview_images/inputs/inline-copy-input-dark.png`,
  },
  "clean-tag-input": {
    light: `/preview_images/inputs/clean-tag-input-light.png`,
    dark: `/preview_images/inputs/clean-tag-input-dark.png`,
  },
  "input-with-select": {
    light: `/preview_images/inputs/input-with-select-light.png`,
    dark: `/preview_images/inputs/input-with-select-dark.png`,
  },
  "url-input": {
    light: `/preview_images/inputs/url-input-light.png`,
    dark: `/preview_images/inputs/url-input-dark.png`,
  },
  "password-field": {
    light: `/preview_images/inputs/password-field-light.png`,
    dark: `/preview_images/inputs/password-field-dark.png`,
  },
};

/**
 * Notifications - Notification and alert components
 * Path: /docs/components/[slug]
 */
export const notificationsPreview: ComponentPreviewMap = {
  "notification-inbox-popover": {
    light: `/preview_images/notifications/notification-inbox-popover-light.png`,
    dark: `/preview_images/notifications/notification-inbox-popover-dark.png`,
  },
  notification: {
    light: `/preview_images/notifications/notification-light.png`,
    dark: `/preview_images/notifications/notification-dark.png`,
  },
  "notifications-carousel": {
    light: `/preview_images/notifications/notifications-carousel-light.png`,
    dark: `/preview_images/notifications/notifications-carousel-dark.png`,
  },
  "notifications-filter": {
    light: `/preview_images/notifications/notifications-filter-light.png`,
    dark: `/preview_images/notifications/notifications-filter-dark.png`,
  },
};

/**
 * Menu - Navigation menu components
 * Path: /docs/components/[slug]
 */
export const menuPreview: ComponentPreviewMap = {
  "nested-dashboard-menu": {
    light: `/preview_images/menu/nested-dashboard-menu-light.png`,
    dark: `/preview_images/menu/nested-dashboard-menu-dark.png`,
  },
  "app-menu-bar": {
    light: `/preview_images/menu/app-menu-bar-light.png`,
    dark: `/preview_images/menu/app-menu-bar-dark.png`,
  },
  "account-menu": {
    light: `/preview_images/menu/account-menu-light.png`,
    dark: `/preview_images/menu/account-menu-dark.png`,
  },
  "action-toolbar": {
    light: `/preview_images/menu/action-toolbar-light.png`,
    dark: `/preview_images/menu/action-toolbar-dark.png`,
  },
};

/**
 * Drawer - Slide-out drawer components
 * Path: /docs/components/[slug]
 */
export const drawerPreview: ComponentPreviewMap = {
  "drawer-inner-content": {
    light: `/preview_images/drawer/drawer-inner-content-light.png`,
    dark: `/preview_images/drawer/drawer-inner-content-dark.png`,
  },
  "centered-feedback-drawer": {
    light: `/preview_images/drawer/centered-feedback-drawer-light.png`,
    dark: `/preview_images/drawer/centered-feedback-drawer-dark.png`,
  },
  "bottom-drawers": {
    light: `/preview_images/drawer/bottom-drawers-light.png`,
    dark: `/preview_images/drawer/bottom-drawers-dark.png`,
  },
};

/**
 * Forms - Form and authentication components
 * Path: /docs/components/[slug]
 */
export const formsPreview: ComponentPreviewMap = {
  "glass-form": {
    light: `/preview_images/forms/glass-form-light.png`,
    dark: `/preview_images/forms/glass-form-dark.png`,
  },
};

/**
 * File Management - File tree and management components
 * Path: /docs/components/[slug]
 */
export const fileManagementPreview: ComponentPreviewMap = {
  "motion-file-tree": {
    light: `/preview_images/file-management/motion-file-tree-light.png`,
    dark: `/preview_images/file-management/motion-file-tree-dark.png`,
  },
  "magic-tree": {
    light: `/preview_images/file-management/magic-tree-light.png`,
    dark: `/preview_images/file-management/magic-tree-dark.png`,
  },
  "tree-node-tooltip": {
    light: `/preview_images/file-management/tree-node-tooltip-light.png`,
    dark: `/preview_images/file-management/tree-node-tooltip-dark.png`,
  },
};

/**
 * Tables - Data table components
 * Path: /docs/components/[slug]
 */
export const tablesPreview: ComponentPreviewMap = {
  "fixed-header-footer-table": {
    light: `/preview_images/tables/fixed-header-footer-table-light.png`,
    dark: `/preview_images/tables/fixed-header-footer-table-dark.png`,
  },
  "reorderable-table": {
    light: `/preview_images/tables/reorderable-table-light.png`,
    dark: `/preview_images/tables/reorderable-table-dark.png`,
  },
  "comparison-table": {
    light: `/preview_images/tables/comparison-table-light.png`,
    dark: `/preview_images/tables/comparison-table-dark.png`,
  },
  "flexi-filter-table": {
    light: `/preview_images/tables/flexi-filter-table-light.png`,
    dark: `/preview_images/tables/flexi-filter-table-dark.png`,
  },
  "table-dialog": {
    light: `/preview_images/tables/table-dialog-light.png`,
    dark: `/preview_images/tables/table-dialog-dark.png`,
  },
  "minimisable-table": {
    light: `/preview_images/tables/minimisable-table-light.png`,
    dark: `/preview_images/tables/minimisable-table-dark.png`,
  },
  "inline-analytics-table": {
    light: `/preview_images/tables/inline-analytics-table-light.png`,
    dark: `/preview_images/tables/inline-analytics-table-dark.png`,
  },
  "column-collaboration-table": {
    light: `/preview_images/tables/column-collaboration-table-light.png`,
    dark: `/preview_images/tables/column-collaboration-table-dark.png`,
  },
};

/**
 * Date Pickers - Date selection components
 * Path: /docs/components/[slug]
 */
export const datePickersPreview: ComponentPreviewMap = {};

/**
 * Calendars - Calendar display components
 * Path: /docs/components/[slug]
 */
export const calendarsPreview: ComponentPreviewMap = {
  "calendar-wave": {
    light: `/preview_images/calendars/calendar-wave-light.png`,
    dark: `/preview_images/calendars/calendar-wave-dark.png`,
  },
  "calendar-crest": {
    light: `/preview_images/calendars/calendar-crest-light.png`,
    dark: `/preview_images/calendars/calendar-crest-dark.png`,
  },
};

/**
 * Event Calendars - Event and scheduling calendar components
 * Path: /docs/components/[slug]
 */
export const eventCalendarsPreview: ComponentPreviewMap = {
  "event-scheduler": {
    light: `/preview_images/event-calendars/event-scheduler-light.png`,
    dark: `/preview_images/event-calendars/event-scheduler-dark.png`,
  },
  "three-dwall-calendar": {
    light: `${BASE_URL}/popular/three-dwall-calendar-light.jpg`,
    dark: `${BASE_URL}/popular/three-dwall-calendar-dark.jpg`,
  },
  "calendar-planner": {
    light: `/preview_images/event-calendars/calendar-planner-light.png`,
    dark: `/preview_images/event-calendars/calendar-planner-dark.png`,
  },
  "calendar-twin": {
    light: `/preview_images/event-calendars/calendar-twin-light.png`,
    dark: `/preview_images/event-calendars/calendar-twin-dark.png`,
  },
  "chrono-select": {
    light: `/preview_images/event-calendars/chrono-select-light.png`,
    dark: `/preview_images/event-calendars/chrono-select-dark.png`,
  },
  "calendar-scheduler": {
    light: `/preview_images/event-calendars/calendar-scheduler-light.png`,
    dark: `/preview_images/event-calendars/calendar-scheduler-dark.png`,
  },
  "calendar-lume": {
    light: `/preview_images/event-calendars/calendar-lume-light.png`,
    dark: `/preview_images/event-calendars/calendar-lume-dark.png`,
  },
};

/**
 * Image Tools - Image manipulation components
 * Path: /docs/components/[slug]
 */
export const imageToolsPreview: ComponentPreviewMap = {
  "glass-image-editor": {
    light: `/preview_images/image-tools/glass-image-editor-light.png`,
    dark: `/preview_images/image-tools/glass-image-editor-dark.png`,
  },
  "glass-image-compare": {
    light: `/preview_images/image-tools/glass-image-compare-light.png`,
    dark: `/preview_images/image-tools/glass-image-compare-dark.png`,
  },
};

/**
 * Video Players - Video playback components
 * Path: /docs/components/[slug]
 */
export const videoPlayersPreview: ComponentPreviewMap = {
  "video-player-pro": {
    light: `/preview_images/video-players/video-player-pro-light.png`,
    dark: `/preview_images/video-players/video-player-pro-dark.png`,
  },
  "hover-play-card": {
    light: `/preview_images/video-players/hover-play-card-light.png`,
    dark: `/preview_images/video-players/hover-play-card-dark.png`,
  },
};

/**
 * Text - Text animation and effect components
 * Path: /docs/components/[slug]
 */
export const textsPreview: ComponentPreviewMap = {
  "rising-glow": {
    light: `${BASE_URL}/texts/lumina-light.png`,
    dark: `${BASE_URL}/texts/lumina-dark.png`,
  },
  "particle-text-dots": {
    light: `/preview_images/backgrounds/particle-text-dots-light.png`,
    dark: `/preview_images/backgrounds/particle-text-dots-dark.png`,
  },
  "container-text-scroll": {
    light: `/preview_images/effects/container-text-scroll-light.png`,
    dark: `/preview_images/effects/container-text-scroll-dark.png`,
  },
  "variable-text": {
    light: `/preview_images/texts/variable-text-light.png`,
    dark: `/preview_images/texts/variable-text-dark.png`,
  },
  "scramble-text": {
    light: `/preview_images/texts/scramble-text-light.png`,
    dark: `/preview_images/texts/scramble-text-dark.png`,
  },
};

/**
 * Backgrounds - Background effect components
 * Path: /docs/components/[slug]
 */
export const backgroundsPreview: ComponentPreviewMap = {
  "cloud-background": {
    light: `/preview_images/backgrounds/cloud-background-light.png`,
    dark: `/preview_images/backgrounds/cloud-background-dark.png`,
  },
  "ripple-distortion": {
    light: `${BASE_URL}/popular/ripple-distortion-light.jpg`,
    dark: `${BASE_URL}/popular/ripple-distortion-dark.png`,
  },
  "dual-tone-rain-background": {
    light: `/preview_images/backgrounds/dual-tone-rain-background-light.png`,
    dark: `/preview_images/backgrounds/dual-tone-rain-background-dark.png`,
  },
  "mouse-spark": {
    light: `/preview_images/backgrounds/mouse-spark-light.png`,
    dark: `/preview_images/backgrounds/mouse-spark-dark.png`,
  },
};

/**
 * Tabs - Tab navigation components
 * Path: /docs/components/[slug]
 */
export const tabsPreview: ComponentPreviewMap = {
  "nested-tabs": {
    light: `/preview_images/tabs/nested-tabs-light.png`,
    dark: `/preview_images/tabs/nested-tabs-dark.png`,
  },
  "zoom-depth-tabs": {
    light: `/preview_images/tabs/zoom-depth-tabs-light.png`,
    dark: `/preview_images/tabs/zoom-depth-tabs-dark.png`,
  },
  "capsule-tabs": {
    light: `/preview_images/tabs/capsule-tabs-light.png`,
    dark: `/preview_images/tabs/capsule-tabs-dark.png`,
  },
  "magnetic-tabs": {
    light: `/preview_images/tabs/magnetic-tabs-light.png`,
    dark: `/preview_images/tabs/magnetic-tabs-dark.png`,
  },
  "fade-slide-tabs": {
    light: `/preview_images/tabs/fade-slide-tabs-light.png`,
    dark: `/preview_images/tabs/fade-slide-tabs-dark.png`,
  },
  "hybrid-tabs": {
    light: `/preview_images/tabs/hybrid-tabs-light.png`,
    dark: `/preview_images/tabs/hybrid-tabs-dark.png`,
  },
  "pill-morph-tabs": {
    light: `/preview_images/tabs/pill-morph-tabs-light.png`,
    dark: `/preview_images/tabs/pill-morph-tabs-dark.png`,
  },
  "sliding-tabs": {
    light: `/preview_images/tabs/sliding-tabs-light.png`,
    dark: `/preview_images/tabs/sliding-tabs-dark.png`,
  },
  "drag-and-drop-tabs": {
    light: `/preview_images/tabs/drag-and-drop-tabs-light.png`,
    dark: `/preview_images/tabs/drag-and-drop-tabs-dark.png`,
  },
};

/**
 * Pagination - Page navigation components
 * Path: /docs/components/[slug]
 */
export const paginationPreview: ComponentPreviewMap = {
  "wheel-pagination": {
    light: `/preview_images/pagination/wheel-pagination-light.png`,
    dark: `/preview_images/pagination/wheel-pagination-dark.png`,
  },
  "scroll-pagination": {
    light: `/preview_images/pagination/scroll-pagination-light.png`,
    dark: `/preview_images/pagination/scroll-pagination-dark.png`,
  },
  "icon-pagination": {
    light: `${BASE_URL}/paginations/icon-pagination-light.jpg`,
    dark: `${BASE_URL}/paginations/icon-pagination-dark.jpg`,
  },
  "gooey-pagination": {
    light: `${BASE_URL}/paginations/gooey-pagination-light.jpg`,
    dark: `${BASE_URL}/paginations/gooey-pagination-dark.jpg`,
  },
  "stack-pagination": {
    light: `${BASE_URL}/paginations/stack-pagination-light.jpg`,
    dark: `${BASE_URL}/paginations/stack-pagination-dark.jpg`,
  },
  "animated-number-flip": {
    light: `/preview_images/pagination/animated-number-flip-light.png`,
    dark: `/preview_images/pagination/animated-number-flip-dark.png`,
  },
  "morphing-page-dots": {
    light: `/preview_images/pagination/morphing-page-dots-light.png`,
    dark: `/preview_images/pagination/morphing-page-dots-dark.png`,
  },
  "sliding-pagination": {
    light: `${BASE_URL}/paginations/sliding-pagination-light.jpg`,
    dark: `${BASE_URL}/paginations/sliding-pagination-dark.jpg`,
  },
};

/**
 * Stepper - Step indicator and progress components
 * Path: /docs/components/[slug]
 */
export const stepperPreview: ComponentPreviewMap = {
  "step-indicator": {
    light: `/preview_images/steppers/step-indicator-light.png`,
    dark: `/preview_images/steppers/step-indicator-dark.png`,
  },
  "wizard-stepper": {
    light: `/preview_images/steppers/wizard-stepper-light.png`,
    dark: `/preview_images/steppers/wizard-stepper-dark.png`,
  },
  "progress-tracker": {
    light: `/preview_images/steppers/progress-tracker-light.png`,
    dark: `/preview_images/steppers/progress-tracker-dark.png`,
  },
  "milestone-stepper": {
    light: `/preview_images/steppers/milestone-stepper-light.png`,
    dark: `/preview_images/steppers/milestone-stepper-dark.png`,
  },
  "nav-stepper": {
    light: `/preview_images/steppers/nav-stepper-light.png`,
    dark: `/preview_images/steppers/nav-stepper-dark.png`,
  },
};

/**
 * Docks - macOS-style dock components
 * Path: /docs/components/[slug]
 */
export const docksPreview: ComponentPreviewMap = {
  "gooey-dock": {
    light: `/preview_images/docks/gooey-dock-light.png`,
    dark: `/preview_images/docks/gooey-dock-dark.png`,
  },
};

/**
 * AI Chat Inputs - AI-powered chat input components
 * Path: /docs/components/[slug]
 */
export const aiChatInputsPreview: ComponentPreviewMap = {
  "ai-chat-input": {
    light: `/preview_images/ai-chat-inputs/ai-chat-input-light.png`,
    dark: `/preview_images/ai-chat-inputs/ai-chat-input-dark.png`,
  },
  "claude-chat-input": {
    light: `/preview_images/ai-chat-inputs/claude-chat-input-light.png`,
    dark: `/preview_images/ai-chat-inputs/claude-chat-input-dark.png`,
  },
};

/**
 * Charts - Data visualization chart components
 * Path: /docs/components/[slug]
 */
export const chartsPreview: ComponentPreviewMap = {
  "spark-chart": {
    light: `/preview_images/charts/spark-chart-light.png`,
    dark: `/preview_images/charts/spark-chart-dark.png`,
  },
};

// ============================================================================
// SECTIONS
// ============================================================================

/**
 * FAQs - FAQ section components
 * Path: /docs/sections/[slug]
 */
export const faqsPreview: ComponentPreviewMap = {
  "staggered-faq-section": {
    light: `/preview_images/faqs/staggered-faq-section-light.png`,
    dark: `/preview_images/faqs/staggered-faq-section-dark.png`,
  },
  "feature-highlights": {
    light: `/preview_images/faqs/feature-highlights-light.png`,
    dark: `/preview_images/faqs/feature-highlights-dark.png`,
  },
  "faq-scroll-accordion": {
    light: `/preview_images/faqs/faq-scroll-accordion-light.png`,
    dark: `/preview_images/faqs/faq-scroll-accordion-dark.png`,
  },
  "faq-auto-accordion": {
    light: `/preview_images/faqs/faq-auto-accordion-light.png`,
    dark: `/preview_images/faqs/faq-auto-accordion-dark.png`,
  },
  "faq-chat-accordion": {
    light: `/preview_images/faqs/faq-chat-accordion-light.png`,
    dark: `/preview_images/faqs/faq-chat-accordion-dark.png`,
  },
};

/**
 * Hero Sections - Landing page hero components
 * Path: /docs/components/[slug]
 */
export const heroSectionsPreview: ComponentPreviewMap = {
  "card-carousel-hero": {
    light: `/preview_images/hero-sections/card-carousel-hero-light.png`,
    dark: `/preview_images/hero-sections/card-carousel-hero-dark.png`,
  },
  "gradient-hero-showcase": {
    light: `/preview_images/hero-sections/gradient-hero-showcase-light.png`,
    dark: `/preview_images/hero-sections/gradient-hero-showcase-dark.png`,
  },
  "video-hero-showcase": {
    light: `/preview_images/hero-sections/video-hero-showcase-light.png`,
    dark: `/preview_images/hero-sections/video-hero-showcase-dark.png`,
  },
  "structured-hero-section": {
    light: `/preview_images/hero-sections/structured-hero-section-light.png`,
    dark: `/preview_images/hero-sections/structured-hero-section-dark.png`,
  },
  "tabbed-hero-section": {
    light: `/preview_images/hero-sections/tabbed-hero-section-light.png`,
    dark: `/preview_images/hero-sections/tabbed-hero-section-dark.png`,
  },
};

/**
 * Featured Section - Feature showcase components
 * Path: /docs/components/[slug]
 */
export const featuredSectionPreview: ComponentPreviewMap = {
  "product-feature-hero": {
    light: `/preview_images/featured-sections/product-feature-hero-light.png`,
    dark: `/preview_images/featured-sections/product-feature-hero-dark.png`,
  },
  "product-card-hero": {
    light: `/preview_images/featured-sections/product-card-hero-light.png`,
    dark: `/preview_images/featured-sections/product-card-hero-dark.png`,
  },
  "split-feature-showcase": {
    light: `/preview_images/featured-sections/split-feature-showcase-light.png`,
    dark: `/preview_images/featured-sections/split-feature-showcase-dark.png`,
  },
  "integration-and-stats-section": {
    light: `/preview_images/featured-sections/integration-and-stats-section-light.png`,
    dark: `/preview_images/featured-sections/integration-and-stats-section-dark.png`,
  },
  "rotating-gradient-right": {
    light: `/preview_images/featured-sections/rotating-gradient-right-light.png`,
    dark: `/preview_images/featured-sections/rotating-gradient-right-dark.png`,
  },
  "automated-tasks-panel": {
    light: `/preview_images/featured-sections/automated-tasks-panel-light.png`,
    dark: `/preview_images/featured-sections/automated-tasks-panel-dark.png`,
  },
};

/**
 * Client Section - Client/testimonial showcase components
 * Path: /docs/components/[slug]
 */
export const clientSectionPreview: ComponentPreviewMap = {
  "trusted-clients-showcase": {
    light: `/preview_images/client-sections/trusted-clients-showcase-light.png`,
    dark: `/preview_images/client-sections/trusted-clients-showcase-dark.png`,
  },
  "client-carousel-showcase": {
    light: `/preview_images/client-sections/client-carousel-showcase-light.png`,
    dark: `/preview_images/client-sections/client-carousel-showcase-dark.png`,
  },
  "auto-scrolling-client-carousel": {
    light: `/preview_images/client-sections/auto-scrolling-client-carousel-light.png`,
    dark: `/preview_images/client-sections/auto-scrolling-client-carousel-dark.png`,
  },
};

/**
 * Footer Section - Website footer components
 * Path: /docs/components/[slug]
 */
export const footerSectionPreview: ComponentPreviewMap = {
  "footer-pro": {
    light: `/preview_images/footer-sections/footer-pro-light.png`,
    dark: `/preview_images/footer-sections/footer-pro-dark.png`,
  },
  "corporate-footer": {
    light: `/preview_images/footer-sections/corporate-footer-light.png`,
    dark: `/preview_images/footer-sections/corporate-footer-dark.png`,
  },
  "footer-enterprise": {
    light: `/preview_images/footer-sections/footer-enterprise-light.png`,
    dark: `/preview_images/footer-sections/footer-enterprise-dark.png`,
  },
};

/**
 * Pricing Section - Pricing table components
 * Path: /docs/components/[slug]
 */
export const pricingSectionPreview: ComponentPreviewMap = {
  "pricing-plans": {
    light: `/preview_images/pricing-sections/pricing-plans-light.png`,
    dark: `/preview_images/pricing-sections/pricing-plans-dark.png`,
  },
  "pricing-comparison": {
    light: `/preview_images/pricing-sections/pricing-comparison-light.png`,
    dark: `/preview_images/pricing-sections/pricing-comparison-dark.png`,
  },
  "subscription-plans": {
    light: `/preview_images/pricing-sections/subscription-plans-light.png`,
    dark: `/preview_images/pricing-sections/subscription-plans-dark.png`,
  },
  "pricing-flow": {
    light: `/preview_images/pricing-sections/pricing-flow-light.png`,
    dark: `/preview_images/pricing-sections/pricing-flow-dark.png`,
  },
  "pricing-with-user-scaling": {
    light: `/preview_images/pricing-sections/pricing-with-user-scaling-light.png`,
    dark: `/preview_images/pricing-sections/pricing-with-user-scaling-dark.png`,
  },
  "pricing-tiers": {
    light: `/preview_images/pricing-sections/pricing-tiers-light.png`,
    dark: `/preview_images/pricing-sections/pricing-tiers-dark.png`,
  },
  "pricing-section-vertical": {
    light: `/preview_images/pricing-sections/pricing-section-vertical-light.png`,
    dark: `/preview_images/pricing-sections/pricing-section-vertical-dark.png`,
  },
};

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

/** All component previews combined */
export const allComponentPreviews: ComponentPreviewMap = {
  ...accordionsPreview,
  ...avatarsPreview,
  ...badgesPreview,
  ...bannersPreview,
  ...breadcrumbsPreview,
  ...navbarsPreview,
  ...cardsPreview,
  ...carouselsPreview,
  ...buttonsPreview,
  ...checkboxesPreview,
  ...loadersPreview,
  ...dialogsPreview,
  ...breadcrumbPreview,
  ...audioMediaPreview,
  ...selectPreview,
  ...chatPreview,
  ...inputsPreview,
  ...notificationsPreview,
  ...menuPreview,
  ...drawerPreview,
  ...formsPreview,
  ...fileManagementPreview,
  ...tablesPreview,
  ...datePickersPreview,
  ...calendarsPreview,
  ...eventCalendarsPreview,
  ...imageToolsPreview,
  ...videoPlayersPreview,
  ...textsPreview,
  ...backgroundsPreview,
  ...tabsPreview,
  ...paginationPreview,
  ...stepperPreview,
  ...docksPreview,
  ...aiChatInputsPreview,
  ...chartsPreview,
};

/** All section previews combined */
export const allSectionPreviews: ComponentPreviewMap = {
  ...faqsPreview,
  ...heroSectionsPreview,
  ...featuredSectionPreview,
  ...clientSectionPreview,
  ...footerSectionPreview,
  ...pricingSectionPreview,
  ...navbarsPreview,
};

/** All previews (components + sections) */
export const allPreviews: ComponentPreviewMap = {
  ...allComponentPreviews,
  ...allSectionPreviews,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get preview URL for a component (image or video)
 * @param componentSlug - The component slug (e.g., "precision-card")
 * @param theme - The current theme ("light" or "dark")
 * @returns Object with image and/or video URL, or null if not found
 */
export function getComponentPreview(
  componentSlug: string,
  theme: "light" | "dark" = "light",
): { image?: string; video?: string } | null {
  const preview = allPreviews[componentSlug];
  if (!preview) return null;

  const result: { image?: string; video?: string } = {};

  if (preview.video) {
    result.video = preview.video;
  }

  if (theme === "dark" && preview.dark) {
    result.image = preview.dark;
  } else if (preview.light) {
    result.image = preview.light;
  }

  // Return null if no image or video
  if (!result.image && !result.video) return null;

  return result;
}

/**
 * Get preview image URL for a component (legacy support)
 * @param componentSlug - The component slug (e.g., "precision-card")
 * @param theme - The current theme ("light" or "dark")
 * @returns The image URL or empty string if not found
 */
export function getComponentPreviewUrl(
  componentSlug: string,
  theme: "light" | "dark" = "light",
): string {
  const preview = allPreviews[componentSlug];
  if (!preview) return "";

  if (theme === "dark" && preview.dark) {
    return preview.dark;
  }
  return preview.light || "";
}

/**
 * Check if a component has a preview (image or video)
 * @param componentSlug - The component slug
 * @returns Boolean indicating if preview exists
 */
export function hasComponentPreview(componentSlug: string): boolean {
  const preview = allPreviews[componentSlug];
  if (!preview) return false;
  return !!(preview.light || preview.dark || preview.video);
}

/**
 * Get all preview data for a specific category
 * @param category - Category slug (e.g., "cards", "buttons")
 * @returns ComponentPreviewMap for that category
 */
export function getCategoryPreviews(category: string): ComponentPreviewMap {
  const categoryMap: Record<string, ComponentPreviewMap> = {
    // Components
    accordions: accordionsPreview,
    avatars: avatarsPreview,
    badges: badgesPreview,
    banners: bannersPreview,
    breadcrumbs: breadcrumbsPreview,
    navbars: navbarsPreview,
    cards: cardsPreview,
    carousels: carouselsPreview,
    buttons: buttonsPreview,
    checkboxes: checkboxesPreview,
    loaders: loadersPreview,
    dialogs: dialogsPreview,
    breadcrumb: breadcrumbPreview,
    "audio-and-media": audioMediaPreview,
    "select-components": selectPreview,
    "chat-components": chatPreview,
    inputs: inputsPreview,
    notifications: notificationsPreview,
    menu: menuPreview,
    drawer: drawerPreview,
    forms: formsPreview,
    "file-management": fileManagementPreview,
    tables: tablesPreview,
    "date-pickers": datePickersPreview,
    calendars: calendarsPreview,
    "event-calendars": eventCalendarsPreview,
    "image-tools": imageToolsPreview,
    "video-players": videoPlayersPreview,
    text: textsPreview,
    backgrounds: backgroundsPreview,
    tabs: tabsPreview,
    pagination: paginationPreview,
    docks: docksPreview,
    "ai-chat-inputs": aiChatInputsPreview,
    charts: chartsPreview,
    // Sections
    faqs: faqsPreview,
    "hero-sections": heroSectionsPreview,
    "featured-section": featuredSectionPreview,
    "client-section": clientSectionPreview,
    "footer-section": footerSectionPreview,
    "pricing-section": pricingSectionPreview,
  };

  return categoryMap[category.toLowerCase()] || {};
}
