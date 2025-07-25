'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export const codeStringHero_03 = `'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function HeroSection_03() {
    const headingRef = useRef(null)
    const subtextRef = useRef(null)
    const buttonRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })

        tl.fromTo(
            headingRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1 }
        )
            .fromTo(
                subtextRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1 },
                '-=0.6'
            )
            .fromTo(
                buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1 },
                '-=0.5'
            )
            .fromTo(
                imageRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1 },
                '-=0.5'
            )
    }, [])

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center px-6 text-center">
            {/* Content Section */}
            <div className="max-w-3xl space-y-4 py-10">
                <h1
                    ref={headingRef}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-gray-100"
                >
                    Aura Behind Every Image
                </h1>
                <p
                    ref={subtextRef}
                    className="text-gray-500 max-w-xl mx-auto text-lg dark:text-gray-400"
                >
                    Drop your photo and let Ruixen unveil the hidden moods, energies, and storylines woven into your presence—powered by deep neural insight and intuitive design.
                </p>

                <div ref={buttonRef} className="flex justify-center gap-3">
                    <Button className="px-6 py-2 text-base rounded-full">Upload photo</Button>
                </div>
            </div>

            {/* Image with 3D Gradient Overlay */}
            <div
                ref={imageRef}
                className="relative w-full max-w-6xl overflow-hidden shadow-2xl"
            >
                <Image
                    src="/38.jpg"
                    alt="Aura analysis"
                    className="w-full object-cover max-h-[400px]"
                    width={1000}
                    height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-pink-100 to-yellow-100 opacity-30 blur-2xl mix-blend-overlay z-10" />
            </div>
        </section>
    )
}
`;

export default function HeroSection_03() {
    const headingRef = useRef(null)
    const subtextRef = useRef(null)
    const buttonRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } })

        tl.fromTo(
            headingRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1 }
        )
            .fromTo(
                subtextRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1 },
                '-=0.6'
            )
            .fromTo(
                buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1 },
                '-=0.5'
            )
            .fromTo(
                imageRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1 },
                '-=0.5'
            )
    }, [])

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center px-6 text-center">
            {/* Content Section */}
            <div className="max-w-3xl space-y-4 py-10">
                <h1
                    ref={headingRef}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-gray-100"
                >
                    Aura Behind Every Image
                </h1>
                <p
                    ref={subtextRef}
                    className="text-gray-500 max-w-xl mx-auto text-lg dark:text-gray-400"
                >
                    Drop your photo and let Ruixen unveil the hidden moods, energies, and storylines woven into your presence—powered by deep neural insight and intuitive design.
                </p>

                <div ref={buttonRef} className="flex justify-center gap-3">
                    <Button className="px-6 py-2 text-base rounded-full">Upload photo</Button>
                </div>
            </div>

            {/* Image with 3D Gradient Overlay */}
            <div
                ref={imageRef}
                className="relative w-full max-w-6xl overflow-hidden shadow-2xl"
            >
                <Image
                    src="/38.jpg"
                    alt="Aura analysis"
                    className="w-full object-cover max-h-[400px]"
                    width={1000}
                    height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-pink-100 to-yellow-100 opacity-30 blur-2xl mix-blend-overlay z-10" />
            </div>
        </section>
    )
}
