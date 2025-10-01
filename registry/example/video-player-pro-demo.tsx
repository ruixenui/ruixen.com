import VideoPlayerPro from "@/registry/ruixenui/video-player-pro";

export default function VideoPlayerProDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <VideoPlayerPro src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
}
