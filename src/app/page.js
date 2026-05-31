"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const router = useRouter();
  const mainRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroContentRef = useRef(null);
  const welcomeSectionRef = useRef(null);
  const spacesSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // [Your existing stats, spacesData, and featuresData arrays stay exactly the same here]
  const stats = [
    { target: 7, suffix: "", text: "Dedicated Halls" },
    { target: 25000, suffix: "+", text: "Sq. Ft Venue Space" },
    { target: 4000, suffix: "+", text: "Guest Capacity" },
    { target: 500, suffix: "+", text: "Parking Capacity" },
  ];

  const spacesData = [
    {
      title: "RAY SIGNATURE",
      description: "Luxury banquet space designed for grand weddings, receptions, and premium celebrations. Featuring elegant interiors and a sophisticated ambiance for unforgettable events.",
      image: "/spaces-features-section-img-1.webp",
    },
    {
      title: "RAY BANQUET",
      description: "Elegant event hall crafted for receptions, corporate gatherings, and social celebrations. Blending luxury interiors with spacious comfort for memorable guest experiences.",
      image: "/spaces-features-section-img-2.webp",
    },
    {
      title: "RAY HERITAGE",
      description: "Modern conference and private event space designed for business meetings and exclusive gatherings. Offering a refined atmosphere with comfort, privacy, and professional elegance.",
      image: "/spaces-features-section-img-3.webp",
    },
  ];

  const featuresData = [
    {
      title: "Fully Air-Conditioned",
      description: "Climate-controlled comfort throughout all venues",
      icon: <Image src="/air.svg" alt="air" width={40} height={40} className="w-10 h-10" />,
    },
    {
      title: "Advanced AV Systems",
      description: "State-of-the-art sound and visual technology",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9.75v4.5l4.5-2.25-4.5-2.25Z" />
        </svg>
      ),
    },
    {
      title: "Spacious Parking",
      description: "Ample parking space for all your guests",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
    },
    {
      title: "Premium Hospitality",
      description: "Exceptional service for an unforgettable experience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
    },
  ];

  const handleContactClick = (e) => {
    e.preventDefault();
    const tl = gsap.timeline({
      onComplete: () => {
        router.push("/contact");
      }
    });

    tl.to(mainRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power2.inOut",
    }).to(mainRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.4");
  };

  useEffect(() => {
    // We use matchMedia in GSAP to handle mobile vs desktop parallax differently if needed,
    // but the relative yPercent method works well across both.
    const ctx = gsap.context(() => {
      
      // 1. Hero Parallax Animation
      gsap.to(heroBgRef.current, {
        yPercent: 20, // Slightly reduced for smoother mobile experience
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(heroContentRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero Text Entrance
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 30 }, // Changed from x: -50 to y: 30 for a cleaner fade up on mobile
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.3 }
      );

      // 2. Welcome Section Animations
      gsap.from(".welcome-anim", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: welcomeSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      const counterElements = gsap.utils.toArray(".counter-value");
      counterElements.forEach((counter, index) => {
        const targetValue = parseInt(counter.getAttribute("data-target"), 10);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: targetValue, duration: 2, ease: "power3.out", delay: index * 0.15,
          onUpdate: () => { counter.innerText = Math.ceil(proxy.val); },
          scrollTrigger: { trigger: welcomeSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });

      // 3. Spaces Section Animations
      gsap.from(".spaces-title", {
        x: -40, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: spacesSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      gsap.from(".space-card", {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: spacesSectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      
      gsap.from(".spaces-btn", {
        y: 20, opacity: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".space-card", start: "bottom 80%", toggleActions: "play none none reverse" },
      });

      gsap.from(".feature-card", {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ".features-container", start: "top 85%", toggleActions: "play none none reverse" },
      });

      // 4. CTA Section Animation
      gsap.fromTo(ctaSectionRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ctaSectionRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-white min-h-screen overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroSectionRef}
        // Using svh (small viewport height) prevents the UI jumping on mobile browsers when scrolling
        className="relative w-full h-[100svh] min-h-[600px] flex items-center overflow-hidden bg-[#Fdfaf5]"
      >
        <div 
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        >
          <Image 
            src="/home-page-hero-secion-img.png" 
            alt="Grand Convention Interior"
            fill
            priority
            className="object-cover object-center opacity-60 md:opacity-100" 
          />
          {/* Changed gradient to bottom-up on mobile, left-right on desktop for better readability */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#Fdfaf5]/90 via-[#Fdfaf5]/70 md:via-[#Fdfaf5]/60 to-transparent md:w-2/3 z-10" />
        </div>

        <div 
          ref={heroContentRef}
          className="relative z-20 px-4 sm:px-8 md:px-16 lg:px-32 w-full max-w-[1400px] mx-auto flex flex-col justify-center mt-12 md:mt-0"
        >
          {/* Center text on mobile, left-align on desktop */}
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-[#6A4A3C] text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
              Crafted For
            </h2>
            <h1 className="text-[#5A3A2C] text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-serif leading-[1.1] mb-5 md:mb-6">
              GRAND <br className="hidden sm:block" /> OCCASIONS.
            </h1>
            
            {/* Flourish centered on mobile */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 max-w-[200px] sm:max-w-[250px] md:max-w-sm mx-auto md:mx-0">
              <div className="h-[1px] flex-1 bg-[#6A4A3C]/40"></div>
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#6A4A3C] shrink-0">
                <path d="M20 0L25 10L20 20L15 10L20 0Z" fill="currentColor"/>
                <circle cx="10" cy="10" r="2" fill="currentColor"/>
                <circle cx="30" cy="10" r="2" fill="currentColor"/>
              </svg>
              <div className="h-[1px] flex-1 bg-[#6A4A3C]/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WELCOME SECTION ================= */}
      <section ref={welcomeSectionRef} className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-[#6A2834]">
        <h2 className="welcome-anim text-3xl md:text-5xl lg:text-[52px] font-serif uppercase tracking-wide leading-tight mb-16 md:mb-24 text-left">
          Welcome to Ray Vijay <br className="hidden md:block" /> Centre for Conventions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-10 md:gap-14">
           {stats.map((stat, index) => (
  <div key={index} className="welcome-anim flex items-center gap-4 md:gap-6 lg:gap-8">
    {/* FIXED: 
      1. Changed fixed widths to min-widths (min-w-[160px] md:min-w-[220px] lg:min-w-[260px])
      2. Smoothed out the font size scaling (text-5xl -> text-6xl -> text-[80px])
    */}
    <div className="text-5xl md:text-6xl lg:text-[80px] text-black leading-none min-w-[160px] md:min-w-[220px] lg:min-w-[260px] text-right shrink-0 flex justify-end">
      <span className="counter-value" data-target={stat.target}>0</span>
      <span>{stat.suffix}</span>
    </div>
    
    {/* Smoothed out the text sizing here as well to match the new proportions */}
    <span className="text-lg md:text-2xl lg:text-3xl font-serif text-[#6A2834] leading-snug">
      {stat.text}
    </span>
  </div>
))}
          </div>

          <div className="flex flex-col items-start pt-4 md:pt-2 lg:pl-10">
            <h3 className="welcome-anim text-lg md:text-xl font-bold uppercase tracking-widest mb-6 leading-snug">
              A PLACE WHERE EVERY OCCASION BECOMES EXTRAORDINARY
            </h3>
            <p className="welcome-anim text-base md:text-lg mb-10 leading-relaxed font-light text-[#6A2834]/90">
              From lavish wedding receptions and elegant engagement ceremonies to corporate conferences and rooftop celebrations, every venue at Ray Vijay Centre for Conventions is thoughtfully designed to deliver sophistication, comfort, and unforgettable experiences.
              <br /><br />
              Whether you are planning an intimate gathering or a grand event, our versatile spaces and dedicated hospitality team ensure every detail is flawlessly executed.
            </p>
            <button className="welcome-anim bg-[#6A2834] text-white text-sm md:text-base font-bold uppercase tracking-[0.2em] py-4 px-8 hover:bg-[#4d1d26] transition-colors duration-300">
              View Brochure
            </button>
          </div>
        </div>
      </section>

      {/* ================= SPACES & FEATURES SECTION ================= */}
      <section ref={spacesSectionRef} className="relative w-full pt-16 md:pt-20">
        <div className="absolute inset-0 z-0 flex flex-col">
          <div className="h-48 md:h-64 bg-white w-full"></div>
          <div className="flex-1 bg-[#6C031D] w-full"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
          <h2 className="spaces-title text-[#7F3947] text-2xl md:text-3xl lg:text-4xl font-serif uppercase tracking-widest mb-10 md:mb-16">
            Spaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {spacesData.map((space, index) => (
              <div key={index} className="space-card flex flex-col group cursor-pointer">
                <div className="relative w-full aspect-[3/4] md:aspect-[2/3] overflow-hidden bg-gray-200">
                  <Image 
                    src={space.image} 
                    alt={space.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="pt-8 pb-4 pr-4">
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif mb-4">{space.title}</h3>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">{space.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center mt-8 md:mt-16">
            <button 
              onClick={() => router.push("/venue-hall")}
              className="spaces-btn border border-white/40 text-white bg-white/5 hover:bg-white/20 backdrop-blur-sm text-xs md:text-sm font-bold uppercase tracking-[0.2em] py-4 px-10 transition-colors duration-300"
            >
              View All Spaces
            </button>
          </div>

          {/* Features Box */}
          <div className="features-container mt-20 md:mt-32 border border-white/20 py-12 px-6 lg:px-12 rounded-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 text-center">
              {featuresData.map((feature, index) => (
                <div key={index} className="feature-card flex flex-col items-center">
                  <div className="text-[#c99f36] mb-4 flex justify-center">{feature.icon}</div>
                  <h4 className="text-white text-lg md:text-xl font-bold mb-3 tracking-wide">{feature.title}</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-[250px]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="px-6 md:px-12 py-20 md:py-32 mx-auto">
        <div 
          ref={ctaSectionRef} 
          className="bg-[#800000] rounded-[2rem] p-10 md:p-16 flex flex-col items-start text-left text-white shadow-2xl relative overflow-hidden max-w-7xl mx-auto"
        >
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-wide mb-3 md:mb-4 font-sans">
            Planning an Event?
          </h3>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
            Schedule a visit or book your event today.
          </h2>
          
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
            Reach out to us to see how we can do it for you. Let’s join hands for a great future.
          </p>

          <button 
            onClick={handleContactClick}
            className="font-sans bg-white text-[#800000] inline-flex items-center gap-3 text-sm md:text-base font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
          >
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