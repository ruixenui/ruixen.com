"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Plus,
  Settings2,
  CircleHelp,
  MessageCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const S = { type: "spring" as const, stiffness: 300, damping: 28 };
const S_SOFT = { type: "spring" as const, stiffness: 260, damping: 24 };

export interface ProductCardHeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  features?: {
    title: string;
    description: string;
  }[];
  className?: string;
}

const TICKER_ROW_1 = [
  { name: "Oxymor NS", price: "$39" },
  { name: "Vertex AI", price: "$59" },
  { name: "Nova Pro", price: "$29" },
  { name: "Lumina", price: "$49" },
  { name: "Prism X", price: "$19" },
  { name: "Helix ML", price: "$35" },
];

const TICKER_ROW_2 = [
  { name: "Arc Studio", price: "$45" },
  { name: "Cipher", price: "$25" },
  { name: "Nebula", price: "$55" },
  { name: "Flux API", price: "$15" },
  { name: "Zenith", price: "$42" },
  { name: "Pulse", price: "$33" },
];

function TickerRow({
  items,
  duration = 40,
  reverse = false,
}: {
  items: { name: string; price: string }[];
  duration?: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        }}
        className="flex shrink-0"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-1.5 px-4 py-0.5"
          >
            <span className="whitespace-nowrap text-[11px] text-foreground/20">
              {item.name}
            </span>
            <span className="whitespace-nowrap text-[11px] font-medium text-foreground/30">
              {item.price}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const ACCOUNTS = [
  { name: "Méschac Irung", initials: "M" },
  { name: "Bernard Ng", initials: "B" },
  { name: "Theo Ng", initials: "T" },
  { name: "Glodie Ng", initials: "G" },
];

const MENU_GROUPS = [
  [{ icon: Plus, label: "Add new account" }],
  [{ icon: Settings2, label: "Preferences" }],
  [
    { icon: CircleHelp, label: "Help" },
    { icon: MessageCircle, label: "Send feedback" },
  ],
  [
    { icon: User, label: "My account" },
    { icon: Settings, label: "Settings" },
  ],
  [{ icon: LogOut, label: "Sign out" }],
];

const DEFAULT_FEATURES = [
  {
    title: "Instant deploys",
    description: "Sub-second builds. Zero-downtime rollouts. Push and forget.",
  },
  {
    title: "Edge-first",
    description: "Compute runs where your users are. 50ms or less, globally.",
  },
  {
    title: "Private by design",
    description: "E2E encrypted. SOC 2 compliant. Your code never leaves.",
  },
  {
    title: "Aware, not intrusive",
    description: "Reads your full codebase. Suggests only when it matters.",
  },
];

export function ProductCardHero({
  title = "Ship faster\nwith less friction",
  description = "A development platform that removes the gap between writing code and running it. Build, preview, and deploy from one place.",
  ctaText = "Get started",
  ctaHref = "#",
  features = DEFAULT_FEATURES,
  className,
}: ProductCardHeroProps) {
  return (
    <section className={cn("py-10", className)}>
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="grid items-center gap-6 pb-14 md:grid-cols-2">
          {/* ── Left: Visual ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...S_SOFT, delay: 0.08 }}
            className="relative flex items-center justify-center overflow-hidden py-6"
          >
            {/* Ticker rows behind the card */}
            <div className="absolute inset-0 flex flex-col justify-center gap-2.5">
              <TickerRow items={TICKER_ROW_1} duration={38} />
              <TickerRow items={TICKER_ROW_2} duration={44} reverse />
            </div>

            {/* Account card */}
            <div className="relative z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
              <div className="w-60 overflow-hidden rounded-xl bg-card p-1.5 shadow-lg shadow-black/[0.04] ring-1 ring-foreground/[0.06] dark:shadow-black/20 dark:ring-foreground/[0.08]">
                {ACCOUNTS.map((account) => (
                  <div
                    key={account.name}
                    className="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-1 transition-colors duration-150 hover:bg-foreground/[0.03]"
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/[0.07] text-[9px] font-medium text-foreground/50">
                      {account.initials}
                    </div>
                    <span className="text-[13px] text-foreground/80">
                      {account.name}
                    </span>
                  </div>
                ))}

                {MENU_GROUPS.map((group, gi) => (
                  <React.Fragment key={gi}>
                    <div className="mx-2.5 my-1 h-px bg-foreground/[0.06]" />
                    {group.map((item) => (
                      <div
                        key={item.label}
                        className="flex h-7 cursor-default items-center gap-2.5 rounded-lg px-2.5 transition-colors duration-150 hover:bg-foreground/[0.03]"
                      >
                        <item.icon
                          className="size-3.5 text-foreground/25"
                          strokeWidth={1.5}
                        />
                        <span className="text-[13px] text-foreground/55">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Text ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...S, delay: 0 }}
          >
            <div className="max-w-md">
              <h2 className="whitespace-pre-line text-balance text-4xl font-semibold text-foreground">
                {title}
              </h2>
              <p className="mt-6 text-balance text-lg text-muted-foreground">
                {description}
              </p>
              <a
                href={ctaHref}
                className="mt-8 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-transparent bg-card px-4 py-2 pr-2 text-sm font-medium shadow-sm shadow-black/10 ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
              >
                {ctaText}
                <ChevronRight className="size-4 opacity-50" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Features ──────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-foreground/[0.06] pt-10 lg:grid-cols-4 lg:gap-x-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...S, delay: 0.2 + i * 0.08 }}
            >
              <span className="text-[11px] tabular-nums text-foreground/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[15px] font-medium tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/45">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
