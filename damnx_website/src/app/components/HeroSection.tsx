'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, Zap, Shield, Globe, ArrowRight, Award, Rocket, Users, CheckCircle, Star } from 'lucide-react';

const DamnxLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroTextRef = useRef(null);
  const heroSubtextRef = useRef(null);
  const heroDescRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 2 - 1, 
        y: (e.clientY / window.innerHeight) * 2 - 1 
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.observe').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      title: "Custom Web Development",
      description: "Stunning, high-performance websites built with modern frameworks. Responsive, SEO-optimized, and tailored to your brand.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Mobile App Development",
      description: "Native iOS and Android apps that deliver exceptional user experiences. Fast, intuitive, and built to scale.",
      color: "from-red-600 to-pink-500"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "E-Commerce Solutions",
      description: "Complete online store development with secure payment integration, inventory management, and seamless checkout.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "UI/UX Design",
      description: "Beautiful, user-centered designs that convert visitors into customers. Research-driven and pixel-perfect.",
      color: "from-pink-500 to-red-500"
    }
  ];

  const features = [
    { icon: <Award className="w-6 h-6" />, text: "Premium Quality Code" },
    { icon: <Rocket className="w-6 h-6" />, text: "On-Time Delivery" },
    { icon: <Users className="w-6 h-6" />, text: "Dedicated Support" },
  ];

  const stats = [
    { value: "150+", label: "Happy Clients" },
    { value: "300+", label: "Projects Completed" },
    { value: "5-Star", label: "Client Rating" },
    { value: "100%", label: "Satisfaction Rate" }
  ];

  const process = [
    { step: "01", title: "Discovery", desc: "We understand your vision, goals, and requirements" },
    { step: "02", title: "Design", desc: "Create stunning mockups and user experiences" },
    { step: "03", title: "Development", desc: "Build with clean code and best practices" },
    { step: "04", title: "Launch", desc: "Deploy and provide ongoing support" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "DAMNX delivered our e-commerce platform ahead of schedule. The quality is exceptional and our sales increased by 200%!",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "FinanceHub",
      text: "The mobile app they built is incredibly smooth. Our users love it and we've seen amazing retention rates.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "DesignCo",
      text: "Professional, creative, and highly skilled. DAMNX transformed our website into a conversion machine.",
      rating: 5
    }
  ];

  return (
    <div className="bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(220, 38, 38, 0.3) 0%, transparent 50%)`,
            transition: 'background-image 0.3s ease'
          }}
        ></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-in {
            animation: fadeInUp 1s ease-out forwards;
          }

          .gradient-text {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f97316 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .glass-card {
            background: rgba(10, 10, 10, 0.6);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(220, 38, 38, 0.2);
          }

          .glass-strong {
            background: rgba(10, 10, 10, 0.8);
            backdrop-filter: blur(30px);
            border: 1px solid rgba(220, 38, 38, 0.3);
          }

          .perspective-card {
            transform-style: preserve-3d;
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .perspective-card:hover {
            transform: translateY(-15px) rotateX(5deg) scale(1.03);
          }

          .service-card {
            opacity: 0;
            transform: translateY(40px);
          }

          .service-card.animate-in {
            animation: fadeInUp 1s ease-out forwards;
          }

          .service-card:nth-child(1) { animation-delay: 0.1s; }
          .service-card:nth-child(2) { animation-delay: 0.2s; }
          .service-card:nth-child(3) { animation-delay: 0.3s; }
          .service-card:nth-child(4) { animation-delay: 0.4s; }

          .stat-card {
            opacity: 0;
          }

          .stat-card.animate-in {
            animation: scaleIn 0.8s ease-out forwards;
          }

          .stat-card:nth-child(1) { animation-delay: 0.1s; }
          .stat-card:nth-child(2) { animation-delay: 0.2s; }
          .stat-card:nth-child(3) { animation-delay: 0.3s; }
          .stat-card:nth-child(4) { animation-delay: 0.4s; }

          .feature-badge {
            opacity: 0;
            animation: slideInLeft 0.8s ease-out forwards;
          }

          .feature-badge:nth-child(1) { animation-delay: 0.5s; }
          .feature-badge:nth-child(2) { animation-delay: 0.7s; }
          .feature-badge:nth-child(3) { animation-delay: 0.9s; }

          .glow-red {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4);
          }

          .glow-red-strong {
            box-shadow: 0 0 40px rgba(220, 38, 38, 0.9), 0 0 80px rgba(220, 38, 38, 0.6);
          }

          .floating {
            animation: float 6s ease-in-out infinite;
          }

          .hero-section {
            padding-top: 80px;
            min-height: 100vh;
          }
        `}</style>

        {/* Hero Section */}
        <section className="hero-section relative flex items-center justify-center overflow-hidden px-4">
          <div className="relative z-10 text-center max-w-6xl w-full">
            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="feature-badge glass-card px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-red-600/10 transition-all">
                  <span className="text-red-500">{feature.icon}</span>
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight" ref={heroTextRef}>
              <span className="gradient-text block mb-2">
                Premium Software
              </span>
              <span className="text-white block">
                That Drives Results
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto font-light leading-relaxed" ref={heroSubtextRef}>
              We build <span className="text-red-500 font-semibold">stunning websites & apps</span> that transform your business
            </p>

            <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-2xl mx-auto" ref={heroDescRef}>
              From concept to launch, we deliver exceptional digital products with clean code, beautiful design, and measurable results
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group px-10 py-5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 rounded-full font-bold text-lg transition-all glow-red hover:glow-red-strong transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center">
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 glass-card hover:bg-red-600/10 rounded-full font-bold text-lg transition-all border-2 border-red-500/50 hover:border-red-500 w-full sm:w-auto">
                View Portfolio
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No Upfront Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free Maintenance</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Scroll to explore</span>
            <ChevronDown className="w-8 h-8 text-red-500" />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 observe">
                What We <span className="gradient-text">Build</span>
              </h2>
              <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto observe leading-relaxed">
                Professional software development services that bring your vision to life
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="service-card observe perspective-card group">
                  <div className="glass-card rounded-2xl p-10 h-full hover:border-red-500/50 transition-all relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 glow-red floating`}>
                        {service.icon}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-red-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 observe">
                Our <span className="gradient-text">Process</span>
              </h2>
              <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto observe">
                A proven approach to deliver exceptional results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={index} className="observe text-center group">
                  <div className="glass-card rounded-2xl p-8 hover:border-red-500/50 transition-all">
                    <div className="text-6xl font-black gradient-text mb-4 group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card observe text-center group">
                  <div className="glass-card rounded-2xl p-8 hover:border-red-500/50 transition-all">
                    <div className="text-5xl sm:text-6xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-lg font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 observe">
                Client <span className="gradient-text">Success</span>
              </h2>
              <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto observe">
                Hear from businesses we've helped grow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="observe perspective-card">
                  <div className="glass-card rounded-2xl p-8 h-full hover:border-red-500/50 transition-all">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-40 px-6 overflow-hidden">
          <div className="relative max-w-5xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 observe leading-tight">
              Ready to Build Your<br />
              <span className="gradient-text">Dream Project?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 mb-12 observe max-w-3xl mx-auto leading-relaxed">
              Let's discuss your vision and create something extraordinary together
            </p>
            <button className="observe group px-12 py-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-full font-bold text-xl transition-all glow-red-strong transform hover:scale-105 flex items-center gap-3 mx-auto">
              Get Started Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DamnxLanding;