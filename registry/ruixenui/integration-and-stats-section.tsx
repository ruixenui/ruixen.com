"use client";

import { cn } from "@/lib/utils";
import { CardStack } from "@/components/card-stack";
import { CardContent } from "@/components/ui/card";
import { TbHeartPlus } from "react-icons/tb";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className,
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Sarah Chen",
    designation: "Frontend Developer",
    content: (
      <p>
        <Highlight>Ruixen UI</Highlight> has completely transformed our
        development workflow. The components are beautifully crafted and{" "}
        <Highlight>incredibly easy to integrate</Highlight> into any modern
        React application.
      </p>
    ),
  },
  {
    id: 1,
    name: "Alex Rodriguez",
    designation: "UI/UX Designer",
    content: (
      <p>
        The <Highlight>design system</Highlight> behind Ruixen UI is both
        elegant and consistent. From layout to interactivity, every detail is
        thoughtfully built with{" "}
        <Highlight>accessibility and usability</Highlight> in mind.
      </p>
    ),
  },
  {
    id: 2,
    name: "David Kim",
    designation: "Product Manager",
    content: (
      <p>
        After adopting <Highlight>Ruixen UI</Highlight>, our team shipped
        features 40% faster. The rich component library and{" "}
        <Highlight>clear documentation</Highlight> have made it an essential
        tool in our product development.
      </p>
    ),
  },
];

const INTEGRATIONS = [
  {
    name: "Figma",
    desc: "Design collaboratively in real-time with intuitive UI tools",
    icon: "🎨",
  },
  {
    name: "Vercel",
    desc: "Deploy your projects seamlessly with global scale",
    icon: "🚀",
  },
];

export default function IntegrationAndStatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative gap-8 lg:gap-12">
        {/* Left Block */}
        <div className="flex flex-col items-start justify-center border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          <div className="relative w-full mb-4 sm:mb-6">
            <div className="absolute inset-x-0 -bottom-2 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>
            <CardStack items={CARDS} />
          </div>

          <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-gray-900 dark:text-white leading-relaxed">
            Intuitive Dashboard Experience{" "}
            <span className="text-primary">Ruixen UI</span>{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg">
              Simplify your development workflow with our beautifully designed
              components that provide actionable insights out of the box.
            </span>
          </h3>
        </div>

        {/* Right Block */}
        <div className="flex flex-col items-center justify-start border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-gray-900 dark:text-white mb-4 sm:mb-6 leading-relaxed">
            Seamless Integration Ecosystem{" "}
            <span className="text-primary">Ruixen UI</span>{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg">
              Integrate effortlessly with your favorite tools using Ruixen smart
              API-ready architecture and eliminate silos in seconds.
            </span>
          </h3>
          <CardContent className="space-y-3 sm:space-y-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl w-full">
            {INTEGRATIONS.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-muted flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <button className="rounded-full border border-gray-200 dark:border-gray-700 p-1.5 sm:p-2 text-xs font-semibold flex-shrink-0 ml-2">
                  <TbHeartPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </CardContent>
        </div>
      </div>

      {/* Stats & Testimonial */}
      <div className="mt-12 sm:mt-16 lg:mt-20 grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 w-full text-center sm:text-left">
            <div className="space-y-2 sm:space-y-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white">
                +1200
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                Stars on GitHub
              </p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white">
                22M
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                Active Users
              </p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white">
                +500
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                Powered Apps
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <blockquote className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 sm:pl-6 lg:pl-8 text-gray-700 dark:text-gray-400">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
              Using Ruixen UI has been like unlocking a new level of
              productivity. It's the perfect fusion of simplicity and
              versatility, enabling us to create UIs.
            </p>
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <cite className="block font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                Saurabh, CEO
              </cite>
              <Image
                className="h-8 sm:h-10 w-fit dark:invert"
                src="https://opencv.org/wp-content/uploads/2022/05/logo.png"
                alt="Company Logo"
                height={40}
                width={100}
              />
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
