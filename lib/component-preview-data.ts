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
  "accordion-animated": {
    light: `/preview_images/accordions/accordion-animated-light.png`,
    dark: `/preview_images/accordions/accordion-animated-dark.png`,
  },
  "accordion-arrow": {
    light: `/preview_images/accordions/accordion-arrow-light.png`,
    dark: `/preview_images/accordions/accordion-arrow-dark.png`,
  },
  "accordion-badge": {
    light: `/preview_images/accordions/accordion-badge-light.png`,
    dark: `/preview_images/accordions/accordion-badge-dark.png`,
  },
  "accordion-bordered": {
    light: `/preview_images/accordions/accordion-bordered-light.png`,
    dark: `/preview_images/accordions/accordion-bordered-dark.png`,
  },
  "accordion-icon": {
    light: `/preview_images/accordions/accordion-icon-light.png`,
    dark: `/preview_images/accordions/accordion-icon-dark.png`,
  },
  "accordion-minimal": {
    light: `/preview_images/accordions/accordion-minimal-light.png`,
    dark: `/preview_images/accordions/accordion-minimal-dark.png`,
  },
  "accordion-nested": {
    light: `/preview_images/accordions/accordion-nested-light.png`,
    dark: `/preview_images/accordions/accordion-nested-dark.png`,
  },
  "accordion-plus": {
    light: `/preview_images/accordions/accordion-plus-light.png`,
    dark: `/preview_images/accordions/accordion-plus-dark.png`,
  },
  "accordion-simple": {
    light: `/preview_images/accordions/accordion-simple-light.png`,
    dark: `/preview_images/accordions/accordion-simple-dark.png`,
  },
};

/**
 * Alerts - Alert notification components
 * Path: /docs/components/[slug]
 */
export const alertsPreview: ComponentPreviewMap = {
  "alert-warning": {
    light: `/preview_images/alerts/alert-warning-light.png`,
    dark: `/preview_images/alerts/alert-warning-dark.png`,
  },
  "alert-warning-outlined": {
    light: `/preview_images/alerts/alert-warning-outlined-light.png`,
    dark: `/preview_images/alerts/alert-warning-outlined-dark.png`,
  },
  "alert-error": {
    light: `/preview_images/alerts/alert-error-light.png`,
    dark: `/preview_images/alerts/alert-error-dark.png`,
  },
  "alert-error-outlined": {
    light: `/preview_images/alerts/alert-error-outlined-light.png`,
    dark: `/preview_images/alerts/alert-error-outlined-dark.png`,
  },
  "alert-success": {
    light: `/preview_images/alerts/alert-success-light.png`,
    dark: `/preview_images/alerts/alert-success-dark.png`,
  },
  "alert-success-outlined": {
    light: `/preview_images/alerts/alert-success-outlined-light.png`,
    dark: `/preview_images/alerts/alert-success-outlined-dark.png`,
  },
};

/**
 * Avatars - Avatar components with various styles and status indicators
 * Path: /docs/components/[slug]
 */
export const avatarsPreview: ComponentPreviewMap = {
  "avatar-badge": {
    light: `/preview_images/avatars/avatar-badge-light.png`,
    dark: `/preview_images/avatars/avatar-badge-dark.png`,
  },
  "avatar-basic": {
    light: `/preview_images/avatars/avatar-basic-light.png`,
    dark: `/preview_images/avatars/avatar-basic-dark.png`,
  },
  "avatar-fallback": {
    light: `/preview_images/avatars/avatar-fallback-light.png`,
    dark: `/preview_images/avatars/avatar-fallback-dark.png`,
  },
  "avatar-group": {
    light: `/preview_images/avatars/avatar-group-light.png`,
    dark: `/preview_images/avatars/avatar-group-dark.png`,
  },
  "avatar-group-count": {
    light: `/preview_images/avatars/avatar-group-count-light.png`,
    dark: `/preview_images/avatars/avatar-group-count-dark.png`,
  },
  "avatar-icon": {
    light: `/preview_images/avatars/avatar-icon-light.png`,
    dark: `/preview_images/avatars/avatar-icon-dark.png`,
  },
  "avatar-online": {
    light: `/preview_images/avatars/avatar-online-light.png`,
    dark: `/preview_images/avatars/avatar-online-dark.png`,
  },
  "avatar-status": {
    light: `/preview_images/avatars/avatar-status-light.png`,
    dark: `/preview_images/avatars/avatar-status-dark.png`,
  },
  "avatar-verified": {
    light: `/preview_images/avatars/avatar-verified-light.png`,
    dark: `/preview_images/avatars/avatar-verified-dark.png`,
  },
  "avatar-trust-badge": {
    light: `/preview_images/avatars/avatar-trust-badge-light.png`,
    dark: `/preview_images/avatars/avatar-trust-badge-dark.png`,
  },
};

/**
 * Badges - Badge components with icons, counters, and status indicators
 * Path: /docs/components/[slug]
 */
export const badgesPreview: ComponentPreviewMap = {
  "badge-icon": {
    light: `/preview_images/badges/badge-icon-light.png`,
    dark: `/preview_images/badges/badge-icon-dark.png`,
  },
  "badge-counter": {
    light: `/preview_images/badges/badge-counter-light.png`,
    dark: `/preview_images/badges/badge-counter-dark.png`,
  },
  "badge-status": {
    light: `/preview_images/badges/badge-status-light.png`,
    dark: `/preview_images/badges/badge-status-dark.png`,
  },
  "badge-removable": {
    light: `/preview_images/badges/badge-removable-light.png`,
    dark: `/preview_images/badges/badge-removable-dark.png`,
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
  "banner-promo": {
    light: `/preview_images/banners/banner-promo-light.png`,
    dark: `/preview_images/banners/banner-promo-dark.png`,
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
  "breadcrumb-boxed": {
    light: `/preview_images/breadcrumbs/breadcrumb-boxed-light.png`,
    dark: `/preview_images/breadcrumbs/breadcrumb-boxed-dark.png`,
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
  "precision-card": {
    light: `${BASE_URL}/cards/precision-card-light.webp`,
    dark: `${BASE_URL}/cards/precision-card-dark.webp`,
  },
  "social-card": {
    light: `/preview_images/cards/social-card-light.png`,
    dark: `/preview_images/cards/social-card-dark.png`,
  },
  "portfolio-card": {
    light: `/preview_images/cards/portfolio-card-light.png`,
    dark: `/preview_images/cards/portfolio-card-dark.png`,
  },
  "job-card": {
    light: `/preview_images/cards/job-card-light.png`,
    dark: `/preview_images/cards/job-card-dark.png`,
  },
  "team-project-card": {
    light: `/preview_images/cards/team-project-card-light.png`,
    dark: `/preview_images/cards/team-project-card-dark.png`,
  },
  "collab-chat-card": {
    light: `/preview_images/cards/collab-chat-card-light.png`,
    dark: `/preview_images/cards/collab-chat-card-dark.png`,
  },
  "goal-tracker-card": {
    light: `/preview_images/cards/goal-tracker-card-light.png`,
    dark: `/preview_images/cards/goal-tracker-card-dark.png`,
  },
  "environment-card": {
    light: `/preview_images/cards/environment-card-light.png`,
    dark: `/preview_images/cards/environment-card-dark.png`,
  },
  "schedule-card": {
    light: `/preview_images/cards/schedule-card-light.png`,
    dark: `/preview_images/cards/schedule-card-dark.png`,
  },
  "showcase-card": {
    light: `/preview_images/cards/showcase-card-light.png`,
    dark: `/preview_images/cards/showcase-card-dark.png`,
  },
  "order-summary-card": {
    light: `/preview_images/cards/order-summary-card-light.png`,
    dark: `/preview_images/cards/order-summary-card-dark.png`,
  },
  "doctor-profile-card": {
    light: `/preview_images/cards/doctor-profile-card-light.png`,
    dark: `/preview_images/cards/doctor-profile-card-dark.png`,
  },
  "gradient-blob-card": {
    light: `/preview_images/cards/gradient-blob-card-light.png`,
    dark: `/preview_images/cards/gradient-blob-card-dark.png`,
  },
  "idea-generator-card": {
    light: `/preview_images/cards/idea-generator-card-light.png`,
    dark: `/preview_images/cards/idea-generator-card-dark.png`,
  },
  "elite-plan-card": {
    light: `${BASE_URL}/cards/elite-plan-card-light.jpg`,
    dark: `${BASE_URL}/cards/elite-plan-card-dark.jpg`,
  },
  "shirt-parallax-card": {
    light: `${BASE_URL}/cards/shirt-parallax-card-light.jpg`,
    dark: `${BASE_URL}/cards/shirt-parallax-card-dark.jpg`,
  },
  "order-tracking-parallax-card": {
    light: `/preview_images/cards/order-tracking-parallax-card-light.png`,
    dark: `/preview_images/cards/order-tracking-parallax-card-dark.png`,
  },
  "product-bounce-card": {
    light: `/preview_images/cards/product-bounce-card-light.png`,
    dark: `/preview_images/cards/product-bounce-card-dark.png`,
  },
  "credit-card-hero": {
    light: `${BASE_URL}/cards/credit-card-hero-light.jpg`,
    dark: `${BASE_URL}/cards/credit-card-hero-dark.jpg`,
  },
  "verification-card": {
    light: `/preview_images/cards/verification-card-light.png`,
    dark: `/preview_images/cards/verification-card-dark.png`,
  },
  "project-progress-card": {
    light: `/preview_images/cards/project-progress-card-light.png`,
    dark: `/preview_images/cards/project-progress-card-dark.png`,
  },
  "health-stat-card": {
    light: `${BASE_URL}/cards/health-stats-card-light.jpg`,
    dark: `${BASE_URL}/cards/health-stats-card-dark.jpg`,
  },
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
  "theme-cycle-button": {
    light: `/preview_images/buttons/theme-cycle-button-light.png`,
    dark: `/preview_images/buttons/theme-cycle-button-dark.png`,
  },
  "morphing-github-button": {
    light: `/preview_images/buttons/morphing-github-button-light.png`,
    dark: `/preview_images/buttons/morphing-github-button-dark.png`,
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
  "segmented-button-group": {
    light: `/preview_images/buttons/segmented-button-group-light.png`,
    dark: `/preview_images/buttons/segmented-button-group-dark.png`,
  },
  "confetti-button": {
    light: `${BASE_URL}/buttons/confetti-button-light.jpg`,
    dark: `${BASE_URL}/buttons/confetti-button-dark.jpg`,
  },
  "swipe-to-confirm-button": {
    light: `/preview_images/buttons/swipe-to-confirm-button-light.png`,
    dark: `/preview_images/buttons/swipe-to-confirm-button-dark.png`,
  },
  "status-button": {
    light: `/preview_images/buttons/status-button-light.png`,
    dark: `/preview_images/buttons/status-button-dark.png`,
  },
  "checklist-button": {
    light: `${BASE_URL}/buttons/checklist-button-light.jpg`,
    dark: `${BASE_URL}/buttons/checklist-button-dark.jpg`,
  },
  "countdown-button": {
    light: `${BASE_URL}/buttons/countdown-button-light.jpg`,
    dark: `${BASE_URL}/buttons/countdown-button-dark.jpg`,
  },
  "icon-grid-button": {
    light: `${BASE_URL}/buttons/icon-grid-button-light.jpg`,
    dark: `${BASE_URL}/buttons/icon-grid-button-dark.jpg`,
  },
  "multi-step-button": {
    light: `/preview_images/buttons/multi-step-button-light.png`,
    dark: `/preview_images/buttons/multi-step-button-dark.png`,
  },
  "tooltip-button": {
    light: `/preview_images/buttons/tooltip-button-light.png`,
    dark: `/preview_images/buttons/tooltip-button-dark.png`,
  },
  "badge-button-combo": {
    light: `/preview_images/buttons/badge-button-combo-light.png`,
    dark: `/preview_images/buttons/badge-button-combo-dark.png`,
  },
  "expandable-content-button": {
    light: `/preview_images/buttons/expandable-content-button-light.png`,
    dark: `/preview_images/buttons/expandable-content-button-dark.png`,
  },
  "notification-button": {
    light: `/preview_images/buttons/notification-button-light.png`,
    dark: `/preview_images/buttons/notification-button-dark.png`,
  },
  "confirmation-button": {
    light: `/preview_images/buttons/confirmation-button-light.png`,
    dark: `/preview_images/buttons/confirmation-button-dark.png`,
  },
  "avatar-action-button": {
    light: `/preview_images/buttons/avatar-action-button-light.png`,
    dark: `/preview_images/buttons/avatar-action-button-dark.png`,
  },
  "split-action-button": {
    light: `/preview_images/buttons/split-action-button-light.png`,
    dark: `/preview_images/buttons/split-action-button-dark.png`,
  },
  "progress-button": {
    light: `/preview_images/buttons/progress-button-light.png`,
    dark: `/preview_images/buttons/progress-button-dark.png`,
  },
  "icon-label-subtext-button": {
    light: `/preview_images/buttons/icon-label-subtext-button-light.png`,
    dark: `/preview_images/buttons/icon-label-subtext-button-dark.png`,
  },
  "button-variants": {
    light: `/preview_images/buttons/button-variants-light.png`,
    dark: `/preview_images/buttons/button-variants-dark.png`,
  },
  "button-icon": {
    light: `/preview_images/buttons/button-icon-light.png`,
    dark: `/preview_images/buttons/button-icon-dark.png`,
  },
  "button-loading": {
    light: `/preview_images/buttons/button-loading-light.png`,
    dark: `/preview_images/buttons/button-loading-dark.png`,
  },
  "button-social": {
    light: `/preview_images/buttons/button-social-light.png`,
    dark: `/preview_images/buttons/button-social-dark.png`,
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
  "button-file-upload": {
    light: `/preview_images/buttons/button-file-upload-light.png`,
    dark: `/preview_images/buttons/button-file-upload-dark.png`,
  },
  "button-rounded": {
    light: `/preview_images/buttons/button-rounded-light.png`,
    dark: `/preview_images/buttons/button-rounded-dark.png`,
  },
  "button-toggle-group": {
    light: `/preview_images/buttons/button-toggle-group-light.png`,
    dark: `/preview_images/buttons/button-toggle-group-dark.png`,
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
  "checkbox-card": {
    light: `/preview_images/checkboxes/checkbox-card-light.png`,
    dark: `/preview_images/checkboxes/checkbox-card-dark.png`,
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
  "identity-verification-dialog": {
    light: `/preview_images/dialogs/identity-verification-dialog-light.png`,
    dark: `/preview_images/dialogs/identity-verification-dialog-dark.png`,
  },
  "add-task-sheet": {
    light: `/preview_images/dialogs/add-task-sheet-light.png`,
    dark: `/preview_images/dialogs/add-task-sheet-dark.png`,
  },
};

/**
 * Upload Components - File upload components
 * Path: /docs/components/[slug]
 */
export const uploadPreview: ComponentPreviewMap = {
  "music-equalizer-upload": {
    light: `/preview_images/upload/music-equalizer-upload-light.png`,
    dark: `/preview_images/upload/music-equalizer-upload-dark.png`,
  },
  "sketchpad-dropzone": {
    light: `/preview_images/upload/sketchpad-dropzone-light.png`,
    dark: `/preview_images/upload/sketchpad-dropzone-dark.png`,
  },
  "stacked-cards-upload": {
    light: `/preview_images/upload/stacked-cards-upload-light.png`,
    dark: `/preview_images/upload/stacked-cards-upload-dark.png`,
  },
  "timeline-upload": {
    light: `/preview_images/upload/timeline-upload-light.png`,
    dark: `/preview_images/upload/timeline-upload-dark.png`,
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
  "audio-timeline-with-chapters": {
    light: `/preview_images/audio-media/audio-timeline-with-chapters-light.png`,
    dark: `/preview_images/audio-media/audio-timeline-with-chapters-dark.png`,
  },
  "playlist-carousel": {
    light: `/preview_images/audio-media/playlist-carousel-light.png`,
    dark: `/preview_images/audio-media/playlist-carousel-dark.png`,
  },
  "voice-message-bubble": {
    light: `/preview_images/audio-media/voice-message-bubble-light.png`,
    dark: `/preview_images/audio-media/voice-message-bubble-dark.png`,
  },
  "visualizer-button": {
    light: `/preview_images/audio-media/visualizer-button-light.png`,
    dark: `/preview_images/audio-media/visualizer-button-dark.png`,
  },
  "audio-book-player": {
    light: `/preview_images/audio-media/audio-book-player-light.png`,
    dark: `/preview_images/audio-media/audio-book-player-dark.png`,
  },
  "podcast-card-player": {
    light: `/preview_images/audio-media/podcast-card-player-light.png`,
    dark: `/preview_images/audio-media/podcast-card-player-dark.png`,
  },
  "waveform-player": {
    light: `/preview_images/audio-media/waveform-player-light.png`,
    dark: `/preview_images/audio-media/waveform-player-dark.png`,
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
  "live-preview-style-select": {
    light: `/preview_images/select/live-preview-style-select-light.png`,
    dark: `/preview_images/select/live-preview-style-select-dark.png`,
  },
};

/**
 * Chat Components - Chat and messaging components
 * Path: /docs/components/[slug]
 */
export const chatPreview: ComponentPreviewMap = {
  "ruixen-moon-chat": {
    light: `${BASE_URL}/popular/ruixen-moon-chat.jpg`,
    dark: `${BASE_URL}/popular/ruixen-moon-chat.jpg`,
  },
};

/**
 * Inputs - Form input components
 * Path: /docs/components/[slug]
 */
export const inputsPreview: ComponentPreviewMap = {
  "circular-stepper-input": {
    light: `/preview_images/inputs/circular-stepper-input-light.png`,
    dark: `/preview_images/inputs/circular-stepper-input-dark.png`,
  },
  "password-strength-input": {
    light: `/preview_images/inputs/password-strength-input-light.png`,
    dark: `/preview_images/inputs/password-strength-input-dark.png`,
  },
  "otp-input": {
    light: `${BASE_URL}/inputs/otp-input-light.jpg`,
    dark: `${BASE_URL}/inputs/otp-input-dark.jpg`,
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
  "search-with-category": {
    light: `/preview_images/inputs/search-with-category-light.png`,
    dark: `/preview_images/inputs/search-with-category-dark.png`,
  },
  "input-with-select": {
    light: `/preview_images/inputs/input-with-select-light.png`,
    dark: `/preview_images/inputs/input-with-select-dark.png`,
  },
  "range-slider-input": {
    light: `/preview_images/inputs/range-slider-input-light.png`,
    dark: `/preview_images/inputs/range-slider-input-dark.png`,
  },
  "url-input": {
    light: `/preview_images/inputs/url-input-light.png`,
    dark: `/preview_images/inputs/url-input-dark.png`,
  },
  "floating-input": {
    light: `/preview_images/inputs/floating-input-light.png`,
    dark: `/preview_images/inputs/floating-input-dark.png`,
  },
  "time-with-icon": {
    light: `/preview_images/inputs/time-with-icon-light.png`,
    dark: `/preview_images/inputs/time-with-icon-dark.png`,
  },
  "otp-field": {
    light: `/preview_images/inputs/otp-field-light.png`,
    dark: `/preview_images/inputs/otp-field-dark.png`,
  },
  "modern-card-input": {
    light: `/preview_images/inputs/modern-card-input-light.png`,
    dark: `/preview_images/inputs/modern-card-input-dark.png`,
  },
  "password-field": {
    light: `/preview_images/inputs/password-field-light.png`,
    dark: `/preview_images/inputs/password-field-dark.png`,
  },
  "smart-assist-input": {
    light: `/preview_images/inputs/smart-assist-input-light.png`,
    dark: `/preview_images/inputs/smart-assist-input-dark.png`,
  },
  "action-hub-input": {
    light: `/preview_images/inputs/action-hub-input-light.png`,
    dark: `/preview_images/inputs/action-hub-input-dark.png`,
  },
};

/**
 * Notifications - Notification and alert components
 * Path: /docs/components/[slug]
 */
export const notificationsPreview: ComponentPreviewMap = {
  "smart-notify-button": {
    light: `/preview_images/notifications/smart-notify-button-light.png`,
    dark: `/preview_images/notifications/smart-notify-button-dark.png`,
  },
  "cookie-notice": {
    light: `/preview_images/notifications/cookie-notice-light.png`,
    dark: `/preview_images/notifications/cookie-notice-dark.png`,
  },
  "notification-badge": {
    light: `/preview_images/notifications/notification-badge-light.png`,
    dark: `/preview_images/notifications/notification-badge-dark.png`,
  },
  "notifications-popover": {
    light: `/preview_images/notifications/notifications-popover-light.png`,
    dark: `/preview_images/notifications/notifications-popover-dark.png`,
  },
  "notification-inbox-popover": {
    light: `/preview_images/notifications/notification-inbox-popover-light.png`,
    dark: `/preview_images/notifications/notification-inbox-popover-dark.png`,
  },
  "tour-popover": {
    light: `/preview_images/notifications/tour-popover-light.png`,
    dark: `/preview_images/notifications/tour-popover-dark.png`,
  },
  notification: {
    light: `/preview_images/notifications/notification-light.png`,
    dark: `/preview_images/notifications/notification-dark.png`,
  },
  "notification-alt": {
    light: `/preview_images/notifications/notification-alt-light.png`,
    dark: `/preview_images/notifications/notification-alt-dark.png`,
  },
  "notifications-with-actions": {
    light: `/preview_images/notifications/notifications-with-actions-light.png`,
    dark: `/preview_images/notifications/notifications-with-actions-dark.png`,
  },
  "notifications-carousel": {
    light: `/preview_images/notifications/notifications-carousel-light.png`,
    dark: `/preview_images/notifications/notifications-carousel-dark.png`,
  },
  "notification-toggle": {
    light: `/preview_images/notifications/notification-toggle-light.png`,
    dark: `/preview_images/notifications/notification-toggle-dark.png`,
  },
  "notifications-filter": {
    light: `/preview_images/notifications/notifications-filter-light.png`,
    dark: `/preview_images/notifications/notifications-filter-dark.png`,
  },
  "avatar-notifications": {
    light: `/preview_images/notifications/avatar-notifications-light.png`,
    dark: `/preview_images/notifications/avatar-notifications-dark.png`,
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
 * Context Menu - Right-click context menu components
 * Path: /docs/components/[slug]
 */
export const contextMenuPreview: ComponentPreviewMap = {
  "advanced-context-menu": {
    light: `/preview_images/context-menu/advanced-context-menu-light.png`,
    dark: `/preview_images/context-menu/advanced-context-menu-dark.png`,
  },
  "user-context-menu": {
    light: `/preview_images/context-menu/user-context-menu-light.png`,
    dark: `/preview_images/context-menu/user-context-menu-dark.png`,
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
  "sign-in-form": {
    light: `/preview_images/forms/sign-in-form-light.png`,
    dark: `/preview_images/forms/sign-in-form-dark.png`,
  },
  "create-account-form": {
    light: `/preview_images/forms/create-account-form-light.png`,
    dark: `/preview_images/forms/create-account-form-dark.png`,
  },
  "newsletter-form": {
    light: `/preview_images/forms/newsletter-form-light.png`,
    dark: `/preview_images/forms/newsletter-form-dark.png`,
  },
  "sign-in-card": {
    light: `/preview_images/forms/sign-in-card-light.png`,
    dark: `/preview_images/forms/sign-in-card-dark.png`,
  },
  "flip-card": {
    light: `/preview_images/forms/flip-card-light.png`,
    dark: `/preview_images/forms/flip-card-dark.png`,
  },
  "success-login-card": {
    light: `/preview_images/forms/success-login-card-light.png`,
    dark: `/preview_images/forms/success-login-card-dark.png`,
  },
  "step-card": {
    light: `/preview_images/forms/step-card-light.png`,
    dark: `/preview_images/forms/step-card-dark.png`,
  },
  "radio-group-card": {
    light: `/preview_images/forms/radio-group-card-light.png`,
    dark: `/preview_images/forms/radio-group-card-dark.png`,
  },
  "emoji-radio-group": {
    light: `/preview_images/forms/emoji-radio-group-light.png`,
    dark: `/preview_images/forms/emoji-radio-group-dark.png`,
  },
  "sentiment-radio-group": {
    light: `/preview_images/forms/sentiment-radio-group-light.png`,
    dark: `/preview_images/forms/sentiment-radio-group-dark.png`,
  },
  "rating-scale-group": {
    light: `/preview_images/forms/rating-scale-group-light.png`,
    dark: `/preview_images/forms/rating-scale-group-dark.png`,
  },
  "review-filter-bars": {
    light: `/preview_images/forms/review-filter-bars-light.png`,
    dark: `/preview_images/forms/review-filter-bars-dark.png`,
  },
  "auth-tabs-card": {
    light: `/preview_images/forms/auth-tabs-card-light.png`,
    dark: `/preview_images/forms/auth-tabs-card-dark.png`,
  },
  "gamified-login-card": {
    light: `/preview_images/forms/gamified-login-card-light.png`,
    dark: `/preview_images/forms/gamified-login-card-dark.png`,
  },
  "social-auth-card": {
    light: `/preview_images/forms/social-auth-card-light.png`,
    dark: `/preview_images/forms/social-auth-card-dark.png`,
  },
  "login-card": {
    light: `/preview_images/forms/login-card-light.png`,
    dark: `/preview_images/forms/login-card-dark.png`,
  },
  "multi-step-login": {
    light: `/preview_images/forms/multi-step-login-light.png`,
    dark: `/preview_images/forms/multi-step-login-dark.png`,
  },
  "split-login-card": {
    light: `/preview_images/forms/split-login-card-light.png`,
    dark: `/preview_images/forms/split-login-card-dark.png`,
  },
  "cloud-watch-form": {
    light: `/preview_images/forms/cloud-watch-form-light.png`,
    dark: `/preview_images/forms/cloud-watch-form-dark.png`,
  },
};

/**
 * File Management - File tree and management components
 * Path: /docs/components/[slug]
 */
export const fileManagementPreview: ComponentPreviewMap = {
  "file-tree-manager": {
    light: `/preview_images/file-management/file-tree-manager-light.png`,
    dark: `/preview_images/file-management/file-tree-manager-dark.png`,
  },
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
  "sortable-table": {
    light: `/preview_images/tables/sortable-table-light.png`,
    dark: `/preview_images/tables/sortable-table-dark.png`,
  },
  "table-edit": {
    light: `/preview_images/tables/table-edit-light.png`,
    dark: `/preview_images/tables/table-edit-dark.png`,
  },
  "table-with-dialog": {
    light: `/preview_images/tables/table-with-dialog-light.png`,
    dark: `/preview_images/tables/table-with-dialog-dark.png`,
  },
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
export const datePickersPreview: ComponentPreviewMap = {
  "date-time-picker": {
    light: `/preview_images/date-pickers/date-time-picker-light.png`,
    dark: `/preview_images/date-pickers/date-time-picker-dark.png`,
  },
  "date-range-picker": {
    light: `/preview_images/date-pickers/date-range-picker-light.png`,
    dark: `/preview_images/date-pickers/date-range-picker-dark.png`,
  },
};

/**
 * Calendars - Calendar display components
 * Path: /docs/components/[slug]
 */
export const calendarsPreview: ComponentPreviewMap = {
  "monthly-heatmap-calendar": {
    light: `/preview_images/calendars/monthly-heatmap-calendar-light.png`,
    dark: `/preview_images/calendars/monthly-heatmap-calendar-dark.png`,
  },
  "multi-month-calendar": {
    light: `/preview_images/calendars/multi-month-calendar-light.png`,
    dark: `/preview_images/calendars/multi-month-calendar-dark.png`,
  },
  "calendar-with-presets": {
    light: `/preview_images/calendars/calendar-with-presets-light.png`,
    dark: `/preview_images/calendars/calendar-with-presets-dark.png`,
  },
  "universal-date-picker": {
    light: `/preview_images/calendars/universal-date-picker-light.png`,
    dark: `/preview_images/calendars/universal-date-picker-dark.png`,
  },
  "date-time-input": {
    light: `/preview_images/calendars/date-time-input-light.png`,
    dark: `/preview_images/calendars/date-time-input-dark.png`,
  },
  "dropdown-range-date-picker": {
    light: `/preview_images/calendars/dropdown-range-date-picker-light.png`,
    dark: `/preview_images/calendars/dropdown-range-date-picker-dark.png`,
  },
  "dropdown-multi-calendar": {
    light: `/preview_images/calendars/dropdown-multi-calendar-light.png`,
    dark: `/preview_images/calendars/dropdown-multi-calendar-dark.png`,
  },
  "multi-select-calendar-card": {
    light: `/preview_images/calendars/multi-select-calendar-card-light.png`,
    dark: `/preview_images/calendars/multi-select-calendar-card-dark.png`,
  },
  "side-panel-multi-calendar": {
    light: `/preview_images/calendars/side-panel-multi-calendar-light.png`,
    dark: `/preview_images/calendars/side-panel-multi-calendar-dark.png`,
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
  scheduler: {
    light: `/preview_images/event-calendars/scheduler-light.png`,
    dark: `/preview_images/event-calendars/scheduler-dark.png`,
  },
  "daily-timeline-scheduler": {
    light: `/preview_images/event-calendars/daily-timeline-scheduler-light.png`,
    dark: `/preview_images/event-calendars/daily-timeline-scheduler-dark.png`,
  },
  "inbox-calendar": {
    light: `/preview_images/event-calendars/inbox-calendar-light.png`,
    dark: `/preview_images/event-calendars/inbox-calendar-dark.png`,
  },
  "event-constellation-calendar": {
    light: `${BASE_URL}/calendars/event-constellation-calendar-light.jpg`,
    dark: `${BASE_URL}/calendars/event-constellation-calendar-dark.jpg`,
  },
  "three-dwall-calendar": {
    light: `${BASE_URL}/popular/three-dwall-calendar-light.jpg`,
    dark: `${BASE_URL}/popular/three-dwall-calendar-dark.jpg`,
  },
  "task-orbit-calendar": {
    light: `/preview_images/event-calendars/task-orbit-calendar-light.png`,
    dark: `/preview_images/event-calendars/task-orbit-calendar-dark.png`,
  },
  "radial-week-view": {
    light: `/preview_images/event-calendars/radial-week-view-light.png`,
    dark: `/preview_images/event-calendars/radial-week-view-dark.png`,
  },
  "stacked-bar-calendar": {
    light: `/preview_images/event-calendars/stacked-bar-calendar-light.png`,
    dark: `/preview_images/event-calendars/stacked-bar-calendar-dark.png`,
  },
  "heatmap-calendar": {
    light: `/preview_images/event-calendars/heatmap-calendar-light.png`,
    dark: `/preview_images/event-calendars/heatmap-calendar-dark.png`,
  },
  "event-calendar": {
    light: `${BASE_URL}/calendars/event-calendar-light.jpg`,
    dark: `${BASE_URL}/calendars/event-calendar-dark.jpg`,
  },
  "priority-pyramid-calendar": {
    light: `${BASE_URL}/calendars/priority-pyramid-calendar-light.jpg`,
    dark: `${BASE_URL}/calendars/priority-pyramid-calendar-dark.jpg`,
  },
  "event-path-calendar": {
    light: `/preview_images/event-calendars/event-path-calendar-light.png`,
    dark: `/preview_images/event-calendars/event-path-calendar-dark.png`,
  },
  "wheel-of-time-calendar": {
    light: `${BASE_URL}/calendars/wheel-of-time-calendar-light.jpg`,
    dark: `${BASE_URL}/calendars/wheel-of-time-calendar-dark.jpg`,
  },
  "particle-flow-calendar": {
    light: `/preview_images/event-calendars/particle-flow-calendar-light.png`,
    dark: `/preview_images/event-calendars/particle-flow-calendar-dark.png`,
  },
  "event-aquarium-calendar": {
    light: `/preview_images/event-calendars/event-aquarium-calendar-light.png`,
    dark: `/preview_images/event-calendars/event-aquarium-calendar-dark.png`,
  },
  "origami-fold-out-calendar": {
    light: `/preview_images/event-calendars/origami-fold-out-calendar-light.png`,
    dark: `/preview_images/event-calendars/origami-fold-out-calendar-dark.png`,
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
  "pill-calendar": {
    light: `/preview_images/event-calendars/pill-calendar-light.png`,
    dark: `/preview_images/event-calendars/pill-calendar-dark.png`,
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
  "image-cropper": {
    light: `/preview_images/image-tools/image-cropper-light.png`,
    dark: `/preview_images/image-tools/image-cropper-dark.png`,
  },
  "advanced-image-uploader": {
    light: `/preview_images/image-tools/advanced-image-uploader-light.png`,
    dark: `/preview_images/image-tools/advanced-image-uploader-dark.png`,
  },
  "interactive-image-gallery": {
    light: `${BASE_URL}/images/interactive-image-gallery-light.webp`,
    dark: `${BASE_URL}/images/interactive-image-gallery-dark.webp`,
  },
  "product-image-card": {
    light: `${BASE_URL}/cards/product-image-card-light.webp`,
    dark: `${BASE_URL}/cards/product-image-card-dark.webp`,
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
 * Effects - Visual effect components
 * Path: /docs/components/[slug]
 */
export const effectsPreview: ComponentPreviewMap = {
  "container-text-scroll": {
    light: `/preview_images/effects/container-text-scroll-light.png`,
    dark: `/preview_images/effects/container-text-scroll-dark.png`,
  },
  globe: {
    light: `${BASE_URL}/popular/globe-light.jpg`,
    dark: `${BASE_URL}/popular/globe-dark.jpg`,
  },
};

/**
 * Backgrounds - Background effect components
 * Path: /docs/components/[slug]
 */
export const backgroundsPreview: ComponentPreviewMap = {
  "wave-background": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
  },
  "aurora-flow": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
  },
  "aurora-waves": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
  },
  "falling-symbols-background": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
  },
  "spotlight-background": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
  },
  "ripple-distortion": {
    light: `${BASE_URL}/popular/ripple-distortion-light.jpg`,
    dark: `${BASE_URL}/popular/ripple-distortion-dark.png`,
  },
  "particle-field": {
    light: `/preview_images/backgrounds/particle-field-light.png`,
    dark: `/preview_images/backgrounds/particle-field-dark.png`,
  },
  "particle-text-dots": {
    light: `/preview_images/backgrounds/particle-text-dots-light.png`,
    dark: `/preview_images/backgrounds/particle-text-dots-dark.png`,
  },
  "rain-background": {
    light: `/preview_images/backgrounds/rain-background-light.png`,
    dark: `/preview_images/backgrounds/rain-background-dark.png`,
  },
  "dual-tone-rain-background": {
    light: `/preview_images/backgrounds/dual-tone-rain-background-light.png`,
    dark: `/preview_images/backgrounds/dual-tone-rain-background-dark.png`,
  },
  "mouse-spark": {
    light: `/preview_images/backgrounds/mouse-spark-light.png`,
    dark: `/preview_images/backgrounds/mouse-spark-dark.png`,
  },
  "rising-glow": {
    light: `${BASE_URL}/texts/lumina-light.png`,
    dark: `${BASE_URL}/texts/lumina-dark.png`,
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
  "badge-tabs": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
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
  "magnetic-dock": {
    light: `/preview_images/docks/magnetic-dock-light.png`,
    dark: `/preview_images/docks/magnetic-dock-dark.png`,
  },
  "gooey-dock": {
    light: `/preview_images/docks/gooey-dock-light.png`,
    dark: `/preview_images/docks/gooey-dock-dark.png`,
  },
  "tilted-dock": {
    light: `/preview_images/docks/tilted-dock-light.png`,
    dark: `/preview_images/docks/tilted-dock-dark.png`,
  },
  "dock-morph": {
    light: `/preview_images/docks/dock-morph-light.png`,
    dark: `/preview_images/docks/dock-morph-dark.png`,
  },
  dock: {
    light: `/preview_images/docks/dock-light.png`,
    dark: `/preview_images/docks/dock-dark.png`,
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
};

/**
 * Charts - Data visualization chart components
 * Path: /docs/components/[slug]
 */
export const chartsPreview: ComponentPreviewMap = {
  "funnel-chart": {
    light: `/preview_images/charts/funnel-chart-light.png`,
    dark: `/preview_images/charts/funnel-chart-dark.png`,
  },
  "waterfall-chart": {
    light: `/preview_images/charts/waterfall-chart-light.png`,
    dark: `/preview_images/charts/waterfall-chart-dark.png`,
  },
  "bubble-chart": {
    light: `/preview_images/charts/bubble-chart-light.png`,
    dark: `/preview_images/charts/bubble-chart-dark.png`,
  },
  "stream-chart": {
    light: `/preview_images/charts/stream-chart-light.png`,
    dark: `/preview_images/charts/stream-chart-dark.png`,
  },
  "bullet-chart": {
    light: `/preview_images/charts/bullet-chart-light.png`,
    dark: `/preview_images/charts/bullet-chart-dark.png`,
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
  "compact-accordion": {
    light: `/preview_images/faqs/compact-accordion-light.png`,
    dark: `/preview_images/faqs/compact-accordion-dark.png`,
  },
};

/**
 * Hero Sections - Landing page hero components
 * Path: /docs/components/[slug]
 */
export const heroSectionsPreview: ComponentPreviewMap = {
  "aurora-hero-section": {
    light: `/preview_images/hero-sections/aurora-hero-section-light.png`,
    dark: `/preview_images/hero-sections/aurora-hero-section-dark.png`,
  },
  "card-carousel-hero": {
    light: `/preview_images/hero-sections/card-carousel-hero-light.png`,
    dark: `/preview_images/hero-sections/card-carousel-hero-dark.png`,
  },
  "gradient-hero-showcase": {
    light: `/preview_images/hero-sections/gradient-hero-showcase-light.png`,
    dark: `/preview_images/hero-sections/gradient-hero-showcase-dark.png`,
  },
  "spectrum-hero-section": {
    light: `/preview_images/hero-sections/spectrum-hero-section-light.png`,
    dark: `/preview_images/hero-sections/spectrum-hero-section-dark.png`,
  },
  "video-hero-showcase": {
    light: `/preview_images/hero-sections/video-hero-showcase-light.png`,
    dark: `/preview_images/hero-sections/video-hero-showcase-dark.png`,
  },
  "visionary-hero-section": {
    light: `/preview_images/hero-sections/visionary-hero-section-light.png`,
    dark: `/preview_images/hero-sections/visionary-hero-section-dark.png`,
  },
  "hero-title-slide": {
    light: `/preview_images/hero-sections/hero-title-slide-light.png`,
    dark: `/preview_images/hero-sections/hero-title-slide-dark.png`,
  },
  "hero-section-glass-web": {
    light: `/preview_images/hero-sections/hero-section-glass-web-light.png`,
    dark: `/preview_images/hero-sections/hero-section-glass-web-dark.png`,
  },
};

/**
 * Featured Section - Feature showcase components
 * Path: /docs/components/[slug]
 */
export const featuredSectionPreview: ComponentPreviewMap = {
  "featured-highlights": {
    light: `/preview_images/featured-sections/featured-highlights-light.png`,
    dark: `/preview_images/featured-sections/featured-highlights-dark.png`,
  },
  "feature-grid-section": {
    light: `/preview_images/featured-sections/feature-grid-section-light.png`,
    dark: `/preview_images/featured-sections/feature-grid-section-dark.png`,
  },
  "feature-tabs-showcase": {
    light: `/preview_images/featured-sections/feature-tabs-showcase-light.png`,
    dark: `/preview_images/featured-sections/feature-tabs-showcase-dark.png`,
  },
  "composite-feature-showcase": {
    light: `/preview_images/component-improvement.png`,
    dark: `/preview_images/component-improvement.png`,
  },
  "integration-and-stats-section": {
    light: `/preview_images/featured-sections/integration-and-stats-section-light.png`,
    dark: `/preview_images/featured-sections/integration-and-stats-section-dark.png`,
  },
  "tech-orbit-showcase": {
    light: `/preview_images/featured-sections/tech-orbit-showcase-light.png`,
    dark: `/preview_images/featured-sections/tech-orbit-showcase-dark.png`,
  },
  "partner-integrations-grid": {
    light: `/preview_images/featured-sections/partner-integrations-grid-light.png`,
    dark: `/preview_images/featured-sections/partner-integrations-grid-dark.png`,
  },
  "analytics-dashboard-stats": {
    light: `/preview_images/featured-sections/analytics-dashboard-stats-light.png`,
    dark: `/preview_images/featured-sections/analytics-dashboard-stats-dark.png`,
  },
  "ruixen-dashboard-stats": {
    light: `/preview_images/featured-sections/ruixen-dashboard-stats-light.png`,
    dark: `/preview_images/featured-sections/ruixen-dashboard-stats-dark.png`,
  },
  "feature-carousel": {
    light: `/preview_images/featured-sections/feature-carousel-light.png`,
    dark: `/preview_images/featured-sections/feature-carousel-dark.png`,
  },
  "crm-insights-panel": {
    light: `/preview_images/featured-sections/crm-insights-panel-light.png`,
    dark: `/preview_images/featured-sections/crm-insights-panel-dark.png`,
  },
  "multi-orbit-semi-circle": {
    light: `/preview_images/featured-sections/multi-orbit-semi-circle-light.png`,
    dark: `/preview_images/featured-sections/multi-orbit-semi-circle-dark.png`,
  },
  "rotating-gradient-right": {
    light: `/preview_images/featured-sections/rotating-gradient-right-light.png`,
    dark: `/preview_images/featured-sections/rotating-gradient-right-dark.png`,
  },
  "automated-tasks-panel": {
    light: `/preview_images/featured-sections/automated-tasks-panel-light.png`,
    dark: `/preview_images/featured-sections/automated-tasks-panel-dark.png`,
  },
  "case-studies": {
    light: `/preview_images/featured-sections/case-studies-light.png`,
    dark: `/preview_images/featured-sections/case-studies-dark.png`,
  },
  "core-value-stats": {
    light: `/preview_images/featured-sections/core-value-stats-light.png`,
    dark: `/preview_images/featured-sections/core-value-stats-dark.png`,
  },
  "feature-slide-showcase": {
    light: `/preview_images/featured-sections/feature-slide-showcase-light.png`,
    dark: `/preview_images/featured-sections/feature-slide-showcase-dark.png`,
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
  "footer-extended": {
    light: `/preview_images/footer-sections/footer-extended-light.png`,
    dark: `/preview_images/footer-sections/footer-extended-dark.png`,
  },
  "footer-enterprise": {
    light: `/preview_images/footer-sections/footer-enterprise-light.png`,
    dark: `/preview_images/footer-sections/footer-enterprise-dark.png`,
  },
  "footer-mega": {
    light: `/preview_images/footer-sections/footer-mega-light.png`,
    dark: `/preview_images/footer-sections/footer-mega-dark.png`,
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
  ...alertsPreview,
  ...avatarsPreview,
  ...badgesPreview,
  ...bannersPreview,
  ...breadcrumbsPreview,
  ...navbarsPreview,
  ...cardsPreview,
  ...buttonsPreview,
  ...checkboxesPreview,
  ...loadersPreview,
  ...dialogsPreview,
  ...uploadPreview,
  ...breadcrumbPreview,
  ...audioMediaPreview,
  ...selectPreview,
  ...chatPreview,
  ...inputsPreview,
  ...notificationsPreview,
  ...menuPreview,
  ...contextMenuPreview,
  ...drawerPreview,
  ...formsPreview,
  ...fileManagementPreview,
  ...tablesPreview,
  ...datePickersPreview,
  ...calendarsPreview,
  ...eventCalendarsPreview,
  ...imageToolsPreview,
  ...videoPlayersPreview,
  ...effectsPreview,
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
    alerts: alertsPreview,
    avatars: avatarsPreview,
    badges: badgesPreview,
    banners: bannersPreview,
    breadcrumbs: breadcrumbsPreview,
    navbars: navbarsPreview,
    cards: cardsPreview,
    buttons: buttonsPreview,
    checkboxes: checkboxesPreview,
    loaders: loadersPreview,
    dialogs: dialogsPreview,
    "upload-components": uploadPreview,
    breadcrumb: breadcrumbPreview,
    "audio-and-media": audioMediaPreview,
    "select-components": selectPreview,
    "chat-components": chatPreview,
    inputs: inputsPreview,
    notifications: notificationsPreview,
    menu: menuPreview,
    "context-menu": contextMenuPreview,
    drawer: drawerPreview,
    forms: formsPreview,
    "file-management": fileManagementPreview,
    tables: tablesPreview,
    "date-pickers": datePickersPreview,
    calendars: calendarsPreview,
    "event-calendars": eventCalendarsPreview,
    "image-tools": imageToolsPreview,
    "video-players": videoPlayersPreview,
    effects: effectsPreview,
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
