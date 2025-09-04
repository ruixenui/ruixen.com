"use client";

import SocialCard from "../ruixenui/social-card";
import { LinkIcon } from "lucide-react";

export default function SocialCardDemo() {
  return (
    <SocialCard
      author={{
        name: "Dorian Baffier",
        username: "dorian_baffier",
        avatar: "https://github.com/shadcn.png",
        timeAgo: "2h ago",
      }}
      content={{
        text: "Just launched Ruixen UI! Check out the documentation and let me know what you think 🎨",
        link: {
          title: "Ruixen UI Documentation",
          description: "A comprehensive guide to Ruixen UI",
          icon: <LinkIcon className="w-5 h-5 text-blue-500" />,
        },
      }}
      engagement={{
        likes: 128,
        comments: 32,
        shares: 24,
        isLiked: false,
        isBookmarked: false,
      }}
      onLike={() => {}}
      onComment={() => {}}
      onShare={() => {}}
      onBookmark={() => {}}
    />
  );
}
