import { SparklesCore } from "@/components/ui/sparkles"

interface HeadingSpotlightProps {
  title: string;
}

export default function HeadingSpotlight({ title }: HeadingSpotlightProps) {
  return (
    <div className="h-[12rem] w-full dark:bg-black bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="font-medium text-center text-gray-800 dark:text-gray-100 text-4xl relative z-20">
        {title}
      </h1>
      <div className="w-[40rem] h-40 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#448af7"
        />

        <div className="absolute inset-0 w-full h-full dark:bg-black bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

