"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Inspiration {
  name: string;
  handle: string;
  url: string;
}

const inspirations: Inspiration[] = [
  {
    name: "Jesse Showalter",
    handle: "@imjesseshow",
    url: "https://twitter.com/imjesseshow",
  },
  {
    name: "Pablo Stanley",
    handle: "@pablostanley",
    url: "https://twitter.com/pablostanley",
  },
  {
    name: "Rogie King",
    handle: "@rogie",
    url: "https://twitter.com/rogie",
  },
];

export default function InspirationsSection() {
  return (
    <section className="w-full bg-background py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Main Title with Orange Dot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground inline-flex items-center justify-center gap-3 flex-wrap">
            <span>Inspirations</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-20 leading-relaxed"
        >
          This library is deeply inspired by these incredible creators. Their
          lessons and work are truly next-level — highly recommend checking them
          out if you want to sharpen your skills.
        </motion.p>

        {/* Inspiration Links */}
        <div className="space-y-0">
          {inspirations.map((person, index) => (
            <motion.div
              key={person.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Link
                href={person.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-5 border-b border-border/40 hover:border-foreground/20 transition-colors duration-300"
              >
                <span className="text-lg md:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {person.name}
                </span>
                <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
