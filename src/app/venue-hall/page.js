"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VenueHall() {
  const mainRef = useRef(null);

  // SVG for the Air-Conditioning Icon
  const windIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#cba328]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25a2.25 2.25 0 0 0 0-4.5h-3.659M5.25 13.5h8.25a2.25 2.25 0 0 1 0 4.5h-5.25" />
    </svg>
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Intro Animation
      gsap.from(".intro-anim", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.1,
      });

      // 2. Maroon Block Animation
      gsap.from(".maroon-block > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".maroon-block",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Gallery Animation
      gsap.from(".gallery-section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 4. Specs Box Animation
      gsap.from(".specs-box", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".specs-box",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 5. CTA Animation
      gsap.from(".cta-container", {
        scale: 0.95,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-white min-h-screen overflow-hidden">
      
      {/* ================= HEADER / INTRO ================= */}
      {/* Added top padding to account for the fixed navbar */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h1 className="intro-anim text-[#6A2834] text-4xl md:text-6xl lg:text-[72px] font-serif uppercase tracking-widest mb-8">
          The Vestibules
        </h1>
        <p className="intro-anim text-[#6A2834]/80 text-sm md:text-base lg:text-lg font-serif italic mb-6">
          Our halls are designed to provide a contemporary yet elegant backdrop for your events.
        </p>
        <p className="intro-anim text-[#6A2834]/80 text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-light">
          State-of-the-art facilities, ambient lighting, and a versatile layout make our halls the perfect canvas for your vision. We aim to be recognized not just as a local gem but among the world&apos;s best wedding venues, and our commitment to staying on the cutting edge of event trends is reflected in our modern halls.
        </p>
      </section>

      {/* ================= MAROON INFO BLOCK ================= */}
      <section className="maroon-block w-full bg-[#5e1927] py-20 md:py-28 px-6 md:px-12 text-center text-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-wide uppercase leading-snug mb-4">
            A REFINED AND FLEXIBLE SPACE PERFECT FOR <br className="hidden md:block" /> CREATING REMARKABLE OCCASIONS
          </h2>
          
          <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
            Connected to The Grand Temple, The Vestibules embody an unrivaled blend of sophistication and charm. Available for exclusive hire, this remarkable space seamlessly transforms into three distinct areas via ornate dividing doors, offering both intimacy and grandeur in equal measure.
          </p>
          
          <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
            Accessible solely through the iconic Tower Doors and a sweeping marble staircase, The Vestibules exude a sense of arrival and occasion from the very first step. Every detail, from the soaring ceilings to the intricate architectural flourishes, creates a captivating backdrop for any event.
          </p>
          
          <p className="text-white/90 text-sm md:text-base font-light leading-relaxed">
            Perfectly suited to glamorous parties, refined dinners, high-profile conferences, elegant receptions, filming, and fashion shows, The Vestibules promise an atmosphere of prestige and versatility, ensuring every moment is as memorable as the setting itself.
          </p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="gallery-section py-20 md:py-24 px-6 md:px-12 max-w-[1400px] mx-auto text-center">
        <h2 className="text-[#6A2834] text-3xl md:text-4xl lg:text-5xl font-serif mb-10">
          Gallery
        </h2>

        {/* Gallery Image Slider Placeholder */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-gray-200 overflow-hidden group cursor-pointer">
          <img 
            src="/path-to-vestibules-gallery.jpg" // Update this image path
            alt="The Vestibules Gallery" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay for better UI visibility */}
          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/0"></div>

          {/* Left Arrow */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots Pagination */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full border border-white transition-colors ${i === 2 ? 'bg-white' : 'bg-transparent'}`}
              ></div>
            ))}
          </div>
          
          {/* Top Right UI Icons (Expand) */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-70">
            <div className="w-6 h-6 border border-white flex items-center justify-center"></div>
            <div className="w-6 h-6 border border-white flex items-center justify-center"></div>
          </div>
        </div>
      </section>

      {/* ================= SPECS BOX ================= */}
      <section className="px-6 md:px-12 pb-20 md:pb-32 max-w-[1200px] mx-auto">
        <div className="specs-box border border-[#6A2834]/40 p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
            
            {/* Left Column: Stats */}
            <div className="flex flex-col gap-10 md:pr-12 lg:pr-20 md:border-r-[2px] border-[#6A2834]/30">
              
              <div>
                <h3 className="text-[#6A2834] text-xl md:text-2xl font-serif tracking-widest uppercase mb-4">
                  Usable Floor Space
                </h3>
                <p className="text-[#6A2834] text-2xl md:text-3xl font-serif">
                  430 M<sup className="text-lg">2</sup>
                </p>
              </div>

              <div>
                <h3 className="text-[#6A2834] text-xl md:text-2xl font-serif tracking-widest uppercase mb-4">
                  Capacities
                </h3>
                <ul className="text-[#6A2834] text-lg md:text-xl font-serif uppercase tracking-wider space-y-2">
                  <li>Theatre: 150</li>
                  <li>Cabaret: 96</li>
                  <li>Seated: 300</li>
                  <li>Reception: 500</li>
                </ul>
              </div>

            </div>

            {/* Right Column: Amenities (Matching the repeating layout from your image) */}
            <div className="flex flex-col justify-center gap-8 md:pl-12 lg:pl-20">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-6">
                  {windIcon}
                  <span className="text-[#6A2834] text-lg md:text-xl font-serif">
                    Fully Air-Conditioned
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section px-6 md:px-12 pb-20 md:pb-32 max-w-[1200px] mx-auto">
        <div className="cta-container bg-[#5e1927] rounded-[2rem] p-10 md:p-16 flex flex-col items-start text-left text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-wide mb-3 md:mb-4">
            Get In Touch
          </h3>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
            Want A Schedule Visit / Book A Event ?
          </h2>
          
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
            Reach Out To Us To See How We Can Do It For You. Let&apos;s Join Hands For A Great Future..
          </p>

          <button className="bg-white text-[#5e1927] flex items-center gap-3 text-sm md:text-base font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

    </main>
  );
}