"use client"

import { DotLottieCommonPlayer } from "@dotlottie/react-player"
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion"
import {
  LayoutDashboard,
  Rocket,
  Lightbulb,
} from "lucide-react";
import { url } from "inspector";

const tabs = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description: "A centralized space to monitor your site’s SEO health, traffic, and performance trends in real-time.",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: Rocket,
    title: "Boost with One Click",
    description: "Easily apply SEO best practices like lazy loading, alt-text fixes, and meta updates without writing code.",
    isNew: false,
    backgroundPositionX: 80,
    backgroundPositionY: 90,
    backgroundSizeX: 135,
  },
  {
    icon: Lightbulb,
    title: "AI Keyword Suggestions",
    description: "Discover trending, high-intent keywords tailored to your content niche using Ruixen’s smart AI engine.",
    isNew: false,
    backgroundPositionX: 120,
    backgroundPositionY: 30,
    backgroundSizeX: 170,
  },
];


const FeatureTab = (
  props: (typeof tabs)[number] &
    ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
  const tabRef = useRef<HTMLDivElement>(null)

  //since we need to animate or alter to values ie X an Y % hence we will ned to motion value
  const xPercent = useMotionValue(100)
  const yPercent = useMotionValue(0)
  //we are alterning the x and y % using  useMotionValue
  const maskImage = useMotionTemplate`radial-gradient(100px 50px at ${xPercent}% ${yPercent}%, black, transparent)`
  //useeffect to animate the values
  useEffect(() => {
    //to ensure tht the time interval is smooth as the x distance is way  more than the y distance for mask image
    if (!tabRef.current || !props.selected) return

    xPercent.set(0)
    yPercent.set(0)
    const { height, width } = tabRef.current?.getBoundingClientRect()
    const circumference = height * 2 + width * 2
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ]
    //duration
    animate(xPercent, [0, 100, 100, 0, 0], {
      duration: 4,
      times,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
    animate(yPercent, [0, 0, 100, 100, 0], {
      times,
      duration: 4,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
  }, [props.selected])

  return (
    <div
      ref={tabRef}
      className="border border-gray-200 dark:border-gray-800 rounded-lg flex items-center gap-1 pr-4 py-1 relative border"
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          style={{
            maskImage,
          }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-lg"
        ></motion.div>
      )}

      <div className="h-8 w-8 px-2 py-1 rounded-lg ml-3 inline-flex items-center justify-center ">
        <props.icon />
      </div>
      <div className="text-sm font-normal">{props.title}</div>
      {props.isNew && (
        <div className="bg-purple-400 rounded-lg text-black p-2 font-semibold text-xs">
          new
        </div>
      )}
    </div>
  )
}

export const codeStringFeatured_03 = `"use client"

import { DotLottieCommonPlayer } from "@dotlottie/react-player"
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion"
import {
  LayoutDashboard,
  Rocket,
  Lightbulb,
} from "lucide-react"

const tabs = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description: "A centralized space to monitor your site’s SEO health, traffic, and performance trends in real-time.",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: Rocket,
    title: "Boost with One Click",
    description: "Easily apply SEO best practices like lazy loading, alt-text fixes, and meta updates without writing code.",
    isNew: false,
    backgroundPositionX: 80,
    backgroundPositionY: 90,
    backgroundSizeX: 135,
  },
  {
    icon: Lightbulb,
    title: "AI Keyword Suggestions",
    description: "Discover trending, high-intent keywords tailored to your content niche using Ruixen’s smart AI engine.",
    isNew: false,
    backgroundPositionX: 120,
    backgroundPositionY: 30,
    backgroundSizeX: 170,
  },
]

const FeatureTab = (
  props: (typeof tabs)[number] &
    ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
  const tabRef = useRef<HTMLDivElement>(null)
  const xPercent = useMotionValue(100)
  const yPercent = useMotionValue(0)
  const maskImage = useMotionTemplate\`radial-gradient(100px 50px at \${xPercent}% \${yPercent}%, black, transparent)\`

  useEffect(() => {
    if (!tabRef.current || !props.selected) return

    xPercent.set(0)
    yPercent.set(0)
    const { height, width } = tabRef.current.getBoundingClientRect()
    const circumference = height * 2 + width * 2
    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ]

    animate(xPercent, [0, 100, 100, 0, 0], {
      duration: 4,
      times,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
    animate(yPercent, [0, 0, 100, 100, 0], {
      times,
      duration: 4,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    })
  }, [props.selected])

  return (
    <div
      ref={tabRef}
      className="border border-gray-200 dark:border-gray-800 rounded-lg flex items-center gap-1 pr-4 py-1 relative"
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          style={{
            maskImage,
          }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-lg"
        ></motion.div>
      )}
      <div className="h-8 w-8 px-2 py-1 rounded-lg ml-3 inline-flex items-center justify-center">
        <props.icon />
      </div>
      <div className="text-sm font-normal">{props.title}</div>
      {props.isNew && (
        <div className="bg-purple-400 rounded-lg text-black p-2 font-semibold text-xs">
          new
        </div>
      )}
    </div>
  )
}

export default function Featured_03() {
  const [selectedTab, setSelectedTab] = useState(0)

  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)

  const backgroundPosition = useMotionTemplate\`\${backgroundPositionX}% \${backgroundPositionY}%\`
  const backgroundSize = useMotionTemplate\`\${backgroundSizeX}% auto\`

  const handleSelecttab = (index: number) => {
    setSelectedTab(index)

    animate(
      backgroundSizeX,
      [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="text-5xl lg:text-7xl font-medium text-center tracking-tighter">
          Supercharge your content with Ruixen UI.
        </h2>
        <p className="text-gray-500 text-lg md:text-xl text-center tracking-tight mt-5 max-w-3xl mx-auto">
          Ruixen UI helps you craft, plan, and publish content effortlessly—powered by AI and built for scale.
        </p>
        <div className="relative mt-10 flex justify-center">
          <div className="flex flex-col lg:flex-row gap-5">
            {tabs.map((tab, tabIndex) => (
              <FeatureTab
                {...tab}
                selected={selectedTab === tabIndex}
                onClick={() => handleSelecttab(tabIndex)}
                key={tab.title}
              />
            ))}
          </div>
        </div>
        <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-2.5 mt-10">
          <motion.div
            className="aspect-video bg-cover border border-gray-200 dark:border-gray-800 rounded-lg"
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundImage: \`url(/dashboard-01-dark.png)\`,
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  )
}
`


export default function Featured_03() {
  //0 is the index no of the tab.
  const [selectedTab, setSelectedTab] = useState(0)

  //Getting the coordinates to crop grom tabs object
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX)
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY)
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX)

  //we cannot use useMotionvalue as a no so we need to conver it into percentage so usinh useMotiontemplate
  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`

  const handleSelecttab = (index: number) => {
    setSelectedTab(index)

    animate(
      backgroundSizeX,
      [backgroundSizeX.get(), 100, tabs[index].backgroundSizeX],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY],
      {
        duration: 2,
        ease: "easeInOut",
      }
    )
  }
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="text-5xl lg:text-7xl font-medium text-center tracking-tighter">
          Supercharge your content with Ruixen UI.
        </h2>
        <p className="text-gray-500 text-lg md:text-xl text-center tracking-tight mt-5 max-w-3xl mx-auto">
          Ruixen UI helps you craft, plan, and publish content effortlessly—powered by AI and built for scale.
        </p>
        <div className="relative mt-10 flex justify-center">
          <div className="flex flex-col lg:flex-row gap-5">
            {tabs.map((tab, tabIndex) => (
              <FeatureTab
                {...tab}
                selected={selectedTab === tabIndex}
                onClick={() => handleSelecttab(tabIndex)}
                key={tab.title}
              />
            ))}
          </div>
        </div>
        <div className="border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-2.5 mt-10">
          <motion.div
            className="aspect-video bg-cover border border-gray-200 dark:border-gray-800 rounded-lg"
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundImage: `url(/dashboard-01-dark.png)`,
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  )
}
