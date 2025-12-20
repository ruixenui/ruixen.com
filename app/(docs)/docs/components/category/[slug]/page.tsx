import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

import { docsConfig } from "@/config/docs";
import { SidebarNavItem } from "@/types";
import {
  getComponentPreviewUrl,
  hasComponentPreview,
} from "@/lib/component-preview-data";
import registry from "@/registry.json";

// Generate URL-safe slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and") // Replace & with "and"
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

// Get all categories for static generation
function getAllCategories(): {
  slug: string;
  title: string;
  items: SidebarNavItem[];
}[] {
  const categories: { slug: string; title: string; items: SidebarNavItem[] }[] =
    [];

  docsConfig.sidebarNav.forEach((section) => {
    if (section.items) {
      section.items.forEach((category) => {
        if (category.items && category.items.length > 0 && !category.href) {
          const slug = generateSlug(category.title);
          categories.push({
            slug,
            title: category.title,
            items: category.items,
          });
        }
      });
    }
  });

  return categories;
}

// Find category by slug
function findCategoryBySlug(
  slug: string,
): { title: string; items: SidebarNavItem[] } | null {
  const categories = getAllCategories();
  return categories.find((cat) => cat.slug === slug) || null;
}

// Get all component items from a category (flattened)
function getAllComponents(items: SidebarNavItem[]): SidebarNavItem[] {
  const components: SidebarNavItem[] = [];
  items.forEach((item) => {
    if (item.href) {
      components.push(item);
    }
    if (item.items) {
      components.push(...getAllComponents(item.items));
    }
  });
  return components;
}

// Get component slug from href
function getComponentSlug(href: string): string {
  const parts = href.split("/");
  return parts[parts.length - 1];
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested component category could not be found.",
    };
  }

  const componentCount = getAllComponents(category.items).length;
  const title = `${category.title} Components | Ruixen UI`;
  const description = `Browse ${componentCount} ${category.title.toLowerCase()} components. Beautiful, accessible, and production-ready React components for your next project.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://ruixen.com/docs/components/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://ruixen.com/docs/components/category/${slug}`,
    },
  };
}

// Component Card
function ComponentCard({ component }: { component: SidebarNavItem }) {
  const componentSlug = component.href ? getComponentSlug(component.href) : "";
  const hasPreview = hasComponentPreview(componentSlug);
  const registryItem = registry.items.find(
    (item) => item.name === componentSlug,
  );
  const description = registryItem?.description || component.title;

  return (
    <Link
      href={component.href || "#"}
      className=" p-0 border rounded-[12%] group flex flex-col h-full"
    >
      <div className="flex-1">
        <div className="w-full border-4 overflow-hidden rounded-[12%] bg-muted transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:scale-105">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] overflow-hidden">
            <Image
              src={getComponentPreviewUrl(componentSlug, "light")}
              alt={component.title}
              fill
              className="object-cover object-center dark:hidden transition-transform duration-300"
              loading="lazy"
            />
            <Image
              src={getComponentPreviewUrl(componentSlug, "dark")}
              alt={component.title}
              fill
              className="object-cover object-center hidden dark:block transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="text-foreground line-clamp-2 break-words text-base font-semibold mb-2">
          {component.title}
        </div>
        <div className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </div>
      </div>
    </Link>
  );
}

// Main Page Component
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const components = getAllComponents(category.items);

  return (
    <div className="space-y-6 py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <Link
          href="/docs/components"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to Components
        </Link>
        <div className="text-left ml-5">
          <h1 className="text-2xl font-bold">{category.title}</h1>
          <p className="text-sm text-muted-foreground">
            {components.length} component{components.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {components.map((component, idx) => (
          <ComponentCard key={idx} component={component} />
        ))}
      </div>
    </div>
  );
}
