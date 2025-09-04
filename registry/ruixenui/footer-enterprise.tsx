"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterEnterpriseProps {
  logo?: {
    srcDark: string;
    srcLight: string;
    alt: string;
  };
  description?: string;
  sections?: FooterSection[];
  copyrightText?: string;
}

export const FooterEnterprise: React.FC<FooterEnterpriseProps> = ({
  logo = {
    srcDark: "/ruixen_dark.png",
    srcLight: "/ruixen_light.png",
    alt: "Ruixen Logo",
  },
  description = "Build better UIs faster with Ruixen – the AI-enhanced component library for modern teams.",
  sections = [
    {
      title: "Ruixen",
      links: [
        { text: "Components", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Use Cases", href: "#" },
        { text: "Language Support", href: "#" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { text: "Developers", href: "#" },
        { text: "Design Teams", href: "#" },
        { text: "Startups", href: "#" },
        { text: "Enterprises", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", href: "#" },
        { text: "Component Guides", href: "#" },
        { text: "Support Center", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Our Story", href: "#" },
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of Service", href: "#" },
      ],
    },
  ],
  copyrightText = `© ${new Date().getFullYear()} Ruixen. Built for UI excellence.`,
}) => {
  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-foreground/5 pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        {/* Branding */}
        <Container>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-center gap-2">
              <Image
                src={logo.srcDark}
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 block dark:hidden"
              />
              <Image
                src={logo.srcLight}
                alt={logo.alt}
                width={40}
                height={40}
                className="rounded-full h-10 w-10 hidden dark:block"
              />
            </div>
            <p className="text-muted-foreground mt-4 text-sm text-start">
              {description}
            </p>
          </div>
        </Container>

        {/* Sections */}
        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            {sections.slice(0, 2).map((section, i) => (
              <Container key={i} delay={i * 0.1} className="h-auto">
                <h3 className="text-base font-normal text-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 text-sm text-gray-500 space-y-4">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="link hover:text-foreground transition-all duration-300"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>
            ))}
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-8">
            {sections.slice(2).map((section, i) => (
              <Container key={i} delay={(i + 2) * 0.1} className="h-auto">
                <h3 className="text-base font-normal text-foreground">
                  {section.title}
                </h3>
                <ul className="mt-4 text-sm text-gray-500 space-y-4">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="link hover:text-foreground transition-all duration-300"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <Container delay={0.5} className="w-full relative mt-12 lg:mt-20">
        <div className="mt-8 md:flex md:items-center justify-center footer w-full">
          <p className="text-sm text-gray-500 mt-8 md:mt-0">{copyrightText}</p>
        </div>
      </Container>
    </footer>
  );
};
