import AvatarQuickActions from "@/registry/ruixenui/avatar-quick-actions";
import { MessageCircle, Phone, UserPlus, Video } from "lucide-react";

export default function AvatarQuickActionsDemo() {
  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <AvatarQuickActions
        avatarSrc="/avatar-images/avatar-01.jpg"
        avatarFallback="JS"
        items={[
          { icon: <MessageCircle className="size-3.5" />, label: "Message" },
          { icon: <Phone className="size-3.5" />, label: "Call" },
          { icon: <Video className="size-3.5" />, label: "Video" },
          { icon: <UserPlus className="size-3.5" />, label: "Follow" },
        ]}
      />
      <AvatarQuickActions
        avatarSrc="/avatar-images/avatar-03.jpg"
        avatarFallback="AC"
        size={36}
        items={[
          { icon: <MessageCircle className="size-3" />, label: "Chat" },
          { icon: <Phone className="size-3" />, label: "Call" },
          { icon: <UserPlus className="size-3" />, label: "Add" },
        ]}
      />
    </div>
  );
}
