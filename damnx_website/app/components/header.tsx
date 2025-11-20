'use client';

import React, { useState, useEffect } from 'react';
import { Code2, Briefcase, Cpu, Mail, Menu, X, Sparkles } from 'lucide-react';
import { useSpring, animated } from 'react-spring';

export default function DAMNXHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsExpanded(false);
        setShowMobileMenu(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobile && !hasAutoExpanded && isMounted) {
      const timer = setTimeout(() => {
        setShowMobileMenu(true);
        setHasAutoExpanded(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, hasAutoExpanded, isMounted]);

  const navItems = [
    { icon: Code2, label: 'Services', href: '#services' },
    { icon: Briefcase, label: 'Projects', href: '#projects' },
    { icon: Cpu, label: 'Technology', href: '#tech' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    setIsExpanded(false);
    setShowMobileMenu(false);
    
    setTimeout(() => {
      if (href) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  };

  const desktopAnimation = useSpring({
    width: isExpanded ? '70rem' : '14rem',
    padding: isExpanded ? '1rem 2rem' : '0.75rem 1.5rem',
    config: { tension: 200, friction: 28 },
  });

  const mobileAnimation = useSpring({
    width: showMobileMenu ? 'calc(100% - 2rem)' : 'auto',
    config: { tension: 300, friction: 30 },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <></>
  );
}
