import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CardProps {
  id?: string;
  author?: {
    name?: string;
    username?: string;
    avatar?: string;
    timeAgo?: string;
  };
  content?: {
    text?: string;
    link?: {
      title?: string;
      description?: string;
      icon?: React.ReactNode;
    };
  };
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const defaultProps: CardProps = {
  author: {
    name: "Dorian Baffier",
    username: "dorian_baffier",
    avatar: "https://github.com/shadcn.png",
    timeAgo: "2h ago",
  },
  content: {
    text: "Just launched Ruixen UI! Check out the documentation and let me know what you think 🎨",
    link: {
      title: "Ruixen UI Documentation",
      description: "A comprehensive guide to Ruixen UI",
      icon: <LinkIcon className="w-5 h-5 text-blue-500" />,
    },
  },
  engagement: {
    likes: 128,
    comments: 32,
    shares: 24,
    isLiked: false,
    isBookmarked: false,
  },
};

export default function SocialCard({
  author = defaultProps.author,
  content = defaultProps.content,
  engagement = defaultProps.engagement,
  onLike,
  onComment,
  onShare,
  onBookmark,
  id = author?.username || "card-01",
}: CardProps) {
  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 shadow-xl backdrop-blur-lg transition-all">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-3">
          <Image
            src={author?.avatar || "/placeholder.png"} // Fallback if avatar is undefined
            alt={author?.name || "User Avatar"}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full border border-zinc-300 dark:border-zinc-600 object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {author?.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              @{author?.username} · {author?.timeAgo}
            </p>
          </div>
        </div>
        <div>
          <Bookmark
            onClick={onBookmark}
            className={cn(
              "w-5 h-5 cursor-pointer transition hover:text-yellow-500",
              engagement?.isBookmarked ? "text-yellow-500" : "text-zinc-400",
            )}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 text-zinc-700 dark:text-zinc-300 text-base">
        {content?.text}
      </div>

      {/* Optional Link Box */}
      {content?.link && (
        <div className="mx-5 mb-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40 transition">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-white dark:bg-zinc-700">
              {content.link.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {content.link.title}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {content.link.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Reactions Footer */}
      <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-700 text-sm text-center">
        <button
          onClick={onLike}
          className={cn(
            "py-3 flex items-center justify-center gap-2 transition hover:bg-rose-50 dark:hover:bg-rose-900",
            engagement?.isLiked
              ? "text-rose-600 font-semibold"
              : "text-zinc-500 dark:text-zinc-400",
          )}
        >
          <Heart
            className={cn("w-4 h-4", engagement?.isLiked && "fill-current")}
          />
          {engagement?.likes}
        </button>
        <button
          onClick={onComment}
          className="py-3 flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
        >
          <MessageCircle className="w-4 h-4" />
          {engagement?.comments}
        </button>
        <button
          onClick={onShare}
          className="py-3 flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 hover:bg-green-50 dark:hover:bg-green-900 transition"
        >
          <Share2 className="w-4 h-4" />
          {engagement?.shares}
        </button>
      </div>
    </div>
  );
}
