"use client";

import React from "react";
import {
  TrustedClientsShowcase,
  LogoItem,
} from "../ruixenui/trusted-clients-showcase";

export default function DemoPage() {
  const customLogos: LogoItem[] = [
    {
      src: "/slack.svg",
      alt: "Slack Logo",
      href: "https://slack.com",
      width: 46,
      height: 24,
    },
    {
      src: "/amazon.svg",
      alt: "Amazon Logo",
      href: "https://amazon.com",
      width: 100,
      height: 24,
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      alt: "GitHub Logo",
      href: "https://github.com",
      width: 54,
      height: 24,
    },
    {
      src: "/playstation.svg",
      alt: "PlayStation Logo",
      href: "https://playstation.com",
      width: 64,
      height: 24,
    },
    {
      src: "/ibm.svg",
      alt: "IBM Logo",
      href: "https://ibm.com",
      width: 80,
      height: 24,
    },
    {
      src: "/ebay.svg",
      alt: "Ebay Logo",
      href: "https://ebay.com",
      width: 80,
      height: 24,
    },
    {
      src: "/meta.svg",
      alt: "Meta Logo",
      href: "https://meta.com",
      width: 60,
      height: 24,
    },
    {
      src: "/adobe.svg",
      alt: "Adobe Logo",
      href: "https://adobe.com",
      width: 46,
      height: 10,
    },
  ];

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20">
      {/* Using default logos */}
      <TrustedClientsShowcase />

      {/* Custom logos */}
      <div className="mt-20">
        <TrustedClientsShowcase
          logos={customLogos}
          defaultHeight={24}
          defaultWidth={80}
        />
      </div>
    </main>
  );
}
