import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldAlert, Cpu, Zap, Activity } from 'lucide-react';

const SERVICE_DETAILS = {
  ai: {
    title: 'AI CORE',
    desc: 'Implementamos arquitecturas cognitivas y agentes artificiales integrados con tus bases de datos internas para resolver flujos operativos redundantes y atención experta de primer nivel.',
    sla: 'Despliegue inicial en 15-20 días hábiles.',
    techs: ['Python', 'LangChain', 'LlamaIndex', 'OpenAI API', 'VectorDB', 'FastAPI'],
    features: [
      'Agentes inteligentes autónomos para soporte interno 24/7.',
      'Procesamiento masivo inteligente de documentación y facturas.',
      'Sistemas de análisis predictivo sobre registros operacionales.',
      'Modelos conversacionales adaptados a tu base de conocimientos.'
    ]
  },
  sec: {
    title: 'SECURITY',
    desc: 'Auditoría integral, blindaje de firewalls y monitoreo constante de amenazas para salvaguardar el activo más valioso de tu empresa: la información.',
    sla: 'Monitoreo e incidentes críticos: Respuesta < 15 Minutos.',
    techs: ['EDR/XDR', 'WAF Cloudflare', 'Fortinet SIEM', 'Snort IDS', 'Vulnerability Scanners'],
    features: [
      'Detección de vulnerabilidades internas y externas periódicas.',
      'Implementación de políticas Zero-Trust y control de accesos.',
      'Capacitación y simulaciones de Phishing para colaboradores.',
      'Respuesta automatizada ante intentos de intrusiones de red.'
    ]
  },
  auto: {
    title: 'AUTOMATION',
    desc: 'Conectamos tus sistemas heredados (ERP, CRM, Bases de datos) y orquestamos pipelines automáticos para eliminar el reingreso manual de información y el error humano.',
    sla: 'Análisis de procesos e integración básica en 7 días.',
    techs: ['n8n', 'Zapier Enterprise', 'Python Scripts', 'Node.js', 'Webhooks', 'REST APIs'],
    features: [
      'Sincronización automatizada bidireccional entre CRM y ERP.',
      'Alertas de inventario y facturación instantáneas vía Slack/WhatsApp.',
      'Pipelines de ETL programados para reportes de gerencia.',
      'Orquestación de workflows de onboarding para nuevos clientes.'
    ]
  },
  dev: {
    title: 'DEV PLATFORM',
    desc: 'Desarrollamos soluciones a la medida, desde portales corporativos interactivos hasta sistemas SaaS de alta escalabilidad, aplicando buenas prácticas de desarrollo ágil.',
    sla: 'Garantía técnica de 12 meses en todo código desarrollado.',
    techs: ['React', 'Next.js', 'TailwindCSS', 'Node.js', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    features: [
      'Desarrollo SPA y Web Apps adaptables a mobile.',
      'Diseño UX/UI premium a medida (sin plantillas genéricas).',
      'Arquitecturas serverless y bases de datos optimizadas.',
      'Integración continua y despliegue automatizado (CI/CD).'
    ]
  },
  net: {
    title: 'NETWORK',
    desc: 'Diseñamos e implementamos topologías de red estables, redes de alto desempeño seguras y optimización de conectividad para garantizar la continuidad operativa.',
    sla: 'Soporte a caídas totales de enlace: < 30 Minutos.',
    techs: ['MikroTik', 'Cisco Systems', 'Ubiquiti UniFi', 'SD-WAN', 'VLAN Config'],
    features: [
      'Segmentación de redes mediante VLANs para mayor seguridad.',
      'Configuración de balanceo de carga para múltiples enlaces de internet.',
      'Túneles VPN seguros para interconectar sucursales o teletrabajo.',
      'Auditoría física de cableado estructurado y cobertura Wi-Fi.'
    ]
  },
  edge: {
    title: 'PERIMETER',
    desc: 'Protección física inteligente. Instalamos cámaras de vigilancia avanzada, control biométrico de acceso y sensores IoT interconectados con notificaciones móviles inmediatas.',
    sla: 'Soporte y calibración en terreno en 24 horas.',
    techs: ['Dahua / Hikvision IA', 'RFID Biometrics', 'IoT Sensors', 'NVR Cloud Backup'],
    features: [
      'Cámaras con reconocimiento facial y detección de intrusos.',
      'Sistemas de control de acceso por huella, tarjeta o reconocimiento.',
      'Centralización de video en la nube para visualización remota.',
      'Integración de sensores de movimiento con alertas móviles en tiempo real.'
    ]
  }
};

export default function ServiceDrawer({ serviceId, isOpen, onClose }) {
  const details = SERVICE_DETAILS[serviceId];

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && details && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Container Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-[#030712] border-l border-slate-900 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto select-none"
          >
            {/* Holographic glowing side borders */}
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-cyan-500 via-transparent to-magenta-500" />
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-950">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">ESPECIFICACION_TECNICA://{details.title}</span>
                <button 
                  onClick={onClose} 
                  className="p-1 rounded bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Title & Description */}
              <div className="mt-6 space-y-4">
                <h3 className="font-heading font-bold text-white text-2xl tracking-wide flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] mr-2" />
                  {details.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {details.desc}
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8 space-y-3">
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">ALCANCE Y CARACTERÍSTICAS</span>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle size={14} className="text-cyan-400 mr-2.5 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies used */}
              <div className="mt-8 space-y-2.5">
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">TECNOLOGÍAS / INTEGRACIONES</span>
                <div className="flex flex-wrap gap-2">
                  {details.techs.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-900 text-slate-400 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SLA / Estimated Times & CTA */}
            <div className="mt-12 pt-6 border-t border-slate-950 space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-slate-950 border border-slate-900 rounded">
                <ShieldAlert size={16} className="text-magenta-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">TIEMPOS DE RESPUESTA (SLA)</span>
                  <p className="text-slate-300 text-xs font-semibold mt-0.5">{details.sla}</p>
                </div>
              </div>

              <a 
                href="#contacto"
                onClick={onClose}
                className="w-full btn py-3.5 rounded text-center text-xs font-heading font-bold glow-btn-cyan flex items-center justify-center space-x-2"
              >
                <Zap size={12} className="text-cyan-400" />
                <span>SOLICITAR EVALUACIÓN DE {details.title}</span>
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
