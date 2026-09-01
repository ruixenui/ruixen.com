"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/events";
import { PRO_PRICE } from "@/lib/early-bird";

export function ProBanner() {
  return (
    <div className="group relative top-0 bg-amber-400 py-2 text-black transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-9 md:flex-row">
        <Link
          href="https://pro.ruixen.com/pricing?ref=oss_banner"
          target="_blank"
          onClick={() =>
            trackEvent({
              name: "oss_pro_cta_clicked",
              properties: { surface: "banner" },
            })
          }
          className="relative inline-flex text-sm leading-normal md:text-md"
        >
          <span className="text-[1rem] font-semibold">
            Prices go up September 3 — Ruixen Pro is {PRO_PRICE.display} lifetime until then.
          </span>
          <span className="text-[1rem] ml-2">
            Templates rise too. Lock in today&apos;s price.
          </span>
          <ChevronRight className="ml-2 mt-[5px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}

export function ProductHuntBanner() {
  return (
    <div className="group relative top-0 bg-[#ff6154] py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://www.producthunt.com/posts/ruixen-ui-2?utm_source=site-banner&utm_medium=banner&utm_campaign=product-hunt-banner"
          target="_blank"
          className="inline-flex text-xs leading-normal md:text-sm"
        >
          <span className="ml-1 font-[580] dark:font-[550]">
            Ruixen UI is live on Product Hunt Today! Show your support and vote
            for us.
          </span>
          <ChevronRight className="ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}

export function SiteBanner() {
  const pathname = usePathname();

  // Layout-demo iframes (`/layouts/<name>/...`) keep the banner suppressed
  // — a Ruixen banner above the rendered template breaks the preview
  // intent.
  if (pathname.startsWith("/layouts/")) {
    return null;
  }

  // Suppress on surfaces where the banner would compete with the reading
  // experience. Docs pages are deliberately NOT in this list — the deadline
  // has to reach the people already reading component docs.
  if (
    pathname === "/showcase" ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/preview")
  ) {
    return null;
  }

  return <ProBanner />;
}
