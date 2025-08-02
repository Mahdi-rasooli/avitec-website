'use client'
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image'
import logo from '../../public/next.svg';
import HeroScroll from "./tests/hero-scroll";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHeader() {
    useEffect(() => {
        const showAnim = gsap
            .from(".main-tool-bar", {
                yPercent: -100,
                paused: true,
                duration: 0.2,
            })
            .progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse();
            },
        });

        return () => {
            ScrollTrigger.kill();
        };
    }, []);

    return (
        <div className="bg-[#0e100f] min-h-screen">
            {/* Header */}
            <div
                className="main-tool-bar fixed top-0 left-0 w-full 
                   h-20 bg-[#f6f6f6] text-[#0e100f] 
                   flex items-center justify-between 
                   transition-all duration-300 z-50 p-2"
            >
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold">Avitec</h1>
                    <Image src={logo} className="h-12 w-12" />
                    <h2 className="text-xl font-semibold">Insurance</h2>
                    
                </div>
                <div>
                    <ul className="flex items-center justify-center gap-3">
                        <li className="text-black font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">Insights</li>
                        <li className="text-black font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">About us</li>
                        <li className="text-black font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">Contact us</li>
                    </ul>
                </div>
            </div>

            {/* Scrollable content */}
            <div className="h-[200vh]">
                <HeroScroll />
            </div>
        </div>
    );
}
