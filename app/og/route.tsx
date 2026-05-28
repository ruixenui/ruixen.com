import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

// Note: cannot import `Icons` from "@/components/icons" — that module
// renders `next/image`, which Next.js 15.5 refuses to dot into from a
// server-only route handler. We render the wordmark as text instead.

const CATEGORY_VISUALS: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  hero: {
    label: "HERO SECTIONS",
    color: "#0ea5e9",
    bg: "rgba(14, 165, 233, 0.08)",
    border: "rgba(14, 165, 233, 0.25)",
  },
  pricing: {
    label: "PRICING",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.08)",
    border: "rgba(16, 185, 129, 0.25)",
  },
  navbar: {
    label: "NAVBARS",
    color: "#6366f1",
    bg: "rgba(99, 102, 241, 0.08)",
    border: "rgba(99, 102, 241, 0.25)",
  },
  footer: {
    label: "FOOTERS",
    color: "#64748b",
    bg: "rgba(100, 116, 139, 0.08)",
    border: "rgba(100, 116, 139, 0.25)",
  },
  featured: {
    label: "FEATURED SECTIONS",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.25)",
  },
  faq: {
    label: "FAQS",
    color: "#14b8a6",
    bg: "rgba(20, 184, 166, 0.08)",
    border: "rgba(20, 184, 166, 0.25)",
  },
  client: {
    label: "CLIENT LOGOS",
    color: "#f43f5e",
    bg: "rgba(244, 63, 94, 0.08)",
    border: "rgba(244, 63, 94, 0.25)",
  },
  service: {
    label: "SERVICE SECTIONS",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.25)",
  },
};

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const categoryParam = searchParams.get("category");
  const category =
    categoryParam && CATEGORY_VISUALS[categoryParam]
      ? CATEGORY_VISUALS[categoryParam]
      : null;

  const [fonts] = await Promise.all([loadAssets()]);

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full bg-white text-black"
        style={{ fontFamily: "Geist Sans" }}
      >
        {category && (
          <div
            tw="flex absolute top-0 left-0 right-0 h-4"
            style={{ backgroundColor: category.color }}
          />
        )}
        <div tw="flex border absolute border-neutral-200 border-dashed inset-y-0 left-16 w-[1px]" />
        <div tw="flex border absolute border-neutral-200 border-dashed inset-y-0 right-16 w-[1px]" />
        <div tw="flex border absolute border-neutral-200 inset-x-0 h-[1px] top-16" />
        <div tw="flex border absolute border-neutral-200 inset-x-0 h-[1px] bottom-16" />
        {(title || description) && (
          <div tw="flex absolute flex-row items-center justify-center bottom-24 right-24 text-white">
            <div tw="text-black flex text-[32px] font-semibold tracking-tight">
              Ruixen UI
            </div>
          </div>
        )}
        <div tw="flex flex-col absolute justify-center items-center inset-0 p-24 w-full h-full">
          {title || description ? (
            <div tw="flex flex-col items-center justify-center text-center w-full h-full">
              {category && (
                <div
                  tw="flex flex-row items-center rounded-full mb-8 px-6 py-3"
                  style={{
                    backgroundColor: category.bg,
                    border: `1px solid ${category.border}`,
                  }}
                >
                  <div
                    tw="flex w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <div
                    tw="flex text-[22px] font-semibold"
                    style={{
                      color: category.color,
                      letterSpacing: "0.2em",
                    }}
                  >
                    {category.label}
                  </div>
                </div>
              )}
              <div tw="tracking-tight flex flex-col justify-center text-black text-balance font-semibold text-[80px]">
                {title}
              </div>
              <div tw="text-[40px] text-gray-600 mt-6 text-balance font-normal">
                {description}
              </div>
            </div>
          ) : (
            <div tw="flex flex-col items-center justify-center text-center w-full h-full">
              <div tw="flex flex-row items-center justify-center space-x-4 mb-8">
                <div tw="text-black flex text-[40px] font-semibold tracking-tight">
                  {siteConfig.name}
                </div>
              </div>
              <div tw="text-black flex text-[80px] font-semibold tracking-tight text-balance leading-tight">
                Marketing UI for shadcn
              </div>
              <div tw="text-gray-700 text-[34px] flex mt-4 font-normal">
                In any stack — Tailwind v3 or v4, Radix or Base UI
              </div>
              <div tw="text-gray-500 text-[22px] flex mt-8">
                240+ React sections and components · ruixen.com
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts,
    },
  );
}
