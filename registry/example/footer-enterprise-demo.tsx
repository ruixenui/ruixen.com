"use client";

import React from "react";
import { FooterEnterprise } from "../ruixenui/footer-enterprise";

export default function FooterEnterpriseDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Footer Enterprise Demo
        </h1>
      </div>

      {/* Default Footer */}
      {/* <FooterEnterprise /> */}

      {/* Custom Footer Example */}
      <div className="mt-20">
        <FooterEnterprise
          logo={{
            srcDark: "/custom_dark.png",
            srcLight: "/custom_light.png",
            alt: "MyCompany Logo",
          }}
          description="Custom description: AI-powered UI components for teams."
          sections={[
            {
              title: "Products",
              links: [
                { text: "Analytics", href: "#" },
                { text: "Design System", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { text: "About", href: "#" },
                { text: "Careers", href: "#" },
              ],
            },
            {
              title: "Support",
              links: [
                { text: "Documentation", href: "#" },
                { text: "Help Center", href: "#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { text: "Privacy Policy", href: "#" },
                { text: "Terms of Service", href: "#" },
              ],
            },
          ]}
          copyrightText="© 2025 MyCompany. All rights reserved."
        />
      </div>
    </main>
  );
}
