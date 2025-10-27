"use client";

import React from "react";
import FooterMega from "../ruixenui/footer-mega";

export default function FooterMegaDemo() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Footer Mega Demo
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Demonstration of a large enterprise-style footer with multiple
          sections.
        </p>
      </div>

      {/* --- Default FooterMega --- */}
      <FooterMega />

      {/* --- Custom FooterMega Example --- */}
      <div className="mt-20">
        <FooterMega
          menuItems={[
            {
              title: "Platform",
              links: [
                { text: "Dashboard", url: "#" },
                { text: "Analytics", url: "#" },
                { text: "Integrations", url: "#" },
                { text: "APIs", url: "#" },
                { text: "Marketplace", url: "#" },
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
            {
              title: "Support",
              links: [
                { text: "Documentation", url: "#" },
                { text: "Help Center", url: "#" },
                { text: "Contact", url: "#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { text: "Privacy Policy", url: "#" },
                { text: "Terms of Service", url: "#" },
                { text: "Security", url: "#" },
              ],
            },
            {
              title: "Community",
              links: [
                { text: "GitHub", url: "#" },
                { text: "Discord", url: "#" },
                { text: "Twitter", url: "#" },
              ],
            },
            {
              title: "Solutions",
              links: [
                { text: "Startups", url: "#" },
                { text: "Enterprise", url: "#" },
              ],
            },
            {
              title: "Partners",
              links: [
                { text: "Technology", url: "#" },
                { text: "Agencies", url: "#" },
              ],
            },
          ]}
          copyright="© 2025 ruixen ui. All rights reserved."
          bottomLinks={[
            { text: "Terms", url: "#" },
            { text: "Privacy", url: "#" },
            { text: "Security", url: "#" },
            { text: "Cookies", url: "#" },
          ]}
        />
      </div>
    </main>
  );
}
