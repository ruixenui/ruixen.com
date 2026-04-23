import type { Metadata } from "next";
import type { Doc } from "content-collections";

import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { allDocs } from "content-collections";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contribute } from "@/components/contribute";
import { Mdx } from "@/components/mdx-components";
import { DocPager } from "@/components/pager";
import { SidebarCTA } from "@/components/sidebar-cta";
import { TableOfContents } from "@/components/toc";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { buildProTemplateUrl, formatUsdFromCents } from "@/lib/pro-api";
import { getProTemplateBySlug } from "@/data/pro-catalog";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn } from "@/lib/utils";
import type { ProTemplate } from "@/types/pro-templates";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type TemplateResolution =
  | { kind: "mdx"; doc: Doc }
  | { kind: "pro"; template: ProTemplate };

async function resolveTemplate(
  slug: string,
): Promise<TemplateResolution | null> {
  // MDX first so hand-authored pages (e.g. /docs/templates/portfolio)
  // keep their full docs treatment (TOC, pager, contribute).
  const mdxDoc = allDocs.find(
    (doc) => doc.slugAsParams === `templates/${slug}` && doc.published,
  );
  if (mdxDoc) return { kind: "mdx", doc: mdxDoc };

  const template = getProTemplateBySlug(slug);
  if (!template) return null;
  return { kind: "pro", template };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveTemplate(slug);
  if (!resolved) return { title: "Template Not Found | Ruixen UI" };

  if (resolved.kind === "mdx") {
    const { doc } = resolved;
    return {
      title: `${doc.title} | Ruixen UI`,
      description: doc.description,
      openGraph: {
        title: doc.title,
        description: doc.description,
        type: "article",
        url: absoluteUrl(doc.slug),
        images: doc.image ? [{ url: doc.image, width: 1200, height: 630 }] : [],
      },
      alternates: { canonical: absoluteUrl(doc.slug) },
    };
  }

  const { template } = resolved;
  const canonical = absoluteUrl(`/docs/templates/${template.slug}`);
  const thumb =
    template.images.find((img) => img.is_thumbnail) ?? template.images[0];
  return {
    title: `${template.name} | Ruixen UI`,
    description: template.short_description,
    openGraph: {
      title: template.name,
      description: template.short_description,
      type: "article",
      url: canonical,
      images: thumb ? [{ url: thumb.image_url, width: 1200, height: 630 }] : [],
    },
    alternates: { canonical },
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = await resolveTemplate(slug);
  if (!resolved) notFound();

  if (resolved.kind === "mdx") {
    return <MdxDocView doc={resolved.doc} />;
  }

  return <ProTemplateView template={resolved.template} />;
}

// ============================================================
// MDX path — mirrors app/(docs)/docs/[[...slug]]/page.tsx so a
// manually authored template (like Portfolio) keeps its existing
// treatment even though this specific route shadows the catch-all.
// ============================================================
async function MdxDocView({ doc }: { doc: Doc }) {
  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-8">
      <div className="mx-auto w-full min-w-0 max-w-4xl px-2 py-6 lg:px-6 lg:py-8">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-4" />
          <div className="truncate">Templates</div>
          <ChevronRightIcon className="size-4" />
          <div className="font-medium text-foreground">{doc.title}</div>
        </div>
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

// ============================================================
// Pro API path — renders catalog data inside the same docs shell
// so Pro templates feel like first-class docs pages. All purchase
// flows link out to pro.ruixen.com with UTM/ref attribution.
// ============================================================
const TECH_STACK_LABELS: Record<string, string> = {
  react: "React",
  nextjs: "Next.js",
  vue: "Vue.js",
  angular: "Angular",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  typescript: "TypeScript",
  figma: "Figma",
  "radix-ui": "Radix UI",
  "shadcn-ui": "shadcn/ui",
  "framer-motion": "Framer Motion",
  "react-hook-form": "React Hook Form",
  zod: "Zod",
  html_css: "HTML/CSS",
  flutter: "Flutter",
  react_native: "React Native",
  motion: "Motion",
};

function ProTemplateView({ template }: { template: ProTemplate }) {
  const thumb =
    template.images.find((img) => img.is_thumbnail) ?? template.images[0];
  const videoUrl = template.video_url_light || template.video_url_dark || null;
  const priceLabel = template.is_free
    ? "Free"
    : formatUsdFromCents(template.price_usd_cents);
  const proDetailHref = buildProTemplateUrl(template.slug);
  const getAccessHref = buildProTemplateUrl(template.slug);
  const previewHref = template.demo_url
    ? template.demo_url
    : buildProTemplateUrl(template.slug);

  return (
    <main className="relative">
      <div className="mx-auto w-full min-w-0 max-w-4xl px-2 py-6 lg:px-6 lg:py-8">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-4" />
          <div className="truncate">Templates</div>
          <ChevronRightIcon className="size-4" />
          <div className="font-medium text-foreground">{template.name}</div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              {template.name}
            </h1>
            <Badge variant="default" className="bg-[#bef853] text-black">
              Pro
            </Badge>
            {template.category?.name && (
              <Badge variant="outline" className="text-xs font-normal">
                {template.category.name}
              </Badge>
            )}
          </div>
          <p className="text-balance text-lg text-muted-foreground">
            {template.short_description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-5">
          <Link
            href={getAccessHref}
            target="_blank"
            rel="noopener noreferrer"
            data-pro-template-get-pro={template.slug}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "gap-2",
            )}
          >
            {template.is_free ? "Get Template" : `Get Access · ${priceLabel}`}
          </Link>
          <Link
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            data-pro-template-preview={template.slug}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2",
            )}
          >
            Live Preview
            <ExternalLinkIcon className="size-3" />
          </Link>
          <Link
            href={proDetailHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "gap-2",
            )}
          >
            View on Ruixen Pro
            <ExternalLinkIcon className="size-3" />
          </Link>
        </div>

        <div className="pt-8">
          <div className="relative w-full overflow-hidden rounded-xl border bg-muted">
            {videoUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                src={videoUrl}
                poster={thumb?.image_url}
                className="w-full object-cover"
              />
            ) : thumb ? (
              <Image
                src={thumb.image_url}
                alt={thumb.alt_text ?? template.name}
                width={1600}
                height={900}
                className="w-full object-cover"
                unoptimized
              />
            ) : null}
          </div>
        </div>

        {template.what_is_this && (
          <section className="pt-10 space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              What is this
            </h2>
            <p className="leading-7 text-muted-foreground">
              {template.what_is_this}
            </p>
          </section>
        )}

        {template.who_is_this_for && (
          <section className="pt-8 space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Who is this for
            </h2>
            <p className="leading-7 text-muted-foreground">
              {template.who_is_this_for}
            </p>
          </section>
        )}

        {template.highlights && template.highlights.length > 0 && (
          <section className="pt-8 space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Highlights
            </h2>
            <ul className="ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
              {template.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {template.features && template.features.length > 0 && (
          <section className="pt-8 space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Features
            </h2>
            <ul className="ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
              {template.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {template.sections_included &&
          template.sections_included.length > 0 && (
            <section className="pt-8 space-y-3">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Sections included
              </h2>
              <div className="flex flex-wrap gap-2">
                {template.sections_included.map((item) => (
                  <Badge key={item} variant="outline" className="font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </section>
          )}

        {template.tech_stack && template.tech_stack.length > 0 && (
          <section className="pt-8 space-y-3">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {template.tech_stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-normal">
                  {TECH_STACK_LABELS[tech] ?? tech}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {template.dependencies &&
          Object.keys(template.dependencies).length > 0 && (
            <section className="pt-8 space-y-3">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Dependencies
              </h2>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(template.dependencies).map(([k, v]) => (
                      <tr
                        key={k}
                        className="border-b last:border-b-0 [&>td]:px-4 [&>td]:py-2"
                      >
                        <td className="font-mono text-foreground">{k}</td>
                        <td className="font-mono text-muted-foreground">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

        <div className="mt-12 rounded-xl border bg-muted/30 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available on</p>
              <p className="font-semibold">Ruixen Pro</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-semibold">{priceLabel}</span>
              <Link
                href={getAccessHref}
                target="_blank"
                rel="noopener noreferrer"
                data-pro-template-get-pro={template.slug}
                className={cn(buttonVariants({ variant: "default" }), "gap-2")}
              >
                {template.is_free ? "Get Template" : "Get Access"}
                <ExternalLinkIcon className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
