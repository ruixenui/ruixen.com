"use client";

import React from "react";
import { CorporateFooter } from "../ruixenui/corporate-footer";

export default function FooterDemo() {
  const customMenu = [
    {
      title: "Explore",
      links: [
        { text: "Docs", url: "#" },
        { text: "Tutorials", url: "#" },
        { text: "Community", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Blog", url: "#" },
      ],
    },
  ];

  const customBottomLinks = [
    { text: "Cookie Policy", url: "#" },
    { text: "Legal", url: "#" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Footer Component Demo
        </h1>
      </div>
      {/* Custom Footer */}
      <div className="mt-20">
        <CorporateFooter
          tagline="Custom Footer Tagline"
          menuItems={customMenu}
          bottomLinks={customBottomLinks}
          copyright="© 2025 MyCompany. All rights reserved."
          logo={{
            url: "https://example.com",
            src: "/custom_logo.png",
            alt: "Custom Logo",
            title: "MyCompany",
          }}
        />
      </div>
    </main>
  );
}
