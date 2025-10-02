"use client";

import React from "react";
import { FooterExtended } from "../ruixenui/footer-extended";

export default function FooterExtendedDemo() {
  return (
    <main>
      {/* Default Footer */}
      <FooterExtended />

      {/* Custom Footer */}
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
    </main>
  );
}
