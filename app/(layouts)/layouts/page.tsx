import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { LayoutPreview } from "@/components/layouts/layout-preview";

export const metadata: Metadata = {
  title: "Layouts — Ruixen UI",
  description:
    "Full-page layouts you can drop into your product — animated navigation, calendars, and more.",
};

type Layout = {
  id: string;
  title: string;
  registry: string;
  previewHref: string;
  aspect?: string;
};

const LAYOUTS: Layout[] = [
  {
    id: "scroll-header",
    title: "Scroll Header",
    registry: "layouts-scroll-header",
    previewHref: "/preview/layouts/scroll-header",
  },
  {
    id: "calendar",
    title: "Calendar",
    registry: "layouts-calendar",
    previewHref: "/preview/layouts/calendar",
    aspect: "aspect-[16/11]",
  },
];

export default function LayoutsLandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero — centered */}
        <section className="container pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              Ruixen Layouts
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              Full-page layouts,{" "}
              <span className="text-muted-foreground">ready to ship.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Production-grade compositions built on Ruixen primitives. Drop in,
              restyle, deploy.
            </p>
          </div>
        </section>

        {/* Layouts — title + preview card inline, left-aligned */}
        <section className="container pb-24 md:pb-32">
          <div className="mx-auto flex max-w-5xl flex-col gap-16">
            {LAYOUTS.map((layout) => (
              <div key={layout.id} id={layout.id} className="scroll-mt-24">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {layout.title}
                </h2>
                <LayoutPreview
                  name={layout.registry}
                  previewHref={layout.previewHref}
                  aspect={layout.aspect}
                  className="mt-5"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
