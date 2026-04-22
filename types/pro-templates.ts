/**
 * Types mirroring the pro.ruixen.com backend Product schema.
 * Source: pro.ruixen.com/backend/schemas/product.py (ProductResponse).
 *
 * These templates are fetched from the Pro catalog and surfaced on the
 * OSS marketing site. Any purchase, download, or details flow happens on
 * pro.ruixen.com — we only render metadata here.
 */

export type ProductType =
  | "template"
  | "component"
  | "icon_pack"
  | "illustration";

export type TechStack =
  | "react"
  | "nextjs"
  | "vue"
  | "angular"
  | "html_css"
  | "tailwind"
  | "tailwindcss"
  | "figma"
  | "flutter"
  | "react_native"
  | "typescript"
  | "radix-ui"
  | "shadcn-ui"
  | "framer-motion"
  | "react-hook-form"
  | "zod"
  | string;

export interface ProCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  display_order: number;
  is_active: boolean;
  product_count?: number | null;
}

export interface ProProductImage {
  id: number;
  image_url: string;
  alt_text?: string | null;
  display_order: number;
  is_thumbnail: boolean;
}

export interface ProTemplate {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  long_description?: string | null;
  features?: string[] | null;
  product_type: ProductType;
  category?: ProCategory | null;
  tech_stack?: TechStack[] | null;
  price_usd_cents: number;
  is_free: boolean;
  is_included_in_membership: boolean;
  demo_url?: string | null;
  video_url_light?: string | null;
  video_url_dark?: string | null;
  preview_url?: string | null;
  documentation_url?: string | null;
  what_is_this?: string | null;
  who_is_this_for?: string | null;
  highlights?: string[] | null;
  sections_included?: string[] | null;
  dependencies?: Record<string, string> | null;
  is_active: boolean;
  is_featured: boolean;
  coming_soon: boolean;
  download_count: number;
  view_count: number;
  version?: string | null;
  images: ProProductImage[];
  created_timestamp?: string | null;
  updated_timestamp?: string | null;
}

export interface ProTemplateList {
  items: ProTemplate[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
