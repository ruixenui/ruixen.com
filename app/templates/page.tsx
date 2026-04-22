import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import type { ProTemplate } from "@/types/pro-templates";
import {
  buildProTemplateUrl,
  formatUsdFromCents,
  proTemplatesApi,
} from "@/lib/pro-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TemplateProClickTracker } from "@/components/template-pro-click-tracker";

// Pro catalog lives on pro.ruixen.com and is cached at the edge for 5 minutes.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Beautiful, responsive templates built with modern web technologies.",
};

interface StaticTemplate {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  previewUrl: string;
  githubUrl?: string;
  price: "free";
  technologies: string[];
  features: string[];
  author: string;
  publishedAt: string;
  category?: string;
}

// Free templates that ship from this repo (not in the Pro catalog).
const staticTemplates: StaticTemplate[] = [
  {
    id: "portfolio",
    title: "Creative Portfolio Template",
    description:
      "A sleek portfolio template to highlight your creative journey and accomplishments.",
    image: "/portfolio-preview.jpg",
    video: "/portfolio.mp4",
    previewUrl: "https://portfolio-ruixens-projects.vercel.app/",
    githubUrl: "https://github.com/ruixenui/portfolio",
    price: "free",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
    ],
    features: [
      "Hero Section with Introduction",
      "Skills Section",
      "Experience Section",
      "Portfolio/Projects Section",
      "Certifications Section",
      "Achievements Section",
      "Testimonials Section",
      "Contact Section",
      "Blog",
    ],
    author: "srinathg",
    publishedAt: "2024-08-10",
    category: "Full Templates",
  },
];

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
};

function formatTech(tech: string): string {
  return TECH_STACK_LABELS[tech] ?? tech;
}

function StaticTemplateCard({ template }: { template: StaticTemplate }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-none border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-6 space-y-4">
          <CardHeader className="p-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{template.title}</CardTitle>
                {template.category && (
                  <Badge variant="outline" className="text-[10px] font-normal">
                    {template.category}
                  </Badge>
                )}
              </div>
              <CardDescription>{template.description}</CardDescription>
            </div>
          </CardHeader>

          <div className="flex flex-wrap gap-1">
            {template.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {template.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{template.technologies.length - 4} more
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Key Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {template.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
              {template.features.length > 3 && (
                <li className="text-xs text-muted-foreground/70">
                  +{template.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>

          <div className="flex gap-2">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href={template.previewUrl} target="_blank">
                Live Preview
                <ExternalLinkIcon className="size-4" />
              </Link>
            </Button>

            {template.githubUrl && (
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link href={template.githubUrl} target="_blank">
                  Download
                  <GitHubLogoIcon className="size-4" />
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
            <span>By {template.author}</span>
            <span>{new Date(template.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="relative hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:backdrop-blur-sm transition-all duration-300 rounded-3xl cursor-pointer">
          {template.video ? (
            <video
              autoPlay
              loop
              muted
              className="w-full h-[26rem] rounded-3xl hover:scale-[1.06] transition-all duration-300 object-cover"
              src={template.video}
            />
          ) : template.image ? (
            <Image
              src={template.image}
              alt={template.title}
              width={800}
              height={600}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="w-full h-[26rem] rounded-3xl bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center text-muted-foreground text-sm"
            >
              {template.title}
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-[#bef853]">
              Free
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProTemplateCard({ template }: { template: ProTemplate }) {
  const thumbnail =
    template.images.find((img) => img.is_thumbnail) ?? template.images[0];
  // Videos are rendered on the client; pick the light variant for server-rendered
  // HTML and let the video element fall back if it's missing.
  const videoUrl = template.video_url_light || template.video_url_dark || null;
  const priceLabel = template.is_free
    ? "Free"
    : formatUsdFromCents(template.price_usd_cents);
  const detailHref = buildProTemplateUrl(template.slug, "oss_templates");
  const getProHref = buildProTemplateUrl(
    template.slug,
    "oss_templates_get_pro",
  );
  const previewHref = template.demo_url
    ? template.demo_url
    : buildProTemplateUrl(template.slug, "oss_templates_preview");

  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-none border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-6 space-y-4">
          <CardHeader className="p-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">
                  <Link
                    href={detailHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-pro-template-preview={template.slug}
                    className="hover:underline"
                  >
                    {template.name}
                  </Link>
                </CardTitle>
                {template.category?.name && (
                  <Badge variant="outline" className="text-[10px] font-normal">
                    {template.category.name}
                  </Badge>
                )}
              </div>
              <CardDescription>{template.short_description}</CardDescription>
            </div>
          </CardHeader>

          {template.tech_stack && template.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {template.tech_stack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {formatTech(tech)}
                </Badge>
              ))}
              {template.tech_stack.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{template.tech_stack.length - 4} more
                </Badge>
              )}
            </div>
          )}

          {template.highlights && template.highlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Highlights:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {template.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {highlight}
                  </li>
                ))}
                {template.highlights.length > 3 && (
                  <li className="text-xs text-muted-foreground/70">
                    +{template.highlights.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                data-pro-template-preview={template.slug}
              >
                Live Preview
                <ExternalLinkIcon className="size-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="default" className="gap-2">
              <Link
                href={getProHref}
                target="_blank"
                rel="noopener noreferrer"
                data-pro-template-get-pro={template.slug}
              >
                {template.is_free
                  ? "Get Template"
                  : `Get Access · ${priceLabel}`}
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
            <span>{priceLabel}</span>
            <span>
              {template.version ? `v${template.version}` : "Ruixen Pro"}
            </span>
          </div>
        </div>

        <Link
          href={detailHref}
          target="_blank"
          rel="noopener noreferrer"
          data-pro-template-preview={template.slug}
          className="relative block hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:backdrop-blur-sm transition-all duration-300 rounded-3xl cursor-pointer"
        >
          {videoUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[26rem] rounded-3xl hover:scale-[1.06] transition-all duration-300 object-cover"
              src={videoUrl}
              poster={thumbnail?.image_url}
            />
          ) : thumbnail ? (
            <Image
              src={thumbnail.image_url}
              alt={thumbnail.alt_text ?? template.name}
              width={1200}
              height={800}
              className="w-full h-[26rem] rounded-3xl object-cover object-top"
              unoptimized
            />
          ) : (
            <div
              aria-hidden
              className="w-full h-[26rem] rounded-3xl bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center text-muted-foreground text-sm"
            >
              {template.name}
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge
              variant={template.is_free ? "secondary" : "default"}
              className="bg-[#bef853]"
            >
              {template.is_free ? "Free" : "Pro"}
            </Badge>
          </div>
        </Link>
      </div>
    </Card>
  );
}

async function fetchProTemplates(): Promise<{
  templates: ProTemplate[];
  error: string | null;
}> {
  try {
    const response = await proTemplatesApi.getAll({
      page_size: 50,
      sort_by: "is_featured",
      sort_order: "desc",
    });
    const templates = (response.items ?? []).filter((t) => t.is_active);
    return { templates, error: null };
  } catch (err) {
    console.error("[templates] failed to fetch pro catalog:", err);
    return {
      templates: [],
      error:
        err instanceof Error ? err.message : "Failed to load Pro templates",
    };
  }
}

export default async function TemplatesPage() {
  const { templates: proTemplates, error: proError } =
    await fetchProTemplates();

  const totalCount = staticTemplates.length + proTemplates.length;
  const freeCount =
    staticTemplates.length + proTemplates.filter((t) => t.is_free).length;

  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <TemplateProClickTracker />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Templates
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Beautiful, responsive templates built with modern web technologies.
            Perfect for developers and designers looking to jumpstart their
            projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">{totalCount}</div>
            <div className="text-sm text-muted-foreground">
              Templates Available
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">{freeCount}</div>
            <div className="text-sm text-muted-foreground">Free Templates</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">
              Mobile Responsive
            </div>
          </div>
        </div>

        {/* Free Templates (local) */}
        {staticTemplates.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Free Templates</h2>
            <div className="space-y-8">
              {staticTemplates.map((template) => (
                <StaticTemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Pro Catalog (live from pro.ruixen.com) */}
        {proTemplates.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Premium Templates</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Production-ready templates from{" "}
                  <Link
                    href="https://pro.ruixen.com?ref=oss_templates"
                    target="_blank"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Ruixen Pro
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="space-y-8">
              {proTemplates.map((template) => (
                <ProTemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {proError && proTemplates.length === 0 && (
          <div className="mb-16 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-muted-foreground">
            We couldn&apos;t load the Pro catalog right now. Browse all
            templates directly at{" "}
            <Link
              href="https://pro.ruixen.com/templates?ref=oss_templates_error"
              target="_blank"
              className="underline underline-offset-4 hover:text-foreground"
            >
              pro.ruixen.com/templates
            </Link>
            .
          </div>
        )}

        {/* Pro Templates CTA */}
        <div className="relative py-16 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-10 h-px w-10 bg-foreground/15" />

            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50 mb-5">
              Ruixen Pro
            </p>

            <h2 className="text-[1.75rem] md:text-[2.25rem] font-[590] leading-[1.15] tracking-[-0.025em] text-foreground">
              Ship faster with
              <br />
              premium templates
            </h2>

            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground/70 max-w-sm mx-auto">
              Production-ready components, templates, and blocks. Lifetime
              updates included.
            </p>

            <div className="mt-7 flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-[580] tracking-tight text-foreground">
                $59
              </span>
              <span className="text-sm text-muted-foreground/50">one-time</span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://pro.ruixen.com/pricing?ref=oss_templates_footer"
                target="_blank"
                data-pro-template-get-pro="__footer__"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-6 text-[13px] font-medium text-background transition-all duration-200 hover:opacity-85"
              >
                Get Pro Access
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://github.com/ruixenui/ruixen.com"
                target="_blank"
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-foreground/[0.12] px-6 text-[13px] font-medium text-muted-foreground transition-all duration-200 hover:border-foreground/25 hover:text-foreground"
              >
                <GitHubLogoIcon className="size-3.5" />
                Star on GitHub
              </Link>
            </div>

            <div className="mx-auto mt-10 h-px w-10 bg-foreground/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
