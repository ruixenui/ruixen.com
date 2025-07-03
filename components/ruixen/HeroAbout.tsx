import { MagicText } from "@/components/ui/magic-text";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function HeroAbout() {
    return (
        <section
            className="relative mx-auto min-h-screen flex flex-col items-start justify-center text-left bg-gray-50 dark:bg-black"
        >
            <div className="container">
                <h2 className="text-6xl sm:text-6xl font-bold text-gray-800 dark:text-white mb-6">
                    Why Ruixen UI?
                </h2>
                <DotPattern
                    className={cn(
                        "[mask-image:radial-gradient(300px_circle_at_center,black,transparent)]",
                    )}
                />

                <MagicText
                    text="Animations don’t have to slow you down. Ruixen UI is engineered for speed and flexibility — every component is built with design thinking and production in mind, helping you scale faster without sacrificing performance."
                />
            </div>
        </section>
    );
}
