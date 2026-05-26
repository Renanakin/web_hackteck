import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NODES = [
  { id: 'ai', label: 'AI CORE', x: 250, y: 60, top: '12%', left: '50%' },
  { id: 'sec', label: 'SECURITY', x: 398, y: 132, top: '26.4%', left: '79.6%' },
  { id: 'auto', label: 'AUTOMATION', x: 435, y: 292, top: '58.4%', left: '87%' },
  { id: 'ops', label: 'OPS', x: 332, y: 421, top: '84.2%', left: '66.4%' },
  { id: 'dev', label: 'DEV PLATFORM', x: 168, y: 421, top: '84.2%', left: '33.6%' },
  { id: 'net', label: 'NETWORK', x: 65, y: 292, top: '58.4%', left: '13%' },
  { id: 'edge', label: 'EDGE', x: 102, y: 132, top: '26.4%', left: '20.4%' },
];

export default function TechCore({ onNodeHover }) {
  const [activeNode, setActiveNode] = useState(null);

  const handleMouseEnter = (node) => {
    setActiveNode(node.id);
    if (onNodeHover) {
      onNodeHover(node);
    }
  };

  const handleMouseLeave = () => {
    setActiveNode(null);
    if (onNodeHover) {
      onNodeHover(null);
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center select-none">
      {/* Background Glows */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute w-[60%] h-[60%] rounded-full bg-magenta-500/5 blur-3xl" />

      {/* SVG Canvas for Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        {/* Outer Orbit Line */}
        <circle 
          cx="250" 
          cy="250" 
          r="190" 
          className="stroke-slate-800 fill-none" 
          strokeWidth="1.5" 
          strokeDasharray="4 4"
        />

        {/* Heptagon Mesh */}
        <polygon 
          points={NODES.map(n => `${n.x},${n.y}`).join(' ')} 
          className="stroke-cyan-500/10 fill-none transition-colors duration-300"
          strokeWidth="1"
        />

        {/* Connecting Lines and Energy Pulses */}
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <g key={`lines-${node.id}`}>
              {/* Static background connection */}
              <line 
                x1="250" 
                y1="250" 
                x2={node.x} 
                y2={node.y} 
                className={`transition-colors duration-500 ${
                  isActive ? 'stroke-cyan-400' : 'stroke-slate-800'
                }`}
                strokeWidth={isActive ? 2 : 1}
              />
              
              {/* Pulse animation when active */}
              {isActive && (
                <motion.line 
                  x1="250" 
                  y1="250" 
                  x2={node.x} 
                  y2={node.y} 
                  className="stroke-magenta-400"
                  strokeWidth="2.5"
                  initial={{ strokeDasharray: "0 100", strokeDashoffset: 0 }}
                  animate={{ strokeDasharray: "20 80", strokeDashoffset: -100 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              )}

              {/* Constant subtle pulsing dots travelling along the lines */}
              {!isActive && (
                <motion.circle
                  r="2"
                  className="fill-cyan-400/40"
                  animate={{
                    cx: [250, node.x],
                    cy: [250, node.y]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Center Core Logo */}
      <div className="absolute w-[28%] h-[28%] rounded-full bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center p-3 z-20 shadow-2xl glass-panel group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-magenta-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
        
        <img 
          src="/public/ISOTIPO-IMAGEN.png" 
          alt="HACKTECK Core" 
          className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] animate-pulse-slow relative z-10"
        />
        <span className="text-[10px] tracking-[0.2em] font-heading font-bold text-cyan-400 mt-2 relative z-10">
          CORE
        </span>
      </div>

      {/* Interactive Absolute Nodes */}
      {NODES.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <div
            key={node.id}
            className="absolute z-30 cursor-pointer flex flex-col items-center group"
            style={{ 
              top: node.top, 
              left: node.left, 
              transform: 'translate(-50%, -50%)' 
            }}
            onMouseEnter={() => handleMouseEnter(node)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Interactive Area expansion */}
            <div className="absolute -inset-4 rounded-full bg-transparent" />
            
            {/* Glowing outer ring */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center relative transition-all duration-300 ${
              isActive ? 'scale-110' : 'scale-100'
            }`}>
              {/* Outer halos */}
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isActive 
                  ? 'border border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                  : 'border border-slate-800 bg-slate-950 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5'
              }`} />

              <div className={`absolute -inset-1.5 rounded-full border border-dashed transition-all duration-500 ${
                isActive ? 'border-magenta-500/60 rotate-45 scale-100' : 'border-transparent scale-75'
              }`} />

              {/* Center Dot */}
              <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                isActive ? 'bg-cyan-400 shadow-[0_0_6px_#00f0ff]' : 'bg-slate-600 group-hover:bg-cyan-400'
              }`} />
            </div>

            {/* Label */}
            <span className={`mt-2.5 px-2 py-0.5 rounded text-[10px] font-heading tracking-wider font-bold transition-all duration-300 ${
              isActive 
                ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30' 
                : 'text-slate-500 border border-transparent group-hover:text-slate-300'
            }`}>
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
