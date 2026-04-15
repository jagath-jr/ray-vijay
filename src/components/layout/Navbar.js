"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  
  // States for Scroll Animation
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const pathname = usePathname();

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true);  // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { 
      name: "Venue/Hall", 
      href: "/venue", 
      hasDropdown: true,
      subLinks: [
        { name: "The Vestibules", href: "/venue/vestibules" },
        { name: "The Grand Temple", href: "/venue/grand-temple" },
        { name: "Tower Doors & Foyer", href: "/venue/tower-doors" },
      ]
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleDropdown = (name) => {
    if (activeDropdown === name) setActiveDropdown(null);
    else setActiveDropdown(name);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between pr-4 md:pr-8 lg:pr-12 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        hasScrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      
      {/* ================= LOGO AREA ================= */}
      {/* UPDATED: Removed bg-white/95 and shadow-sm so it is completely transparent 
        The background now inherits from the parent <nav>
      */}
      <div className="px-4 md:px-8 py-3 md:py-4 min-w-[120px] md:min-w-[180px] flex justify-center items-center relative z-50 bg-transparent">
        <Link href="/">
          <img 
            src="/Logo.png" 
            alt="Ray Vijay Centre For Conventions" 
            className="h-14 md:h-20 object-contain"
          />
        </Link>
      </div>

      {/* ================= DESKTOP NAVIGATION ================= */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

          return (
            <div key={index} className="relative group">
              <Link 
                href={link.href}
                className={`text-base font-serif flex items-center gap-1 transition-colors duration-300 py-2 ${
                  isActive 
                    ? "text-[#c99f36] border-b border-[#c99f36]" 
                    : "text-gray-900 hover:text-[#c99f36]"
                }`}
              >
                {link.name}
                {link.hasDropdown && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
              
              {/* Desktop Dropdown */}
              {link.hasDropdown && link.subLinks && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                  {link.subLinks.map((subLink, i) => (
                    <Link 
                      key={i} 
                      href={subLink.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c99f36] transition-colors"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP CTA BUTTON ================= */}
      <div className="hidden lg:block relative z-50">
        <button className="bg-[#cba328] hover:bg-[#b38e21] text-white text-sm font-medium px-6 py-3 rounded-md transition-colors duration-300 shadow-md">
          Book Your Event
        </button>
      </div>

      {/* ================= MOBILE HAMBURGER BUTTON ================= */}
      <div className="lg:hidden flex items-center relative z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-900 focus:outline-none p-2 bg-white/70 rounded-md backdrop-blur-md shadow-sm"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU OVERLAY & SIDE DRAWER ================= */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[85%] max-w-[350px] bg-white z-40 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] lg:hidden overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-8">
          
          <div className="flex flex-col gap-2 flex-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const isDropdownOpen = activeDropdown === link.name;

              return (
                <div key={index} className="flex flex-col border-b border-gray-100 last:border-none">
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={link.href}
                      onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                      className={`flex-1 py-4 text-xl font-serif transition-colors ${
                        isActive ? "text-[#c99f36]" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                    
                    {link.hasDropdown && (
                      <button 
                        onClick={() => toggleDropdown(link.name)}
                        className="p-4 -mr-4 text-gray-500 hover:text-[#c99f36]"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          className={`w-6 h-6 transition-transform duration-300 ${isDropdownOpen ? "-rotate-180 text-[#c99f36]" : ""}`}
                        >
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {link.hasDropdown && link.subLinks && (
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isDropdownOpen ? "max-h-[400px] opacity-100 mb-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100 ml-2">
                        {link.subLinks.map((subLink, i) => {
                          const isSubActive = pathname === subLink.href;
                          return (
                            <Link 
                              key={i} 
                              href={subLink.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`text-base py-1 ${isSubActive ? "text-[#c99f36] font-medium" : "text-gray-600"}`}
                            >
                              {subLink.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="bg-[#cba328] w-full text-white text-lg font-medium px-6 py-4 rounded-md shadow-md active:scale-[0.98] transition-transform">
              Book Your Event
            </button>
          </div>

        </div>
      </div>

    </nav>
  );
}