"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Adjust path if needed

export interface ExperienceCardProps {
  work: {
    company: string;
    title: string;
    description: string;
    start: string;
    end?: string;
    star_tag?: string;
    badges: string[];
  };
}

export const ExperienceCard = ({ work }: ExperienceCardProps) => {
  return (
    <Link href="/cognitivelab">
      <div className="relative flex items-center gap-4 rounded-lg p-[2px] shadow-xl transition-all duration-300 hover:scale-[1.01]">
        {/* Gradient Border */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 210, 255, 0.6), rgba(58, 123, 213, 0.6), rgba(142, 45, 226, 0.6))",
            maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px",
            zIndex: 0,
            animation: "gradientShift 6s linear infinite",
          }}
        />
        {/* Shine animation */}
        <div className="absolute inset-0 overflow-hidden rounded-lg" style={{ zIndex: 0 }}>
          <div
            className="absolute inset-[-100%] animate-[shine_3s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0 210deg, rgba(255, 255, 255, 0.5), transparent 330deg 360deg)",
              transform: "rotate(-45deg)",
            }}
          />
        </div>

        {/* Image */}
        <div className="relative z-10 h-20 w-20 shrink-0 overflow-hidden rounded-lg">
          <Image
            src="https://avatars.githubusercontent.com/u/111233383?s=400&u=4907246edac57d1a1576bc4d38c43dec1e2a2a81&v=4"
            alt={work.company}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 rounded-lg bg-card px-4 py-3 shadow-sm">
          <div className="absolute -right-2 -top-2 z-20">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-300 text-white shadow-sm transition-transform duration-300 hover:scale-110">
              <ArrowUpRightIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium">{work.company}</h3>
              {work.star_tag && (
                <Badge className="bg-blue-100 text-[10px] text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {work.star_tag}
                </Badge>
              )}
            </div>
            <div className="text-xs tabular-nums text-muted-foreground">
              {work.start} - {work.end ?? "Present"}
            </div>
          </div>

          <div className="mt-1 flex flex-wrap gap-1">
            <span className="text-xs font-medium">{work.title}</span>
            <div className="flex-1" />
            <div className="flex flex-wrap gap-1">
              {work.badges.map((badge) => (
                <Badge key={badge} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {work.description}
          </p>
        </div>

        <style jsx>{`
          @keyframes gradientShift {
            0% {
              background: linear-gradient(
                45deg,
                rgba(79, 70, 229, 0.6),
                rgba(236, 72, 153, 0.6),
                rgba(139, 92, 246, 0.6)
              );
            }
            33% {
              background: linear-gradient(
                45deg,
                rgba(139, 92, 246, 0.6),
                rgba(79, 70, 229, 0.6),
                rgba(236, 72, 153, 0.6)
              );
            }
            66% {
              background: linear-gradient(
                45deg,
                rgba(236, 72, 153, 0.6),
                rgba(139, 92, 246, 0.6),
                rgba(79, 70, 229, 0.6)
              );
            }
            100% {
              background: linear-gradient(
                45deg,
                rgba(79, 70, 229, 0.6),
                rgba(236, 72, 153, 0.6),
                rgba(139, 92, 246, 0.6)
              );
            }
          }
        `}</style>
      </div>
    </Link>
  );
};
