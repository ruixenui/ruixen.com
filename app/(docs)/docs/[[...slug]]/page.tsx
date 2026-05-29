import { Mdx } from "@/components/mdx-components";
import { DocPager } from "@/components/pager";
import { badgeVariants } from "@/components/ui/badge";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn } from "@/lib/utils";

import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contribute } from "@/components/contribute";
import { ProInlineCTA } from "@/components/pro-inline-cta";
import { SidebarCTA } from "@/components/sidebar-cta";
import { TableOfContents } from "@/components/toc";

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getDocFromParams({ params }: DocPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

// Map the slug to the OG category key so the dynamic /og route can
// paint the right colour band. Keys must match CATEGORY_VISUALS in
// app/og/route.tsx. We match by substring against the slug (e.g.
// "components/sales-ai-hero" → "hero") so per-component MDX doesn't
// need a frontmatter category field.
function ogCategoryFromSlug(slug: string): string | null {
  const s = slug.toLowerCase();
  if (s.includes("hero")) return "hero";
  if (s.includes("pricing")) return "pricing";
  if (s.includes("navbar") || s.includes("/nav")) return "navbar";
  if (s.includes("footer")) return "footer";
  if (s.includes("featured")) return "featured";
  if (s.includes("faq")) return "faq";
  if (s.includes("client")) return "client";
  if (s.includes("service")) return "service";
  return null;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  // Per-component dynamic OG image. The /og route generates a 1200×628
  // PNG with the doc title + description + (optional) category badge,
  // so every component's Twitter/LinkedIn share looks bespoke instead
  // of carrying the shared fallback image.
  const ogParams = new URLSearchParams({
    title: doc.title,
    description: doc.description ?? "",
  });
  const category = ogCategoryFromSlug(doc.slugAsParams);
  if (category) ogParams.set("category", category);
  const dynamicOg = absoluteUrl(`/og?${ogParams.toString()}`);

  return {
    title: `${doc.title} | Ruixen UI`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: dynamicOg,
          width: 1200,
          height: 628,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [dynamicOg],
      creator: "@ruixen_ui",
    },
    alternates: {
      canonical: absoluteUrl(doc.slug),
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc || !doc.published) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  // Build BreadcrumbList JSON-LD
  const slugParts = doc.slugAsParams.split("/");
  const breadcrumbItems = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Docs",
      item: "https://ruixen.com/docs",
    },
    ...slugParts.map((part: string, i: number) => ({
      "@type": "ListItem" as const,
      position: i + 2,
      name:
        i === slugParts.length - 1
          ? doc.title
          : part.charAt(0).toUpperCase() + part.slice(1),
      item: `https://ruixen.com/docs/${slugParts.slice(0, i + 1).join("/")}`,
    })),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // Pull date once so both schemas stay in sync. content-collections
  // exposes the MDX `date` frontmatter as `doc.date` (string or Date).
  const docDate = doc.date
    ? new Date(doc.date as string | number | Date).toISOString()
    : undefined;

  // Keywords: section + last slug segment + a couple stable ones so AI
  // engines can match queries like "Next.js hero section" semantically.
  const slugTail = slugParts[slugParts.length - 1] ?? "";
  const keywords = [
    slugTail.replace(/-/g, " "),
    slugParts[0],
    "shadcn",
    "Tailwind CSS",
    "React component",
    "Next.js",
  ]
    .filter(Boolean)
    .join(", ");

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description,
    image: doc.image,
    url: absoluteUrl(doc.slug),
    keywords,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: "Ruixen UI",
      url: "https://ruixen.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ruixen UI",
      url: "https://ruixen.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ruixen.com/ruixen_logo_blue_1024.svg",
      },
    },
    ...(docDate ? { datePublished: docDate, dateModified: docDate } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(doc.slug),
    },
  };

  // SoftwareSourceCode schema — only for code-bearing pages. Tells AI
  // engines this is *installable* source code, not a marketing article.
  // Perplexity + AI Overviews use this to surface code answers.
  const isCodePage =
    doc.slugAsParams.startsWith("components/") ||
    doc.slugAsParams.startsWith("sections/");
  const softwareSourceCodeJsonLd = isCodePage
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: doc.title,
        description: doc.description,
        url: absoluteUrl(doc.slug),
        programmingLanguage: "TypeScript",
        runtimePlatform: "React",
        codeRepository: "https://github.com/ruixenui/ruixen.com",
        license: "https://opensource.org/licenses/MIT",
        keywords,
        author: {
          "@type": "Organization",
          name: "Ruixen UI",
          url: "https://ruixen.com",
        },
        ...(docDate ? { dateModified: docDate } : {}),
      }
    : null;

  return (
    <main className="relative xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      {softwareSourceCodeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSourceCodeJsonLd),
          }}
        />
      )}
      <div className="mx-auto w-full min-w-0 max-w-4xl px-2 py-6 lg:px-6 lg:py-8">
        {doc.slugAsParams !== "components" && (
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRightIcon className="size-4" />
            <div className="font-medium text-foreground">{doc.title}</div>
          </div>
        )}
        {/* Hide title/description for /docs/components - it has its own headings */}
        {doc.slugAsParams !== "components" && (
          <div className="space-y-2">
            <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-balance text-lg text-muted-foreground">
                {doc.description}
              </p>
            )}
          </div>
        )}
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
        {(doc.slugAsParams.startsWith("components/") ||
          doc.slugAsParams.startsWith("sections/")) && <ProInlineCTA />}
        <DocPager doc={doc} />
      </div>
      {doc.toc && (
        <div className="hidden pl-6 text-sm xl:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col py-6">
            {/* Scrollable: TOC + Contribute. Contribute scrolls with the TOC
                so the CTA below has enough room to sit at the sidebar bottom. */}
            <div className="flex-1 min-h-0 space-y-6 overflow-y-auto pr-2">
              <TableOfContents toc={toc} />
              <div id="dynamic-toc" />
              <Contribute doc={doc} />
            </div>
            {/* Pinned at the sidebar bottom. */}
            <div className="shrink-0 pr-2 pt-4">
              <SidebarCTA />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
