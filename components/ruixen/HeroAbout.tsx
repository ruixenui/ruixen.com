import { MagicText } from "@/components/ui/magic-text";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function HeroAbout() {
    return (
        <section
            className="relative mx-auto flex flex-col items-center justify-center border-b border-gray-200 dark:border-gray-800 text-center bg-white dark:bg-black"
        >
            <div className="container mx-auto py-40 border border-gray-200 dark:border-gray-800 border-b-0 relative">
                <div className="max-w-3xl m-auto text-center">
                    <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute -left-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                    <div className="absolute -right-1 -bottom-1 h-2 w-2 rounded-full bg-zinc-500" />
                    {/* <h2 className="text-6xl sm:text-6xl font-bold text-gray-800 dark:text-white mb-6">
                    Why Ruixen UI?
                </h2> */}

                    <MagicText
                        text="Animations don’t have to slow you down. Ruixen UI is engineered for speed and flexibility — every component is built with design thinking and production in mind, helping you scale faster without sacrificing performance."
                    />
                    <DotPattern
                        className={cn(
                            "[mask-image:radial-gradient(300px_circle_at_center,black,transparent)]",
                        )}
                    />
                </div>
            </div>
        </section>
    );
}
