"use client";

import Image from "next/image";

export default function FooterMega({
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Features", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Changelog", url: "#" },
        { text: "Marketplace", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Press", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Docs", url: "#" },
        { text: "API Reference", url: "#" },
        { text: "Help Center", url: "#" },
        { text: "Guides", url: "#" },
        { text: "Community", url: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { text: "CLI Tools", url: "#" },
        { text: "SDKs", url: "#" },
        { text: "GitHub", url: "#" },
        { text: "Code Samples", url: "#" },
        { text: "Open Source", url: "#" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { text: "Startups", url: "#" },
        { text: "Enterprise", url: "#" },
        { text: "E-commerce", url: "#" },
        { text: "Agencies", url: "#" },
        { text: "Education", url: "#" },
      ],
    },
    {
      title: "Partners",
      links: [
        { text: "Technology", url: "#" },
        { text: "Agencies", url: "#" },
        { text: "Integrations", url: "#" },
        { text: "Resellers", url: "#" },
        { text: "Affiliates", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "LinkedIn", url: "#" },
        { text: "GitHub", url: "#" },
        { text: "YouTube", url: "#" },
        { text: "Discord", url: "#" },
      ],
    },
  ],
  copyright = "© 2024 ruixen ui. All rights reserved.",
  bottomLinks = [
    { text: "Terms", url: "#" },
    { text: "Privacy", url: "#" },
    { text: "Security", url: "#" },
    { text: "Cookies", url: "#" },
  ],
}) {
  return (
    <footer className="bg-white dark:bg-black py-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        {/* --- Branding & Status --- */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
          {/* Logo + tagline */}
          <div className="max-w-sm text-center lg:text-left">
            <Image
              src={
                "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-light.png"
              }
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 dark:block hidden"
            />
            <Image
              src={
                "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
              }
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 dark:hidden block"
            />
            <div className="lg:col-span-2">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                About ruixen ui
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                ruixen ui is pioneering modern developer experiences with a
                platform built for scalability, reliability, and speed. From
                startups to global enterprises, we empower teams to ship better
                products faster with open source tools and AI-driven
                integrations.
              </p>
            </div>
          </div>

          {/* --- Menu Links (multi-column) --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 flex-1">
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary transition-colors"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 dark:text-gray-400 gap-4">
          <p>{copyright}</p>
          <ul className="flex flex-wrap gap-4">
            {bottomLinks.map((link, linkIdx) => (
              <li
                key={linkIdx}
                className="hover:text-primary underline underline-offset-4 transition-colors"
              >
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
