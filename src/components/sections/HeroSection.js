"use client"; // Only this component hydrates on the client

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroTextRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-page-hero-secion-img.png')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 px-4 md:px-8 text-center w-full max-w-6xl mx-auto">
        <h1
          ref={heroTextRef}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal tracking-wide uppercase leading-snug md:leading-tight"
        >
          An iconic venue in the heart <br className="hidden md:block" /> of Covent Garden.
        </h1>
      </div>
    </section>
  );
}