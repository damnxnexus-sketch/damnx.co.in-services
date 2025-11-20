'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, Zap, Shield, Globe, ArrowRight, Sparkles, Rocket, Users } from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const DamnxLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{ scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const heroTextRef = useRef(null);
  const heroSubtextRef = useRef(null);
  const heroDescRef = useRef(null);

  // GSAP Hero Animations
  useEffect(() => {
    if (!heroTextRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Fade in for main heading without bounce
    tl.from(heroTextRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    });

    // Animate subtext
    tl.from(heroSubtextRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.9,
    }, '-=0.6');

    // Animate description
    tl.from(heroDescRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.5');

  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sceneRef.current = { scene, camera, renderer };

    // Particle System - More visible
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Spread particles in a sphere around camera
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 20;
      
      // Bright red/orange colors
      colors[i3] = 1.0;
      colors[i3 + 1] = Math.random() * 0.3;
      colors[i3 + 2] = Math.random() * 0.1;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create large 3D geometric objects
    const geometries = [];

    // Large Torus 1
    const torusGeo1 = new THREE.TorusGeometry(3, 0.3, 16, 100);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const torus1 = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.position.set(-5, 3, -10);
    scene.add(torus1);
    geometries.push(torus1);

    // Large Torus 2
    const torusGeo2 = new THREE.TorusGeometry(2.5, 0.25, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.position.set(6, -4, -15);
    torus2.rotation.x = Math.PI / 3;
    scene.add(torus2);
    geometries.push(torus2);

    // Large Octahedron
    const octaGeo = new THREE.OctahedronGeometry(2, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(4, 5, -8);
    scene.add(octa);
    geometries.push(octa);

    // Large Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.5, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-6, -5, -12);
    scene.add(ico);
    geometries.push(ico);

    // Multiple smaller octahedrons floating
    for (let i = 0; i < 8; i++) {
      const size = 0.5 + Math.random() * 1;
      const smallOctaGeo = new THREE.OctahedronGeometry(size, 0);
      const smallOctaMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xdc2626 : 0xf97316,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const smallOcta = new THREE.Mesh(smallOctaGeo, smallOctaMat);
      smallOcta.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        -5 - Math.random() * 20
      );
      scene.add(smallOcta);
      geometries.push(smallOcta);
    }

    // Tetrahedrons
    for (let i = 0; i < 6; i++) {
      const tetraGeo = new THREE.TetrahedronGeometry(0.8 + Math.random() * 0.7, 0);
      const tetraMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        wireframe: true,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.3
      });
      const tetra = new THREE.Mesh(tetraGeo, tetraMat);
      tetra.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        -8 - Math.random() * 15
      );
      scene.add(tetra);
      geometries.push(tetra);
    }

    // Large sphere wireframe in background
    const sphereGeo = new THREE.SphereGeometry(5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(0, 0, -25);
    scene.add(sphere);
    geometries.push(sphere);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.0005;
      
      // Rotate particles slowly
      particles.rotation.y = time * 0.1;
      particles.rotation.x = Math.sin(time * 0.5) * 0.2;
      
      // Animate all geometric objects
      geometries.forEach((obj, index) => {
        obj.rotation.x += 0.003 + (index * 0.0002);
        obj.rotation.y += 0.002 + (index * 0.0003);
        
        // Floating motion
        obj.position.y += Math.sin(time + index) * 0.01;
      });
      
      // Camera movement based on scroll (smoother)
      const targetY = -(scrollY * 0.003);
      camera.position.y += (targetY - camera.position.y) * 0.05;
      
      // Mouse parallax (smoother)
      const targetX = mousePos.x * 2;
      const targetCamY = -mousePos.y * 2;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.lookAt(targetX * 0.5, targetCamY * 0.5 + camera.position.y, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup
      geometries.forEach(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      
      particles.geometry.dispose();
      particles.material.dispose();
      renderer.dispose();
    };
  }, []);

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
      title: "Custom Software Development",
      description: "Enterprise-grade solutions built with cutting-edge technologies and industry best practices",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Cloud Infrastructure",
      description: "Scalable, secure cloud architecture designed for high-performance applications",
      color: "from-red-600 to-pink-500"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Security Solutions",
      description: "Advanced cybersecurity measures to protect your critical business assets",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Global Integration",
      description: "Seamless integration with worldwide systems and compliance standards",
      color: "from-pink-500 to-red-500"
    }
  ];

  const features = [
    { icon: <Sparkles className="w-6 h-6" />, text: "Clean Code Architecture" },
    { icon: <Rocket className="w-6 h-6" />, text: "Lightning Fast Performance" },
    { icon: <Users className="w-6 h-6" />, text: "Agile Development" },
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "50+", label: "Countries Served" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="bg-black text-white overflow-hidden relative">
      {/* Three.js Canvas - Now more visible */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ 
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, #0a0000 0%, #000000 100%)'
        }}
      />

      {/* Content overlay */}
      <div className="relative" style={{ zIndex: 2 }}>
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

          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
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
            transform: translateY(-15px) rotateX(10deg) scale(1.03);
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
            box-shadow: 0 0 40px rgba(220, 38, 38, 0.9), 0 0 80px rgba(220, 38, 38, 0.6), 0 0 120px rgba(220, 38, 38, 0.3);
          }

          .text-shadow-glow {
            text-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 80px rgba(220, 38, 38, 0.4);
          }

          .floating {
            animation: float 6s ease-in-out infinite;
          }

          .pulse-glow {
            animation: pulse 3s ease-in-out infinite;
          }

                  /* Dynamic Island Navigation */
          .nav-island {
            transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
            max-width: calc(100% - 32px);
            margin: 0 auto;
            width: 100%;
            background-color: rgba(10, 10, 10, 0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            position: relative;
            transform-style: preserve-3d;
            border-radius: 9999px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }


          .nav-island::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 999px;
            padding: 1px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
            -webkit-mask: 
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            mask:
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }

          .nav-island.collapsed {
            max-width: 240px;
          }

          .nav-island.expanded {
            max-width: 1200px;
          }

          .nav-content {
            transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-4px);
            pointer-events: none;
          }

          .nav-content.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: all;
          }

          /* Dynamic Island Text Container */
          .nav-text-container {
            white-space: nowrap;
            overflow: visible;
            position: relative;
            z-index: 10;
          }

          .nav-text-content {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            transform: translateZ(0);
            position: relative;
          }

          .nav-logo {
            position: relative;
            z-index: 20;
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .nav-logo.expanded {
            transform: translateX(0);
          }

          .nav-logo.collapsed {
            transform: translateX(0);
          }

          @media (max-width: 768px) {
            .nav-island {
              max-width: calc(100% - 24px);
            }

            .nav-island.collapsed {
              max-width: 200px;
            }
          }

          /* Character split animation */
          .char {
            display: inline-block;
            transform-origin: center;
          }

          /* Masked Text Effect */
          .masked-text {
            background-image: url('https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-size: 200%;
            background-position: 0% 50%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: animate-background 8s infinite alternate linear;
            position: relative;
          }

          @keyframes animate-background {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }

          /* Hero Section proper spacing */
          .hero-section {
            padding-top: 120px;
            min-height: 100vh;
          }

          @media (max-width: 768px) {
            .hero-section {
              padding-top: 140px;
            }
          }
        `}</style>

        {/* Hero Section */}
        <section className="hero-section relative flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center px-6 max-w-6xl w-full">
            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="feature-badge glass-card px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-red-600/10 transition-all">
                  <span className="text-red-500">{feature.icon}</span>
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-10 leading-none" ref={heroTextRef}>
              <span className="masked-text block mb-2">
                DAMNX
              </span>
              <span className="text-white block">
                <span className='text-red-700'>S</span>olution<span className="text-red-500">'</span><span className='text-red-700'>s</span> 
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light leading-relaxed px-4" ref={heroSubtextRef}>
              Building <span className="text-red-500 font-semibold">industry-level software</span> solutions with uncompromising coding standards
            </p>

            <p className="text-base sm:text-lg text-gray-400 mb-14 max-w-2xl mx-auto px-4" ref={heroDescRef}>
              We craft cutting-edge digital products that transform businesses worldwide with precision, performance, and unparalleled quality
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 mb-20">
              <button className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 rounded-full font-bold text-base sm:text-lg transition-all glow-red hover:glow-red-strong transform hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 sm:px-10 py-4 sm:py-5 glass-card hover:bg-red-600/10 rounded-full font-bold text-base sm:text-lg transition-all border-2 border-red-500/50 hover:border-red-500 w-full sm:w-auto">
                View Our Work
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Scroll to explore</span>
            <ChevronDown className="w-8 h-8 text-red-500 " />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-32 sm:py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 observe">
                Our <span className="gradient-text">Expertise</span>
              </h2>
              <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto observe leading-relaxed px-4">
                Delivering world-class software solutions that drive digital transformation and business growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <div key={index} className="service-card observe perspective-card group">
                  <div className="glass-card rounded-2xl p-8 sm:p-10 h-full hover:border-red-500/50 transition-all relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6 glow-red floating`}>
                        {service.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
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

        {/* Stats Section */}
        <section className="relative py-24 sm:py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card observe text-center group">
                  <div className="glass-card rounded-2xl p-6 sm:p-8 hover:border-red-500/50 transition-all">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform pulse-glow">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
          <div className="relative max-w-5xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 observe leading-tight px-4">
              Ready to Build<br />
              <span className="gradient-text">Something Amazing?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 mb-12 observe max-w-3xl mx-auto leading-relaxed px-4">
              Let's transform your vision into reality with cutting-edge technology and exceptional craftsmanship
            </p>
            <button className="observe group px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-full font-bold text-lg sm:text-xl transition-all glow-red-strong transform hover:scale-105 flex items-center gap-3 mx-auto">
              Start Your Journey
              <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-red-900/20 py-12 sm:py-16 px-6 glass-strong">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-red-500">DAMNX</span>
                <span className="text-white font-light"> Solutions</span>
              </div>
              <p className="text-gray-400 text-base sm:text-lg mb-6">Building the future, one line of code at a time</p>
              <div className="flex justify-center gap-4 sm:gap-6 text-gray-500 flex-wrap">
                <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
                <a href="#" className="hover:text-red-500 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-red-500 transition-colors">GitHub</a>
                <a href="#" className="hover:text-red-500 transition-colors">Dribbble</a>
              </div>
            </div>
            <div className="text-center text-gray-600 text-xs sm:text-sm pt-8 border-t border-red-900/10">
              © 2024 DAMNX Solutions. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DamnxLanding;