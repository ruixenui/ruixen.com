"use client";

import FooterPro from "../ruixenui/footer-pro";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function FooterProDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Footer */}
      <FooterPro
        description="FooterPro is a flexible and production-ready footer component for modern web applications."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#" },
              { label: "Pricing", href: "#" },
              { label: "Changelog", href: "#" },
              { label: "Roadmap", href: "#" },
              { label: "Integrations", href: "#" },
              { label: "Releases", href: "#" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Documentation", href: "#" },
              { label: "API Reference", href: "#" },
              { label: "Developer Guides", href: "#" },
              { label: "Tutorials", href: "#" },
              { label: "Community", href: "#" },
              { label: "Status Page", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About Us", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Press Kit", href: "#" },
              { label: "Contact", href: "#" },
              { label: "Partners", href: "#" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Cookie Policy", href: "#" },
              { label: "Security", href: "#" },
              { label: "Compliance", href: "#" },
            ],
          },
        ]}
        socials={[
          { icon: Github, href: "#" },
          { icon: Twitter, href: "#" },
          { icon: Linkedin, href: "#" },
        ]}
        copyright="© 2025 Ruixen UI. All rights reserved."
      />
    </main>
  );
}
