"use client";

import { TrustedClientsShowcase } from "@/registry/ruixenui/trusted-clients-showcase";
import type { LogoItem } from "@/registry/ruixenui/trusted-clients-showcase";

const LOGO_CLS =
  "w-auto opacity-65 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] transition-opacity hover:opacity-100";

const clients: LogoItem[] = [
  {
    name: "Percy",
    logo: (
      <img src="/logos/percy.svg" alt="Percy" className={`h-5 ${LOGO_CLS}`} />
    ),
  },
  {
    name: "Bitbucket",
    logo: (
      <img
        src="/logos/bitbucket.svg"
        alt="Bitbucket"
        className={`h-4 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Gumroad",
    logo: (
      <img
        src="/logos/gumroad.svg"
        alt="Gumroad"
        className={`h-4 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Gong",
    logo: (
      <img src="/logos/gong.svg" alt="Gong" className={`h-6 ${LOGO_CLS}`} />
    ),
  },
  {
    name: "Geckoboard",
    logo: (
      <img
        src="/logos/geckoboard.svg"
        alt="Geckoboard"
        className={`h-5 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Coinflect",
    logo: (
      <img
        src="/logos/coinflect.svg"
        alt="Coinflect"
        className={`h-5 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Ternary",
    logo: (
      <img
        src="/logos/ternary.svg"
        alt="Ternary"
        className={`h-5 ${LOGO_CLS}`}
      />
    ),
  },
  {
    name: "Wyre",
    logo: (
      <img src="/logos/wyre.svg" alt="Wyre" className={`h-5 ${LOGO_CLS}`} />
    ),
  },
];

export default function TrustedClientsShowcaseDemo() {
  return (
    <TrustedClientsShowcase
      clients={clients}
      title="Trusted by leading teams"
      className="py-0 md:py-0"
    />
  );
}
