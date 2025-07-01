import { Rocket, Code2, Wrench, Layers3, ShieldCheck, Users } from "lucide-react";

export default function Introduction() {
    return (
        <section className="py-12 md:py-20 bg-white dark:bg-black text-black dark:text-white transition-colors">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                
                {/* Centered Heading */}
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-10">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        Build faster with Ruixen UI
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        A fully customizable component system designed for SaaS, dashboards, and modern web apps. Build sleek, scalable UIs with ease.
                    </p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border border-zinc-300 dark:border-zinc-800 *:p-8 sm:grid-cols-2 lg:grid-cols-3 bg-white dark:bg-zinc-950/50 backdrop-blur-sm rounded-xl transition-colors">
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Rocket className="size-4 text-green-500 dark:text-green-400" />
                            <h3 className="text-sm font-medium">Rapid Development</h3>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-400">
                            Pre-built, responsive components to jumpstart your projects.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Code2 className="size-4 text-blue-500 dark:text-blue-400" />
                            <h3 className="text-sm font-medium">Developer Friendly</h3>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-400">
                            Built with TypeScript, Tailwind, and Framer Motion at its core.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Wrench className="size-4 text-yellow-500 dark:text-yellow-400" />
                            <h3 className="text-sm font-medium">Highly Customizable</h3>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-400">
                            Tailor every component with ease to fit your brand.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Layers3 className="size-4 text-pink-500 dark:text-pink-400" />
                            <h3 className="text-sm font-medium">Modular Design</h3>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-400">
                            Use only what you need with our flexible architecture.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-purple-500 dark:text-purple-400" />
                            <h3 className="text-sm font-medium">Secure & Reliable</h3>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-400">
                            Built with best practices for performance and security.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Users className="size-4 text-cyan-500 dark:text-cyan-400" />
                            <h3 className="text-sm font-medium">Community Driven</h3>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-400">
                            Join developers worldwide shaping the future of Ruixen UI.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
