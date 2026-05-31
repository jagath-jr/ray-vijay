"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. DATA ARRAY: Add or edit all your venues here easily
const venuesData = [
  {
    id: "ray-signature",
    title: "Ray Signature",
    subtitle: "Main Hall | Capacity: 1500+ Guests",
    description: "The crown jewel of the venue, Ray Signature is designed for grand celebrations, luxury weddings, corporate galas, award ceremonies, and large-scale social events. Featuring elegant interiors, premium lighting, and a majestic ambiance, this space delivers a truly unforgettable experience for every guest.",
    boxTitle: "1500+ Guests",
    boxSubtitle: "Ideal For:",
    list: ["Luxury Weddings", "Receptions", "Corporate Events", "Concerts & Gala Nights"],
    hasAC: true,
    images: [
      "/ray-signature-img.jpg",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ray-banquet",
    title: "Ray Banquet",
    subtitle: "Banquet Hall | Capacity: 1200+ Guests",
    description: "Crafted for grand dinners and majestic celebrations, Ray Banquet offers a stunning environment for large-scale banquets and receptions. A perfect blend of elegance and expansive space for unforgettable moments.",
    boxTitle: "1200+ Guests",
    boxSubtitle: "Ideal For:",
    list: ["Wedding Receptions", "Corporate Conferences", "Social Gatherings", "Premium Banquets"],
    hasAC: true,
    images: [
      "/ray-banquet-img1.jpg", 
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80", 
      "/ray-banquet-img2.jpg"  
    ]
  },
  {
    id: "ray-heritage",
    title: "Ray Heritage",
    subtitle: "Mini Hall | Capacity: 600+ Guests",
    description: "Ray Heritage blends sophistication with warmth, creating the perfect setting for intimate weddings, family celebrations, engagement ceremonies, and private events. Its timeless design and versatile layout make every gathering feel elegant and personal.",
    boxTitle: "600+ Guests",
    boxSubtitle: "Ideal For:",
    list: ["Engagement Ceremonies", "Birthday Celebrations", "Cultural Events", "Private Gatherings"],
    hasAC: true,
    images: [
      "ray-heritage-img1.jpg", 
      "ray-heritage-img2.jpg",  
      "ray-heritage-img3.jpg"   
    ]
  },
  {
    id: "ray-prive",
    title: "Ray Privé",
    subtitle: "Conference Room | Capacity: 150+ Guests",
    description: "Ray Privé is an exclusive, state-of-the-art space ideal for high-level meetings and executive conferences. It provides an intimate, focused environment equipped with modern amenities for seamless corporate interactions.",
    boxTitle: "150+ Guests",
    boxSubtitle: "Ideal For:",
    list: ["Business Meetings", "Seminars & Workshops", "Corporate Training", "Executive Conferences"],
    hasAC: true,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531973486364-5fa64260d75b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ray-skywalk",
    title: "Ray Skywalk",
    subtitle: "Rooftop Venue | Capacity: 750+ Guests",
    description: "Experience celebrations under the open sky at Ray Skywalk. This rooftop venue provides breathtaking views and a chic atmosphere, ideal for evening parties and social soirées.",
    boxTitle: "750+ Guests",
    boxSubtitle: "Ideal For:",
    list: ["Rooftop Parties", "Cocktail Nights", "Sangeet Events", "Social Celebrations"],
    hasAC: true,
    images: [
      "ray-skywalk-img2.jpg", 
      "ray-skywalk-img3.jpg", 
      "ray-skywalk-img1.jpg"  
    ]
  },
  {
    id: "ray-gateway",
    title: "Ray Gateway",
    subtitle: "Luxury Lobby | 15,000 Sq. Ft.",
    description: "An impressive arrival experience sets the tone for your event. Ray Gateway is a grand lobby designed to welcome guests with unparalleled luxury and breathtaking architecture.",
    boxTitle: "600+ Guests",
    boxSubtitle: "Highlights:",
    list: ["Premium Guest Arrival Experience", "Spacious Gathering Area", "Perfect for Welcome Setups & Exhibitions", "Luxury Ambience"],
    hasAC: false, // Turned off AC indicator here
    images: [
      "ray-gateway-img1.png",
      "ray-gateway-img3.png",
      "ray-gateway-img2.png"
    ]
  },
  {
    id: "ray-royal-suites",
    title: "Ray Royal Suites",
    subtitle: "24 Luxury Rooms",
    description: "Designed to provide the ultimate comfort for you and your VIP guests, Ray Royal Suites offer luxurious accommodation. Every room is a haven of relaxation ensuring a premium stay experience.",
    boxTitle: "Features:",
    boxSubtitle: "",
    list: ["Elegant Interiors", "Premium Comfort", "VIP Hospitality", "Luxury Stay Experience"],
    hasAC: true,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
      "ray-royalsutes-img1.jpg",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "ray-atrium",
    title: "Ray Atrium",
    subtitle: "Gathering Space | Capacity: 900+ Guests",
    description: "Ray Atrium is a beautifully designed open-air space that blends nature with architecture. It's the perfect choice for grand outdoor functions, cultural events, and community gatherings.",
    boxTitle: "900+ Guests",
    boxSubtitle: "Ideal For:",
    list: ["Open-Air Functions", "Cultural Events", "Wedding Ceremonies", "Community Gatherings"],
    hasAC: false, // Turned off AC indicator here
    images: [
      "ray-atrium-img1.png", 
      "ray-atrium-img2.png", 
      "ray-atrium-img3.png"  
    ]
  }
];

// SVG for the Air-Conditioning Icon
const WindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#cba328" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
  </svg>
);


// 2. REUSABLE VENUE COMPONENT
const VenueSection = ({ data, isFirst }) => {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect independent to each section
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(slideInterval);
  }, [data.images.length]);

  // GSAP Animations scoped to this specific section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Text Animation
      gsap.from(".intro-anim", {
        y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: isFirst ? 0.1 : 0,
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse",
        },
      });

      // Image & Box split Animation
      gsap.from(".split-anim", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: {
          trigger: ".split-section", start: "top 80%", toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isFirst]);

  return (
    <div id={data.id} ref={sectionRef} className={`w-full ${isFirst ? 'pt-32 md:pt-40' : 'pt-20 md:pt-28'}`}>
      
      {/* HEADER / INTRO */}
      <section className="pb-12 md:pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="intro-anim text-[#6C031D] text-5xl md:text-6xl lg:text-[72px] font-serif uppercase tracking-widest mb-4">
          {data.title}
        </h2>
        <p className="intro-anim text-[#6C031D] text-lg md:text-2xl lg:text-3xl font-serif mb-8">
          {data.subtitle}
        </p>
        <p className="intro-anim text-[#6C031D]/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-4xl mx-auto font-light">
          {data.description}
        </p>
      </section>

      {/* SPLIT SECTION (IMAGE & INFO BOX) */}
      <section className="split-section px-6 md:px-12 pb-10 md:pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left Column: Image Slider */}
          <div className="split-anim relative w-full aspect-square lg:aspect-auto bg-gray-200 group overflow-hidden">
            {data.images.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`${data.title} Image ${index + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/0 z-20 pointer-events-none"></div>
            
            {/* 👇 TEMPORARY BLUR LAYER 👇 */}
            <div className="absolute inset-0 backdrop-blur-[3px] bg-white/20 z-20 pointer-events-none"></div>
            {/* 👆 ======================= 👆 */}

            {/* 👇 LOADING SPINNER & CAPTION OVERLAY 👇 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none p-6 text-center">
              <svg className="animate-spin h-10 w-10 text-white mb-4 drop-shadow-md" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-white text-sm md:text-base font-medium tracking-wide bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm shadow-lg">
                (Representative Images – Actual venue images coming soon...)
              </p>
            </div>
            {/* 👆 ===================================== 👆 */}

            {/* Dots Pagination */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {data.images.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full border border-white transition-colors duration-300 ${
                    i === currentSlide ? 'bg-white' : 'bg-transparent hover:bg-white/50'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Right Column: Maroon Info Box */}
          <div className="split-anim bg-[#6C031D] p-6 md:p-10 relative flex flex-col justify-center text-white min-h-[400px] lg:min-h-[500px]">
            <div className="absolute inset-4 md:inset-6 border border-white/60 pointer-events-none"></div>
            <div className="relative z-10 px-4 md:px-8 py-8 flex flex-col h-full">
              <div className="mb-auto">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 tracking-wide">
                  {data.boxTitle}
                </h3>
                
                {data.boxSubtitle && (
                  <h4 className="text-xl md:text-2xl font-serif mb-4">
                    {data.boxSubtitle}
                  </h4>
                )}
                
                <ul className="space-y-3 pl-2 md:pl-4 mb-12 text-lg md:text-xl font-serif tracking-wide">
                  {data.list.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Conditional Rendering for Air-Conditioning */}
              {data.hasAC && (
                <div className="flex items-center gap-4 mt-8">
                  <WindIcon />
                  <span className="text-lg md:text-xl font-serif tracking-wide text-white/90">
                    Fully Air-Conditioned
                  </span>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


// 3. MAIN PAGE COMPONENT
export default function VenuesPage() {
  const ctaRef = useRef(null);

  // GSAP for CTA only (Venue animations are handled in the sub-component)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-container", {
        scale: 0.95, y: 30, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current, start: "top 85%", toggleActions: "play none none reverse",
        },
      });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-white min-h-screen overflow-hidden">
      
      {/* Loop through all venues dynamically */}
      {venuesData.map((venue, index) => (
        <VenueSection key={venue.id} data={venue} isFirst={index === 0} />
      ))}

      {/* ================= CTA SECTION ================= */}
      <section ref={ctaRef} className="cta-section px-6 md:px-12 py-10 md:py-20 w-full max-w-[1400px] mx-auto">
        <div className="cta-container bg-[#800000] rounded-[2rem] p-10 md:p-16 flex flex-col items-start text-left text-white shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-wide mb-3 md:mb-4 font-['Inter']">
            Planning an Event?
          </h3>
          <h2 className="font-['Inter'] text-3xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
            Schedule a visit or book your event today.
          </h2>
          
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
            Reach out to us to see how we can do it for you. Let’s join hands for a great future..
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