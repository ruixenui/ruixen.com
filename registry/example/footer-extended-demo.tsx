"use client";

import React from "react";
import { FooterExtended } from "../ruixenui/footer-extended";

export default function FooterExtendedDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Footer Extended Demo
        </h1>
      </div>

      {/* Default Footer */}
      <FooterExtended />

      {/* Custom Footer */}
      <div className="mt-20">
        <FooterExtended
          logo={{
            src: "/custom_logo.png",
            alt: "Custom Logo",
            title: "MyCompany",
            href: "/",
          }}
          description="Custom description: UI components made for modern startups."
          socialIcons={[
            {
              name: "Twitter",
              href: "https://twitter.com/mycompany",
              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
            },
            {
              name: "GitHub",
              href: "https://github.com/mycompany",
              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
            },
          ]}
        />
      </div>
    </main>
  );
}
