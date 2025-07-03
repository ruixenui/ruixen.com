import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden text-sm text-white dark:text-gray-100">
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
          {[
            ["Components", ["Buttons", "Cards", "Forms", "Modals", "Tables", "Tabs", "Tooltips", "Avatars"]],
            ["Templates", ["Landing Pages", "Dashboards", "Portfolio Sites", "Marketing Pages", "AI SaaS Templates", "Startup Kits"]],
            ["Resources", ["Documentation", "Theme Customization", "Changelog", "Framer Motion Guide", "Tailwind CSS Tips", "Accessibility"]],
            ["Company", ["About Us", "Careers", "Blog", "Community", "Contact", "Terms & Conditions"]],
            ["More", ["Affiliate Program", "Refund Policy", "Licensing", "Studio Access", "Discord Server", "Twitter"]],
          ].map(([heading, links], i) => (
            <div key={i}>
              <h4 className="font-medium mb-4">{heading}</h4>
              <ul className="space-y-4">
                {(links as string[]).map((item, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="flex items-center hover:text-gray-400 dark:hover:text-gray-500 transition"
                    >
                      {item}
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
