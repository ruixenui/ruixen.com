/**
 * Read-only client for the pro.ruixen.com backend template catalog.
 *
 * Mirrors the templatesApi client in pro.ruixen.com/frontend/apps/www/lib/api.ts
 * but strips everything that requires auth (cart, purchase, download, reviews).
 * The OSS site only reads the public product list and renders it with links
 * back to pro.ruixen.com.
 */

import type {
  ProCategory,
  ProductType,
  ProTemplate,
  ProTemplateList,
} from "@/types/pro-templates";

const DEFAULT_PRO_API_URL = "https://pro.ruixen.com/api/v1";
const DEFAULT_PRO_SITE_URL = "https://pro.ruixen.com";

export const PRO_SITE_URL = (
  process.env.NEXT_PUBLIC_PRO_SITE_URL || DEFAULT_PRO_SITE_URL
).replace(/\/$/, "");

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_PRO_API_URL || DEFAULT_PRO_API_URL
).replace(/\/$/, "");

export class ProApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ProApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "An error occurred" }));
    throw new ProApiError(error.detail || "Request failed", response.status);
  }
  return response.json() as Promise<T>;
}

interface GetTemplatesParams {
  search?: string;
  category_id?: number;
  product_type?: ProductType;
  tech_stack?: string;
  is_free?: boolean;
  is_featured?: boolean;
  sort_by?: string;
  sort_order?: string;
  page?: number;
  page_size?: number;
  /** Next.js fetch revalidate window in seconds. Default: 5 minutes. */
  revalidate?: number;
}

function buildSearchParams(params?: GetTemplatesParams): string {
  if (!params) return "";
  const search = new URLSearchParams();
  if (params.search) search.set("search", params.search);
  if (params.category_id !== undefined)
    search.set("category_id", String(params.category_id));
  if (params.product_type) search.set("product_type", params.product_type);
  if (params.tech_stack) search.set("tech_stack", params.tech_stack);
  if (params.is_free !== undefined)
    search.set("is_free", String(params.is_free));
  if (params.is_featured !== undefined)
    search.set("is_featured", String(params.is_featured));
  if (params.sort_by) search.set("sort_by", params.sort_by);
  if (params.sort_order) search.set("sort_order", params.sort_order);
  if (params.page) search.set("page", String(params.page));
  if (params.page_size) search.set("page_size", String(params.page_size));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const proTemplatesApi = {
  async getAll(params?: GetTemplatesParams): Promise<ProTemplateList> {
    const url = `${API_BASE_URL}/products${buildSearchParams(params)}`;
    const response = await fetch(url, {
      next: { revalidate: params?.revalidate ?? 300 },
    });
    return handleResponse<ProTemplateList>(response);
  },

  async getFeatured(limit = 10): Promise<ProTemplate[]> {
    const response = await fetch(
      `${API_BASE_URL}/products/featured?limit=${limit}`,
      { next: { revalidate: 300 } },
    );
    return handleResponse<ProTemplate[]>(response);
  },

  async getBySlug(slug: string): Promise<ProTemplate> {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 300 },
    });
    return handleResponse<ProTemplate>(response);
  },

  async getCategories(): Promise<ProCategory[]> {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 600 },
    });
    return handleResponse<ProCategory[]>(response);
  },
};

/**
 * Build a deep link to the template detail page on pro.ruixen.com with
 * UTM/ref attribution so PostHog can follow the OSS → Pro funnel.
 */
export function buildProTemplateUrl(
  slug: string,
  surface:
    | "oss_templates"
    | "oss_templates_get_pro"
    | "oss_templates_preview"
    | "oss_templates_footer"
    | "oss_docs_sidebar" = "oss_templates",
): string {
  const base = `${PRO_SITE_URL}/templates/${encodeURIComponent(slug)}`;
  try {
    const url = new URL(base);
    url.searchParams.set("ref", surface);
    url.searchParams.set("utm_source", "ruixen");
    url.searchParams.set("utm_medium", "template_card");
    url.searchParams.set("utm_campaign", "bridge");
    url.searchParams.set("slug", slug);
    return url.toString();
  } catch {
    return base;
  }
}

export function formatUsdFromCents(cents: number): string {
  if (!Number.isFinite(cents) || cents <= 0) return "Free";
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: dollars % 1 === 0 ? 0 : 2,
  }).format(dollars);
}

export { API_BASE_URL as PRO_API_BASE_URL };
