"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger so GSAP knows it exists
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const pathname = usePathname(); // 2. Get the current route

  useGSAP(() => {
    // Create a GSAP timeline tied to the ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%", 
        toggleActions: "play none none reverse", // Keep this fix so it never reverses
      },
    });

    // 1. Staggered slide-up and fade-in for the 4 main columns
    tl.fromTo(
      ".footer-col",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    )
    // 2. Playful pop-in for the social icons
    .fromTo(
      ".social-icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )
    // 3. Gentle fade-in for the bottom copyright text
    .fromTo(
      ".copyright-text",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // 3. Force ScrollTrigger to recalculate dimensions for the new page
    ScrollTrigger.refresh();

  }, { scope: footerRef, dependencies: [pathname] }); // 4. Add pathname as a dependency!

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-cover bg-center bg-no-repeat pt-16 pb-8 md:pt-20 md:pb-8 border-t-[6px] border-[#5e1927] overflow-hidden"
      style={{
        backgroundImage: "url('/Footer-bg-img.png')",
      }}
    >
      {/* Dark Overlay to make the text readable over the bokeh background */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col flex flex-col items-center sm:items-start text-center sm:text-left sm:pr-4">
            <h2 className="text-white text-3xl font-georgia font-bold tracking-wide mb-1">
              Ray Vijay Centre
            </h2>
            <p className="text-white/80 text-sm font-inter mb-6 tracking-wider">
              for Conventions
            </p>
           <p className="text-white/80 text-sm leading-relaxed font-inter max-w-xs italic">
  Crafted for Grand Occasions
</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white text-lg font-inter font-bold mb-6">Quick Links</h3>
            <ul className="flex flex-col items-center font-inter sm:items-start gap-4">
              {["Home", "About Us", "Venue/Hall", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(/[\s/]+/g, "-")}`}
                    className="text-white/80 hover:text-[#cba328] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="footer-col flex flex-col items-center sm:items-start text-center font-inter sm:text-left">
            <h3 className="text-white text-lg font-bold mb-6">Contact Us</h3>
            <ul className="flex flex-col items-center sm:items-start gap-4 text-white/80 text-sm">
              <li>Thiruvananthapuram, Kerala</li>
              <li>Phone: +91 471 2 555 555</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:rayvijaycentre@gmail.com"
                  className="hover:text-[#cba328] transition-colors"
                >
                  rayvijaycentre@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="footer-col flex flex-col items-center sm:items-start text-center font-inter sm:text-left">
            <h3 className="text-white text-lg font-bold mb-6">Follow Us</h3>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              {/* Facebook Icon */}
              <a href="#" aria-label="Facebook" className="social-icon bg-[#f0e7d8] hover:bg-[#cba328] text-black hover:text-white transition-colors p-2 rounded-full flex items-center justify-center w-8 h-8">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
              </a>

              {/* Instagram Icon */}
              <a href="#" aria-label="Instagram" className="social-icon bg-[#f0e7d8] hover:bg-[#cba328] text-black hover:text-white transition-colors p-2 rounded-full flex items-center justify-center w-8 h-8">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg>
              </a>

              {/* X (Twitter) Icon */}
              <a href="#" aria-label="X" className="social-icon bg-[#f0e7d8] hover:bg-[#cba328] text-black hover:text-white transition-colors p-2 rounded-full flex items-center justify-center w-8 h-8">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              {/* LinkedIn Icon */}
              <a href="#" aria-label="LinkedIn" className="social-icon bg-[#f0e7d8] hover:bg-[#cba328] text-black hover:text-white transition-colors p-2 rounded-full flex items-center justify-center w-8 h-8">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
<div className="copyright-text pt-8 flex justify-center font-inter text-center">
  <p className="text-white/60 text-xs md:text-sm">
    © 2026 Ray Vijay Centre for Conventions. Powered by{" "}
    <a 
      href="https://www.duvitra.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-white transition-colors"
    >
      Duvitra
    </a>.
  </p>
</div>
      </div>
    </footer>
  );
}