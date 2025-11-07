import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ShowcaseCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: {
    text: string;
    variant: "pink" | "indigo" | "orange";
  };
  href?: string;
  id?: string;
}

export default function ShowcaseCard({
  title = "Build Stunning Interfaces",
  subtitle = "Harness the power of elegant components built for speed and clarity with RUIXEN UI",
  image = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_hero_gradient.jpg",
  badge = { text: "New", variant: "orange" },
  href = "#",
  id = title,
}: ShowcaseCardProps) {
  const badgeColors = {
    pink: "bg-pink-600 text-white",
    indigo: "bg-indigo-600 text-white",
    orange: "bg-orange-500 text-white",
  };

  return (
    <div className="w-full max-w-[300px] mx-auto flex flex-col group">
      <Link
        href={href}
        className="relative block overflow-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-white/50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
      >
        {/* Image */}
        <div className="relative h-[300px] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>

        <div className="absolute bottom-4 left-4 right-4 group-hover:scale-[1.01] group-hover:translate-y-[-4px] transform transition-all duration-300 ease-out bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/10 dark:border-zinc-700">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
              {subtitle}
            </p>
            <div className="flex justify-end mt-2">
              <div className="group relative w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100/70 dark:bg-zinc-800/60 transition-all duration-300 hover:scale-110 hover:shadow-md">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 dark:text-white transition-transform duration-300 group-hover:rotate-45" />
                <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
