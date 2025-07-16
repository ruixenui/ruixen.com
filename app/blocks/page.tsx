'use client'

import { BrandButton } from "@/components/ruixen/BrandButton";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

function BlocksPage() {
  return (
   <div className={`${roboto.className} text-black bg-white dark:bg-black dark:text-white dark:backdrop-blur-md w-full h-full pt-28 overflow-auto p-5`}>
      <div className='container mx-auto'>
        <h1 className={`text-4xl font-bold text-center `}>Popular Blocks</h1>
        <div className='flex  justify-center mt-5 '>
          <BrandButton />
        </div>
      </div>
    </div>
  )
}

export default BlocksPage;
