'use client';
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-red-900/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-3xl font-bold mb-4">
              <span className="text-red-500">DAMNX</span>
              <span className="text-white font-light"> Solutions</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technology and innovative design.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Mobile Apps</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">E-Commerce</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">UI/UX Design</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Custom Software</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <a href="mailto:hello@damnx.com" className="text-gray-400 hover:text-red-500 transition-colors">
                  hello@damnx.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-red-500 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Tech Street, Silicon Valley, CA 94000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-red-900/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              © 2024 DAMNX Solutions. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        footer {
          backdrop-filter: blur(30px);
          background: rgba(10, 10, 10, 0.8);
        }
      `}</style>
    </footer>
  );
};

export default Footer;