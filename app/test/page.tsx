// "use client";
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import AnimatedGradientBackground from "@/components/ruixen/AnimatedBackground";
// import { Button } from "@/components/ui/button";

import ClientLabel_02 from "../sections/client-labels/components/ClientLable_02";

// export default function HeroSection_05() {
//     const ballRef = useRef<HTMLDivElement>(null);
//     const [showHero, setShowHero] = useState(false);

//     useEffect(() => {
//         const tl = gsap.timeline();

//         tl.fromTo(
//             ballRef.current,
//             { x: "-100vw", y: 0, scale: 0.5 },
//             { x: "47vw", y: 0, scale: 1, duration: 1.5, ease: "power2.out" }
//         )
//             .to(ballRef.current, {
//                 y: -100,
//                 duration: 0.5,
//                 ease: "power1.out",
//             })
//             .to(ballRef.current, {
//                 y: 0,
//                 duration: 0.5,
//                 ease: "bounce.out",
//             })
//             .to(ballRef.current, {
//                 scale: 50,
//                 duration: 1.5,
//                 ease: "power4.inOut",
//             })
//             .set(ballRef.current, { display: "none" })
//             .add(() => setShowHero(true));
//     }, []);

//     return (
//         <div className="relative min-h-screen w-full bg-white flex items-center justify-center">
//             <div
//                 ref={ballRef}
//                 className="w-24 h-24 bg-black rounded-full absolute left-0 top-1/2 -translate-y-1/2 z-50"
//             ></div>
//             {showHero && (
//                 <div className="absolute inset-0 z-40 flex flex-col items-center justify-between text-center py-32">

//                     <div className="absolute inset-0 -z-10">
//                         <AnimatedGradientBackground />
//                     </div>
//                     <div className="flex flex-col items-center justify-center">
//                         <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
//                             Innovation Meets Simplicity
//                         </h1>
//                         <p className="text-lg text-white mb-10 max-w-md">
//                             Discover cutting-edge solutions designed for the modern digital landscape.
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-4 mb-16">
//                             <Button className="bg-black text-white hover:bg-black hover:text-white px-6 py-2 rounded-xl border">
//                                 Start Building
//                             </Button>
//                             <Button className="bg-white text-black hover:bg-black hover:text-white px-6 py-2 rounded-xl">
//                                 Request a Demo
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


export default function Test() {
    return (
        <div>
            <ClientLabel_02 />
        </div>
    );
}
