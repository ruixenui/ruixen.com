import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Instant Edge Hosting",
    description: "Deploy globally with our edge network — fast, secure, and reliable.",
    image: "/images/edge-hosting.png",
    className: "col-span-1 row-span-2",
  },
  {
    title: "Smart Progress Tracking",
    description: "Monitor application flow from submission to success with precision.",
    image: "/images/progress.png",
    className: "col-span-2 row-span-1",
  },
  {
    title: "Built for Scale",
    description: "Reusable components built for scale — design once, use anywhere.",
    image: "/images/scalable.png",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Seamless Integrations",
    description: "Plug into any stack with ease. APIs, SDKs and more out of the box.",
    image: "/images/integration.png",
    className: "col-span-1 row-span-1",
  },
];

export default function Explore() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Built for performance. Designed for flexibility.
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ruixen UI gives you the tools to build beautiful, high-performing websites with lightning speed. Each component is thoughtfully designed to be flexible, reusable, and accessible.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[20rem] gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl transition-shadow",
              item.className
            )}
          >
            <CardContent className="p-0 h-full">
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={500}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
