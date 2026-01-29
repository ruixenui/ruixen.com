"use client";

import Image from "next/image";
import React from "react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface CorporateFooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

export const CorporateFooter: React.FC<CorporateFooterProps> = ({
  logo = {
    src: "/ruixen_dark.png",
    alt: "Ruixen.com",
    title: "Ruixen.com",
    url: "https://ruixen.com",
  },
  tagline = "Components made easy.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Marketplace", url: "#" },
        { text: "Features", url: "#" },
        { text: "Integrations", url: "#" },
        { text: "Roadmap", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Privacy", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help Center", url: "#" },
        { text: "API Docs", url: "#" },
        { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright = "© 2024 Ruixen. All rights reserved.",
  bottomLinks = [
    { text: "Terms", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}) => {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Logo & Tagline */}
          <div className="col-span-2 space-y-4">
            <a href={logo.url} className="flex items-center gap-3">
              <Image
                src="/ruixen_dark.png"
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden"
              />
              <Image
                src="/ruixen-ui-nw-light.png"
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block"
              />
              <span className="text-xl font-semibold">{logo.title}</span>
            </a>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>

          {/* Menu Sections */}
          {menuItems.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3 text-muted-foreground text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-primary transition-colors duration-150"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>{copyright}</p>
          <div className="flex gap-4">
            {bottomLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="hover:text-primary underline underline-offset-2"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
