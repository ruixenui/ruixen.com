"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, Blocks, Palette, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

type Action = { href: string; label: string };

export interface GridFrameFeature {
  icon?: React.ReactNode;
  title: string;
  highlight: string;
  description: string;
  illustration?: React.ReactNode;
}

export interface GridFrameHeroProps {
  title: React.ReactNode;
  description?: string;
  primaryAction?: Action;
  microcopy?: string;
  features?: [GridFrameFeature, GridFrameFeature];
  className?: string;
}

/* ── helpers ─────────────────────────────────────────────────── */

function OuterRail() {
  return (
    <div aria-hidden className="p-px">
      <div className="h-full w-2 md:w-6 lg:w-full rounded-sm bg-card" />
    </div>
  );
}

/* ── default illustrations ───────────────────────────────────── */

function ChatMessage({
  avatar,
  alt,
  reversed = false,
  children,
}: {
  avatar: string;
  alt: string;
  reversed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("flex items-start gap-3", reversed && "flex-row-reverse")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt={alt}
        className="size-8 shrink-0 rounded-full object-cover"
      />
      <div className="rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200">
        {children}
      </div>
    </div>
  );
}

function ChatComposer() {
  return (
    <div className="w-full shrink-0 pb-1 pt-2 px-2 sm:px-3">
      <div className="mx-auto w-full rounded-2xl bg-white p-1.5 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-neutral-800">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <span className="flex-1 truncate text-sm text-neutral-400 dark:text-neutral-500">
            Message your agent...
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-neutral-100 px-1 pt-1.5 dark:border-neutral-700/60">
          <div className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
            <span className="flex size-6 items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <Paperclip className="size-3.5" />
            </span>
            <span className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-neutral-500 ring-1 ring-inset ring-neutral-200 dark:text-neutral-400 dark:ring-neutral-700">
              Agents
            </span>
          </div>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm shadow-blue-500/30">
            <ArrowUp className="size-3.5" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}

function AgentWorkflowIllustration() {
  return (
    <div
      aria-hidden
      className="mt-auto flex w-full flex-1 flex-col items-stretch justify-between gap-2 overflow-hidden pt-4"
    >
      <div className="flex min-h-0 shrink items-center justify-center p-2">
        <div className="flex flex-col justify-center gap-3">
          <ChatMessage avatar="/avatar-images/avatar-01.jpg" alt="AI Agent">
            Workflow completed. 847 tasks processed.
          </ChatMessage>
          <ChatMessage avatar="/avatar-images/avatar-02.jpg" alt="You" reversed>
            Deploy to production
          </ChatMessage>
          <ChatMessage avatar="/avatar-images/avatar-03.jpg" alt="AI Agent">
            Deployed. All systems operational.
          </ChatMessage>
        </div>
      </div>

      <ChatComposer />
    </div>
  );
}

function ClipboardDataIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M9 17v-4" />
      <path d="M12 17v-1" />
      <path d="M15 17v-2" />
      <path d="M12 17v-1" />
    </svg>
  );
}

function FileDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
    >
      <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm-3 12a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1m3 0a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1m3 0a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" />
      <path d="M19 7h-4l-.001 -4.001z" />
    </svg>
  );
}

function FeatherIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
    >
      <path d="M8 9.585v6.415h6.414l-2.707 2.707a1 1 0 0 1 -.112 .097l-.11 .071l-.114 .054l-.105 .035l-.149 .03l-.117 .006h-4.586l-1.707 1.707a1 1 0 1 1 -1.414 -1.414l1.707 -1.709v-4.584l.003 -.075l.017 -.126l.03 -.111l.044 -.111l.052 -.098l.067 -.096l.08 -.09z" />
      <path d="M19.414 11l-3 3h-4.914l2.914 -3z" />
      <path d="M13 4.586v4.998l-3 3v-4.999z" />
      <path d="M16.482 3a4.515 4.515 0 0 1 4.518 4.514a4.7 4.7 0 0 1 -.239 1.487l-5.761 -.001v-5.76c.469 -.158 .968 -.24 1.482 -.24" />
    </svg>
  );
}

function PointerUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15.984 13.428l-1.206 -1.206l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l1.217 1.217" />
      <path d="M19 22v-6" />
      <path d="M22 19l-3 -3l-3 3" />
    </svg>
  );
}

function FilterSearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M6 12h8.5" />
      <path d="M9 18h2" />
      <path d="M15 18c0 .796 .316 1.559 .879 2.121c.563 .563 1.326 .879 2.121 .879c.796 0 1.559 -.316 2.121 -.879c.563 -.563 .879 -1.326 .879 -2.121c0 -.796 -.316 -1.559 -.879 -2.121c-.563 -.563 -1.326 -.879 -2.121 -.879c-.796 0 -1.559 .316 -2.121 .879c-.563 .563 -.879 1.326 -.879 2.121z" />
      <path d="M20.2 20.2l1.8 1.8" />
    </svg>
  );
}

function SalesforceLogo() {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.94348 1.08897C6.40431 0.609254 7.04568 0.312185 7.75424 0.312185C8.69899 0.312185 9.51776 0.837042 9.95864 1.61908C10.35 1.44413 10.7739 1.35381 11.2026 1.35403C12.9031 1.35403 14.2835 2.7449 14.2835 4.46118C14.2835 6.17746 12.9031 7.56834 11.2026 7.56834C10.9947 7.56834 10.7921 7.54745 10.5937 7.50798C10.2079 8.19554 9.47052 8.66266 8.63075 8.66266C8.28885 8.66334 7.95133 8.58578 7.64402 8.43593C7.253 9.35443 6.34238 10 5.28216 10C4.17471 10 3.23522 9.30194 2.87307 8.32046C2.71188 8.35447 2.54759 8.37157 2.38285 8.37147C1.06546 8.37147 0 7.29027 0 5.96238C0 5.07012 0.479719 4.29333 1.19143 3.87345C1.04044 3.52562 0.962718 3.15043 0.963113 2.77125C0.963113 1.23866 2.20702 0 3.73961 0C4.63711 0 5.44015 0.427759 5.94401 1.0917"
        fill="#00A1E0"
      />
    </svg>
  );
}

function HubspotLogo() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3"
    >
      <path
        d="M7.61726 3.29259V2.10176C7.77462 2.02822 7.90786 1.91149 8.00146 1.76516C8.09507 1.61884 8.14519 1.44894 8.14599 1.27524V1.24789C8.14599 0.741441 7.73543 0.330879 7.22898 0.330879H7.20163C6.95842 0.330879 6.72518 0.427493 6.55321 0.599465C6.38123 0.771438 6.28462 1.00468 6.28462 1.24789V1.27524C6.28542 1.44894 6.33554 1.61884 6.42915 1.76516C6.52275 1.91149 6.65599 2.02822 6.81335 2.10176V3.29259C6.36108 3.36184 5.93513 3.54937 5.57863 3.83618L2.31271 1.29246C2.33601 1.20839 2.34816 1.12195 2.34951 1.03518C2.34991 0.830814 2.28969 0.630919 2.17647 0.46078C2.06325 0.290642 1.90212 0.157904 1.71345 0.0793569C1.52478 0.000809612 1.31705 -0.0200182 1.11654 0.0195079C0.91603 0.059034 0.731748 0.157138 0.587002 0.301412C0.442257 0.445685 0.343551 0.629645 0.303369 0.830024C0.263188 1.0304 0.283338 1.2382 0.361268 1.42712C0.439198 1.61605 0.571407 1.77762 0.741174 1.89139C0.910942 2.00517 1.11064 2.06604 1.31501 2.06631C1.4938 2.06547 1.66924 2.01774 1.82382 1.92788L5.03977 4.43041C4.75087 4.86686 4.60015 5.38022 4.60725 5.90357C4.61436 6.42692 4.77896 6.936 5.07961 7.36444L4.10149 8.3429C4.02242 8.31761 3.94004 8.30419 3.85704 8.30306C3.68929 8.30319 3.52534 8.35305 3.38591 8.44633C3.24648 8.53962 3.13784 8.67214 3.0737 8.82715C3.00957 8.98215 2.99282 9.1527 3.02558 9.31722C3.05834 9.48175 3.13914 9.63287 3.25776 9.75149C3.37638 9.87011 3.5275 9.9509 3.69202 9.98366C3.85655 10.0164 4.02709 9.99968 4.1821 9.93554C4.33711 9.87141 4.46963 9.76276 4.56291 9.62333C4.6562 9.48391 4.70605 9.31996 4.70619 9.1522C4.7051 9.0692 4.69167 8.98681 4.66635 8.90776L5.634 7.93977C5.94955 8.18269 6.31651 8.35017 6.70678 8.42937C7.09705 8.50857 7.50027 8.49739 7.88555 8.39668C8.27083 8.29597 8.62795 8.10841 8.92955 7.84837C9.23114 7.58832 9.46921 7.2627 9.62552 6.89643C9.78183 6.53016 9.85223 6.13298 9.83133 5.7353C9.81042 5.33763 9.69877 4.95001 9.50492 4.60215C9.31108 4.25429 9.04018 3.95542 8.71298 3.72843C8.38579 3.50144 8.01097 3.35235 7.61726 3.29259ZM7.21615 7.20913C7.03731 7.21405 6.85931 7.18308 6.69265 7.11804C6.52599 7.053 6.37405 6.95522 6.24582 6.83047C6.11759 6.70571 6.01567 6.55653 5.94607 6.39172C5.87647 6.22691 5.84062 6.04982 5.84062 5.87092C5.84062 5.69202 5.87647 5.51493 5.94607 5.35013C6.01567 5.18532 6.11759 5.03613 6.24582 4.91138C6.37405 4.78663 6.52599 4.68885 6.69265 4.62381C6.85931 4.55877 7.03731 4.5278 7.21615 4.53272C7.56275 4.54485 7.89113 4.69103 8.1321 4.94046C8.37307 5.1899 8.50784 5.52311 8.50801 5.86993C8.50819 6.21675 8.37375 6.55011 8.13303 6.79978C7.89231 7.04946 7.56409 7.19597 7.2175 7.20845"
        fill="#FF7A59"
      />
    </svg>
  );
}

function SheetsLogo() {
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3"
    >
      <path
        d="M5.38222 0.147949H1.62911C1.26484 0.147949 0.966797 0.44599 0.966797 0.810263V9.19957C0.966797 9.56384 1.26484 9.86188 1.62911 9.86188H7.36916C7.73343 9.86188 8.03147 9.56384 8.03147 9.19957V2.7972L6.48608 1.69335L5.38222 0.147949Z"
        fill="#0F9D58"
      />
      <path
        d="M2.7334 4.89478V8.09596H6.26574V4.89478H2.7334ZM4.2788 7.65441H3.17494V7.10249H4.2788V7.65441ZM4.2788 6.77133H3.17494V6.2194H4.2788V6.77133ZM4.2788 5.88825H3.17494V5.33632H4.2788V5.88825ZM5.82419 7.65441H4.72034V7.10249H5.82419V7.65441ZM5.82419 6.77133H4.72034V6.2194H5.82419V6.77133ZM5.82419 5.88825H4.72034V5.33632H5.82419V5.88825Z"
        fill="#F1F1F1"
      />
      <path
        d="M5.38281 0.14917V2.13611C5.38281 2.50204 5.6792 2.79842 6.04513 2.79842H8.03207L5.38281 0.14917Z"
        fill="#87CEAC"
      />
    </svg>
  );
}

const filterCategories: ReadonlyArray<{
  label: string;
  active?: boolean;
  classes: string;
  icon: React.ReactNode;
}> = [
  {
    label: "Buttons",
    active: true,
    classes:
      "bg-blue-100 border-blue-200 dark:bg-blue-100/10 dark:border-blue-200/10",
    icon: <ClipboardDataIcon className="size-4 text-blue-500" />,
  },
  {
    label: "Cards",
    classes:
      "bg-green-100 border-green-200 dark:bg-green-100/10 dark:border-green-200/10",
    icon: <FileDotsIcon className="size-4 text-green-500" />,
  },
  {
    label: "Inputs",
    classes:
      "bg-indigo-100 border-indigo-200 dark:bg-indigo-100/10 dark:border-indigo-200/10",
    icon: <FeatherIcon className="size-4 text-indigo-500" />,
  },
  {
    label: "Hero Sections",
    classes:
      "bg-neutral-100 border-neutral-200 dark:bg-neutral-100/10 dark:border-neutral-200/10",
    icon: <PointerUpIcon className="size-4 text-neutral-500" />,
  },
  {
    label: "Navbars",
    classes:
      "bg-purple-100 border-purple-200 dark:bg-purple-100/10 dark:border-purple-200/10",
    icon: <FilterSearchIcon className="size-4 text-purple-500" />,
  },
];

function CategoryPanelIllustration() {
  return (
    <div aria-hidden className="w-full">
      <div className="mx-auto mb-4 flex max-w-lg flex-wrap items-center justify-center gap-2">
        {filterCategories.map((cat) => (
          <div
            key={cat.label}
            className={cn(
              "relative flex items-center justify-center gap-1 rounded-sm border px-2 py-1 text-xs transition duration-200",
              cat.active ? "opacity-100" : "opacity-50",
              cat.classes,
            )}
          >
            {cat.active && (
              <div className="pointer-events-none absolute inset-0 rounded-[5px] shadow-inner" />
            )}
            {cat.icon}
            {cat.label}
          </div>
        ))}
      </div>

      <div
        className="mx-auto flex w-full max-w-[20rem] flex-col gap-2 rounded-t-3xl border-x border-t border-neutral-200 bg-neutral-100 p-2 pb-8 dark:border-neutral-700 dark:bg-neutral-800 lg:max-w-sm"
        style={{
          maskImage:
            "linear-gradient(to bottom, black calc(100% - 1.5rem), rgba(0,0,0,0.4))",
          WebkitMaskImage:
            "linear-gradient(to bottom, black calc(100% - 1.5rem), rgba(0,0,0,0.4))",
        }}
      >
        <div
          className="flex flex-col items-start gap-4 rounded-2xl border border-transparent bg-white p-4 shadow-black/10 ring-1 ring-black/10 dark:bg-neutral-900"
          style={{
            maskImage:
              "linear-gradient(to bottom, black calc(100% - 1.5rem), rgba(0,0,0,0.4))",
            WebkitMaskImage:
              "linear-gradient(to bottom, black calc(100% - 1.5rem), rgba(0,0,0,0.4))",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100 dark:border-blue-200/10 dark:bg-blue-100/10">
              <ClipboardDataIcon className="size-4 text-blue-500" />
            </div>
            <p className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Buttons
            </p>
          </div>
          <div>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              Primary Variant
            </p>
            <p className="mb-4 mt-2 rounded-sm border border-dashed border-neutral-200 px-2 py-1 text-sm text-neutral-600 dark:border-neutral-200/10 dark:text-neutral-400">
              Install any component with a single shadcn CLI command — themed by
              your tokens, no configuration required.
            </p>
            <div className="mt-2 flex flex-row flex-wrap gap-2">
              <span className="flex w-fit items-center gap-1 rounded-sm border border-neutral-200 px-1 py-0.5 text-sm dark:border-neutral-200/10">
                <SalesforceLogo />
                <span className="text-xs text-neutral-500">Salesforce</span>
              </span>
              <span className="flex w-fit items-center gap-1 rounded-sm border border-neutral-200 px-1 py-0.5 text-sm dark:border-neutral-200/10">
                <HubspotLogo />
                <span className="text-xs text-neutral-500">Hubspot</span>
              </span>
              <span className="flex w-fit items-center gap-1 rounded-sm border border-neutral-200 px-1 py-0.5 text-sm dark:border-neutral-200/10">
                <SheetsLogo />
                <span className="text-xs text-neutral-500">Sheets</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultFeatures: [GridFrameFeature, GridFrameFeature] = [
  {
    icon: <Blocks className="size-4" />,
    title: "Component Registry",
    highlight: "200+ components ready for production.",
    description:
      "Add any block to your project with a single shadcn CLI command.",
    illustration: <CategoryPanelIllustration />,
  },
  {
    icon: <Palette className="size-4" />,
    title: "Themeable by Design",
    highlight: "Adapt instantly to your brand.",
    description:
      "Semantic tokens drive every component, so light and dark just work.",
    illustration: <AgentWorkflowIllustration />,
  },
];

/* ── building blocks ─────────────────────────────────────────── */

function HeroBlock({
  title,
  description,
  primaryAction,
  microcopy,
}: Pick<
  GridFrameHeroProps,
  "title" | "description" | "primaryAction" | "microcopy"
>) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_minmax(0,69rem)_minmax(0,1fr)]">
      <OuterRail />
      <div className="mx-auto w-full max-w-[69rem]">
        <div className="rounded-sm bg-card px-4 py-12 text-center sm:px-6 sm:py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
            {primaryAction && (
              <div className="mt-9">
                <Link
                  href={primaryAction.href}
                  className={cn(
                    "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 text-sm font-medium",
                    "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
                    "ring-1 ring-foreground/10",
                    "transition-colors hover:bg-primary/90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  {primaryAction.label}
                </Link>
              </div>
            )}
            {microcopy && (
              <span className="mt-3 block text-center text-sm text-muted-foreground">
                {microcopy}
              </span>
            )}
          </div>
        </div>
      </div>
      <OuterRail />
    </div>
  );
}

function FeaturesBlock({
  features,
}: {
  features: [GridFrameFeature, GridFrameFeature];
}) {
  return (
    <div className="mx-auto grid w-full max-w-[75rem] grid-cols-[auto_minmax(0,1fr)_auto] border border-border/60 lg:grid-cols-[minmax(0,1fr)_minmax(0,69rem)_minmax(0,1fr)]">
      <OuterRail />
      <div className="mx-auto w-full max-w-[69rem]">
        <h2 className="sr-only">Features</h2>
        <div className="grid gap-px bg-border/60 sm:grid-cols-2 lg:grid-cols-10">
          <div aria-hidden className="hidden lg:col-span-1 lg:block">
            <div className="h-full w-full bg-card" />
          </div>
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
          <div aria-hidden className="hidden lg:col-span-1 lg:block">
            <div className="h-full w-full bg-card" />
          </div>
        </div>
      </div>
      <OuterRail />
    </div>
  );
}

function FeatureCard({ feature }: { feature: GridFrameFeature }) {
  return (
    <div className="grid h-full min-w-0 grid-rows-[auto_1fr] gap-px bg-border/60 sm:col-span-1 lg:col-span-4">
      <div className="space-y-4 bg-card p-5 sm:p-6 md:p-7 lg:p-10">
        <h3 className="flex items-center gap-2 text-sm text-muted-foreground">
          {feature.icon}
          {feature.title}
        </h3>
        <p className="text-base font-medium text-muted-foreground lg:text-xl">
          <span className="text-foreground">{feature.highlight}</span>{" "}
          {feature.description}
        </p>
      </div>
      <div className="flex min-w-0 flex-col items-center justify-center overflow-hidden bg-card p-5 sm:p-6 md:p-7 lg:p-10">
        {feature.illustration}
      </div>
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function GridFrameHero({
  title,
  description,
  primaryAction,
  microcopy,
  features = defaultFeatures,
  className,
}: GridFrameHeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-background", className)}
    >
      <HeroBlock
        title={title}
        description={description}
        primaryAction={primaryAction}
        microcopy={microcopy}
      />
      {features && <FeaturesBlock features={features} />}
    </section>
  );
}

export default GridFrameHero;
