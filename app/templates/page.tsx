import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900 p-8 md:p-12 text-center text-white dark:bg-zinc-950">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute -top-24 -right-24 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative space-y-4">
            <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-0">
              50+ Premium Templates
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">
              Unlock All Pro Templates
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              Get access to our complete collection of premium templates,
              components, and lifetime updates with Ruixen Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="https://pro.ruixen.com"
                target="_blank"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-zinc-900 hover:bg-zinc-100 gap-2",
                )}
              >
                Explore Ruixen Pro
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="https://github.com/ruixenui/ruixen.com"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-zinc-700 text-zinc-300 hover:bg-zinc-800 gap-2",
                )}
              >
                Star on GitHub
                <GitHubLogoIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
