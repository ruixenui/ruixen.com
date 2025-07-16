import Image from "next/image";

const footerSections = [
  {
    heading: "Components",
    links: [
      { label: "Buttons", href: "/components/buttons" },
      { label: "Cards", href: "/components/cards" },
      { label: "Forms", href: "/components/forms" },
      { label: "Modals", href: "/components/modals" },
      { label: "Tables", href: "/components/tables" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "Tooltips", href: "/components/tooltips" },
      { label: "Avatars", href: "/components/avatars" },
    ],
  },
  {
    heading: "Templates",
    links: [
      { label: "Landing Pages", href: "/templates/landing-pages" },
      { label: "Dashboards", href: "/templates/dashboards" },
      { label: "Portfolio Sites", href: "/templates/portfolio" },
      { label: "Marketing Pages", href: "/templates/marketing" },
      { label: "AI SaaS Templates", href: "/templates/ai-saas" },
      { label: "Startup Kits", href: "/templates/startup-kits" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Theme Customization", href: "/docs/theme" },
      { label: "Changelog", href: "/changelog" },
      { label: "Framer Motion Guide", href: "/guides/framer-motion" },
      { label: "Tailwind CSS Tips", href: "/guides/tailwind" },
      { label: "Accessibility", href: "/guides/accessibility" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Contact", href: "/contact" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Licensing", href: "/licensing" },
      { label: "Studio Access", href: "/studio" },
      { label: "Discord Server", href: "https://discord.gg/ruixen" },
      { label: "Twitter", href: "https://twitter.com/ruixen" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden text-sm text-white dark:text-gray-100 rounded-t-[3%]">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="mb-12">
          <div className="flex items-center space-x-3">
            <Image
              src={"/ruixen_light.png"}
              alt="Ruixen Logo"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 block"
            />
            <span className="font-medium text-lg bg-gradient-to-r from-white via-gray-300 to-gray-100 dark:from-black dark:via-gray-800 dark:to-gray-900 bg-clip-text text-white">
              Ruixen UI
            </span>
          </div>
          <p className="mt-4 max-w-xl">
            Build high-performance, accessible components and templates with Ruixen UI. Powered by Tailwind CSS, Framer Motion, and TypeScript.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section, i) => (
            <div key={i}>
              <h4 className="font-medium mb-4">{section.heading}</h4>
              <ul className="space-y-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="flex items-center hover:text-gray-400 dark:hover:text-gray-500 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 dark:border-black/10 pt-6 text-center">
          © {new Date().getFullYear()} Ruixen UI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
