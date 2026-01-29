import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  avatarSrc?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    buttonHeight: "h-8 px-2",
    avatar: "w-6 h-6",
    gap: "gap-2",
    font: "text-sm",
  },
  md: {
    buttonHeight: "h-10 px-3",
    avatar: "w-8 h-8",
    gap: "gap-3",
    font: "text-base",
  },
  lg: {
    buttonHeight: "h-12 px-4",
    avatar: "w-10 h-10",
    gap: "gap-3",
    font: "text-lg",
  },
};

const AVATAR_URL =
  "https://www.ruixen.com/_next/image?url=%2Fruixen-ui-nw-light.png&w=96&q=75";

const AvatarActionButton: React.FC<AvatarActionButtonProps> = ({
  label,
  avatarSrc = AVATAR_URL,
  size = "md",
  className,
  ...props
}) => {
  const config = sizeConfig[size];

  return (
    <Button
      className={cn(
        "inline-flex items-center rounded-full bg-primary text-primary-foreground font-medium",
        config.buttonHeight,
        config.gap,
        className,
      )}
      {...props}
    >
      <Avatar className={cn("rounded-full", config.avatar)}>
        <AvatarImage src={avatarSrc} />
      </Avatar>
      <span className={config.font}>{label}</span>
    </Button>
  );
};

export default AvatarActionButton;
