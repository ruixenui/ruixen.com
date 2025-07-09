import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  {
    title: "Instant Edge Hosting",
    description: "Deploy globally with our edge network — fast, secure, and reliable.",
    image: "/sections/hero-sections/light/hero-section-04.png",
    className: "col-span-1 row-span-2",
  },
  {
    title: "Smart Progress Tracking",
    description: "Monitor application flow from submission to success with precision.",
    image: "/sections/hero-sections/light/hero-section-04.png",
    className: "col-span-2 row-span-1",
  },
  {
    title: "Built for Scale",
    description: "Reusable components built for scale — design once, use anywhere.",
    image: "/sections/hero-sections/light/hero-section-04.png",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Seamless Integrations",
    description: "Plug into any stack with ease. APIs, SDKs and more out of the box.",
    image: "/sections/hero-sections/light/hero-section-04.png",
    className: "col-span-1 row-span-1",
  },
];

export default function Explore() {
  return (
    <section className="bg-zinc-50 py-16 dark:bg-transparent">
      <div className="mx-auto container px-4">
        <div className="mb-12 max-w-2xl mr-auto text-left">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Built for performance. Designed for flexibility.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Ruixen UI gives you the tools to build beautiful, high-performing websites with lightning speed. Each component is thoughtfully designed to be flexible, reusable, and accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[20rem] gap-6">
          {items.map((item, index) => (
            <FeatureCard key={index} className={cn(item.className, "group overflow-hidden")}>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 [background:radial-gradient(75%_75%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)] opacity-30 dark:opacity-50"></div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <Card className={cn("relative rounded-none shadow-zinc-950/5", className)}>
    <CardDecorator />
    {children}
  </Card>
);

const CardDecorator = () => (
  <>
    <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  </>
);
