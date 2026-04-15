"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUs() {
  const mainRef = useRef(null);

  useEffect(() => {
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
      gsap.from(".partner-logo", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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
      
      {/* ================= PAGE HEADER ================= */}
      {/* Added pt-32 to account for the fixed transparent navbar */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-20 px-6 md:px-12 text-center">
        <h1 className="page-title text-5xl md:text-7xl lg:text-[80px] font-serif text-[#6A2834]">
          About Us
        </h1>
      </section>

      {/* ================= OUR STORY & VISION ================= */}
      <section className="story-container max-w-[1200px] mx-auto px-6 md:px-12 pb-20 md:pb-32 flex flex-col gap-20 md:gap-32">
        
        {/* Row 1: Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text Left */}
          <div className="story-block flex flex-col order-2 md:order-1">
            <h2 className="text-[#6A2834] text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Our Story
            </h2>
            <p className="text-gray-800 text-sm md:text-base font-bold mb-2">Concept:</p>
            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
              The Anantara Event Hall is the crown jewel of the Parekkat Convention Centre, offering a premier space for a variety of high-profile events. The Anantara Event Hall combines elegance, flexibility, and top-notch facilities to ensure your event is unforgettable. Whether you are planning a lavish wedding, a corporate conference, or a live entertainment show, Anantara provides the perfect setting to make your event a success.
            </p>
          </div>
          {/* Image Right */}
          <div className="story-block w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden order-1 md:order-2">
            <img 
              src="/path-to-story-image.jpg" // Update image path
              alt="Our Story Celebration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Row 2: Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image Left */}
          <div className="story-block w-full aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden order-1">
            <img 
              src="/path-to-vision-image.jpg" // Update image path
              alt="Our Vision Banquet" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Right */}
          <div className="story-block flex flex-col order-2">
            <h2 className="text-[#6A2834] text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Our vision
            </h2>
            <p className="text-gray-800 text-sm md:text-base font-bold mb-2">Concept:</p>
            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
              The Anantara Event Hall is the crown jewel of the Parekkat Convention Centre, offering a premier space for a variety of high-profile events. The Anantara Event Hall combines elegance, flexibility, and top-notch facilities to ensure your event is unforgettable. Whether you are planning a lavish wedding, a corporate conference, or a live entertainment show, Anantara provides the perfect setting to make your event a success.
            </p>
          </div>
        </div>

      </section>

      {/* ================= PARTNERS SECTION ================= */}
      <section className="partners-section bg-[#fdfaf6] py-20 md:py-28 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="partner-logo text-3xl md:text-5xl font-serif text-[#6A2834] uppercase tracking-widest mb-6">
            Our Partners
          </h2>
          <p className="partner-logo text-gray-600 text-sm md:text-base font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            We work with event partners who provide unparalleled expertise and creativity, ensuring your event at 60 Great Queen Street is flawlessly executed.
          </p>

          {/* Logos Grid */}
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24 mb-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace these with actual images. Using text/divs as placeholders to match your image structure */}
            <div className="partner-logo font-bold text-xl tracking-widest">ALR MUSIC</div>
            <div className="partner-logo flex flex-col items-center"><span className="text-2xl mb-1">♔</span><span className="text-xs tracking-widest">AMIE BONE</span></div>
            <div className="partner-logo font-medium text-sm tracking-widest flex items-center gap-2"><span className="text-xl">❁</span> BLOOMSBURY FLOWERS</div>
            <div className="partner-logo font-bold text-sm tracking-widest flex flex-col items-center"><span className="text-2xl">🐟</span> CLOWNFISH EVENTS</div>
            <div className="partner-logo font-light text-lg tracking-[0.3em]">ÉLAN ARTISTS</div>
          </div>

          <button className="partner-logo bg-[#6A2834] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] py-4 px-10 hover:bg-[#4d1d26] transition-colors duration-300">
            Learn More
          </button>
        </div>
      </section>

      {/* ================= EXHIBITIONS BANNER ================= */}
      <section className="exhibitions-section relative w-full h-[600px] md:h-[700px] bg-gray-900 overflow-hidden flex items-end">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/path-to-exhibition-image.jpg')" }} // Update image path
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="exhibition-content relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-20">
          <p className="text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-2">Event</p>
          <h2 className="text-white text-4xl md:text-6xl font-medium mb-4">EXHIBITIONS</h2>
          <p className="text-white/80 text-sm md:text-base max-w-xl font-light leading-relaxed mb-10">
            Exhibitions venue with Presence, Prestige and Purpose Take a look inside Scroll for more A central London.
          </p>
          
          {/* Bottom Bar: Arrows and Enquire Button */}
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
      <section className="cta-section px-6 md:px-12 py-20 md:py-32 max-w-[1200px] mx-auto">
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