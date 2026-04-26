"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WelcomeSection({ stats }) {
  const welcomeSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, welcomeSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={welcomeSectionRef} className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-[#6A2834]">
      {/* Paste the HTML content for your Welcome Section here */}
      {/* Example: */}
      <h2 className="welcome-anim text-3xl md:text-5xl lg:text-[52px] font-serif uppercase tracking-wide leading-tight mb-16 md:mb-24 text-left">
        Welcome to Ray Vijay <br className="hidden md:block" /> Centre for Convention.
      </h2>
      {/* ... rest of the welcome section ... */}
    </section>
  );
}