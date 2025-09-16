'use client'
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image'
import logo from '../../public/avitec-logo.png';

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
        <div>
            {/* Header */}
            <div
                className="main-tool-bar fixed top-0 left-0 w-full 
                   h-15 backdrop-blur-3xl
                   flex items-center justify-between 
                   transition-all duration-300 z-50 p-6"
            >
                <div className="flex items-center justify-between gap-4">
                    <Image src={logo} alt="logo" className="h-18 w-18" />
                </div>
                <div className=" backdrop-blur-xs rounded-lg p-2 font-satoshi mt-2">
                    <ul className="p-4 flex items-center justify-center gap-10 text-xl">
                        <li className="text-foreground font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">Insights</li>
                        <li className="text-foreground font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">About us</li>
                        <li className="text-foreground font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">Contact us</li>
                    </ul>
                </div>
                <div>
                    <ul className="p-4  items-center justify-center gap-7 hidden">
                        <li className="text-black font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">Insights</li>
                        <li className="text-black font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">About us</li>
                        <li className="text-black font-medium cursor-pointer hover:text-xl hover:text-gray-800 hover:duration-600 hover:transition-all">Contact us</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
