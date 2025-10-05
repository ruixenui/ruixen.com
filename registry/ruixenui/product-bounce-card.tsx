"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface ProductBounceCardProps {
  imageUrl: string;
  alt?: string;
}

export const ProductBounceCard: React.FC<ProductBounceCardProps> = ({
  imageUrl,
  alt = "Product image",
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Product image */}
      <motion.img
        src={imageUrl}
        alt={alt}
        className="h-64 w-auto object-contain"
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />

      {/* Bottom shadow */}
      <div className="absolute bottom-0 h-6 w-40 rounded-full bg-black/20 blur-md" />
    </div>
  );
};
