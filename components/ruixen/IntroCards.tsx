'use client'
import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CardData {
  title: string;
  description: string;
}

interface SpotlightCardProps {
  cards: CardData[];
}

const SpotlightItem: React.FC<CardData> = ({ title, description }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => controls.start({ opacity: 1 });
  const handleMouseLeave = () => controls.start({ opacity: 0 });

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-80 rounded-3xl border border-neutral-800 bg-black/80 md:bg-black/50 backdrop-blur p-8 sm:p-7"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl"
        animate={controls}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
         style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 60%)`,
        }}
      />
      <h3 className="mb-2 font-medium text-neutral-100">
        {title}
      </h3>
      <p className="text-sm text-neutral-400">
        {description}
      </p>
    </div>
  );
};

const IntroCards: React.FC<SpotlightCardProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-5">
      {cards.map((card, index) => (
        <SpotlightItem
          key={index}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default IntroCards;
