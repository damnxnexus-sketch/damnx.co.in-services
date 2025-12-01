'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, Zap, Shield, Globe, ArrowRight, Sparkles, Rocket, Users, FileCode, TestTube, Layers, Cloud, Database, Lock, CheckCircle, X, MessageCircle, Calendar } from 'lucide-react';
import * as THREE from 'three';

const DamnxLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Load Calendly script
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/damnx-nexus/30min',
          text: 'Schedule time with us',
          color: '#dc2626',
          textColor: '#ffffff',
          branding: true
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometries: any[] = [];

    // Red dot stars
    const starGroup = new THREE.Group();
    const starCount = 3000;
    for (let i = 0; i < starCount; i++) {
      const starGeo = new THREE.CircleGeometry(0.05 + Math.random() * 0.1, 8);
      const starMat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.3 ? 0xef4444 : 0xf97316,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.7
      });
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        -5 - Math.random() * 40
      );
      star.userData = {
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2
      };
      starGroup.add(star);
    }
    scene.add(starGroup);
    geometries.push(starGroup);

    // Grid Floor System
    const gridHelper = new THREE.GridHelper(60, 60, 0xdc2626, 0x3a0000);
    gridHelper.position.y = -8;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    geometries.push(gridHelper);

    // Large Torus 1
    const torusGeo1 = new THREE.TorusGeometry(4, 0.4, 16, 100);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const torus1 = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.position.set(-8, 4, -15);
    scene.add(torus1);
    geometries.push(torus1);

    // Large Torus 2
    const torusGeo2 = new THREE.TorusGeometry(3.5, 0.3, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.position.set(10, -6, -20);
    torus2.rotation.x = Math.PI / 3;
    scene.add(torus2);
    geometries.push(torus2);

    // Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(2.5, 0.6, 100, 16);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(0, 2, -25);
    scene.add(torusKnot);
    geometries.push(torusKnot);

    // DNA Helix Structure
    const helixGroup = new THREE.Group();
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 6;
      const y = i * 0.6 - 12;
      const x = Math.cos(angle) * 3;
      const z = Math.sin(angle) * 3 - 18;

      const sphereGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xef4444 : 0xf97316,
        wireframe: true,
        transparent: true,
        opacity: 0.7
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(x, y, z);
      helixGroup.add(sphere);
    }
    scene.add(helixGroup);
    geometries.push(helixGroup);

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-10, -8, -18);
    scene.add(ico);
    geometries.push(ico);

    // Floating Cubes Network
    for (let i = 0; i < 15; i++) {
      const cubeSize = 0.4 + Math.random() * 0.6;
      const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const edges = new THREE.EdgesGeometry(cubeGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xef4444 : i % 3 === 1 ? 0xdc2626 : 0xf97316,
        transparent: true,
        opacity: 0.5
      });
      const cube = new THREE.LineSegments(edges, lineMat);
      cube.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        -8 - Math.random() * 25
      );
      scene.add(cube);
      geometries.push(cube);
    }

    // Large sphere wireframe in far background
    const sphereGeo = new THREE.SphereGeometry(8, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(0, 0, -35);
    scene.add(sphere);
    geometries.push(sphere);

    // Octahedrons
    for (let i = 0; i < 10; i++) {
      const octaGeo = new THREE.OctahedronGeometry(0.8 + Math.random() * 1.2, 0);
      const octaMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xef4444 : 0xf97316,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const octa = new THREE.Mesh(octaGeo, octaMat);
      octa.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        -10 - Math.random() * 20
      );
      scene.add(octa);
      geometries.push(octa);
    }

    let lastScrollY = 0;
    let targetCameraY = 0;
    let currentCameraY = 0;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.0003;
      
      // Smooth camera scroll
      currentCameraY += (targetCameraY - currentCameraY) * 0.05;
      camera.position.y = currentCameraY;
      
      // Gentle mouse parallax
      const targetX = mousePos.x * 1.5;
      const targetMouseY = -mousePos.y * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.lookAt(targetX * 0.3, targetMouseY * 0.3 + currentCameraY, 0);
      
      // Animate star dots independently
      starGroup.children.forEach((star: any) => {
        star.position.x += star.userData.speedX;
        star.position.y += star.userData.speedY;
        
        // Wrap around screen
        if (star.position.x > 50) star.position.x = -50;
        if (star.position.x < -50) star.position.x = 50;
        if (star.position.y > 50) star.position.y = -50;
        if (star.position.y < -50) star.position.y = 50;
        
        // Pulse effect
        star.material.opacity = 0.3 + Math.sin(time * star.userData.pulseSpeed + star.userData.pulseOffset) * 0.4;
      });
      
      // Animate geometries
      geometries.forEach((obj, index) => {
        if (obj === gridHelper) {
          obj.rotation.y = time * 0.08;
        } else if (obj === starGroup) {
          // Stars handled separately
        } else if (obj.rotation) {
          obj.rotation.x += 0.002 + (index * 0.0001);
          obj.rotation.y += 0.0015 + (index * 0.0002);
        }
        
        if (obj.position && obj !== gridHelper && obj !== starGroup) {
          obj.position.y += Math.sin(time * 0.8 + index) * 0.008;
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleScroll = () => {
      const newScrollY = window.scrollY;
      lastScrollY = newScrollY;
      targetCameraY = -(newScrollY * 0.002);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      geometries.forEach(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat: any) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 2 - 1, 
        y: (e.clientY / window.innerHeight) * 2 - 1 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const developmentProcess = [
    {
      phase: "01",
      title: "Discovery & Planning",
      description: "Deep dive into your business requirements, market analysis, and technical architecture planning",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-red-500 to-orange-500"
    },
    {
      phase: "02",
      title: "Design & Prototyping",
      description: "User-centric UI/UX design with interactive prototypes and design system creation",
      icon: <Layers className="w-8 h-8" />,
      color: "from-orange-500 to-red-600"
    },
    {
      phase: "03",
      title: "Development Sprint",
      description: "Agile development with clean code architecture, version control, and continuous integration",
      icon: <Code className="w-8 h-8" />,
      color: "from-red-600 to-pink-500"
    },
    {
      phase: "04",
      title: "Quality Assurance",
      description: "Comprehensive testing including unit, integration, performance, and security audits",
      icon: <TestTube className="w-8 h-8" />,
      color: "from-pink-500 to-red-500"
    },
    {
      phase: "05",
      title: "Deployment & DevOps",
      description: "Cloud infrastructure setup, CI/CD pipelines, and automated deployment strategies",
      icon: <Cloud className="w-8 h-8" />,
      color: "from-red-500 to-orange-600"
    },
    {
      phase: "06",
      title: "Maintenance & Scale",
      description: "24/7 monitoring, performance optimization, and continuous feature enhancement",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-orange-600 to-red-700"
    }
  ];

  const techStack = [
    { name: "React & Next.js", category: "Frontend" },
    { name: "Node.js & Python", category: "Backend" },
    { name: "AWS & Azure", category: "Cloud" },
    { name: "PostgreSQL & MongoDB", category: "Database" },
    { name: "Docker & Kubernetes", category: "DevOps" },
    { name: "GraphQL & REST", category: "API" }
  ];

  const whyChooseUs = [
    {
      title: "Industry-Leading Standards",
      description: "We follow SOLID principles, clean architecture, and industry best practices",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Ahead of the Curve",
      description: "Implementing cutting-edge technologies before they become mainstream",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security with encryption, compliance, and regular audits",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Scalable Architecture",
      description: "Built to handle millions of users with microservices and cloud-native design",
      icon: <Database className="w-6 h-6" />
    }
  ];

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/damnx-nexus/30min'
      });
    }
    return false;
  };

  const ChatBot = () => {
    const chatMessages = [
      { bot: "Hi! 👋 I'm here to help you get started with DAMNX Solutions." },
      { bot: "Would you like to schedule a meeting with our team?" },
    ];

    return (
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${chatOpen ? 'scale-100' : 'scale-0'}`}>
        <div className="glass-strong rounded-2xl shadow-2xl w-80 overflow-hidden border border-red-500/30">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold">DAMNX Assistant</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto bg-black/40">
            {chatMessages.slice(0, chatStep + 1).map((msg, i) => (
              <div key={i} className="bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                <p className="text-sm text-gray-200">{msg.bot}</p>
              </div>
            ))}
            {chatStep >= 1 && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    openCalendly();
                    setChatOpen(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 rounded-lg font-semibold text-sm hover:from-red-500 hover:to-orange-400 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Yes, Schedule
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="flex-1 glass-card px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-600/10 transition-all border border-red-500/30"
                >
                  Not Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (chatOpen && chatStep < 1) {
      const timer = setTimeout(() => setChatStep(prev => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [chatOpen, chatStep]);

  return (
    <div className="bg-black text-white overflow-hidden relative">
     <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes animate-background {
          0% { background-position: 0 50%; }
          100% { background-position: 100% 50%; }
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
        .gradient-text {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .masked-text {
          color: transparent;
          background-image: url('https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          background-size: 200%;
          background-position: 0 50%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: animate-background 5s infinite alternate linear;
        }
        .glow-red {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4);
        }
        .observe {
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards;
        }
        .floating { animation: float 6s ease-in-out infinite; }
        .pulse-glow { animation: pulse 3s ease-in-out infinite; }
      `}</style>

      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ 
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, #0a0000 0%, #000000 100%)'
        }}
      />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
          <div className="relative z-10 text-center px-6 max-w-6xl w-full">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="glass-card px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Industry-Leading Code</span>
              </div>
              <div className="glass-card px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium">
                <Rocket className="w-4 h-4 text-red-500" />
                <span>Future-Ready Tech</span>
              </div>
              <div className="glass-card px-5 py-3 rounded-full flex items-center gap-2 text-sm font-medium">
                <Shield className="w-4 h-4 text-red-500" />
                <span>Enterprise Security</span>
              </div>
            </div>

            <h1 className="text-7xl md:text-9xl font-black mb-10 leading-none observe">
              <span className="block mb-2 text-gray-400">DAMNX</span>
              <span className="gradient-text block">Solution's</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light observe">
              Building <span className="text-red-500 font-semibold">industry-level software</span> solutions with uncompromising coding standards
            </p>

            <p className="text-lg text-gray-400 mb-14 max-w-2xl mx-auto observe">
              From concept to scale, we craft enterprise-grade websites and software solutions using cutting-edge technologies and architectural excellence
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center observe">
              <button 
                onClick={openCalendly}
                className="group px-10 py-5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 rounded-full font-bold text-lg transition-all glow-red transform hover:scale-105 flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={openCalendly}
                className="px-10 py-5 glass-card hover:bg-red-600/10 rounded-full font-bold text-lg transition-all border-2 border-red-500/50 hover:border-red-500"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 observe">
            <span className="text-sm text-gray-500 uppercase tracking-wider">Discover Our Process</span>
            <ChevronDown className="w-8 h-8 text-red-500 animate-bounce" />
          </div>
        </section>

        {/* Development Process */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-black mb-6 observe">
                Our <span className="gradient-text">Development Process</span>
              </h2>
              <p className="text-2xl text-gray-400 max-w-3xl mx-auto observe">
                How we build industry-level software from scratch
              </p>
            </div>

            <div className="space-y-8">
              {developmentProcess.map((step, index) => (
                <div 
                  key={index} 
                  className="observe glass-card rounded-2xl p-8 hover:border-red-500/50 transition-all group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center floating`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-5xl font-black text-red-500/30">{step.phase}</span>
                        <h3 className="text-3xl font-bold group-hover:text-red-400 transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-lg">
                        {step.description}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black mb-6 observe">
                <span className="gradient-text">Tech Stack</span> We Master
              </h2>
              <p className="text-xl text-gray-400 observe">
                Cutting-edge technologies for industry-ahead solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div 
                  key={index} 
                  className="observe glass-card rounded-2xl p-8 text-center group hover:border-red-500/50 transition-all hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-sm text-red-500 font-bold mb-2">{tech.category}</div>
                  <div className="text-xl font-bold group-hover:text-red-400 transition-colors">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-black mb-6 observe">
                Why <span className="gradient-text">DAMNX Solutions</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whyChooseUs.map((item, index) => (
                <div 
                  key={index} 
                  className="observe glass-card rounded-2xl p-8 group hover:border-red-500/50 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center mb-4 floating">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-7xl md:text-8xl font-black mb-8 observe leading-tight">
              Ready to Build<br />
              <span className="gradient-text">Industry-Ahead Software?</span>
            </h2>
            <p className="text-2xl text-gray-400 mb-12 observe max-w-3xl mx-auto">
              Let's transform your vision into enterprise-grade reality
            </p>
            <button 
              onClick={openCalendly}
              className="observe group px-12 py-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-full font-bold text-xl transition-all glow-red transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Schedule Your Free Consultation
              <Calendar className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-red-900/20 py-16 px-6 glass-strong">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-4xl font-bold mb-4">
                <span className="text-red-500">DAMNX</span>
                <span className="text-white font-light"> Solutions</span>
              </div>
              <p className="text-gray-400 text-lg mb-6">Building tomorrow's software, today</p>
            </div>
            <div className="text-center text-gray-600 text-sm pt-8 border-t border-red-900/10">
              © 2024 DAMNX Solutions. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Chat Bot */}
     {/* Chat Bot - Updated z-index */}
<ChatBot />

{/* Chat Button - Updated z-index */}
<button
  onClick={() => {
    setChatOpen(true);
    setChatStep(0);
  }}
  className={`fixed bottom-6 right-6 z-[10000001] w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center glow-red hover:scale-110 transition-all ${chatOpen ? 'scale-0' : 'scale-100'}`}
>
  <MessageCircle className="w-8 h-8" />
</button>

    </div>
  );
};

export default DamnxLanding;