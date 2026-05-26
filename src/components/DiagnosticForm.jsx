import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, Send, AlertTriangle } from 'lucide-react';

const DIAGNOSTIC_STEPS = [
  'INICIANDO DIAGNÓSTICO DE INFRAESTRUCTURA...',
  'CONECTANDO CON EL NÚCLEO HACKTECK...',
  'ENCRIPTANDO DATOS DE CLIENTE (SHA-256)...',
  'ANALIZANDO REQUERIMIENTO DEL SISTEMA...',
  'REGISTRANDO TICKETS EN LA COLA DE PRIORIDAD B2B...',
  'PROTOCOLO COMPLETADO. ASESOR ASIGNADO CON ÉXITO.'
];

export default function DiagnosticForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'support',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | diagnosing | success
  const [currentStep, setCurrentStep] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);

  // Sequence of diagnostic console logs
  useEffect(() => {
    if (status !== 'diagnosing') return;

    if (currentStep < DIAGNOSTIC_STEPS.length) {
      const timer = setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString();
        setConsoleLogs(prev => [...prev, `[${timestamp}] ${DIAGNOSTIC_STEPS[currentStep]}`]);
        setCurrentStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setStatus('success');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status, currentStep]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor complete los campos obligatorios (*).');
      return;
    }
    
    // Start terminal diagnostic simulation
    setStatus('diagnosing');
    setConsoleLogs([`[${new Date().toLocaleTimeString()}] SISTEMA: PREPARANDO ENVÍO DE DATOS...`]);
    setCurrentStep(0);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'support',
      message: ''
    });
    setStatus('idle');
    setConsoleLogs([]);
    setCurrentStep(0);
  };

  return (
    <div className="w-full glass-panel rounded-lg border border-slate-800 overflow-hidden relative shadow-2xl">
      {/* Decorative accent lines */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      {/* Header */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-cyan-400" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">SOLICITUD://DIAGNOSTICO_TI</span>
        </div>
        <div className="flex space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400/40" />
          <span className="w-2 h-2 rounded-full bg-magenta-400/40" />
        </div>
      </div>

      <div className="p-6 min-h-[350px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* STATE: Idle Form */}
          {status === 'idle' && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4 text-left"
            >
              <div className="text-center md:text-left mb-2">
                <h3 className="font-heading font-bold text-white text-lg">Solicita tu Diagnóstico TI Gratis</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Completa el formulario para iniciar la simulación de diagnóstico y agendar tu primera asesoría técnica sin costo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej. Sebastián López"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-700 outline-none focus:border-cyan-500/50 transition-colors font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Celular / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Ej. +56 9 1234 5678"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-700 outline-none focus:border-cyan-500/50 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Correo Corporativo *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Ej. contacto@empresa.cl"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-700 outline-none focus:border-cyan-500/50 transition-colors font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Módulo Principal a Evaluar</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500/50 transition-colors font-mono appearance-none"
                  >
                    <option value="support">Soporte Informático B2B</option>
                    <option value="security">Ciberseguridad Avanzada</option>
                    <option value="automation">Automatización de Procesos</option>
                    <option value="dev">Desarrollo Web & Software</option>
                    <option value="network">Redes y Conectividad</option>
                    <option value="perimeter">Seguridad Perimetral / Cámaras</option>
                    <option value="ai">AI Core / Agentes Inteligentes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Descripción Breve del Problema TI</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Detalla brevemente qué problemas informáticos necesitas resolver..."
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white placeholder-slate-700 outline-none focus:border-cyan-500/50 transition-colors font-mono resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn py-3 rounded text-xs font-heading font-bold glow-btn-cyan flex items-center justify-center space-x-2"
                >
                  <Send size={12} />
                  <span>TRANSMITIR DATOS E INICIAR DIAGNÓSTICO</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* STATE: System Diagnosis Loader */}
          {status === 'diagnosing' && (
            <motion.div
              key="diagnosing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 font-mono text-left"
            >
              <div className="flex items-center space-x-3 text-cyan-400">
                <Cpu size={20} className="animate-spin" />
                <h4 className="text-sm font-bold tracking-widest uppercase">DIAGNOSTIC CORE: RUNNING PROMPT</h4>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded p-4 h-[180px] overflow-y-auto space-y-1 text-[10px] text-slate-400">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-cyan-500 mr-2 font-bold">&gt;&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              <div className="w-full bg-slate-950 border border-slate-900 rounded-full h-1 overflow-hidden">
                <motion.div 
                  className="bg-cyan-500 h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStep / DIAGNOSTIC_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}

          {/* STATE: Success Response */}
          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-center py-6"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-950/55 border border-cyan-500/30 text-cyan-400 animate-pulse">
                <ShieldCheck size={40} />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-white text-xl">¡Transmisión Completada con Éxito!</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                  El protocolo de diagnóstico se ha inicializado para el correo <strong className="text-cyan-400">{formData.email}</strong>.
                </p>
                <p className="text-magenta-400/90 font-mono text-[10px] uppercase tracking-wider font-bold">
                  tiempo estimado de respuesta: &lt; 15 minutos
                </p>
              </div>

              <div className="pt-4 max-w-xs mx-auto">
                <button
                  onClick={handleReset}
                  className="w-full btn py-2 rounded border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                >
                  VOLVER A INICIALIZAR TERMINAL
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
