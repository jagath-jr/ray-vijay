"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroTextRef = useRef(null);
  const welcomeSectionRef = useRef(null);
  const spacesSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Data for the Welcome section stats
  const stats = [
    { target: 8, suffix: "", text: "Dedicated Halls" },
    { target: 25, suffix: "", text: "Years of Service" },
    { target: 3500, suffix: "", text: "Years of Service" },
    { target: 4000, suffix: "+", text: "Happy Customers" },
  ];

  // Data for the Spaces section
  const spacesData = [
    {
      title: "The Vestibules",
      description:
        "Connected to The Grand Temple, The Vestibules embody sophistication and charm. Available for exclusive hire, this remarkable space effortlessly transforms into three distinct areas using ornate dividing doors.",
      image: "/path-to-vestibules.jpg",
    },
    {
      title: "The Grand Temple",
      description:
        "Immerse yourself in the awe-inspiring grandeur of the Grand Temple featuring a meticulously handcrafted mosaic ceiling and a timeless sense of elegance.",
      image: "/path-to-temple.jpg",
    },
    {
      title: "The Tower Doors & Foyer",
      description:
        "The iconic bronze doors, a striking centrepiece in the heart of Covent Garden, are only open exclusively to invited guests. Beyond these majestic doors lies a marble entrance hall, leading to the original cloakroom.",
      image: "/path-to-foyer.jpg",
    },
  ];

  // Data for the Features section
  const featuresData = [
    {
      title: "Fully Air-Conditioned",
      description: "Climate-controlled comfort throughout all venues",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25a2.25 2.25 0 0 0 0-4.5h-3.659M5.25 13.5h8.25a2.25 2.25 0 0 1 0 4.5h-5.25" />
        </svg>
      ),
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

  // Data for the Testimonials
  const testimonialsData = [
    {
      name: "Jenny Wilson",
      company: "Grower.io",
      text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image: "/path-to-jenny.jpg",
    },
    {
      name: "Devon Lane",
      company: "DLDesign.co",
      text: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image: "/path-to-devon.jpg",
    },
  ];

  useEffect(() => {
    // 1. Hero Section Animation
    gsap.fromTo(
      heroTextRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    const ctx = gsap.context(() => {
      // 2. Welcome Section Animations
      gsap.from(".welcome-anim", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: welcomeSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Welcome Counter Animation
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

      // 4. Testimonial Section Animations
      gsap.from(".testimonial-header", {
        y: 30, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: testimonialsSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Testimonial Counter Animation (NEW)
      const testimonialCounters = gsap.utils.toArray(".testimonial-counter");
      testimonialCounters.forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute("data-target"), 10);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: targetValue, 
          duration: 2, 
          ease: "power3.out",
          onUpdate: () => { counter.innerText = Math.ceil(proxy.val); },
          scrollTrigger: { trigger: testimonialsSectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        });
      });

      gsap.from(".testimonial-card", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: ".testimonial-header", start: "top 60%", toggleActions: "play none none reverse" },
      });

      // 5. CTA Section Animation
      gsap.fromTo(ctaSectionRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ctaSectionRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-white min-h-screen overflow-hidden">
      {/* ================= HERO SECTION ================= */}
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

      {/* ================= WELCOME SECTION ================= */}
      <section ref={welcomeSectionRef} className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-[#6A2834]">
        <h2 className="welcome-anim text-3xl md:text-5xl lg:text-[52px] font-serif uppercase tracking-wide leading-tight mb-16 md:mb-24 text-left">
          Welcome to Ray Vijay <br className="hidden md:block" /> Centre for Convention.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-10 md:gap-14">
            {stats.map((stat, index) => (
              <div key={index} className="welcome-anim flex items-center gap-6 md:gap-8">
                <div className="text-6xl md:text-[80px] font-serif text-black leading-none w-[160px] md:w-[240px] text-right shrink-0 flex justify-end">
                  <span className="counter-value" data-target={stat.target}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <span className="text-xl md:text-3xl font-serif text-[#6A2834] leading-snug">
                  {stat.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start pt-4 md:pt-2 lg:pl-10">
            <h3 className="welcome-anim text-lg md:text-xl font-bold uppercase tracking-widest mb-6 leading-snug">
              An exquisite art deco icon nestled in the heart of Covent Garden.
            </h3>
            <p className="welcome-anim text-base md:text-lg mb-10 leading-relaxed font-light text-[#6A2834]/90">
              This Grade II* listed venue is a masterpiece of timeless elegance, showcasing breathtaking architecture and opulent interiors. From the awe-inspiring mosaic ceilings of the Grand Temple to the enchanting intimacy of its unique spaces, every corner of this historic landmark tells a story of grandeur and heritage. Whether you&apos;re hosting a grand event or an intimate gathering, 60 Great Queen Street promises an unforgettable experience from the moment you step inside.
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
          <div className="flex-1 bg-[#5e1927] w-full"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
          <h2 className="spaces-title text-[#6A2834] text-2xl md:text-3xl lg:text-4xl font-serif uppercase tracking-widest mb-10 md:mb-16">
            Spaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {spacesData.map((space, index) => (
              <div key={index} className="space-card flex flex-col group cursor-pointer">
                <div className="w-full aspect-[3/4] md:aspect-[2/3] overflow-hidden bg-gray-200">
                  <img src={space.image} alt={space.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pt-8 pb-4 pr-4">
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif mb-4">{space.title}</h3>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">{space.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center mt-8 md:mt-16">
            <button className="spaces-btn border border-white/40 text-white bg-white/5 hover:bg-white/20 backdrop-blur-sm text-xs md:text-sm font-bold uppercase tracking-[0.2em] py-4 px-10 transition-colors duration-300">
              View All Spaces
            </button>
          </div>

          {/* Features Box */}
          <div className="features-container mt-20 md:mt-32 border border-white/20 py-12 px-6 lg:px-12 rounded-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 text-center">
              {featuresData.map((feature, index) => (
                <div key={index} className="feature-card flex flex-col items-center">
                  <div className="text-[#c99f36] mb-4">{feature.icon}</div>
                  <h4 className="text-white text-lg md:text-xl font-bold mb-3 tracking-wide">{feature.title}</h4>
                  <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-[250px]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section ref={testimonialsSectionRef} className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="testimonial-header mb-16 md:mb-24">
          <p className="text-[#6A2834] text-lg md:text-xl font-serif mb-4">
            {/* Added the dynamic counter span here */}
            <span className="testimonial-counter" data-target="3940">0</span>+ Happy Landingfolio Users
          </p>
          <h2 className="text-[#6A2834] text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide">
            Don&apos;t just take our words
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 text-left">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="testimonial-card flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
              {/* Profile Image */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1 text-center sm:text-left">
                {/* 5 Stars SVG */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-4 text-[#c99f36]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-black text-base md:text-lg font-medium leading-relaxed mb-6">
                  &quot;{testimonial.text}&quot;
                </p>
                {/* Author Info */}
                <p className="text-sm md:text-base font-bold text-black">
                  {testimonial.name} <span className="text-gray-400 font-normal ml-2">{testimonial.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="px-6 md:px-12 pb-20 md:pb-32 max-w-[1200px] mx-auto">
        <div 
          ref={ctaSectionRef} 
          className="bg-[#5e1927] rounded-[2rem] p-10 md:p-16 flex flex-col items-start text-left text-white shadow-2xl relative overflow-hidden"
        >
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
            {/* Arrow Circle SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

    </main>
  );
}