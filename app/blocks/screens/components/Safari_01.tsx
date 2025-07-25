"use client"

import Image, { StaticImageData } from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

interface Safari_01Props {
  image?: StaticImageData | string
  className?: string
}

export const codeStringSafari_01 = `"use client"

import Image, { StaticImageData } from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

interface Safari_01Props {
  image?: StaticImageData | string
  className?: string
}

const Safari_01: React.FC<Safari_01Props> = ({ image, className }) => {
  return (
    <div
      className={cn(
        "min-w-[700px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-muted shadow-md overflow-hidden",
        className
      )}
    >
      {/* Browser top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-zinc-900 border-b">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="flex-1 mx-4 bg-gray-200 dark:bg-zinc-800 rounded-md h-5 max-w-md" />
        <div className="w-4 h-4" /> {/* Placeholder for right side icons */}
      </div>

      {/* Preview area */}
      <div className="bg-gray-100 dark:bg-zinc-800 aspect-video flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt="Preview"
            width={800}
            height={450}
            className="object-contain max-h-full max-w-full"
          />
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No preview image
          </div>
        )}
      </div>
    </div>
  )
}

export default Safari_01
`;

const Safari_01: React.FC<Safari_01Props> = ({ image, className }) => {
  return (
    <div
      className={cn(
        "min-w-[700px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-muted shadow-md overflow-hidden",
        className
      )}
    >
      {/* Browser top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="flex-1 mx-4 bg-gray-200 dark:bg-zinc-800 rounded-md h-5 max-w-md" />
        <div className="w-4 h-4" /> {/* Placeholder for right side icons */}
      </div>

      {/* Preview area */}
      <div className="bg-gray-100 dark:bg-zinc-800 aspect-video flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt="Preview"
            width={800}
            height={450}
            className="object-contain max-h-full max-w-full"
          />
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No preview image
          </div>
        )}
      </div>
    </div>
  )
}

export default Safari_01
