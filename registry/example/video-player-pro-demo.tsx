import { VideoPlayerPro } from "@/registry/ruixenui/video-player-pro";

export default function VideoPlayerProDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-4">
      <VideoPlayerPro src="/demo-video-player-cmp-src.mp4" />
    </div>
  );
}
