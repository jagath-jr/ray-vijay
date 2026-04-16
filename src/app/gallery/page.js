"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const mainRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All Events");

  // Category List
  const categories = [
    "All Events",
    "Weddings",
    "Corporate Events",
    "Receptions",
    "Conferences"
  ];

  // Dummy data for gallery images (Assigning categories for the filter to work)
  const galleryImages = [
    { id: 1, src: "/path-to-image-1.jpg", category: "Weddings" },
    { id: 2, src: "/path-to-image-2.jpg", category: "Receptions" },
    { id: 3, src: "/path-to-image-3.jpg", category: "Weddings" },
    { id: 4, src: "/path-to-image-4.jpg", category: "Corporate Events" },
    { id: 5, src: "/path-to-image-5.jpg", category: "Conferences" },
    { id: 6, src: "/path-to-image-6.jpg", category: "Weddings" },
    { id: 7, src: "/path-to-image-7.jpg", category: "Receptions" },
    { id: 8, src: "/path-to-image-8.jpg", category: "Weddings" },
    { id: 9, src: "/path-to-image-9.jpg", category: "Corporate Events" },
  ];

  // Filter logic
  const filteredImages = activeCategory === "All Events" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Initial Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".gallery-header > *", {
        y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1
      });

      // Filter Bar Animation
      gsap.from(".filter-bar", {
        y: 20, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.3
      });

      // CTA Animation
      gsap.from(".cta-container", {
        scale: 0.95, y: 30, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 85%", toggleActions: "play none none reverse" }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Re-animate images every time the category changes
  useEffect(() => {
    gsap.fromTo(
      ".gallery-item",
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <main ref={mainRef} className="bg-white min-h-screen overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <section className="gallery-header pt-32 md:pt-48 pb-10 md:pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif text-[#6A2834] mb-4 md:mb-6">
          Our Gallery
        </h1>
        <p className="text-[#6A2834]/80 text-lg md:text-2xl font-serif tracking-wide">
          Moments of magnificence captured in timeless elegance
        </p>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="filter-bar w-full bg-[#fcfaf7] py-6 md:py-8 px-4 md:px-12 mb-12 md:mb-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <span className="text-sm font-bold text-gray-800 uppercase tracking-widest mr-0 md:mr-4">
            Browse by Category:
          </span>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs md:text-sm font-medium border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#cba328] border-[#cba328] text-white shadow-md" // Active state
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#cba328] hover:text-[#cba328]" // Inactive state
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMAGE GRID ================= */}
      <section className="px-6 md:px-12 pb-20 md:pb-32 max-w-[1400px] mx-auto min-h-[50vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item w-full aspect-square overflow-hidden bg-gray-100 group cursor-pointer relative"
              >
                <img 
                  src={image.src} 
                  alt={image.category} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Optional: Hover overlay to show category name */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm tracking-widest uppercase font-medium">
                    {image.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            // Empty state fallback just in case a category has no images
            <div className="col-span-full py-20 text-center text-gray-500 font-serif text-xl">
              No images found for this category.
            </div>
          )}
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

          <button className="bg-white text-[#5e1927] flex items-center gap-3 text-sm md:text-base font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg">
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