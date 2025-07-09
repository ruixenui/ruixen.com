'use client'

import ShowcaseCard from "@/components/ruixen/ShowcaseCard";
import VoiceTestimonialCardThumbnail from '@/app/images/thumbnails/VoiceTestimonialCardThumbnail.png';
import PricingThumbnail from '@/app/images/thumbnails/PricingThumbnail.png';
import AuthenticationThumbnail from '@/app/images/thumbnails/AuthenticationThumbnail.png';
import TestimonialVoiceTipThumbnail from '@/app/images/thumbnails/TestimonialVoiceTipThumbnail.png';
import BookTestimonialThumbnail from '@/app/images/thumbnails/3DBookThumbnailtest.png';
import TubeLightNavbarThumbnail from '@/app/images/thumbnails/TubeLightNavbarThumbnailtest.png';
import TechStackThumbnail from '@/app/images/thumbnails/TechStackThumbnailtest.png';
import WaitlistThumbnail from '@/app/images/thumbnails/WaitlistThumbnailtest.png';
import CarouselThumbnail from '@/app/images/thumbnails/CarouselThumbnailtest.png';
import NewsletterThumbnail from '@/app/images/thumbnails/NewsletterThumbnailtest.png';
import SpotLightCardThumbnail from '@/app/images/thumbnails/SpotLightCardThumbnail.png';
import SwipeCardThumbnail from '@/app/images/thumbnails/SwipeCardThumbnail.png';
import GlowCardThumbnail from '@/app/images/thumbnails/GlowCardThumbnail.png';
import DockThumbnail from '@/app/images/thumbnails/DockThumbnail.png';
import ShortcutModalThumbnail from '@/app/images/thumbnails/ShortcutModalThumbnail.png';
import CodeBlockThumbnail from '@/app/images/thumbnails/CodeBlockThumbnail.png';
import ImageGallaryThumbnail from '@/app/images/thumbnails///ImageGallaryThumbnail.png';
import InputsThumbnail from '@/app/images/thumbnails/InputsThumbnail.png';
import VideoCarousel from '@/app/images/thumbnails/VideoCarousel.png';
import FlipCard3D from '@/app/images/thumbnails/FlipCard3DThumbnail.png';
import Link from "next/link";

import { BrandButton } from "@/components/ruixen/BrandButton";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ShowcaseCardContent = [

];


function ComponentsPage() {
  return (
   <div className={`${roboto.className} text-black bg-white dark:bg-black dark:text-white dark:backdrop-blur-md w-full h-full pt-28 overflow-auto p-5`}>
      <div className='container mx-auto'>
        <h1 className={`text-4xl font-bold text-center `}>Popular Components</h1>
        <div className='flex  justify-center mt-5 '>
          <BrandButton />
        </div>
      </div>
      {/* <ShowcaseCard ShowcaseCardContent={ShowcaseCardContent}/> */}
    </div>
  )
}

export default ComponentsPage;
