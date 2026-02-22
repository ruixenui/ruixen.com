"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRef, useEffect } from "react";

interface VideoItem {
  id: string;
  title: string;
  videoSrc: string;
  href: string;
  gridArea: string;
}

// Video data - replace videoSrc with your actual videos later
const videoItems: VideoItem[] = [
  {
    id: "1",
    title: "Image reveal",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/image-reveal",
    gridArea: "1 / 1 / 2 / 2",
  },
  {
    id: "2",
    title: "Hover members",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/hover-members",
    gridArea: "1 / 2 / 2 / 4",
  },
  {
    id: "3",
    title: "Things drag and scroll",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/things-drag",
    gridArea: "1 / 4 / 3 / 5",
  },
  {
    id: "4",
    title: "Devouring details sign in",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/sign-in",
    gridArea: "2 / 1 / 3 / 2",
  },
  {
    id: "5",
    title: "Dynamic island",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/dynamic-island",
    gridArea: "2 / 2 / 3 / 3",
  },
  {
    id: "6",
    title: "Vercel Tooltip",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/vercel-tooltip",
    gridArea: "3 / 1 / 4 / 2",
  },
  {
    id: "7",
    title: "Aave token swap",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/token-swap",
    gridArea: "2 / 3 / 4 / 4",
  },
  {
    id: "8",
    title: "Image cursor trail",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/cursor-trail",
    gridArea: "3 / 4 / 4 / 5",
  },
  {
    id: "9",
    title: "Music player",
    videoSrc: "/demo-video-player-cmp-src.mp4",
    href: "/docs/components/music-player",
    gridArea: "3 / 2 / 4 / 3",
  },
];

function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
      style={{ gridArea: item.gridArea }}
    >
      <Link
        href={item.href}
        className="relative block h-full w-full rounded-2xl overflow-hidden bg-muted border border-border hover:border-primary/50 transition-all duration-300"
      >
        {/* Video container */}
        <div className="absolute inset-0">
          {/* Video element */}
          <video
            ref={videoRef}
            src={item.videoSrc}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          {/* Fallback gradient for when video isn't available */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted-foreground/10 -z-10" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* V0 badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="w-6 h-6 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center border border-border">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-medium text-sm md:text-base">
            {item.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function VideoShowcaseGrid() {
  return (
    <section className="w-full bg-background py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            103+ AND COUNTING
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Outstanding components
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No extra packages — just one file for each component.
            <br />
            Use directly with your fav ShadCN CLI.
          </p>
        </motion.div> */}

        {/* Bento Video Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 220px)",
          }}
        >
          {videoItems.map((item, index) => (
            <VideoCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
