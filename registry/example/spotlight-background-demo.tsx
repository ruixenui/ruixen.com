import SpotlightBackground from "@/registry/ruixenui/spotlight-background";

export default function Demo() {
  return (
    <div className="relative w-full h-screen bg-white dark:bg-slate-950 overflow-hidden">
      <SpotlightBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-lg text-gray-700 dark:text-slate-300 md:text-xl text-center">
          A smooth glowing light that follows your cursor.
        </p>
      </div>
    </div>
  );
}
