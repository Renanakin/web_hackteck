import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: '¿Qué cobertura física tienen en Chile para el soporte TI on-site?',
    a: 'Brindamos soporte presencial (en terreno) de emergencia en Santiago, Valparaíso, Concepción, Antofagasta y Puerto Montt. Para todo el territorio nacional de Chile, entregamos soporte remoto instantáneo mediante canales de comunicación seguros y de alta velocidad.'
  },
  {
    q: '¿Qué incluye la primera asesoría o diagnóstico TI gratuito?',
    a: 'Realizamos una auditoría básica de tu infraestructura operativa digital: escaneo de vulnerabilidades básicas de red, análisis de cuellos de botella en comunicaciones, revisión de licenciamiento y detección de tareas repetitivas automatizables con agentes de Inteligencia Artificial para optimizar costos.'
  },
  {
    q: '¿Cómo funciona su monitoreo de ciberseguridad 24/7?',
    a: 'Instanciamos sistemas de telemetría de red y defensas perimetrales en tus servidores y endpoints. Ante cualquier anomalía o intento de intrusión detectado por nuestros agentes inteligentes, nuestro equipo del centro de mando es alertado en milisegundos para neutralizar la amenaza de inmediato.'
  },
  {
    q: '¿Pueden automatizar procesos de mi empresa con Inteligencia Artificial?',
    a: 'Sí, a través de nuestro módulo AI CORE diseñamos agentes cognitivos que procesan documentación, responden consultas frecuentes de tus clientes en canales digitales, y automatizan flujos operativos críticos reduciendo los tiempos de respuesta y errores manuales.'
  },
  {
    q: '¿Ofrecen administración de correos en la nube y licenciamiento?',
    a: 'Sí, nos encargamos del despliegue, migración completa y administración de cuentas corporativas en Microsoft 365 y Google Workspace. Gestionamos tu licenciamiento oficial asegurando la optimización de los costos por usuario.'
  }
];

export default function FaqAccordion() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 text-left">
      {FAQS.map((faq, idx) => {
        const isExpanded = expandedIdx === idx;
        return (
          <div 
            key={idx}
            className={`rounded-lg border transition-all duration-300 overflow-hidden ${
              isExpanded 
                ? 'border-cyan-500/40 bg-cyan-950/5 shadow-[0_0_15px_rgba(0,240,255,0.02)]' 
                : 'border-slate-900 bg-slate-950/30 hover:border-slate-800'
            }`}
          >
            {/* Header / Question Toggle Button */}
            <button
              onClick={() => toggleExpand(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center space-x-4">
                <HelpCircle size={16} className={`shrink-0 transition-colors duration-300 ${
                  isExpanded ? 'text-cyan-400' : 'text-slate-600'
                }`} />
                <span className={`font-heading font-semibold text-sm sm:text-base tracking-wide transition-colors duration-300 ${
                  isExpanded ? 'text-white' : 'text-slate-300'
                }`}>
                  {faq.q}
                </span>
              </div>
              
              <div className={`p-1.5 rounded bg-slate-900/50 border border-slate-800 ml-4 transition-colors duration-300 ${
                isExpanded ? 'border-cyan-500/20 text-cyan-400' : 'text-slate-500'
              }`}>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>

            {/* Answer Content Dropdown */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-5 pt-1 border-t border-slate-900/50 text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
