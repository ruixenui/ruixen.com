import {
  CalendarHeart,
  MessageCircle,
  Star,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface DoctorProfileCardProps {
  name?: string;
  image?: string;
  specialization?: string;
  status?: string;
  rating?: number;
  chats?: number;
  available?: string;
  onJoinChat?: () => void;
  onBookmark?: () => void;
}

export default function DoctorProfileCard({
  name = "Dr. Sarah Johnson",
  image = "https://github.com/shadcn.png",
  specialization = "Pediatric Specialist",
  status = "Online",
  rating = 4.8,
  chats = 231,
  available = "Available Today · Until 7:00 PM",
  onJoinChat,
  onBookmark,
}: DoctorProfileCardProps) {
  return (
    <div className="max-w-sm w-full mx-auto bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-md overflow-hidden relative">
      {/* Status Badge */}
      <div className="absolute top-3 right-3 px-2.5 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 font-medium">
        {status}
      </div>

      {/* Header */}
      <div className="p-5 text-center border-b border-zinc-200 dark:border-zinc-700">
        <Image
          src={image}
          width={64}
          height={64}
          alt="Doctor Avatar"
          className="mx-auto rounded-full"
        />
        <h2 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
          {name}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {specialization}
        </p>
      </div>

      {/* Details */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-500" />
            {rating} Rating
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            {chats} Chats
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <CalendarHeart className="w-4 h-4" />
          {available}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 text-sm h-10">
            {onJoinChat ? "Join Live Chat" : "Join Live Chat"}
          </Button>
          <Button
            variant="ghost"
            className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 h-9 text-sm"
          >
            {onBookmark ? (
              <HeartHandshake className="w-4 h-4 mr-2" />
            ) : (
              <HeartHandshake className="w-4 h-4 mr-2" />
            )}
            {onBookmark ? "Bookmark Doctor" : "Bookmark Doctor"}
          </Button>
        </div>
      </div>
    </div>
  );
}
