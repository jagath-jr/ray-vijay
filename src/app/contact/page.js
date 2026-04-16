"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const mainRef = useRef(null);
  
  // State for the FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // FAQ Data
  const faqs = [
    {
      question: "What is the booking process?",
      answer: "Contact us to schedule a venue visit, discuss your requirements, and receive a customized quote. Once confirmed, we'll guide you through the booking process."
    },
    {
      question: "Do you provide catering services?",
      answer: "Yes, we offer both in-house premium catering services and allow external caterers based on your preferences."
    },
    {
      question: "What are the payment terms?",
      answer: "We require an advance booking amount, with the balance payable before the event. Flexible payment plans are available."
    },
    {
      question: "Can we customize the venue setup?",
      answer: "Absolutely! Our venues are highly flexible and can be customized to match your event theme and requirements."
    },
    {
      question: "Is parking available for guests?",
      answer: "Yes, we have spacious parking facilities that can accommodate over 500 vehicles with valet services available."
    },
    {
      question: "What AV equipment is provided?",
      answer: "All venues come equipped with state-of-the-art sound systems, projectors, LED screens, and professional lighting."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".contact-header > *", {
        y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1
      });

      // Top Cards Animation
      gsap.from(".info-card", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ".top-cards-section", start: "top 80%", toggleActions: "play none none reverse" }
      });

      // Split Section Animation (Sidebar & Form)
      gsap.from(".sidebar-card", {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: ".main-contact-section", start: "top 75%", toggleActions: "play none none reverse" }
      });
      
      gsap.from(".form-container", {
        x: 40, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".main-contact-section", start: "top 75%", toggleActions: "play none none reverse" }
      });

      // FAQ Animation
      gsap.from(".faq-header > *", {
        y: 30, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".faq-section", start: "top 85%", toggleActions: "play none none reverse" }
      });

      gsap.from(".faq-item", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 80%", toggleActions: "play none none reverse" }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-white min-h-screen overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <section className="contact-header pt-32 md:pt-48 pb-10 md:pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif text-[#6A2834] mb-4 md:mb-6">
          Get In Touch
        </h1>
        <p className="text-[#6A2834]/80 text-lg md:text-2xl font-serif tracking-wide">
          Let us help you create an unforgettable celebration
        </p>
      </section>

      {/* Background Wrapper for Contact Content */}
      <div className="bg-[#fdfaf6] py-16 md:py-24">
        
        {/* ================= TOP INFO CARDS ================= */}
        <section className="top-cards-section px-6 md:px-12 max-w-[1400px] mx-auto mb-16 md:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Call Us */}
            <div className="info-card bg-white p-8 md:p-10 rounded-xl shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#fdfaf6] flex items-center justify-center text-[#cba328] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-600 text-sm mb-1">+91 471 XXX XXXX</p>
              <p className="text-gray-600 text-sm mb-4">+91 471 YYY YYYY</p>
              <p className="text-gray-400 text-xs">Mon - Sun: 9:00 AM - 9:00 PM</p>
            </div>

            {/* Email Us */}
            <div className="info-card bg-white p-8 md:p-10 rounded-xl shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#fdfaf6] flex items-center justify-center text-[#cba328] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600 text-sm mb-1">info@rayvijaycenter.com</p>
              <p className="text-gray-600 text-sm mb-4">events@rayvijaycenter.com</p>
              <p className="text-gray-400 text-xs">We&apos;ll respond within 24 hours</p>
            </div>

            {/* Visit Us */}
            <div className="info-card bg-white p-8 md:p-10 rounded-xl shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#fdfaf6] flex items-center justify-center text-[#cba328] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Us</h3>
              <p className="text-gray-600 text-sm mb-1">Ray Vijay Centre</p>
              <p className="text-gray-600 text-sm mb-4">Thiruvananthapuram, Kerala</p>
              <p className="text-gray-400 text-xs">India - 695001</p>
            </div>

            {/* Working Hours */}
            <div className="info-card bg-white p-8 md:p-10 rounded-xl shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#fdfaf6] flex items-center justify-center text-[#cba328] mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Working Hours</h3>
              <p className="text-gray-600 text-sm mb-1">Monday - Sunday</p>
              <p className="text-gray-600 text-sm mb-4">9:00 AM - 9:00 PM</p>
              <p className="text-gray-400 text-xs">Open all days</p>
            </div>

          </div>
        </section>

        {/* ================= MAIN SPLIT SECTION (Sidebar & Form) ================= */}
        <section className="main-contact-section px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* LEFT SIDEBAR */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              
              {/* Find Us Card */}
              <div className="sidebar-card bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-[#cba328]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M3.464 7.61a.75.75 0 011.06 0l5.25 5.25a.75.75 0 01-1.06 1.06l-4.72-4.72v9.05a.75.75 0 01-1.5 0V9.2l-4.72 4.72a.75.75 0 01-1.06-1.06l5.25-5.25zm16.5-4.5a.75.75 0 00-1.06 0L13.654 8.36a.75.75 0 001.06 1.06l4.72-4.72v10.55a.75.75 0 001.5 0V4.7l4.72 4.72a.75.75 0 001.06-1.06l-5.25-5.25z" clipRule="evenodd" /></svg>
                  </span>
                  Find Us
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Ray Vijay Centre for Conventions<br/>
                  Thiruvananthapuram, Kerala<br/>
                  India - 695001
                </p>
                <button className="w-full bg-[#cba328] hover:bg-[#b38e21] text-white font-medium py-3 rounded-md transition-colors shadow-md">
                  Get Directions
                </button>
              </div>

              {/* Quick Information Card */}
              <div className="sidebar-card bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-[#cba328]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 011.08.853l-2.016 8.064c-.31 1.243-1.601 2.279-2.747 1.706l-4.437-2.218a.75.75 0 01.67-1.342l4.437 2.218c.382.19.81-.137.708-.55l-2.015-8.064a.75.75 0 011.08-.853l.042-.02-.71-2.836c-.102-.413.326-.74.708-.55l4.437 2.218a.75.75 0 11-.67 1.342l-4.437-2.218zM12 6.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" /></svg>
                  </span>
                  Quick Information
                </h3>
                
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Venue Capacity</p>
                    <p className="text-gray-800 font-medium">50 - 2000 guests</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Parking Spaces</p>
                    <p className="text-gray-800 font-medium">500+ vehicles</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Total Venues</p>
                    <p className="text-gray-800 font-medium">6 premium spaces</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Catering</p>
                    <p className="text-gray-800 font-medium">In-house & external</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT FORM AREA */}
            <div className="form-container w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
              <p className="text-[#cba328] text-sm font-bold uppercase tracking-widest mb-2">Send us a Message</p>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Book Your Dream Event</h2>
              <p className="text-gray-500 mb-8 font-light">Fill out the form below and our event specialists will get back to you shortly</p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX" 
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full"
                    required
                  />
                </div>

                {/* Event Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Event Type *</label>
                  <select className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full bg-white text-gray-500" required>
                    <option value="" disabled selected>Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="exhibition">Exhibition</option>
                    <option value="party">Private Party</option>
                  </select>
                </div>

                {/* Event Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Event Date</label>
                  <input 
                    type="date" 
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full text-gray-500"
                  />
                </div>

                {/* Number of Guests */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Number of Guests</label>
                  <input 
                    type="number" 
                    placeholder="Approximate guest count" 
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full"
                  />
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    rows="5"
                    placeholder="Tell us about your event requirements, preferences, or any questions you have..." 
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#cba328] focus:ring-1 focus:ring-[#cba328] w-full resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-4">
                  <button type="submit" className="w-full bg-[#8b1820] hover:bg-[#6A2834] text-white font-bold py-4 rounded-md transition-colors shadow-lg">
                    Send Message
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1">
                    <span className="text-[#cba328]">🛡️</span> Your information is secure and confidential
                  </p>
                </div>

              </form>
            </div>

          </div>
        </section>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <section className="faq-section bg-[#faf7f2] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="faq-header text-center mb-12 md:mb-16">
            <p className="text-[#cba328] text-sm font-bold uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 font-light">Find answers to common questions about our venues and services</p>
          </div>

          <div className="faq-list flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="faq-item bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className={`font-medium text-lg transition-colors ${isOpen ? 'text-[#6A2834]' : 'text-gray-800'}`}>
                      {faq.question}
                    </span>
                    <span className={`text-[#cba328] text-2xl font-light transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out px-6 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </main>
  );
}