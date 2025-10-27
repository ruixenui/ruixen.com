import Image from "next/image";

const footerSections = [
  {
    heading: "Hero Sections",
    links: [
      { label: "Aurora Hero", href: "/aurora-hero-section" },
      { label: "Card Carousel Hero", href: "/card-carousel-hero" },
      { label: "Gradient Hero", href: "/gradient-hero-showcase" },
      { label: "Spectrum Hero", href: "/spectrum-hero-section" },
      { label: "Video Hero", href: "/video-hero-showcase" },
      { label: "Visionary Hero", href: "/visionary-hero-section" },
    ],
  },
  {
    heading: "Interactive Components",
    links: [
      { label: "Advanced Context Menu", href: "/advanced-context-menu" },
      { label: "Animated Theme Toggler", href: "/animated-theme-toggler" },
      { label: "Feature Carousel", href: "/feature-carousel" },
      { label: "Feature Tabs", href: "/feature-tabs-showcase" },
      { label: "Tech Orbit Showcase", href: "/tech-orbit-showcase" },
      { label: "Multi Orbit Circle", href: "/multi-orbit-semi-circle" },
    ],
  },
  {
    heading: "Form & Input Components",
    links: [
      { label: "Password Strength Input", href: "/password-strength-input" },
      { label: "OTP Input", href: "/otp-input" },
      { label: "Color Picker", href: "/color-picker-input" },
      { label: "Time Picker", href: "/better-time-picker" },
      { label: "Tag Input", href: "/clean-tag-input" },
      { label: "Search with Category", href: "/search-with-category" },
    ],
  },
  {
    heading: "Navigation & Layout",
    links: [
      { label: "Floating Navbar", href: "/floating-navbar" },
      { label: "Hover Gradient Navbar", href: "/hover-gradient-navbar" },
      { label: "Footer Pro", href: "/footer-pro" },
      { label: "Corporate Footer", href: "/corporate-footer" },
      { label: "Bottom Drawers", href: "/bottom-drawers" },
      { label: "Nested Dashboard Menu", href: "/nested-dashboard-menu" },
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
    <footer className="relative bg-white dark:bg-black pt-24 pb-12 overflow-hidden text-sm text-black dark:text-white">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 space-y-4 md:space-y-0 border-b pb-6">
          <div className="flex items-center space-x-1">
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
            <span className="font-semibold text-lg text-foreground">
              Ruixen UI
            </span>
          </div>
          <p className="md:max-w-xl text-gray-500">
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
                      className="flex items-center text-muted-foreground hover:text-foreground transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/10 dark:border-black/10 pt-4 text-center">
          © {new Date().getFullYear()} Ruixen UI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
