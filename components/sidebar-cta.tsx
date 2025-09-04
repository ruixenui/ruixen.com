"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

export function ProCTA() {
  return (
    <Link
      href="https://ruixen.com"
      target="_blank"
      onClick={() => posthog.capture("sidebar_cta_clicked")}
      className="group my-20 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-indigo-600 p-4 text-center text-lg font-medium leading-tight text-white"
    >
      {/* <TextAnimate animate="slideUp" by="word" className="text-4xl"> */}
      Looking for templates?
      {/* </TextAnimate> */}
      {/* <AnimatedShinyText className="group inline-flex items-center justify-center whitespace-pre via-white/80 text-white dark:text-white">
        ✨ Introducing Ruixen UI Pro
        <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
      </AnimatedShinyText> */}
    </Link>
  );
}

export function ProductHuntCTA() {
  return (
    <Link
      href="https://www.producthunt.com/posts/ruixen-ui-2?utm_source=sidebar-cta&utm_medium=sidebar-cta&utm_campaign=product-hunt-sidebar-cta"
      target="_blank"
      onClick={() => posthog.capture("product_hunt_sidebar_cta_clicked")}
      className="group my-20 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#ff6154] p-4 text-center text-lg font-medium leading-tight text-white"
    >
      <video
        autoPlay
        loop
        playsInline
        muted
        src="/agent-demo.mp4"
        className="w-full overflow-hidden rounded-xl shadow-2xl"
      />
    </Link>
  );
}

export function SidebarCTA() {
  return null;
}
