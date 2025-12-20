"use client";

import React from "react";
import { CorporateFooter } from "../ruixenui/corporate-footer";

export default function FooterDemo() {
  const menuItems = [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#" },
        { text: "Integrations", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Changelog", url: "#" },
        { text: "Roadmap", url: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { text: "Documentation", url: "#" },
        { text: "API Reference", url: "#" },
        { text: "SDKs & Tools", url: "#" },
        { text: "Guides & Tutorials", url: "#" },
        { text: "Status Page", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Press Kit", url: "#" },
        { text: "Contact", url: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", url: "#" },
        { text: "Community", url: "#" },
        { text: "Report an Issue", url: "#" },
        { text: "System Status", url: "#" },
        { text: "Security", url: "#" },
      ],
    },
  ];

  const bottomLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
    { text: "Cookie Policy", url: "#" },
    { text: "Legal", url: "#" },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Page Content */}
      <section className="flex-grow flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Corporate Footer Demo
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A scalable, enterprise-ready footer component designed for SaaS,
            startups, and corporate websites.
          </p>
        </div>
      </section>

      {/* Footer */}
      <CorporateFooter
        tagline="Building modern web experiences with scalable UI systems."
        menuItems={menuItems}
        bottomLinks={bottomLinks}
        copyright="© 2025 Ruixen UI. All rights reserved."
        logo={{
          url: "https://www.ruixen.com/",
          src: "/ruixen-ui-nw-light.png",
          alt: "Ruixen",
          title: "Ruixen UI",
        }}
      />
    </main>
  );
}
