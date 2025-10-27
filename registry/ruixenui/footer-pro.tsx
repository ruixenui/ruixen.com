"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FooterProProps {
  description?: string;
  logo?: {
    dark: string;
    light: string;
  };
  contact?: {
    email: string;
    phone: string;
  };
  socials?: { icon: any; href: string }[];
  columns?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  copyright?: string;
}

const defaultProps: FooterProProps = {
  description:
    "ruixen ui empowers developers with modern tools, scalable infrastructure, and a vibrant community to build, ship, and grow faster.",
  logo: {
    dark: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png",
    light:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-light.png",
  },
  contact: {
    email: "support@ruixen ui",
    phone: "+1 (555) 123-4567",
  },
  socials: [
    { icon: Github, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Instagram, href: "#" },
  ],
  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Events", href: "#" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
        { label: "API Reference", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Community", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
  ],
  copyright: "© 2024 ruixen ui. All rights reserved.",
};

export default function FooterPro(props?: FooterProProps) {
  const config: FooterProProps = { ...defaultProps, ...props };

  const socials = config.socials ?? [];
  const columns = config.columns ?? [];

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white px-6 py-14 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Logo + Description */}
        <div className="mb-12 text-center lg:text-left">
          {config.logo && (
            <>
              <Image
                src={config.logo.dark}
                alt="Logo"
                width={180}
                height={50}
                className="hidden dark:block h-auto w-auto"
              />
              <Image
                src={config.logo.light}
                alt="Logo"
                width={180}
                height={50}
                className="block dark:hidden h-auto w-auto mb-4"
              />
            </>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {config.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
          {/* Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 flex-1">
            {columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-medium mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links?.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-[0.85rem] text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Side: Contact & Socials */}
          <div className="lg:w-1/4 space-y-4">
            <Card className="shadow-none border-none">
              <CardContent className="p-0">
                <p className="text-sm font-medium mb-2">Get in Touch</p>
                <Button
                  variant="default"
                  className="w-full bg-gray-200 border border-gray-400 text-gray-600 hover:text-white"
                >
                  Contact Us
                </Button>
                {config.contact && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Email: {config.contact.email} <br />
                    Phone: {config.contact.phone}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-none border-none">
              <CardContent className="p-0">
                <p className="text-sm font-medium mb-2">Follow Us</p>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, href }, idx) => (
                    <Link
                      key={idx}
                      href={href}
                      className="text-gray-500 hover:text-blue-500 transition"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>{config.copyright}</p>
          <div className="flex gap-6">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
