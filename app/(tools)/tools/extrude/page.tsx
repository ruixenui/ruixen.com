import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SvgTo3dEditor } from "@/components/tools/svg-to-3d/editor";

export const metadata: Metadata = {
  title: "Extrude — Ruixen Tools",
  description:
    "Extrude text, drawings, or SVG into an interactive 3D object. Export as PNG, GLB, STL, or copy embed code.",
};

export default function ExtrudePage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/tools"
            className="hover:text-foreground transition-colors"
          >
            Tools
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">Extrude</span>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            Extrude
          </h1>
          <p className="text-sm text-muted-foreground">
            Extrude text, drawings, or SVG into an interactive 3D scene.
          </p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
          <SvgTo3dEditor />
        </div>
      </main>
    </>
  );
}
