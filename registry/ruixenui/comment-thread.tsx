"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

function CommentThread({
  className,
  ...props
}: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion
      data-slot="comment-thread"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  );
}

function Comment({
  className,
  ...props
}: React.ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      data-slot="comment"
      className={cn(
        "group/comment relative mt-4 border-none pl-4 first:mt-0 before:absolute before:bottom-0 before:left-8 before:top-9 before:w-px before:bg-foreground/[0.08] before:transition-colors before:duration-300 hover:before:bg-foreground/[0.12]",
        className,
      )}
      {...props}
    />
  );
}

function CommentAvatar({
  name,
  src,
  className,
  color,
}: {
  name: string;
  src?: string;
  className?: string;
  color?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      data-slot="comment-avatar"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-medium",
        !src && (color || "bg-muted text-foreground/50"),
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

function CommentHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="comment-header"
      className={cn("flex gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CommentBody({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="comment-body"
      className={cn(
        "text-[13px] leading-[1.7] text-foreground/60 transition-colors duration-300 group-hover/comment:text-foreground/65 selection:bg-foreground/[0.06]",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function CommentToggle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      data-slot="comment-toggle"
      className={cn(
        "w-fit flex-initial justify-start gap-1 border-none py-1 text-xs font-normal text-foreground/25 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-foreground/50 hover:no-underline [&>svg]:hidden",
        className,
      )}
      {...props}
    >
      {children ?? "Show Replies"}
    </AccordionTrigger>
  );
}

function CommentReplies({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionContent>) {
  return (
    <AccordionContent
      data-slot="comment-replies"
      className={cn("pb-0 pl-8", className)}
      {...props}
    >
      {children}
    </AccordionContent>
  );
}

export {
  CommentThread,
  Comment,
  CommentAvatar,
  CommentHeader,
  CommentBody,
  CommentToggle,
  CommentReplies,
};
