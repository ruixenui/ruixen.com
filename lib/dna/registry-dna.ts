/**
 * REGISTRY DNA MAPPING
 *
 * Maps ruixen.com registry components to their DNA profiles.
 * This allows MCP to lookup components by DNA fingerprint.
 */

import { ComponentDNA } from "./types";

// ─── COMPONENT DNA PROFILES ──────────────────────────────────────

export const REGISTRY_DNA: Record<string, ComponentDNA> = {
  // ═══════════════════════════════════════════════════════════════
  // DROPDOWNS & MENUS
  // ═══════════════════════════════════════════════════════════════
  "account-menu": {
    type: "dropdown",
    interaction: ["click", "keyboard", "hover", "outside-dismiss"],
    a11y: ["aria-expanded", "keyboard-nav", "focus-visible"],
    layout: ["portal"],
    animation: ["spring"],
    variants: ["with-submenu", "with-icons"],
  },
  "app-menu-bar": {
    type: "menu",
    interaction: ["click", "keyboard", "hover"],
    a11y: ["aria-expanded", "keyboard-nav", "focus-visible"],
    layout: ["portal", "fixed"],
    animation: ["spring"],
    variants: ["horizontal", "with-icons"],
  },
  "context-menu-demo": {
    type: "menu",
    interaction: ["click", "keyboard", "outside-dismiss"],
    a11y: ["aria-expanded", "keyboard-nav"],
    layout: ["portal", "floating-position"],
    animation: ["spring-snappy"],
    variants: ["context-menu"],
  },
  "command-palette": {
    type: "modal",
    interaction: ["keyboard", "escape-dismiss"],
    a11y: ["focus-trap", "aria-expanded", "keyboard-nav"],
    layout: ["portal", "overlay"],
    animation: ["spring-smooth"],
    variants: ["command", "searchable"],
  },

  // ═══════════════════════════════════════════════════════════════
  // MODALS & DIALOGS
  // ═══════════════════════════════════════════════════════════════
  "modal-demo": {
    type: "modal",
    interaction: ["click", "keyboard", "escape-dismiss", "outside-dismiss"],
    a11y: ["focus-trap", "aria-modal", "keyboard-nav", "reduced-motion"],
    layout: ["portal", "overlay", "fixed"],
    animation: ["spring-smooth"],
    variants: [],
  },
  "dialog-demo": {
    type: "dialog",
    interaction: ["click", "keyboard", "escape-dismiss"],
    a11y: ["focus-trap", "aria-modal", "reduced-motion"],
    layout: ["portal", "overlay"],
    animation: ["spring-smooth"],
    variants: [],
  },
  "sheet-demo": {
    type: "drawer",
    interaction: ["click", "keyboard", "escape-dismiss", "outside-dismiss"],
    a11y: ["focus-trap", "aria-modal", "reduced-motion"],
    layout: ["portal", "overlay", "fixed"],
    animation: ["spring-smooth"],
    variants: ["side-panel"],
  },
  "add-task-sheet": {
    type: "drawer",
    interaction: ["click", "keyboard", "escape-dismiss"],
    a11y: ["focus-trap", "aria-modal"],
    layout: ["portal", "overlay"],
    animation: ["spring-smooth"],
    variants: ["form-sheet"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BUTTONS
  // ═══════════════════════════════════════════════════════════════
  "add-to-cart-button": {
    type: "button",
    interaction: ["click", "hover", "keyboard"],
    a11y: ["focus-visible", "aria-pressed"],
    layout: [],
    animation: ["spring-snappy"],
    variants: ["with-icon", "loading-state"],
  },
  "animated-subscribe-button": {
    type: "button",
    interaction: ["click", "hover"],
    a11y: ["focus-visible", "reduced-motion"],
    layout: [],
    animation: ["spring-bouncy"],
    variants: ["animated", "subscribe"],
  },
  "badge-button-combo": {
    type: "button",
    interaction: ["click", "hover"],
    a11y: ["focus-visible"],
    layout: [],
    animation: ["spring-snappy"],
    variants: ["with-badge"],
  },
  "shine-button": {
    type: "button",
    interaction: ["click", "hover"],
    a11y: ["focus-visible", "reduced-motion"],
    layout: [],
    animation: ["spring-snappy"],
    variants: ["shine-effect"],
  },
  "magnetic-button": {
    type: "button",
    interaction: ["click", "hover"],
    a11y: ["focus-visible", "reduced-motion"],
    layout: [],
    animation: ["spring", "velocity-aware"],
    variants: ["magnetic"],
  },

  // ═══════════════════════════════════════════════════════════════
  // ACCORDIONS
  // ═══════════════════════════════════════════════════════════════
  "accordion-editorial": {
    type: "accordion",
    interaction: ["click", "keyboard"],
    a11y: ["aria-expanded", "keyboard-nav", "focus-visible"],
    layout: ["dynamic-height"],
    animation: ["spring"],
    variants: ["editorial"],
  },
  "accordion-indexed": {
    type: "accordion",
    interaction: ["click", "keyboard"],
    a11y: ["aria-expanded", "keyboard-nav"],
    layout: ["dynamic-height"],
    animation: ["spring"],
    variants: ["indexed", "numbered"],
  },
  "staggered-faq-section": {
    type: "accordion",
    interaction: ["click", "keyboard"],
    a11y: ["aria-expanded", "keyboard-nav", "reduced-motion"],
    layout: ["dynamic-height"],
    animation: ["spring", "stagger"],
    variants: ["faq"],
  },

  // ═══════════════════════════════════════════════════════════════
  // TABS
  // ═══════════════════════════════════════════════════════════════
  "tabs-demo": {
    type: "tabs",
    interaction: ["click", "keyboard"],
    a11y: ["aria-selected", "keyboard-nav", "focus-visible"],
    layout: [],
    animation: ["spring"],
    variants: [],
  },
  "folder-tabs": {
    type: "tabs",
    interaction: ["click", "keyboard"],
    a11y: ["aria-selected", "keyboard-nav"],
    layout: [],
    animation: ["spring-snappy"],
    variants: ["folder-style"],
  },

  // ═══════════════════════════════════════════════════════════════
  // TOASTS & NOTIFICATIONS
  // ═══════════════════════════════════════════════════════════════
  "toast-demo": {
    type: "toast",
    interaction: ["click", "keyboard", "swipe"],
    a11y: ["aria-live", "reduced-motion"],
    layout: ["portal", "fixed"],
    animation: ["spring-bouncy"],
    variants: [],
  },
  "notification-card": {
    type: "notification",
    interaction: ["click"],
    a11y: ["aria-live"],
    layout: [],
    animation: ["spring"],
    variants: ["card"],
  },
  "banner-announcement": {
    type: "notification",
    interaction: ["click"],
    a11y: ["aria-live"],
    layout: ["fixed"],
    animation: ["spring-smooth"],
    variants: ["banner", "dismissible"],
  },

  // ═══════════════════════════════════════════════════════════════
  // INPUTS & FORMS
  // ═══════════════════════════════════════════════════════════════
  "ai-chat-input": {
    type: "input",
    interaction: ["keyboard", "focus"],
    a11y: ["aria-label", "focus-visible"],
    layout: [],
    animation: ["spring"],
    variants: ["chat", "with-attachments"],
  },
  "search-input-cmd-k": {
    type: "input",
    interaction: ["keyboard", "focus"],
    a11y: ["aria-label", "keyboard-nav"],
    layout: [],
    animation: ["spring"],
    variants: ["search", "with-shortcut"],
  },
  "otp-input": {
    type: "input",
    interaction: ["keyboard", "focus"],
    a11y: ["aria-label", "focus-visible"],
    layout: [],
    animation: ["spring-snappy"],
    variants: ["otp", "pin-code"],
  },

  // ═══════════════════════════════════════════════════════════════
  // CARDS
  // ═══════════════════════════════════════════════════════════════
  "pricing-card-demo": {
    type: "card",
    interaction: ["hover"],
    a11y: ["focus-visible"],
    layout: [],
    animation: ["spring"],
    variants: ["pricing"],
  },
  "product-card": {
    type: "card",
    interaction: ["click", "hover"],
    a11y: ["focus-visible"],
    layout: [],
    animation: ["spring"],
    variants: ["product", "with-image"],
  },
  "stat-card-glowing": {
    type: "card",
    interaction: ["hover"],
    a11y: [],
    layout: [],
    animation: ["spring"],
    variants: ["stat", "glowing"],
  },
  "github-repo-card": {
    type: "card",
    interaction: ["click", "hover"],
    a11y: ["focus-visible"],
    layout: [],
    animation: ["spring"],
    variants: ["github", "repo"],
  },

  // ═══════════════════════════════════════════════════════════════
  // AVATARS
  // ═══════════════════════════════════════════════════════════════
  "avatar-hover-card": {
    type: "avatar",
    interaction: ["hover"],
    a11y: ["aria-label"],
    layout: ["portal"],
    animation: ["spring"],
    variants: ["with-hover-card"],
  },
  "avatar-circles": {
    type: "avatar",
    interaction: [],
    a11y: ["aria-label"],
    layout: [],
    animation: [],
    variants: ["stacked", "group"],
  },
  "avatar-spring-stack": {
    type: "avatar",
    interaction: ["hover"],
    a11y: ["aria-label", "reduced-motion"],
    layout: [],
    animation: ["spring", "stagger"],
    variants: ["animated-stack"],
  },

  // ═══════════════════════════════════════════════════════════════
  // TOGGLES & SWITCHES
  // ═══════════════════════════════════════════════════════════════
  "animated-theme-toggler": {
    type: "switch",
    interaction: ["click", "keyboard"],
    a11y: ["aria-checked", "focus-visible", "reduced-motion"],
    layout: [],
    animation: ["spring"],
    variants: ["theme-toggle", "with-icons"],
  },
  "switch-demo": {
    type: "switch",
    interaction: ["click", "keyboard"],
    a11y: ["aria-checked", "focus-visible"],
    layout: [],
    animation: ["spring-snappy"],
    variants: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // TOOLTIPS & POPOVERS
  // ═══════════════════════════════════════════════════════════════
  "tooltip-demo": {
    type: "tooltip",
    interaction: ["hover", "focus"],
    a11y: ["aria-describedby"],
    layout: ["portal", "floating-position"],
    animation: ["spring-snappy"],
    variants: [],
  },
  "popover-demo": {
    type: "popover",
    interaction: ["click", "keyboard", "outside-dismiss"],
    a11y: ["aria-expanded", "focus-trap"],
    layout: ["portal", "floating-position"],
    animation: ["spring"],
    variants: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  "navbar-animated": {
    type: "navigation",
    interaction: ["click", "hover", "keyboard"],
    a11y: ["keyboard-nav", "aria-current"],
    layout: ["fixed"],
    animation: ["spring"],
    variants: ["animated", "with-blur"],
  },
  "sidebar-demo": {
    type: "sidebar",
    interaction: ["click", "keyboard"],
    a11y: ["keyboard-nav", "aria-current"],
    layout: [],
    animation: ["spring-smooth"],
    variants: [],
  },
  "breadcrumb-demo": {
    type: "breadcrumb",
    interaction: ["click"],
    a11y: ["aria-label", "aria-current"],
    layout: [],
    animation: [],
    variants: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // LOADERS & PROGRESS
  // ═══════════════════════════════════════════════════════════════
  "animated-circular-progress-bar": {
    type: "loader",
    interaction: [],
    a11y: ["aria-valuenow", "aria-valuemin", "aria-valuemax", "reduced-motion"],
    layout: [],
    animation: ["spring"],
    variants: ["circular", "percentage"],
  },
  "skeleton-demo": {
    type: "skeleton",
    interaction: [],
    a11y: ["aria-busy", "reduced-motion"],
    layout: [],
    animation: [],
    variants: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // STEPPERS
  // ═══════════════════════════════════════════════════════════════
  "wizard-stepper": {
    type: "tabs",
    interaction: ["click", "keyboard"],
    a11y: ["aria-current", "keyboard-nav"],
    layout: [],
    animation: ["spring"],
    variants: ["wizard", "numbered"],
  },
  "milestone-stepper": {
    type: "tabs",
    interaction: ["click"],
    a11y: ["aria-current"],
    layout: [],
    animation: ["spring", "stagger"],
    variants: ["vertical", "timeline"],
  },

  // ═══════════════════════════════════════════════════════════════
  // SELECT & COMBOBOX
  // ═══════════════════════════════════════════════════════════════
  "select-demo": {
    type: "select",
    interaction: ["click", "keyboard", "outside-dismiss"],
    a11y: ["aria-expanded", "aria-selected", "keyboard-nav", "focus-visible"],
    layout: ["portal", "floating-position", "max-height-scroll"],
    animation: ["spring"],
    variants: [],
  },
  "multi-select": {
    type: "select",
    interaction: ["click", "keyboard", "outside-dismiss"],
    a11y: ["aria-expanded", "aria-selected", "keyboard-nav"],
    layout: ["portal", "floating-position", "max-height-scroll"],
    animation: ["spring"],
    variants: ["multi-select"],
  },
  "combobox-demo": {
    type: "select",
    interaction: ["keyboard", "outside-dismiss"],
    a11y: [
      "aria-expanded",
      "aria-selected",
      "keyboard-nav",
      "aria-autocomplete",
    ],
    layout: ["portal", "floating-position", "max-height-scroll"],
    animation: ["spring"],
    variants: ["searchable", "combobox"],
  },

  // ═══════════════════════════════════════════════════════════════
  // TABLES
  // ═══════════════════════════════════════════════════════════════
  "data-table": {
    type: "table",
    interaction: ["click", "keyboard"],
    a11y: ["aria-sort", "keyboard-nav"],
    layout: [],
    animation: [],
    variants: ["sortable", "with-pagination"],
  },

  // ═══════════════════════════════════════════════════════════════
  // CALENDARS & DATE PICKERS
  // ═══════════════════════════════════════════════════════════════
  "calendar-demo": {
    type: "calendar",
    interaction: ["click", "keyboard"],
    a11y: ["aria-selected", "keyboard-nav"],
    layout: [],
    animation: ["spring"],
    variants: [],
  },
  "date-picker-demo": {
    type: "datepicker",
    interaction: ["click", "keyboard", "outside-dismiss"],
    a11y: ["aria-expanded", "keyboard-nav"],
    layout: ["portal", "floating-position"],
    animation: ["spring"],
    variants: [],
  },
};

// ─── DNA FINGERPRINT CREATION ────────────────────────────────────

/**
 * Creates a fingerprint from DNA (must match mcp.ruixen.com algorithm)
 */
export function createDNAFingerprint(dna: ComponentDNA): string {
  const normalized = {
    type: dna.type,
    interaction: [...dna.interaction].sort(),
    a11y: [...dna.a11y].sort(),
    layout: [...dna.layout].sort(),
    animation: [...dna.animation].sort(),
    variants: [...dna.variants].sort(),
  };

  const str = JSON.stringify(normalized);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }

  return `dna_${dna.type}_${Math.abs(hash).toString(16).padStart(8, "0")}`;
}

// ─── DNA SIMILARITY CALCULATION ──────────────────────────────────

/**
 * Calculate similarity between two DNA profiles (0-1)
 */
export function calculateDNASimilarity(
  dna1: ComponentDNA,
  dna2: ComponentDNA,
): number {
  if (dna1.type !== dna2.type) return 0;

  const arrays: (keyof ComponentDNA)[] = [
    "interaction",
    "a11y",
    "layout",
    "animation",
    "variants",
  ];
  let totalScore = 0;
  let totalWeight = 0;

  for (const key of arrays) {
    const arr1 = dna1[key] as string[];
    const arr2 = dna2[key] as string[];

    if (arr1.length === 0 && arr2.length === 0) continue;

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const intersection = arr1.filter((x) => set2.has(x)).length;
    const union = new Set([...arr1, ...arr2]).size;

    const similarity = union > 0 ? intersection / union : 1;
    const weight = key === "interaction" || key === "a11y" ? 2 : 1;

    totalScore += similarity * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 1;
}

// ─── FINGERPRINT TO COMPONENT MAP ────────────────────────────────

let fingerprintMap: Map<string, string> | null = null;

/**
 * Build fingerprint lookup map from registry DNA
 */
export function buildFingerprintMap(): Map<string, string> {
  if (fingerprintMap) return fingerprintMap;

  fingerprintMap = new Map();
  for (const [componentName, dna] of Object.entries(REGISTRY_DNA)) {
    const fingerprint = createDNAFingerprint(dna);
    fingerprintMap.set(fingerprint, componentName);
  }

  return fingerprintMap;
}

/**
 * Look up component by fingerprint
 */
export function lookupByFingerprint(fingerprint: string): string | null {
  const map = buildFingerprintMap();
  return map.get(fingerprint) || null;
}

/**
 * Find best matching component by DNA similarity
 */
export function findBestMatch(
  dna: ComponentDNA,
): { name: string; similarity: number } | null {
  let bestMatch: { name: string; similarity: number } | null = null;

  for (const [componentName, componentDna] of Object.entries(REGISTRY_DNA)) {
    const similarity = calculateDNASimilarity(dna, componentDna);
    if (similarity > 0.7 && (!bestMatch || similarity > bestMatch.similarity)) {
      bestMatch = { name: componentName, similarity };
    }
  }

  return bestMatch;
}

/**
 * Find all similar components
 */
export function findSimilarComponents(
  dna: ComponentDNA,
  limit: number = 5,
): { name: string; similarity: number }[] {
  const results: { name: string; similarity: number }[] = [];

  for (const [componentName, componentDna] of Object.entries(REGISTRY_DNA)) {
    const similarity = calculateDNASimilarity(dna, componentDna);
    if (similarity > 0.5) {
      results.push({ name: componentName, similarity });
    }
  }

  return results.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
}
