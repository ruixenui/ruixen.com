'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Replace with your local utils or remove if unused

interface RuixenCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: {
    text: string;
    variant: 'pink' | 'indigo' | 'orange';
  };
  href?: string;
  id?: string;
}

const cards: RuixenCardProps[] = [
  {
    title: 'Design Dashboards',
    subtitle: 'Beautiful and responsive interfaces',
    image: './ruixenui-bg.png',
    badge: { text: 'UI', variant: 'pink' },
    href: '#',
  },
  {
    title: 'Marketing Sites',
    subtitle: 'Speed-optimized landing templates',
    image: './ruixenui-bg.png',
    badge: { text: 'New', variant: 'orange' },
    href: '#',
  },
  {
    title: 'AI SaaS Tools',
    subtitle: 'Next-gen interfaces for smart apps',
    image: './ruixenui-bg.png',
    badge: { text: 'AI', variant: 'indigo' },
    href: '#',
  },
  {
    title: 'Developer Portfolio',
    subtitle: 'Showcase your skills with style',
    image: './ruixenui-bg.png',
    badge: { text: 'Dev', variant: 'pink' },
    href: '#',
  },
  {
    title: 'Startup Kits',
    subtitle: 'Fast templates to launch ideas',
    image: './ruixenui-bg.png',
    badge: { text: 'Startup', variant: 'orange' },
    href: '#',
  },
];

export default function RuixenCarouselWave() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const shift = (direction: 'next' | 'prev') => {
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      let position = i - currentIndex;
      if (position < -Math.floor(cards.length / 2)) {
        position += cards.length;
      } else if (position > Math.floor(cards.length / 2)) {
        position -= cards.length;
      }

      const x = position * 320;
      const y = position === 0 ? 20 : 0;
      const scale = position === 0 ? 1.03 : 0.95;

      if (Math.abs(position) > 2) {
        gsap.set(card, { x, y, scale });
      } else {
        gsap.to(card, {
          x,
          y,
          scale,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    });
  }, [currentIndex]);

  const badgeColors = {
    pink: 'bg-pink-600 text-white',
    indigo: 'bg-indigo-600 text-white',
    orange: 'bg-orange-500 text-white',
  };

  return (
    <div className="max-w-6xl mx-auto h-full relative px-6 py-12 overflow-hidden">
      <div className="relative flex items-center justify-center h-[400px]">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute transition-transform"
          >
            {/* === RUIXEN CARD === */}
            <div className="flex flex-col group">
              <Link
                href={card.href ?? '#'}
                className="relative block overflow-hidden rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-tr from-white/50 to-zinc-100 dark:from-zinc-900/40 dark:to-zinc-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative h-[300px] w-[260px]">
                  <Image
                    src={card.image ?? ''}
                    alt={card.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>

                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-4 -left-10 transform -rotate-45">
                    <div
                      className={cn(
                        'px-3 py-0.5 text-xs font-bold shadow-md',
                        badgeColors[card.badge.variant]
                      )}
                    >
                      {card.badge.text}
                    </div>
                  </div>
                )}

                {/* Text Overlay */}
                <div className="absolute bottom-4 left-4 right-4 group-hover:scale-[1.01] group-hover:translate-y-[-4px] transform transition-all duration-300 ease-out bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/10 dark:border-zinc-700">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-snug">
                      {card.subtitle}
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
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button
          onClick={() => shift('prev')}
          className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:scale-110 transition"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-700 dark:text-white" />
        </button>
        <button
          onClick={() => shift('next')}
          className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:scale-110 transition"
        >
          <ChevronRight className="w-5 h-5 text-zinc-700 dark:text-white" />
        </button>
      </div>
    </div>
  );
}
