"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export interface CoreStat {
  value: string;
  label: string;
  description: string;
  image?: string;
}

interface CoreValueStatsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stats: CoreStat[];
}

export default function CoreValueStats({
  title = "Building Scalable Digital Foundations for the Modern Era.",
  subtitle = "Core Values",
  description = "From design systems to digital ecosystems, we create flexible, consistent, and elegant frameworks for forward-thinking teams.",
  stats,
}: CoreValueStatsProps) {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6 text-center">
      {/* Section header */}
      <div className="space-y-4 mb-12">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {subtitle}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-foreground">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Flex container for cards */}
      <div className="flex flex-nowrap overflow-x-auto gap-6 mt-10 sm:flex-wrap sm:justify-center">
        {stats.map((item, i) => {
          const cardContent = (
            <CardContent className="relative z-10 p-6 space-y-3 text-left flex flex-col justify-end h-full">
              <div>
                <h3 className="text-4xl font-bold drop-shadow-md">
                  {item.value}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
                  {item.label}
                </p>
                <p className="text-sm leading-relaxed opacity-90">
                  {item.description}
                </p>
              </div>
              <Button
                variant="link"
                className={`px-0 text-sm font-medium mt-2 ${
                  item.image
                    ? "text-white hover:text-gray-200"
                    : "text-primary dark:text-primary"
                }`}
              >
                Learn more →
              </Button>
            </CardContent>
          );

          // If image exists, wrap with 3D hover effect
          if (item.image) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 200, damping: 10 },
                }}
                className="flex-shrink-0 w-[280px] sm:w-[45%] md:w-[45%] lg:w-[280px] perspective-1000"
              >
                <Card className="relative h-64 overflow-hidden border shadow-sm hover:shadow-lg transition text-white rounded-3xl">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="absolute inset-0 object-cover w-full h-full"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  {cardContent}
                </Card>
              </motion.div>
            );
          }

          // Non-image card
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-[280px] sm:w-[45%] md:w-[45%] lg:w-[280px]"
            >
              <Card className="relative h-64 overflow-hidden border shadow-sm hover:shadow-lg transition text-gray-900 dark:text-white rounded-3xl">
                {cardContent}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
