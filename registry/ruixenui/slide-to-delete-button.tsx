"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface SlideToDeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  deletedLabel?: string;
  icon?: React.ReactNode;
  dragLimit?: number;
}

export default function SlideToDeleteButton({
  label = "Slide to Delete",
  deletedLabel = "Deleted",
  icon = <Trash2 className="w-4 h-4" />,
  dragLimit = 140,
  className,
  onClick,
  ...props
}: SlideToDeleteButtonProps) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="relative w-[180px] h-11">
      {/* Draggable Delete Handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: dragLimit }}
        onDragEnd={(_, info) => {
          if (info.point.x > dragLimit - 20) {
            setConfirmed(true);
            onClick?.({} as any); // call onClick when fully confirmed
          }
        }}
        className={cn(
          "absolute top-0 left-0 h-full w-[40px]",
          "flex items-center justify-center",
          "bg-red-500 text-white rounded-xl cursor-pointer z-10",
        )}
      >
        {icon}
      </motion.div>

      {/* Main Button */}
      <Button
        disabled={confirmed}
        className={cn(
          "w-full h-full rounded-xl pl-[48px] text-red-600 font-medium",
          "bg-red-100 hover:bg-red-200",
          confirmed && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {confirmed ? deletedLabel : label}
      </Button>
    </div>
  );
}
