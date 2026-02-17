"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProBanner() {
  return (
    <div className="group relative top-0 bg-blue-600 py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://pro.ruixen.com"
          target="_blank"
          className="relative inline-flex text-sm leading-normal md:text-md"
        >
          <span className="text-[1rem] font-semibold">
            Ruixen Pro is now live.
          </span>
          <span className="text-[1rem] ml-2">
            50+ premium components, templates, blocks, and lifetime updates.
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

  if (pathname === "/showcase" || pathname.startsWith("/blog")) {
    return null;
  }

  return <ProBanner />;
}
