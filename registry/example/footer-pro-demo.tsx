"use client";

import FooterPro from "../ruixenui/footer-pro";
import { Github, Twitter } from "lucide-react";

export default function FooterProDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          FooterPro Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Demonstration of FooterPro with default and custom props.
        </p>
      </div>

      {/* --- Default FooterPro --- */}
      {/* <FooterPro /> */}

      {/* --- Custom FooterPro --- */}
      <div className="mt-20">
        <FooterPro
          description="Custom FooterPro for enterprise apps with extra sections and links."
          columns={[
            {
              title: "Solutions",
              links: [
                { label: "Startups", href: "#" },
                { label: "Enterprise", href: "#" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Documentation", href: "#" },
                { label: "API Guides", href: "#" },
              ],
            },
          ]}
          socials={[
            { icon: Github, href: "#" },
            { icon: Twitter, href: "#" },
          ]}
          copyright="© 2025 CustomCorp. All rights reserved."
        />
      </div>
    </main>
  );
}
