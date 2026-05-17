"use client";

import BorderedClientsGrid from "../ruixenui/bordered-clients-grid";

const LOGO_CLS =
  "w-auto opacity-65 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] transition-opacity hover:opacity-100";

export default function BorderedClientsGridDemo() {
  return (
    <BorderedClientsGrid
      logos={[
        {
          name: "Cosmos",
          node: (
            <img
              src="/logos/cosmos.svg"
              alt="Cosmos"
              className={`h-4 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Bitbucket",
          node: (
            <img
              src="/logos/bitbucket.svg"
              alt="Bitbucket"
              className={`h-4 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Gumroad",
          node: (
            <img
              src="/logos/gumroad.svg"
              alt="Gumroad"
              className={`h-4 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Gong",
          node: (
            <img
              src="/logos/gong.svg"
              alt="Gong"
              className={`h-6 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Geckoboard",
          node: (
            <img
              src="/logos/geckoboard.svg"
              alt="Geckoboard"
              className={`h-5 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Coinflect",
          node: (
            <img
              src="/logos/coinflect.svg"
              alt="Coinflect"
              className={`h-5 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Ternary",
          node: (
            <img
              src="/logos/ternary.svg"
              alt="Ternary"
              className={`h-5 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Wyre",
          node: (
            <img
              src="/logos/wyre.svg"
              alt="Wyre"
              className={`h-5 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Percy",
          node: (
            <img
              src="/logos/percy.svg"
              alt="Percy"
              className={`h-5 ${LOGO_CLS}`}
            />
          ),
        },
        {
          name: "Urban",
          node: (
            <img
              src="/logos/urban.svg"
              alt="Urban"
              className={`h-5 ${LOGO_CLS}`}
            />
          ),
        },
      ]}
    />
  );
}
