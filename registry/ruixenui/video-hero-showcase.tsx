"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FaGithub } from "react-icons/fa";

export interface VideoHeroShowcaseProps {
  badgeText?: string;
  badgeLink?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  videoSrc?: string;
  videoPoster?: string;
}

export default function VideoHeroShowcase({
  badgeText = "Discover the Animal World",
  badgeLink = "https://ruixen.com",
  title = "Explore nature’s most fascinating creatures",
  subtitle = "Learn about wildlife, their habitats, and amazing facts. From the tiniest insects to the largest mammals — dive into the beauty of the animal kingdom.",
  primaryButtonText = "Start Exploring",
  primaryButtonHref = "/docs/ui/getting-started/introduction",
  secondaryButtonText = "Animal Data",
  secondaryButtonHref = "https://ruixen.com/components",
  videoSrc = "https://videos.pexels.com/video-files/26772138/12003967_1920_1080_30fps.mp4",
  videoPoster = "https://videos.pexels.com/video-files/26772138/12003967_1920_1080_30fps.jpg",
}: VideoHeroShowcaseProps) {
  return (
    <section
      className="relative flex flex-col max-w-6xl mx-auto items-center justify-center gap-8 px-10 text-center py-16 pt-24 
      bg-gradient-to-b from-green-50 via-green-100/40 to-white 
      rounded-[4rem] shadow-sm"
    >
      {/* Badge */}
      <div className="flex items-center justify-center gap-4 flex-col">
        <Badge
          className="rounded-full cursor-pointer font-medium"
          variant={"secondary"}
          onClick={() => {
            window.open(badgeLink, "_blank");
          }}
        >
          {badgeText}
        </Badge>
      </div>

      {/* Heading */}
      <div className="flex items-center justify-center gap-4 flex-col">
        <h1 className="text-6xl max-sm:text-4xl font-medium tracking-tighter">
          {title}
        </h1>
        <p className="max-sm:text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button asChild className="grow rounded-xl" size={"sm"}>
          <Link href={primaryButtonHref} className="font-normal">
            {primaryButtonText} <span className="opacity-70">- It's free</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="grow rounded-xl"
          size={"sm"}
        >
          <Link
            href={secondaryButtonHref}
            className="font-normal flex items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <FaGithub />
              {secondaryButtonText}
            </span>
          </Link>
        </Button>
      </div>

      {/* Video */}
      <div className="border border-gray-200 dark:border-gray-800 shadow-lg rounded-3xl overflow-hidden w-full">
        <VideoPlayer
          src={videoSrc}
          poster={videoPoster}
          size={"full"}
          className="w-full h-auto rounded-3xl"
        />
      </div>
    </section>
  );
}
