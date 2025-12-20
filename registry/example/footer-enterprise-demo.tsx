"use client";

import React from "react";
import { FooterEnterprise } from "../ruixenui/footer-enterprise";

export default function FooterEnterpriseDemo() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Page Content */}
      <section className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Footer Enterprise Demo
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            An enterprise-grade footer component designed for SaaS platforms,
            dashboards, and corporate websites.
          </p>
        </div>
      </section>

      {/* Footer */}
      <FooterEnterprise
        logo={{
          srcDark:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-light.png",
          srcLight:
            "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png",
          alt: "Ruixen",
        }}
        description="AI-powered UI components and design systems built for modern teams, startups, and enterprises."
        sections={[
          {
            title: "Products",
            links: [
              { text: "Analytics Platform", href: "#" },
              { text: "Design System", href: "#" },
              { text: "Component Library", href: "#" },
              { text: "Admin Dashboard", href: "#" },
              { text: "Integrations", href: "#" },
            ],
          },
          {
            title: "Solutions",
            links: [
              { text: "For Startups", href: "#" },
              { text: "For Enterprises", href: "#" },
              { text: "For Developers", href: "#" },
              { text: "For Designers", href: "#" },
              { text: "Use Cases", href: "#" },
            ],
          },
          {
            title: "Developers",
            links: [
              { text: "Documentation", href: "#" },
              { text: "API Reference", href: "#" },
              { text: "Getting Started", href: "#" },
              { text: "CLI & Tooling", href: "#" },
              { text: "Changelog", href: "#" },
            ],
          },
          {
            title: "Resources",
            links: [
              { text: "Guides & Tutorials", href: "#" },
              { text: "Blog", href: "#" },
              { text: "Community", href: "#" },
              { text: "Templates", href: "#" },
              { text: "Release Notes", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { text: "About Us", href: "#" },
              { text: "Careers", href: "#" },
              { text: "Press & Media", href: "#" },
              { text: "Partners", href: "#" },
              { text: "Contact", href: "#" },
            ],
          },
          {
            title: "Support",
            links: [
              { text: "Help Center", href: "#" },
              { text: "System Status", href: "#" },
              { text: "Report a Bug", href: "#" },
              { text: "Security", href: "#" },
              { text: "FAQs", href: "#" },
            ],
          },
          {
            title: "Legal",
            links: [
              { text: "Privacy Policy", href: "#" },
              { text: "Terms of Service", href: "#" },
              { text: "Cookie Policy", href: "#" },
              { text: "Compliance", href: "#" },
              { text: "Licensing", href: "#" },
            ],
          },
        ]}
        copyrightText="© 2025 Ruixen UI. All rights reserved."
      />
    </main>
  );
}
