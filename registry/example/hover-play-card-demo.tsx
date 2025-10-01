import HoverPlayCard from "@/registry/ruixenui/hover-play-card";

export default function HoverPlayCardDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <HoverPlayCard
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80"
        loop={true}
      />
    </div>
  );
}
