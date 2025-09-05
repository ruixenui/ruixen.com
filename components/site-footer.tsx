import Image from "next/image";

const footerSections = [
  {
    heading: "Hero Sections",
    links: [
      { label: "Aurora Hero", href: "/r/aurora-hero-section" },
      { label: "Card Carousel Hero", href: "/r/card-carousel-hero" },
      { label: "Gradient Hero", href: "/r/gradient-hero-showcase" },
      { label: "Spectrum Hero", href: "/r/spectrum-hero-section" },
      { label: "Video Hero", href: "/r/video-hero-showcase" },
      { label: "Visionary Hero", href: "/r/visionary-hero-section" },
    ],
  },
  {
    heading: "Interactive Components",
    links: [
      { label: "Advanced Context Menu", href: "/r/advanced-context-menu" },
      { label: "Animated Theme Toggler", href: "/r/animated-theme-toggler" },
      { label: "Feature Carousel", href: "/r/feature-carousel" },
      { label: "Feature Tabs", href: "/r/feature-tabs-showcase" },
      { label: "Tech Orbit Showcase", href: "/r/tech-orbit-showcase" },
      { label: "Multi Orbit Circle", href: "/r/multi-orbit-semi-circle" },
    ],
  },
  {
    heading: "Form & Input Components",
    links: [
      { label: "Password Strength Input", href: "/r/password-strength-input" },
      { label: "OTP Input", href: "/r/otp-input" },
      { label: "Color Picker", href: "/r/color-picker-input" },
      { label: "Time Picker", href: "/r/better-time-picker" },
      { label: "Tag Input", href: "/r/clean-tag-input" },
      { label: "Search with Category", href: "/r/search-with-category" },
    ],
  },
  {
    heading: "Navigation & Layout",
    links: [
      { label: "Floating Navbar", href: "/r/floating-navbar" },
      { label: "Hover Gradient Navbar", href: "/r/hover-gradient-navbar" },
      { label: "Footer Pro", href: "/r/footer-pro" },
      { label: "Corporate Footer", href: "/r/corporate-footer" },
      { label: "Bottom Drawers", href: "/r/bottom-drawers" },
      { label: "Nested Dashboard Menu", href: "/r/nested-dashboard-menu" },
    ],
  },
  {
    heading: "Community & Support",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Discord Server", href: "https://discord.gg/j9fVZm2D" },
      { label: "GitHub", href: "https://github.com/ruixenui/ruixen.com" },
      { label: "Twitter", href: "https://twitter.com/ruixenui" },
      { label: "Instagram", href: "https://instagram.com/ruixenui/" },
    ],
  },
];

export default function SiteFooter() {
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
            Build high-performance, accessible components and templates with
            Ruixen UI. Powered by Tailwind CSS, Framer Motion, and TypeScript.
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

        <div className="border-t border-white/10 dark:border-black/10 pt-4 text-center">
          © {new Date().getFullYear()} Ruixen UI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
