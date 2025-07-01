"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const codeStringButton_01 = `
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Btn_05Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Btn_05({ className, ...props }: Btn_05Props) {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="relative w-[180px] h-11">
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 140 }}
                onDragEnd={(_, info) => {
                    if (info.point.x > 120) setConfirmed(true);
                }}
                className={cn(
                    "absolute top-0 left-0 h-full w-[40px]",
                    "flex items-center justify-center",
                    "bg-red-500 text-white rounded-xl cursor-pointer z-10"
                )}
            >
                <Trash2 className="w-4 h-4" />
            </motion.div>
            <Button
                disabled={confirmed}
                className={cn(
                    "w-full h-full rounded-xl pl-[48px] text-red-600 font-medium",
                    "bg-red-100 hover:bg-red-200",
                    confirmed && "opacity-50 cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {confirmed ? "Deleted" : "Slide to Delete"}
            </Button>
        </div>
    );
}
`;

interface Button_01Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button_01({ className, ...props }: Button_01Props) {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div className="relative w-[180px] h-11">
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 140 }}
                onDragEnd={(_, info) => {
                    if (info.point.x > 120) setConfirmed(true);
                }}
                className={cn(
                    "absolute top-0 left-0 h-full w-[40px]",
                    "flex items-center justify-center",
                    "bg-red-500 text-white rounded-xl cursor-pointer z-10"
                )}
            >
                <Trash2 className="w-4 h-4" />
            </motion.div>
            <Button
                disabled={confirmed}
                className={cn(
                    "w-full h-full rounded-xl pl-[48px] text-red-600 font-medium",
                    "bg-red-100 hover:bg-red-200",
                    confirmed && "opacity-50 cursor-not-allowed",
                    className
                )}
                {...props}
            >
                {confirmed ? "Deleted" : "Slide to Delete"}
            </Button>
        </div>
    );
}
