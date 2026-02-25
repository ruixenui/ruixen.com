"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BadgeCheck,
  UserRound,
  Images,
  Heart,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Types ── */

interface ProfileCardProps {
  variant: "full" | "half"
  image: string
  name: string
  bio: string
  followers: number
  posts: number
  verified?: boolean
  onFollow?: () => void
  onFavorite?: (favorited: boolean) => void
  className?: string
}

/* ── Constants ── */

const shell = [
  "group w-full rounded-[40px] p-2.5",
  "bg-white dark:bg-neutral-900",
  "shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_12px_48px_-8px_rgba(0,0,0,0.12)]",
  "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.3),0_12px_48px_-8px_rgba(0,0,0,0.5)]",
]

const BLUR_MASK =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.02) 10%, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.14) 30%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.9) 70%, black 80%)"

/* ── Component ── */

export function ProfileCard({
  variant,
  image,
  name,
  bio,
  followers,
  posts,
  verified = true,
  onFollow,
  onFavorite,
  className,
}: ProfileCardProps) {
  const [favorited, setFavorited] = useState(false)

  const toggleFavorite = () => {
    const next = !favorited
    setFavorited(next)
    onFavorite?.(next)
  }

  /* ── Full variant ── */
  if (variant === "full") {
    return (
      <div className={cn(...shell, className)}>
        <div className="relative aspect-[3/4.5] overflow-hidden rounded-[28px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Water-glass blur */}
          <div
            className="absolute inset-x-0 bottom-0 h-4/5"
            style={{
              backdropFilter: "blur(64px) saturate(1.8)",
              WebkitBackdropFilter: "blur(64px) saturate(1.8)",
              maskImage: BLUR_MASK,
              WebkitMaskImage: BLUR_MASK,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Heart */}
          <button
            onClick={toggleFavorite}
            className="
              absolute top-4 right-4 z-10
              flex size-9 items-center justify-center
              rounded-full bg-white/15 backdrop-blur-md
              border border-white/20
              transition-all duration-150 ease-out
              hover:bg-white/25 hover:scale-[0.96]
              active:scale-[0.92]
              cursor-pointer
            "
          >
            <Heart
              size={15}
              strokeWidth={1.8}
              fill={favorited ? "currentColor" : "none"}
              className={cn(
                "transition-colors duration-150",
                favorited ? "text-rose-400" : "text-white/70",
              )}
            />
          </button>

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-5">
            <div className="flex items-center gap-1">
              <h3 className="text-2xl font-bold text-white tracking-tight leading-none">
                {name}
              </h3>
              {verified && (
                <BadgeCheck
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#1d9bf0] fill-[#1d9bf0] stroke-white"
                />
              )}
            </div>

            <p className="text-xs text-white/55 leading-relaxed mt-1 mb-3">
              {bio}
            </p>

            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 text-[13px] text-white/50">
                <UserRound size={13} strokeWidth={1.8} />
                <span className="font-semibold text-white">{followers}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[13px] text-white/50">
                <Images size={13} strokeWidth={1.8} />
                <span className="font-semibold text-white">{posts}</span>
              </span>
            </div>

            <button
              onClick={onFollow}
              className="
                w-full h-[42px] rounded-full
                inline-flex items-center justify-center gap-1.5
                bg-white/90 backdrop-blur-sm
                text-[13px] font-semibold text-neutral-900
                transition-all duration-150 ease-out
                hover:bg-white hover:scale-[0.98]
                active:scale-[0.96]
                cursor-pointer
              "
            >
              Follow
              <Plus size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Half variant ── */
  return (
    <div className={cn(...shell, className)}>
      <div className="flex flex-col aspect-[3/4.5]">
        {/* Image — takes ~67% */}
        <div className="relative flex-[2] shrink-0 overflow-hidden rounded-[28px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between px-3 pt-3 pb-2">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-[22px] font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
                {name}
              </h3>
              {verified && (
                <BadgeCheck
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#1d9bf0] fill-[#1d9bf0] stroke-white dark:stroke-neutral-900"
                />
              )}
            </div>

            <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed mt-1">
              {bio}
            </p>
          </div>

          {/* Stats + Follow */}
          <div className="flex items-center">
            <div className="flex items-center gap-3 flex-1">
              <span className="inline-flex items-center gap-1 text-[13px] text-neutral-400 dark:text-neutral-500">
                <UserRound size={13} strokeWidth={1.8} />
                <span className="font-semibold text-neutral-900 dark:text-white">{followers}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[13px] text-neutral-400 dark:text-neutral-500">
                <Images size={13} strokeWidth={1.8} />
                <span className="font-semibold text-neutral-900 dark:text-white">{posts}</span>
              </span>
            </div>

            <button
              onClick={onFollow}
              className="
                h-[38px] px-4 rounded-full
                inline-flex items-center gap-1.5
                bg-neutral-50 dark:bg-neutral-800
                border border-neutral-200 dark:border-neutral-700
                text-xs font-semibold text-neutral-900 dark:text-white
                transition-all duration-150 ease-out
                hover:scale-[0.97]
                active:scale-[0.95]
                cursor-pointer
              "
            >
              Follow
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
