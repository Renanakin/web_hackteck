import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Zap, 
  Code, 
  Wifi, 
  Eye, 
  Compass, 
  HelpCircle, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import TechCore from './components/TechCore';
import TelemetryConsole from './components/TelemetryConsole';
import ChileMap from './components/ChileMap';
import DiagnosticForm from './components/DiagnosticForm';
import FaqAccordion from './components/FaqAccordion';
import ServiceDrawer from './components/ServiceDrawer';

// Status banner phrases
const TICKER_PHRASES = [
  { prefix: '[ INITIALIZING ]', text: 'AI CORE ACTIVADO EN DIAGNÓSTICO' },
  { prefix: '[ ONLINE SOON ]', text: 'NUEVO FORO Y COMUNIDAD PARA DESARROLLADORES' },
  { prefix: '[ ACTIVE ]', text: ' PROTOCOLOS DE AUTOMATIZACIÓN DE INFRAESTRUCTURA' },
  { prefix: '[ DEPLOYING ]', text: 'CORTAFUEGOS Y SEGURIDAD PERIMETRAL HACKTECK' },
  { prefix: '[ STABLE ]', text: 'PLATAFORMA TEMPORAL EN SIMULACIÓN DE ARRANQUE' },
  { prefix: '[ FASE 01 ]', text: 'DESPLIEGUE COMPLETO DE IDENTIDAD CORPORATIVA' },
];

const MODULES_DATA = [
  {
    id: 'ai',
    title: 'AI CORE',
    tag: '[AI CORE]',
    desc: 'Automatización inteligente, agentes cognitivos y asistencia operativa real.',
    status: 'ONLINE',
    statusClass: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    dotClass: 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]',
    video: '/public/OTRA_VIDEOS/desarrollo_ia.mp4',
    icon: Cpu
  },
  {
    id: 'sec',
    title: 'SECURITY',
    tag: '[SECURITY]',
    desc: 'Protección digital, monitoreo de amenazas proactivo y ciberseguridad corporativa.',
    status: 'ONLINE',
    statusClass: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    dotClass: 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]',
    video: '/public/OTRA_VIDEOS/cyberseguridad.mp4',
    icon: Shield
  },
  {
    id: 'auto',
    title: 'AUTOMATION',
    tag: '[AUTOMATION]',
    desc: 'Optimización de procesos repetitivos, orquestación y pipelines inteligentes.',
    status: 'INITIALIZING',
    statusClass: 'text-magenta-400 bg-magenta-950/40 border-magenta-500/30',
    dotClass: 'bg-magenta-400 shadow-[0_0_8px_#d000ff] animate-pulse',
    video: '/public/OTRA_VIDEOS/automatizacion-monitoreo.mp4',
    icon: Zap
  },
  {
    id: 'dev',
    title: 'DEV PLATFORM',
    tag: '[DEV PLATFORM]',
    desc: 'Arquitectura de software a medida, aplicaciones distribuidas y ecosistemas web.',
    status: 'INITIALIZING',
    statusClass: 'text-magenta-400 bg-magenta-950/40 border-magenta-500/30',
    dotClass: 'bg-magenta-400 shadow-[0_0_8px_#d000ff] animate-pulse',
    video: '/public/OTRA_VIDEOS/infraestructura.mp4',
    icon: Code
  },
  {
    id: 'net',
    title: 'NETWORK',
    tag: '[NETWORK]',
    desc: 'Diseño de redes de alto rendimiento, optimización de tráfico y enlaces seguros.',
    status: 'INITIALIZING',
    statusClass: 'text-magenta-400 bg-magenta-950/40 border-magenta-500/30',
    dotClass: 'bg-magenta-400 shadow-[0_0_8px_#d000ff] animate-pulse',
    video: '/public/OTRA_VIDEOS/redes_y_comunicaciones.mp4',
    icon: Wifi
  },
  {
    id: 'edge',
    title: 'PERIMETER',
    tag: '[PERIMETER]',
    desc: 'Cámaras con IA, control de accesos automatizado y seguridad integral física.',
    status: 'PLANNED',
    statusClass: 'text-yellow-500 bg-yellow-950/40 border-yellow-500/30',
    dotClass: 'bg-yellow-500 shadow-[0_0_8px_#eab308]',
    video: '/public/OTRA_VIDEOS/seguridad-perimetral.mp4',
    icon: Eye
  }
];

export default function App() {
  const [activeNode, setActiveNode] = useState(null);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Service drawer states
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Rotate ticker phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_PHRASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openServiceDrawer = (id) => {
    setSelectedServiceId(id);
    setDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-200 overflow-hidden font-sans">
      
      {/* Background Interactive Nebulae & Grids */}
      <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none z-0" />
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-cyan-900/10 via-magenta-900/5 to-transparent pointer-events-none z-0" />
      
      {/* Laser horizontal scan lines */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-10" />
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="w-full h-0.5 bg-cyan-500/10 shadow-[0_0_10px_rgba(0,240,255,0.3)] animate-scanline" />
      </div>

      {/* 1. Header & Status Bar */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#02040a]/80 backdrop-blur-md border-b border-slate-900/60 shadow-lg' : 'bg-transparent'
      }`}>
        {/* Status indicator line */}
        <div className="bg-[#030712] border-b border-slate-900 py-1.5 text-[10px] tracking-wider font-mono">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-400 font-bold">PLATFORM INITIALIZING</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 hidden sm:inline">NÚCLEO ACTIVO CON 7 DEPARTAMENTOS DE SOPORTE</span>
            </div>
            <a href="#roadmap" className="text-slate-500 hover:text-cyan-400 transition-colors flex items-center">
              FASE DE DESPLIEGUE <ChevronRight size={10} className="ml-1" />
            </a>
          </div>
        </div>

        {/* Main Nav Navbar */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <img 
              src="/public/ISOIPO-LETRAS.png" 
              alt="HACKTECK Logo" 
              className="h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(208,0,255,0.6)] transition-all duration-300"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 font-heading text-sm font-semibold tracking-wide">
            <a href="#modulos" className="text-slate-400 hover:text-cyan-400 transition-colors">Módulos</a>
            <a href="#cobertura" className="text-slate-400 hover:text-cyan-400 transition-colors">Cobertura</a>
            <a href="#manifiesto" className="text-slate-400 hover:text-cyan-400 transition-colors">Manifiesto</a>
            <a href="#roadmap" className="text-slate-400 hover:text-cyan-400 transition-colors">Roadmap</a>
            <a href="#faq" className="text-slate-400 hover:text-cyan-400 transition-colors">FAQs</a>
            <a href="#contacto" className="text-slate-400 hover:text-cyan-400 transition-colors">Contacto</a>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center">
            <a href="#contacto" className="btn px-4 py-1.5 rounded text-xs font-heading font-bold glow-btn-cyan">
              Diagnóstico TI
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-slate-400 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[84px] inset-x-0 bg-[#02040a]/95 backdrop-blur-lg border-b border-slate-900 py-6 px-6 md:hidden flex flex-col space-y-4"
            >
              <a 
                href="#modulos" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-900/50 font-heading text-sm font-semibold"
              >
                Módulos
              </a>
              <a 
                href="#cobertura" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-900/50 font-heading text-sm font-semibold"
              >
                Cobertura
              </a>
              <a 
                href="#manifiesto" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-900/50 font-heading text-sm font-semibold"
              >
                Manifiesto
              </a>
              <a 
                href="#roadmap" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-900/50 font-heading text-sm font-semibold"
              >
                Roadmap
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-900/50 font-heading text-sm font-semibold"
              >
                FAQs
              </a>
              <a 
                href="#contacto" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-900/50 font-heading text-sm font-semibold"
              >
                Contacto
              </a>
              <a 
                href="#contacto" 
                onClick={() => setMobileMenuOpen(false)}
                className="btn py-2.5 rounded text-center text-xs font-heading font-bold glow-btn-cyan"
              >
                Solicitar Diagnóstico TI
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pt-36 pb-16 md:pt-48 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 text-xs font-mono font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>ASESORÍA TI GRATUITA DISPONIBLE</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Evoluciona la infraestructura de tu empresa.
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Operación, protección y crecimiento con Inteligencia Artificial, Ciberseguridad avanzada y Soporte TI de alto rendimiento en todo Chile.
            </p>
            
            <p className="text-magenta-400/90 font-heading text-xs sm:text-sm font-bold tracking-wide border-l-2 border-magenta-500 pl-4 py-1">
              No es solo soporte reactivo. Es el inicio del ecosistema preventivo de <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" className="inline-logo" />.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <a 
                href="#contacto" 
                className="btn px-6 py-3.5 rounded text-center text-xs font-heading font-bold glow-btn-cyan flex items-center justify-center space-x-2"
              >
                <span>Solicitar Diagnóstico TI Gratis</span>
                <ArrowRight size={14} />
              </a>
              <a 
                href="#modulos" 
                className="btn px-6 py-3.5 rounded text-center text-xs font-heading font-bold glow-btn-magenta flex items-center justify-center space-x-2"
              >
                <span>Explorar Módulos</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900/60 max-w-md">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">SYSTEM</span>
                <span className="text-xs font-heading font-semibold text-slate-300">ONLINE SOON</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">CORE STATUS</span>
                <span className="text-xs font-heading font-semibold text-cyan-400">INITIALIZING</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">COBERTURA</span>
                <span className="text-xs font-heading font-semibold text-magenta-400">CHILE ENLACE</span>
              </div>
            </div>
          </div>

          {/* Hero Media Right (Interactive SVG Core & Telemetry) */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-6">
            <div className="w-full flex justify-center">
              <TechCore onNodeHover={setActiveNode} />
            </div>
            
            {/* Live Interactive Telemetry Console */}
            <div className="w-full max-w-lg">
              <TelemetryConsole activeNodeData={activeNode} />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Live Status Banner (Dynamic Slider) */}
      <section className="relative z-20 bg-[#030712] border-y border-slate-900/80 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center min-h-[24px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tickerIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 text-xs sm:text-sm font-mono tracking-wider font-semibold"
            >
              <span className="text-magenta-500">{TICKER_PHRASES[tickerIndex].prefix}</span>
              <span className="text-slate-300 uppercase">{TICKER_PHRASES[tickerIndex].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Módulos en Activación */}
      <section id="modulos" className="relative z-20 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block">Módulos en Activación</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Ecosistema en Inicialización</h2>
          <p className="text-slate-400 text-sm">
            Los componentes clave del núcleo operativo de <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" className="inline-logo" /> se encuentran en proceso de despliegue activo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES_DATA.map((mod) => {
            const IconComp = mod.icon;
            return (
              <div 
                key={mod.id} 
                className="group relative rounded-lg overflow-hidden glass-panel flex flex-col p-6 h-[240px] justify-between border border-slate-900 hover:scale-[1.02]"
              >
                {/* Background Video playing on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src={mod.video} type="video/mp4" />
                  </video>
                </div>
                
                {/* Overlay filter */}
                <div className="absolute inset-0 bg-[#02040a]/40 group-hover:bg-gradient-to-t group-hover:from-slate-950 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  {/* Card Header Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono tracking-wider font-bold px-2 py-0.5 rounded border ${mod.statusClass} flex items-center space-x-1`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${mod.dotClass}`} />
                      <span>{mod.status}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{mod.tag}</span>
                  </div>

                  {/* Title and Icon */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-magenta-400 group-hover:border-cyan-500/20 transition-colors duration-300">
                      <IconComp size={18} />
                    </div>
                    <h3 className="font-heading font-bold text-white text-lg tracking-wide">{mod.title}</h3>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-2 border-t border-slate-950/20">
                  <button 
                    onClick={() => openServiceDrawer(mod.id)}
                    className="flex items-center space-x-1 text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors"
                  >
                    <span>Especificaciones Técnicas</span>
                    <ArrowUpRight size={12} className="ml-0.5" />
                  </button>
                </div>

                {/* Decorative border line */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Cobertura Nacional Section (Land of admi.cl features) */}
      <section id="cobertura" className="relative z-20 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block">PRESENCIA NACIONAL</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
              Cobertura de Soporte Informático y Redes en Chile
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Garantizamos la disponibilidad de técnicos en terreno y telemetría avanzada para asegurar la continuidad operativa de sucursales e infraestructura crítica.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 mt-0.5 shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white text-sm">Soporte On-Site de Emergencia</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Técnicos calificados listos para resolver incidentes físicos de hardware, redes y ciberdefensa.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-slate-900 border border-slate-800 text-magenta-400 mt-0.5 shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white text-sm">Monitoreo de Enlace Constante</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Evaluamos latencias, caídas de WAN y consumo de tráfico a nivel país.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <ChileMap />
          </div>

        </div>
      </section>

      {/* 6. Explora el Ecosistema */}
      <section className="relative z-20 bg-[#030712]/50 border-y border-slate-900/60 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono tracking-widest text-magenta-400 uppercase block">Ecosistema futuro</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Explora el Ecosistema</h2>
            <p className="text-slate-400 text-sm">
              La nueva plataforma <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" className="inline-logo" /> integrará proyectos, noticias, soporte y espacios colaborativos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Noticias', desc: 'Actualizaciones sobre IA, infraestructura, seguridad y automatización.', tag: '[NOTICIAS]', icon: Layers },
              { title: 'Proyectos', desc: 'Seguimiento de desarrollos y plataformas creadas por Hackteck.', tag: '[PROYECTOS]', icon: Compass },
              { title: 'Centro de Ayuda', desc: 'Guías completas, documentación y respuestas rápidas de soporte.', tag: '[AYUDA]', icon: HelpCircle },
              { title: 'Foro', desc: 'Espacio colaborativo para conversación técnica y comunidad.', tag: '[COMUNIDAD]', icon: MessageSquare }
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div 
                  key={idx}
                  className="group relative rounded-lg border border-slate-900/80 bg-slate-950/60 hover:bg-slate-950 p-6 flex flex-col justify-between h-[180px] hover:scale-[1.01] hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-500 tracking-wider">{card.tag}</span>
                      <CardIcon size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-white tracking-wide">{card.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="flex items-center text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors mt-2">
                    <span>MÓDULO PLANIFICADO</span>
                    <ArrowRight size={10} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Manifiesto Section */}
      <section id="manifiesto" className="relative z-20 max-w-5xl mx-auto px-6 py-28 text-center">
        <div className="absolute w-[50%] h-[50%] rounded-full bg-magenta-500/5 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold leading-relaxed text-white max-w-4xl mx-auto tracking-wide italic">
          “No construimos tecnología para decorar empresas. Construimos sistemas para que operen mejor, se protejan mejor y evolucionen con inteligencia.”
        </blockquote>
      </section>

      {/* 8. Roadmap Section */}
      <section id="roadmap" className="relative z-20 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block">Progreso de Plataforma</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Fases de Activación</h2>
          <p className="text-slate-400 text-sm">
            Visualiza el plan maestro de despliegue conceptual para el ecosistema tecnológico de <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" class="inline-logo" />.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              phase: 'Fase 01',
              title: 'Identidad y presencia digital',
              desc: 'Rediseño visual, narrativa de marca y base pública del ecosistema.',
              status: 'Activa',
              statusClass: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
              dotClass: 'bg-cyan-400'
            },
            {
              phase: 'Fase 02',
              title: 'Plataforma Hackteck',
              desc: 'Integración de servicios, módulos inteligentes y experiencia centralizada.',
              status: 'Próxima',
              statusClass: 'text-magenta-400 bg-magenta-950/40 border-magenta-500/30',
              dotClass: 'bg-magenta-400 animate-pulse'
            },
            {
              phase: 'Fase 03',
              title: 'Ecosistema operativo',
              desc: 'IA, infraestructura, seguridad y automatización trabajando como una sola capa tecnológica.',
              status: 'Planificada',
              statusClass: 'text-slate-500 bg-slate-950/40 border-slate-900',
              dotClass: 'bg-slate-700'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`relative rounded-lg p-6 flex flex-col justify-between h-[200px] border transition-all duration-300 ${
                idx === 0 
                  ? 'border-cyan-500/30 bg-cyan-950/5 shadow-[0_0_15px_rgba(0,240,255,0.02)]' 
                  : 'border-slate-900 bg-slate-950/40 hover:border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{item.phase}</span>
                  <span className={`text-[9px] font-mono tracking-wider px-2 py-0.5 rounded border ${item.statusClass} flex items-center space-x-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotClass}`} />
                    <span>{item.status}</span>
                  </span>
                </div>
                <h3 className="font-heading font-bold text-white text-lg tracking-wide">
                  {idx === 1 ? (
                    <>Plataforma <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" className="inline-logo" /></>
                  ) : item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="relative z-20 max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block">RESOLUCIÓN DE DUDAS</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Preguntas Frecuentes</h2>
          <p className="text-slate-400 text-sm">
            Respondemos a las dudas operativas y técnicas sobre el soporte informático B2B y tecnología en Chile.
          </p>
        </div>

        <FaqAccordion />
      </section>

      {/* 10. Footer & Lead Capture Diagnostic Section */}
      <section id="contacto" className="relative z-20 min-h-[600px] flex flex-col justify-between border-t border-slate-900">
        
        {/* Footer Cinematic background video */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video 
            className="w-full h-full object-cover opacity-20"
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
          >
            <source src="/public/OTRA_VIDEOS/footer-landing.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a]" />
        </div>

        {/* Content area */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info left */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-widest uppercase">
                  <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" className="inline-logo h-[1.2em] sm:h-[1.5em]" /> // SYSTEM ONLINE SOON
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Estamos construyendo la próxima versión de nuestro ecosistema. Si tu empresa requiere soporte técnico de terreno, optimizar ciberseguridad o automatizar procesos, solicita tu diagnóstico hoy.
                </p>
              </div>

              {/* Contact cards */}
              <div className="flex flex-col space-y-4 max-w-md">
                <a 
                  href="https://wa.me/56954121107" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass-panel p-4 rounded-lg flex justify-between items-center hover:border-cyan-500/30 group transition-all"
                >
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase group-hover:text-cyan-400 mb-0.5">WHATSAPP EMERGENCIAS</span>
                    <span className="text-xs font-semibold text-slate-200">+56 9 5412 1107</span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-600 group-hover:text-cyan-400" />
                </a>

                <a 
                  href="mailto:contacto@hackteck.cl" 
                  className="glass-panel p-4 rounded-lg flex justify-between items-center hover:border-cyan-500/30 group transition-all"
                >
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-slate-500 block uppercase group-hover:text-cyan-400 mb-0.5">CORREO ELECTRÓNICO</span>
                    <span className="text-xs font-semibold text-slate-200">contacto@hackteck.cl</span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-600 group-hover:text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Diagnostic Terminal Form right */}
            <div className="lg:col-span-7 w-full">
              <DiagnosticForm />
            </div>

          </div>
        </div>

        {/* Brand footer line */}
        <div className="relative z-10 border-t border-slate-900/60 bg-[#02040a]/60 backdrop-blur-sm py-8 text-center text-xs text-slate-600 font-mono">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <img 
              src="/public/ISOIPO-LETRAS.png" 
              alt="HACKTECK" 
              className="h-6 w-auto opacity-30 object-contain"
            />
            <p>
              © 2026 <img src="/public/ISOIPO-LETRAS.png" alt="HACKTECK" className="inline-logo h-[1.5em] opacity-40 ml-1" /> · Ecosistema Tecnológico de Alto Rendimiento
            </p>
          </div>
        </div>
      </section>

      {/* Slide-over Service Technical Drawer */}
      <ServiceDrawer 
        serviceId={selectedServiceId} 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />

    </div>
  );
}
