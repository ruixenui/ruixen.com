import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-black pt-24 pb-12 overflow-hidden text-sm">
      
      {/* Grid Background */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div> */}

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        
        <div className="mb-12">
          <div className="flex items-center space-x-3">
            <Image src="/ruixen.png" alt="Ruixen Logo" width={36} height={36} className="rounded-md" />
            <span className="font-semibold text-lg bg-gradient-to-r from-black via-gray-800 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
              Ruixen UI
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl">
            Build high-performance, accessible components and templates with Ruixen UI. Powered by Tailwind CSS, Framer Motion, and TypeScript.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12">
          
          <div>
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200">Components</h4>
            <ul className="space-y-4">
              {["Buttons", "Cards", "Forms", "Modals", "Tables", "Tabs", "Tooltips", "Avatars"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                    
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200">Templates</h4>
            <ul className="space-y-4">
              {["Landing Pages", "Dashboards", "Portfolio Sites", "Marketing Pages", "AI SaaS Templates", "Startup Kits"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                    
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200">Resources</h4>
            <ul className="space-y-4">
              {["Documentation", "Theme Customization", "Changelog", "Framer Motion Guide", "Tailwind CSS Tips", "Accessibility"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                    
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200">Company</h4>
            <ul className="space-y-4">
              {["About Us", "Careers", "Blog", "Community", "Contact", "Terms & Conditions"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                    
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200">More</h4>
            <ul className="space-y-4">
              {["Affiliate Program", "Refund Policy", "Licensing", "Studio Access", "Discord Server", "Twitter"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
                    
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Bottom Line */}
        <div className="border-t border-black/10 dark:border-white/10 pt-6 text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ruixen UI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
