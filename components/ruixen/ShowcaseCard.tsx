'use client'
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: '500' });

interface Project {
  imageUrl: StaticImageData;
  projectUrl: string;
  title: string;
  description: string;
}

interface ShowcaseCardProps {
  ShowcaseCardContent: Project[];
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ ShowcaseCardContent }) => {
  return (
    <div className={`${inter.className} grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 sm:p-5`}>
      {ShowcaseCardContent.map((project, index) => (
        <IndividualShowcaseCard key={index} project={project} />
      ))}
    </div>
  );
};

interface IndividualShowcaseCardProps {
  project: Project;
}

const IndividualShowcaseCard: React.FC<IndividualShowcaseCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightSize = 80;

  const lightX = useTransform(x, (value) => value - lightSize / 2);
  const lightY = useTransform(y, (value) => value - lightSize / 2);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <motion.div
      className="relative bg-black sm:bg-transparent rounded-2xl overflow-hidden backdrop-filter backdrop-blur-lg border border-gray-300 dark:border-gray-900"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      {isHovered && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: lightSize,
            height: lightSize,
            background: 'rgba(255, 255, 255, 0.2)',
            filter: 'blur(30px)',
            x: lightX,
            y: lightY,
          }}
        ></motion.div>
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="p-3">
          <div className="relative h-52 overflow-hidden rounded-xl">
            <Image 
              src={project.imageUrl} 
              alt="Project Thumbnail" 
              layout="fill"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-xl object-cover border border-gray-200 dark:border-gray-900"
              rel="preload"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col  backdrop-filter backdrop-blur-lg rounded-b-xl">
          <div className="flex items-center justify-between mb-2 border-b border-gray-200 dark:border-gray-900">
            <h2 className="text-lg font-medium text-black dark:text-white">{project.title}</h2>
            <Link prefetch href={project.projectUrl}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>
          </div>
          <div className='mt-1'>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowcaseCard;
