'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function DamnxHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load Calendly script when modal opens
    if (isCalendlyOpen && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [isCalendlyOpen]);

  const handleGetStarted = () => {
    setIsCalendlyOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl sm:text-3xl font-black tracking-wider">
              <span className="text-red-600">DAMN</span>
              <span className="text-white">X</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <button 
                onClick={handleGetStarted}
                className="bg-red-600 text-white px-5 lg:px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-red-600/50 text-sm lg:text-base"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-red-600 transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Blur Background */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav 
            className="flex flex-col items-center justify-center h-full gap-8 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleGetStarted}
              className="bg-red-600 text-white px-10 py-4 rounded-full hover:bg-red-700 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-red-600/50 mt-4"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsCalendlyOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] md:h-[80vh] relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCalendlyOpen(false)}
              className="absolute top-4 right-4 z-10 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors shadow-lg"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Calendly Inline Widget */}
            <iframe
              src="https://calendly.com/damnx-nexus/30min?hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}