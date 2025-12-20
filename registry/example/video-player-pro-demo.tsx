import VideoPlayerPro from "@/registry/ruixenui/video-player-pro";

export default function VideoPlayerProDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <VideoPlayerPro src="/demo-video-player-cmp-src.mp4" />
    </div>
  );
}
