"use client";

import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function ProBanner() {
  const handleClick = () => {
    toast("Thank you for your love!", {
      description: "Ruixen Pro is coming very soon. Stay tuned!",
      duration: 5000,
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      position: "top-right",
    });
  };

  return (
    <div className="group relative top-0 bg-blue-600 py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <button
          onClick={handleClick}
          className="inline-flex text-xs leading-normal md:text-sm cursor-pointer"
        >
          <span className="font-[580] dark:font-[550]">
            Ruixen Pro, coming soon.
          </span>
          <span className="ml-2 text-white/70">
            Built from insights of 1000+ developers, refined component by
            component, including templates.
          </span>
          <ChevronRight className="ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </button>
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
  return <ProBanner />;
}
