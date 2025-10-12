"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_light: string;
  image_dark: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  viewAllText?: string;
  items?: GalleryItem[];
}

const PreviewCarousel = ({
  heading = "Gallery",
  demoUrl = "#",
  viewAllText = "View All",
  items = [],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-14 gap-3">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold md:text-xl">{heading}</h2>
          <Link
            href={demoUrl}
            className="group flex items-center gap-1 text-sm font-medium text-blue-500 px-2 py-1 hover:text-blue-900 transition-colors"
          >
            {viewAllText}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Arrow Buttons aligned right */}
        <div className="flex items-center gap-2 mt-4 md:mt-0 md:ml-auto">
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto rounded-full"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto rounded-full"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="w-full ml-8">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="gap-2 ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="border-3 p-0 rounded-[10%] md:max-w-64 overflow-hidden"
              >
                <Link
                  href={item.url}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex max-w-64 border overflow-clip rounded-[10%] bg-muted hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300">
                      <div className="flex-1">
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl group">
                          <Image
                            src={item.image_light}
                            alt={item.title}
                            fill
                            className="object-cover object-center dark:hidden transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <Image
                            src={item.image_dark}
                            alt={item.title}
                            fill
                            className="object-cover object-center hidden dark:block transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pt-1">
                    <div className="text-gray-600 line-clamp-3 break-words text-md font-medium md:mb-3 md:text-md">
                      {item.title}
                    </div>
                    <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:text-sm">
                      {item.summary}
                    </div>
                    {/* <div className="flex items-center text-xs font-medium">
                      View Component{" "}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </div> */}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { PreviewCarousel };
