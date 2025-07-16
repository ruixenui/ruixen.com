"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-start justify-center gap-10 p-6 mt-14">
      {/* Left: Scrollable Images */}
      <div className="flex flex-col gap-6 w-full md:w-2/3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-black/5 dark:bg-white/5 backdrop-blur-sm"
          >
            <Image
              src={`/templates/template-01/0${n}.png`}
              alt={`Template ${n}`}
              width={600}
              height={400}
              className="w-full h-full object-cover object-center transition-transform hover:scale-105 duration-300"
            />
          </div>
        ))}
      </div>

      {/* Right: Sticky Info Card */}
      <div className="w-full md:w-1/3 sticky space-y-3 top-24 self-start p-3 border border-black/10 dark:border-white/10 rounded-xl">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold leading-tight">Premium Portfolio Template</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Access a production-grade portfolio built with Next.js, Tailwind, and shadcn/ui.
          </p>
        </div>

        {/* Price */}
        <div className="text-3xl font-bold">
          <span className="text-sm align-top">$</span>0
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">Free. Open Source. MIT Licensed.</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button asChild className="w-full sm:w-auto">
            <Link
              href="https://portfolio-mocha-three-0caesswhna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Preview
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link
              href="https://github.com/ruixenui/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repo
              <Github className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
