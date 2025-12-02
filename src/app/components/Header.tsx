'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function DamnxHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-black tracking-wider">
            <span className="text-red-600">DAMN</span>
            <span className="text-white">X</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              About
            </a>
            <a href="#services" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Services
            </a>
            <a href="#contact" className="text-white hover:text-red-600 transition-colors duration-300 font-medium">
              Contact
            </a>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-red-600/50">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-red-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 flex flex-col gap-4">
            <a href="#home" className="text-white hover:text-red-600 transition-colors duration-300 font-medium py-2">
              Home
            </a>
            <a href="#about" className="text-white hover:text-red-600 transition-colors duration-300 font-medium py-2">
              About
            </a>
            <a href="#services" className="text-white hover:text-red-600 transition-colors duration-300 font-medium py-2">
              Services
            </a>
            <a href="#contact" className="text-white hover:text-red-600 transition-colors duration-300 font-medium py-2">
              Contact
            </a>
            <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold mt-2">
              Get Started
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}