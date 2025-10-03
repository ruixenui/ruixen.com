import FallingSymbolsBackground from "@/registry/ruixenui/falling-symbols-background";

export default function DemoOne() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <FallingSymbolsBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl text-white"> Foreground Content </h1>
      </div>
    </div>
  );
}
