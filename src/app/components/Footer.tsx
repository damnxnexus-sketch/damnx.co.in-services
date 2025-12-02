'use client';
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-red-900/20 backdrop-blur-3xl" style={{ background: 'rgba(10, 10, 10, 0.8)' }}>
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
            
              <a href="https://www.linkedin.com/in/damnx-solutions-280b3938b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/damnx_solutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
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
         

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <a href="mailto:hello@damnx.com" className="text-gray-400 hover:text-red-500 transition-colors">
                  damnx.nexus@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-red-500 transition-colors">
                  +91 6388037374
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Ahmedabad, Gujarat, India
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
    </footer>
  );
};

export default Footer;
