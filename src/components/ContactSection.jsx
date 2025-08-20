"use client";
import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import Image from "next/image";

// Register GSAP's ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// === 3D Icon Component ===
const RotatingIcon = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe={true}
        transparent={true}
        opacity={1}
      />
    </mesh>
  );
};

// === Main Footer Component ===
const AvitecFooter = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const AnimatedLink = ({ children, href = "#" }) => (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-300 ease-in-out"
    >
      {children}
    </a>
  );

  const SectionTitle = ({ children }) => (
    <div className="inline-block mb-4">
      <span className="text-lg border border-gray-100 rounded-full px-4 py-2 text-white">
        {children}
      </span>
    </div>
  );

  return (
    <>
      <footer className="bg-gray-900 text-white pt-24 pb-12 px-4 sm:px-8 md:px-16 relative z-0 ">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6">
              <h1 className="text-8xl sm:text-9xl md:text-[8rem] lg:text-[12rem] font-bold tracking-tighter leading-none relative md:right-20 md:bottom-20 lg:right-6 lg:bottom-20 bg-gradient-to-b from-[#c4161c] via-[#991519] to-[#600404] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                AVITEC
              </h1>
              {/* <Image src='https://avitec.ir/wp-content/uploads/2022/11/logo-avitec2020n.png' width={300} height={180} className='bottom-30 right-150'/> */}
            </div>
            <div className="md:col-span-3">
              <SectionTitle>Contact</SectionTitle>
              <div className="flex flex-col space-y-2 text-lg">
                <p className="font-semibold">AVITEC contact</p>
                <p className="text-gray-400">
                  123 AVITEC
                  <br />
                  Tehran City, Vanak
                </p>
                <p className="text-gray-400">+1 (234) 567-8900</p>
                <AnimatedLink href="mailto:hello@avitec.com">
                  info@avitec.com
                </AnimatedLink>
              </div>
            </div>
            <div className="md:col-span-3">
              <SectionTitle>Links</SectionTitle>
              <div className="flex flex-col space-y-2 text-lg">
                <AnimatedLink>Instagram</AnimatedLink>
                <AnimatedLink>LinkedIn</AnimatedLink>
                <AnimatedLink>Newsletter</AnimatedLink>
                <div className="pt-4 cursor-pointer text-white hover:text-gray-400 transition-all ease-in-out duration-200">
                  <p>Privacy Policy</p>
                  <p>Terms & Conditions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 flex justify-between items-end relative right-0">
            <p className="text-lg text-gray-400 max-w-sm">
              The Leading Technical and Commercial <br />
              Company of Energy Develop Avin
            </p>
            <button
              onClick={scrollToTop}
              className="border border-gray-500 cursor-pointer rounded-full p-3 hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

// === Suggestion Form Component ===
const SuggestionForm = () => {
  const iconContainerRef = useRef(null);

  useEffect(() => {
    const iconEl = iconContainerRef.current.querySelector("canvas");
    if (iconEl) {
      gsap.to(iconEl.style, {
        scrollTrigger: {
          trigger: iconContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        rotate: 180,
        ease: "none",
      });
    }
  }, []);

  const InputField = ({ type = "text", placeholder, name, as = "input" }) => {
    const Tag = as;
    const commonProps = {
      placeholder: " ", // The space is crucial for the CSS selector to work
      name,
      type: Tag === "input" ? type : undefined,
      rows: Tag === "textarea" ? 4 : undefined,
      className:
        "peer w-full bg-gray-100 text-black rounded-md pt-6 pb-2 px-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-black focus:bg-white",
    };

    return (
      <div className="relative">
        <Tag {...commonProps} />
        <label
          className={`absolute left-4 top-4 text-gray-500 transition-all duration-300 
                                  pointer-events-none
                                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-black
                                  peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}
        >
          {placeholder}
        </label>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8 bg-[#262836]">
      <div ref={iconContainerRef} className="w-full md:w-2/5 h-96 md:h-[600px]">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Loading 3D Icon...
            </div>
          }
        >
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <RotatingIcon />
          </Canvas>
        </Suspense>
      </div>
      <div className="w-full md:w-1/3">
        <h2 className="text-5xl font-bold mb-3 text-white">Get in Touch</h2>
        <p className="text-gray-500 mb-10 text-lg">
          Have a suggestion or a project in mind? Let's talk.
        </p>
        <form className="space-y-8">
          <InputField placeholder="Your Name" name="name" />
          <InputField type="email" placeholder="Your Email" name="email"/>
          <InputField placeholder="Your Message" name="message" as="textarea" />
          <button
            type="submit"
            className="bg-[#262836] cursor-pointer border border-white text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition-colors duration-300 text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// === Example Page Component to Demonstrate the Effect ===
export default function ContactSection() {
  return (
    <div className="font-satoshi contact-section ">
      <main className="relative bg-white z-10">
        <SuggestionForm />
        <div className="h-12 bg-[#262836]"></div>{" "}
        {/* Spacer to ensure footer reveal is smooth */}
      </main>
      <div className="sticky bottom-0 bg-[#46535e33]">
        <AvitecFooter />
      </div>
    </div>
  );
}
