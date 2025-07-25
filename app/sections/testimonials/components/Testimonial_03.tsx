"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BadgeCheck, Workflow, BarChart } from "lucide-react"
import Image from "next/image"
import clsx from "clsx"

const testimonials = [
  {
    id: "sahil",
    name: "Sahil Mansuri",
    title: "CEO & Co-founder",
    company: "Bravado",
    quote:
      "Attio is the first CRM that feels truly modern. It’s powerful, flexible, and fast to build with. There’s nothing like it on the market.",
    image: "https://avatars.githubusercontent.com/u/111233383?s=400&u=4907246edac57d1a1576bc4d38c43dec1e2a2a81&v=4",
  },
  {
    id: "jane",
    name: "Jane Doe",
    title: "VP of Sales",
    company: "TechCorp",
    quote:
      "Attio helped us transform our sales pipeline. Everything feels smooth, and it's incredibly fast.",
    image: "https://avatars.githubusercontent.com/u/111233383?s=400&u=4907246edac57d1a1576bc4d38c43dec1e2a2a81&v=4",
  },
  {
    id: "alex",
    name: "Alex Lee",
    title: "Head of Growth",
    company: "StartupX",
    quote:
      "Finally, a CRM that feels like it belongs in 2025. Fast, beautiful, and flexible. We love Attio.",
    image: "https://avatars.githubusercontent.com/u/111233383?s=400&u=4907246edac57d1a1576bc4d38c43dec1e2a2a81&v=4",
  },
]

export default function Testimonial_03() {
  const [active, setActive] = useState("sahil")

  return (
    <div className="container mx-auto w-full py-16">
      <div className="flex flex-row md:items-start gap-6 md:gap-10 border border-gray-300 dark:border-gray-700 rounded-none">
        {testimonials.map((t) => {
          const isActive = t.id === active
          return (
            <div
              key={t.id}
              className={clsx(
                "flex items-start justify-start text-left flex-1",
                isActive ? "md:flex-[3] bg-white rounded-none transition-all duration-200 ease-in-out border border-gray-300 dark:border-gray-700" : ""
              )}
            >
              <button
                onClick={() => setActive(t.id)}
                className="w-full flex items-start justify-start p-4 focus:outline-none"
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={300}
                  height={300}
                  className=""
                />
              </button>

              {isActive && (
                <CardContent className="text-left p-6 pt-2 rounded-none">
                  <blockquote className="text-lg md:text-xl font-serif leading-relaxed text-gray-900">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-4 text-gray-700 font-semibold">
                    {t.name},{" "}
                    <span className="text-gray-500 font-normal">
                      {t.title}, {t.company}
                    </span>
                  </div>
                  <Separator className="my-6" />
                  <div className="flex justify-start gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Workflow size={18} />
                      Workflows
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} />
                      Deals
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart size={18} />
                      Reports
                    </div>
                  </div>
                </CardContent>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
