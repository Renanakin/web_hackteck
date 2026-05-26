import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Radio } from 'lucide-react';

const CITIES = [
  { 
    id: 'antofagasta', 
    name: 'Antofagasta', 
    region: 'II Región', 
    y: 100, 
    x: 180, 
    status: 'ONLINE', 
    ping: '8ms',
    responseTime: '< 30 Minutos',
    desc: 'Soporte TI remoto, enlaces de comunicación y ciberseguridad industrial minera.'
  },
  { 
    id: 'valparaiso', 
    name: 'Valparaíso', 
    region: 'V Región', 
    y: 200, 
    x: 140, 
    status: 'ONLINE', 
    ping: '5ms',
    responseTime: '< 15 Minutos',
    desc: 'Soporte informático en terreno, redes de datos y cámaras perimetrales inteligentes.'
  },
  { 
    id: 'santiago', 
    name: 'Santiago', 
    region: 'R. Metropolitana', 
    y: 250, 
    x: 160, 
    status: 'ONLINE (NÚCLEO)', 
    ping: '2ms',
    responseTime: '< 10 Minutos',
    desc: 'Centro de operaciones principal, AI Core, consultoría y soporte TI crítico.'
  },
  { 
    id: 'concepcion', 
    name: 'Concepción', 
    region: 'VIII Región', 
    y: 320, 
    x: 130, 
    status: 'ONLINE', 
    ping: '6ms',
    responseTime: '< 20 Minutos',
    desc: 'Administración de servidores corporativos, soporte técnico y automatización.'
  },
  { 
    id: 'puertomontt', 
    name: 'Puerto Montt', 
    region: 'X Región', 
    y: 400, 
    x: 110, 
    status: 'ONLINE', 
    ping: '12ms',
    responseTime: '< 25 Minutos',
    desc: 'Enlaces inalámbricos avanzados, soporte remoto y ciberseguridad perimetral.'
  }
];

export default function ChileMap({ onCityHover }) {
  const [activeCity, setActiveCity] = useState(CITIES[2]); // Default to Santiago

  const handleMouseEnter = (city) => {
    setActiveCity(city);
    if (onCityHover) {
      onCityHover(city);
    }
  };

  return (
    <div className="w-full glass-panel rounded-lg border border-slate-800 p-6 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden shadow-2xl">
      {/* Background glowing gradients */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-magenta-500/5 blur-3xl pointer-events-none" />

      {/* SVG stylized map of Chile (Geographic spine) */}
      <div className="w-full md:w-[45%] flex justify-center relative select-none">
        <svg className="w-[180px] h-[480px] overflow-visible" viewBox="0 0 250 500">
          {/* Main vertical coordinate backbone path representing Chile's shape */}
          <path 
            d="M 210,30 L 205,70 L 180,100 L 155,130 L 142,160 L 140,200 L 160,250 L 150,290 L 130,320 L 120,360 L 110,400 L 90,430 L 80,470" 
            className="stroke-slate-800 fill-none" 
            strokeWidth="3" 
            strokeDasharray="4 4"
          />
          <path 
            d="M 210,30 L 205,70 L 180,100 L 155,130 L 142,160 L 140,200 L 160,250 L 150,290 L 130,320 L 120,360 L 110,400 L 90,430 L 80,470" 
            className="stroke-cyan-500/10 fill-none" 
            strokeWidth="1.5"
          />

          {/* Connectors to text labels or node guides */}
          {CITIES.map((city) => {
            const isActive = activeCity.id === city.id;
            return (
              <line
                key={`line-${city.id}`}
                x1={city.x}
                y1={city.y}
                x2={city.x + (city.x > 140 ? 30 : -30)}
                y2={city.y}
                className={`transition-all duration-300 ${
                  isActive ? 'stroke-cyan-500/40' : 'stroke-slate-800/30'
                }`}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Interactive Cities dots */}
          {CITIES.map((city) => {
            const isActive = activeCity.id === city.id;
            return (
              <g 
                key={city.id} 
                className="cursor-pointer group"
                onClick={() => handleMouseEnter(city)}
                onMouseEnter={() => handleMouseEnter(city)}
              >
                {/* Expand click area */}
                <circle cx={city.x} cy={city.y} r="20" className="fill-transparent" />

                {/* Animated halo when active */}
                {isActive && (
                  <motion.circle 
                    cx={city.x} 
                    cy={city.y} 
                    r="12" 
                    className="stroke-cyan-500 fill-cyan-500/10"
                    strokeWidth="1"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                  />
                )}

                {/* Inner glowing circle */}
                <circle 
                  cx={city.x} 
                  cy={city.y} 
                  r={isActive ? "6" : "4.5"} 
                  className={`transition-all duration-300 ${
                    isActive 
                      ? 'fill-cyan-400 filter drop-shadow-[0_0_8px_#00f0ff]' 
                      : 'fill-slate-600 group-hover:fill-cyan-400 group-hover:filter group-hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]'
                  }`} 
                />

                {/* City name text indicator in the SVG */}
                <text
                  x={city.x + (city.x > 140 ? 12 : -12)}
                  y={city.y + 4}
                  textAnchor={city.x > 140 ? 'start' : 'end'}
                  className={`font-mono text-[9px] font-bold tracking-wider transition-colors duration-300 ${
                    isActive ? 'fill-cyan-400' : 'fill-slate-500 group-hover:fill-slate-300'
                  }`}
                >
                  {city.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected City Telemetry Info Box */}
      <div className="w-full md:w-[55%] flex flex-col justify-between self-stretch py-2">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Radio size={16} className="text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">COBERTURA_ESTADO://CHILE</span>
          </div>

          <div className="border-l-2 border-cyan-400 pl-4 py-1.5 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading font-bold text-white text-xl tracking-wide">{activeCity.name}</h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                {activeCity.ping} PING
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">{activeCity.region}</p>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed min-h-[50px]">
            {activeCity.desc}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">ESTADO DE RED</span>
              <span className="text-xs font-heading font-semibold text-cyan-400">{activeCity.status}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block">RESPUESTA SOPORTE</span>
              <span className="text-xs font-heading font-semibold text-magenta-400">{activeCity.responseTime}</span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <a 
            href="#contacto" 
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors group"
          >
            <Shield size={12} className="text-cyan-400" />
            <span>SOLICITAR SOPORTE EN {activeCity.name.toUpperCase()}</span>
            <MapPin size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
