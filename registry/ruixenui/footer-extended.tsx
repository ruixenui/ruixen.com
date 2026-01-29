"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface SocialIcon {
  name: string;
  href: string;
  icon: string;
}

interface FooterExtendedProps {
  logo?: {
    src: string;
    alt: string;
    title: string;
    href: string;
  };
  description?: string;
  socialIcons?: SocialIcon[];
}

export const FooterExtended: React.FC<FooterExtendedProps> = ({
  logo = {
    src: "/ruixen_dark.png",
    alt: "Ruixen Logo",
    title: "Ruixen Premium",
    href: "/",
  },
  description = "Unlock beautifully crafted UI components and lifetime updates. Designed for product builders, startups, and UI engineers.",
  socialIcons = [
    {
      name: "Twitter",
      href: "https://twitter.com/ruixen",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
    },
    {
      name: "GitHub",
      href: "https://github.com/ruixen",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/ruixen",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/ruixen",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    },
  ],
}) => {
  return (
    <footer className="bg-background text-foreground border-t pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-5">
        {/* Branding & Subscription */}
        <div className="col-span-2 space-y-6 text-sm">
          <Link href={logo.href} className="flex items-center gap-3">
            <Image
              src="/ruixen_dark.png"
              alt={logo.alt}
              width={60}
              height={60}
              className="rounded-xl dark:hidden"
            />
            <Image
              src="/ruixen-ui-nw-light.png"
              alt={logo.alt}
              width={60}
              height={60}
              className="rounded-xl hidden dark:block"
            />
            <span className="text-2xl font-bold tracking-tight">
              {logo.title}
            </span>
          </Link>
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <form className="flex gap-2 w-full max-w-sm">
            <Input placeholder="Your email" className="text-sm" />
            <Button type="submit" variant="default" className="text-sm gap-1">
              <Mail className="w-4 h-4" /> Subscribe
            </Button>
          </form>

          <div className="flex gap-3 pt-4">
            {socialIcons.map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Components</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/components/buttons" className="hover:text-primary">
                  Buttons
                </Link>
              </li>
              <li>
                <Link href="/components/cards" className="hover:text-primary">
                  Cards
                </Link>
              </li>
              <li>
                <Link href="/components/footers" className="hover:text-primary">
                  Footers
                </Link>
              </li>
              <li>
                <Link href="/components/heroes" className="hover:text-primary">
                  Hero Sections
                </Link>
              </li>
              <li>
                <Link href="/components/ctas" className="hover:text-primary">
                  CTAs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-primary">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-primary">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-primary">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-16 border-t pt-6 text-xs text-muted-foreground text-center space-y-1">
        <p>© {new Date().getFullYear()} Ruixen. All rights reserved.</p>
        <p>
          Built with <span className="text-primary font-medium">Shadcn UI</span>{" "}
          and hosted on <span className="font-medium">Cloudflare</span>.
        </p>
      </div>
    </footer>
  );
};
