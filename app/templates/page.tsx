import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Beautiful, responsive templates built with modern web technologies.",
};

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  previewUrl: string;
  githubUrl?: string;
  price: "free" | "pro";
  technologies: string[];
  features: string[];
  author: string;
  publishedAt: string;
}

const templates: Template[] = [
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
  },
];

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 shadow-none border-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Content */}
        <div className="p-6 space-y-4">
          <CardHeader className="p-0">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{template.title}</CardTitle>
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

            {template.price === "free" && template.githubUrl ? (
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link href={template.githubUrl} target="_blank">
                  Download
                  <GitHubLogoIcon className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="default" className="gap-2">
                <Link href="https://pro.ruixen.com" target="_blank">
                  Get Pro
                  <ArrowRightIcon className="size-4" />
                </Link>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
            <span>By {template.author}</span>
            <span>{new Date(template.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Right Video/Image */}
        <div className="relative hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:backdrop-blur-sm transition-all duration-300 rounded-3xl cursor-pointer">
          {template.video ? (
            <video
              autoPlay
              loop
              muted
              className="w-full h-[26rem] rounded-3xl hover:scale-[1.06] transition-all duration-300 object-cover"
              src={template.video}
            />
          ) : (
            <Image
              src={template.image}
              alt={template.title}
              width={800}
              height={600}
              className="w-full h-full rounded-lg object-cover"
            />
          )}
          <div className="absolute top-4 right-4">
            <Badge
              variant={template.price === "free" ? "secondary" : "default"}
              className="bg-[#bef853]"
            >
              {template.price === "free" ? "Free" : "Pro"}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function TemplatesPage() {
  return (
    <div className="container py-8 md:py-12 lg:py-16">
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
            <div className="text-2xl font-bold text-primary">
              {templates.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Templates Available
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">
              {templates.filter((t) => t.price === "free").length}
            </div>
            <div className="text-sm text-muted-foreground">Free Templates</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">
              Mobile Responsive
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="space-y-8 mb-12">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Pro Templates CTA */}
        <div className="relative py-16 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            {/* Thin separator */}
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
              50+ production-ready components, templates, and blocks.
              Lifetime updates included.
            </p>

            {/* Price */}
            <div className="mt-7 flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-[580] tracking-tight text-foreground">
                $59
              </span>
              <span className="text-sm text-muted-foreground/50">
                one-time
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://pro.ruixen.com"
                target="_blank"
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

            {/* Thin separator */}
            <div className="mx-auto mt-10 h-px w-10 bg-foreground/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
