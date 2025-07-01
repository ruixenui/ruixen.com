'use client'

import { Inter } from "next/font/google";
import { BrandButton } from "@/components/ruixen/BrandButton";


const inter = Inter({ subsets: ['latin'] });



function ComponentsPage() {
  return (
   <div className={`${inter.className} text-black bg-white dark:bg-black dark:text-white dark:backdrop-blur-md w-full h-full pt-28 overflow-auto p-5`}>
      <div className='container mx-auto'>
        <h1 className={`text-4xl font-bold text-center `}>Popular Components</h1>
        <div className='flex  justify-center mt-5 '>
          <BrandButton />
        </div>
      </div>
    </div>
  )
}

export default ComponentsPage;
