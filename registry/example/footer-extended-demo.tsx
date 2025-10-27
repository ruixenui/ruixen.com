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
          src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png",
          alt: "ruixen",
          title: "ruixen",
          href: "https://www.ruixen.com/",
        }}
        description="Custom description: UI components made for modern startups."
        socialIcons={[
          {
            name: "Twitter",
            href: "https://twitter.com/ruixenui",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
          },
          {
            name: "GitHub",
            href: "https://github.com/ruixenui/ruixen.com",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          },
        ]}
      />
    </main>
  );
}
