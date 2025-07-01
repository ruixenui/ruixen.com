import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiReact } from 'react-icons/si';
import { BiLogoTailwindCss } from 'react-icons/bi';
import { BiLogoTypescript } from 'react-icons/bi';
import { TbBrandFramerMotion } from 'react-icons/tb';
import Link from 'next/link';

const techItems = [
  { href: 'https://nextjs.org/', label: 'Next.js', icon: TbBrandNextjs },
  { href: 'https://react.dev/', label: 'React', icon: SiReact },
  { href: 'https://tailwindcss.com/', label: 'Tailwind', icon: BiLogoTailwindCss },
  { href: 'https://www.typescriptlang.org/', label: 'TypeScript', icon: BiLogoTypescript },
  { href: 'https://www.framer.com/motion/', label: 'Framer Motion', icon: TbBrandFramerMotion },
];



const TechUsed = () => {

  const [iconSize, setIconSize] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIconSize(20);
      } else {
        setIconSize(30);
      }
    };

    
    handleResize();

    
    window.addEventListener('resize', handleResize);


    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="flex text-sm justify-center items-center gap-6 flex-wrap"
        initial="visible"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            
          },
        }}
      >
        {techItems.map(({ href, label, icon: Icon }) => (
          <div
            key={label}
            className="relative"
          >
            <Link href={href} target="_blank" className="text-white flex items-center">
              <Icon size={iconSize} className="hover:text-zinc-300 transition-colors duration-300" />
              <motion.span
                className="ml-1"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {label}
              </motion.span>
            </Link>
            <motion.div
              className="absolute -top-1 -right-2 w-1 h-1 bg-zinc-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 1, 0],
                transition: { duration: 1.5, repeat: Infinity },
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechUsed;
