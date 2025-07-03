"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function HeroTabsSection() {
  return (
    <section className="w-full max-w-6xl mx-auto p-0">
      <Tabs defaultValue="tab1" className="w-full rounded-none border border-gray-200 dark:border-gray-800">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-0 gap-0 border border-gray-200 dark:border-gray-800">
          <TabsTrigger
            value="tab1"
            className="w-full h-60 sm:h-72 md:h-60 rounded-none data-[state=active]:bg-muted border-0 dark:border-gray-800 p-0"
          >
            <div className="relative w-full h-full bg-muted overflow-hidden px-4 py-4">
              <div className="relative z-10 max-w-[65%]">
                <div className="absolute z-10">
                  <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-black">UI</h2>
                </div>
              </div>
              <Image
                src="/ui-demo-light.png"
                alt="avatar"
                width={240}
                height={240}
                className="absolute right-0 top-6 bottom-0 h-[90%] w-auto object-contain z-0 block dark:hidden"
              />
              <Image
                src="/ui-demo-dark.png"
                alt="avatar"
                width={240}
                height={240}
                className="absolute right-0 top-6 bottom-0 h-[90%] w-auto object-contain z-0 dark:block hidden"
              />
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="tab2"
            className="w-full h-60 sm:h-72 md:h-60 rounded-none data-[state=active]:bg-muted border-0 dark:border-gray-800 p-0"
          >
            <div className="relative w-full h-full bg-muted overflow-hidden px-4 py-4">
              <div className="relative z-10 max-w-[65%]">
                <div className="absolute z-10">
                  <h2 className="text-3xl sm:text-5xl font-black dark:text-white text-black">WEBSITES</h2>
                </div>
              </div>
              <Image
                src="/website-template-demo.jpg"
                alt="avatar"
                width={240}
                height={240}
                className="absolute right-0 top-6 bottom-0 h-[90%] w-auto object-contain z-0"
              />
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="tab3"
            className="w-full h-60 sm:h-72 md:h-60 py-0 border rounded-none data-[state=active]:bg-muted border-y-0 border-r-0 border-gray-200 dark:border-gray-800"
          >
            <div className="relative w-full h-full bg-muted overflow-hidden px-4 py-4">
              <div className="relative z-10 max-w-[65%]">
                <div className="absolute z-10">
                  <h2 className="text-4xl sm:text-5xl font-black dark:text-white text-black">3D</h2>
                </div>
              </div>
              <Image
                src="/3d-model-ui.png"
                alt="avatar"
                width={240}
                height={240}
                className="absolute right-0 top-6 bottom-0 h-[90%] w-auto object-contain z-0 rounded-tl-xl"
              />
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tab1" className="p-0 border-none" />
        <TabsContent value="tab2" className="p-0 border-none" />
        <TabsContent value="tab3" className="p-0 border-none" />
      </Tabs>
    </section>
  );
}
