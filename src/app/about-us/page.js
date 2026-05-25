"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function AboutUs() {
  const mainRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Array of partner logos for the sliding animation
  const partnerLogos = [
    { name: "ALR Music", src: "/Partner-alr-music.png" },
    { name: "Amie Bone", src: "/Partner-amie-bone.png" },
    { name: "Bloomsbury Flowers", src: "/Partner-boomsbury-flowers.png" },
    { name: "Clownfish Events", src: "/Partner-clownfish-events.png" },
    { name: "Elan Artists", src: "/Partner-Élan Artists.png" },
  ];

  useEffect(() => {
    // Safely register plugin inside the client-side hook
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.from(".page-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // 2. Story & Vision Animations
      gsap.from(".story-block", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".story-container",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Partners Section 
      // (This was breaking because the HTML was missing below!)
      gsap.from(".partners-fade-in", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 4. Exhibitions Banner
      gsap.from(".exhibition-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".exhibitions-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // 5. CTA Section Animation
      if (ctaSectionRef.current) {
        gsap.from(ctaSectionRef.current, {
          scale: 0.95,
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-white min-h-screen overflow-hidden">
      
      {/* Inline Styles for the Infinite Marquee Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* ================= PAGE HEADER ================= */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-20 px-6 md:px-12 text-center">
        <h1 className="page-title text-5xl md:text-7xl lg:text-[80px] font-serif text-[#6A2834]">
          About Us
        </h1>
      </section>

      {/* ================= OUR STORY & VISION ================= */}
      <section className="story-container max-w-[1200px] mx-auto px-6 md:px-12 pb-20 md:pb-32 flex flex-col gap-20 md:gap-32">
        
        {/* Row 1: Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="story-block flex flex-col order-2 md:order-1">
            <h2 className="text-[#6A2834] text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Our Story
            </h2>
            <p className="text-[#6C031D] text-sm md:text-base font-bold mb-2">
            Ray Vijay Centre for Convention was created with a vision to redefine celebrations through elegance, luxury, and unforgettable experiences. Designed as a destination for weddings, corporate gatherings, and cultural events, the convention centre blends sophisticated spaces with exceptional hospitality. Every corner of Ray Vijay Centre reflects our commitment to creating memorable moments where people come together to celebrate life’s most special occasions.</p>
          </div>
          <div className="story-block w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden order-1 md:order-2">
            <img 
              src="/about-us-img1.png" 
              alt="Our Story Celebration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 2: Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="story-block w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden order-1">
            <img 
              src="/about-us-img2.png" 
              alt="Our Vision Banquet" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="story-block flex flex-col order-2">
            <h2 className="text-[#6A2834] text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Our vision
            </h2>
            <p className="text-[#6C031D] text-sm md:text-base font-bold mb-2">
            Ray Vijay Centre for Convention is designed to be a landmark destination for weddings, corporate gatherings, and grand celebrations. Combining elegant architecture, versatile event spaces, and premium hospitality, the convention centre creates unforgettable experiences for every occasion. Whether hosting luxurious weddings, business conferences, or cultural events, Ray offers the perfect setting with sophistication, comfort, and world-class event facilities.</p>
            
          </div>
        </div>

      </section>

      {/* ================= EXHIBITIONS BANNER ================= */}
      <section className="exhibitions-section relative w-full h-[600px] md:h-[700px] bg-gray-900 overflow-hidden flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/path-to-exhibition-image.png')" }} 
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="exhibition-content relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-20">
          <p className="text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-2">Event</p>
          <h2 className="text-white text-4xl md:text-6xl font-medium mb-4">EXHIBITIONS</h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl font-light leading-relaxed mb-10">
            Exhibitions venue with Presence, Prestige and Purpose Take a look inside Scroll for more A central London.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            <button className="border border-white/50 text-white text-xs md:text-sm tracking-[0.2em] uppercase py-3 px-8 hover:bg-white hover:text-black transition-colors">
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
<section className="px-6 md:px-12 py-20 md:py-32 mx-auto">
  <div 
    ref={ctaSectionRef} 
    className="bg-[#800000] rounded-[2rem] p-10 md:p-16 flex flex-col items-start text-left text-white shadow-2xl relative overflow-hidden"
  >
    <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-wide mb-3 md:mb-4 font-['Inter']">
      Planning an Event?
    </h3>
    <h2 className="font-['Inter'] text-3xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
      Schedule a visit or book your event today.
    </h2>
    
    <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
      Reach out to us to see how we can do it for you. Let’s join hands for a great future..
    </p>

    <Link 
      href="/contact" 
      className="font-['Inter'] bg-white text-[#800000] inline-flex items-center gap-3 text-sm md:text-base font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
    >
      Contact Us
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
      </svg>
    </Link>
  </div>
</section>

    </main>
  );
}