import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, RefreshCw } from 'lucide-react';

const INITIAL_LOGS = [
  { text: 'SYSTEM SHOTDOWN: COMPLETED REBOOT', type: 'system' },
  { text: 'HACKTECK PLATFORM [v2.26.1] - BOOT SEQUENCE INITIALIZED', type: 'info' },
  { text: 'LOADING ENGINE: REACT DOM + TAILWIND ENGINE [OK]', type: 'success' },
  { text: 'SECURING INFRASTRUCTURE: TESTING PERIMETER...', type: 'warning' },
  { text: 'CYBERSECURITY LAYER: INSTANTIATED SHIELD CONSOLE', type: 'success' },
  { text: 'AI CORE INTERACTION: AGENT SUBSYSTEM ENGAGED', type: 'info' },
  { text: 'ALL MODULES INITIALIZING... STATE: YA VIENE 2026', type: 'success' },
  { text: 'CONSOLA DE TELEMETRÍA LISTA. INTERACTÚA CON LOS NODOS DEL NÚCLEO.', type: 'system' },
];

export default function TelemetryConsole({ activeNodeData }) {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [inputValue, setInputValue] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const consoleEndRef = useRef(null);

  // Auto-scroll to bottom of console
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Track active node changes to insert log lines
  useEffect(() => {
    if (activeNodeData) {
      const timestamp = new Date().toLocaleTimeString();
      const nodeLog = {
        text: `[${timestamp}] ENLACE ESTABLECIDO CON: [${activeNodeData.label.toUpperCase()}] // DIAGNÓSTICO: SISTEMA LISTO EN FASE 02`,
        type: 'success'
      };
      setLogs(prev => [...prev, nodeLog]);
    }
  }, [activeNodeData]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const cmd = inputValue.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    const userLog = { text: `user@hackteck:~$ ${inputValue}`, type: 'user' };
    
    let responseLog = { text: '', type: 'system' };

    switch (cmd) {
      case 'help':
        responseLog = { 
          text: `[${timestamp}] COMANDOS DISPONIBLES: 'status', 'clear', 'diagnose', 'hackteck', 'contact'`, 
          type: 'info' 
        };
        break;
      case 'status':
        responseLog = { 
          text: `[${timestamp}] HACKTECK CORE: [ACTIVE] // ECOSYSTEM: [INITIALIZING] // FAILS: [0]`, 
          type: 'success' 
        };
        break;
      case 'clear':
        setLogs([]);
        setInputValue('');
        return;
      case 'diagnose':
        runAutoDiagnostic();
        setInputValue('');
        return;
      case 'hackteck':
        responseLog = { 
          text: `[${timestamp}] ECOSISTEMA TECNOLÓGICO DE ALTO RENDIMIENTO. PREPARANDO LANZAMIENTO 2026.`, 
          type: 'info' 
        };
        break;
      case 'contact':
        responseLog = { 
          text: `[${timestamp}] RED DE COMUNICACIÓN: whatsapp: +56 9 5412 1107 | email: contacto@hackteck.cl`, 
          type: 'warning' 
        };
        break;
      default:
        responseLog = { 
          text: `[${timestamp}] COMANDO NO RECONOCIDO: '${cmd}'. ESCRIBE 'help' PARA LISTADO.`, 
          type: 'error' 
        };
    }

    setLogs(prev => [...prev, userLog, responseLog]);
    setInputValue('');
  };

  const runAutoDiagnostic = () => {
    if (isDiagnosing) return;
    setIsDiagnosing(true);
    
    const diagSteps = [
      { text: 'INICIANDO AUTODIAGNÓSTICO COMPLETO...', type: 'warning' },
      { text: 'ESCANEO DE PUERTOS Y PROTOCOLOS... 100% LIMPIO', type: 'success' },
      { text: 'VERIFICACIÓN DE INTEGRIDAD DEL LOGO DE LETRAS... CORRECTO', type: 'success' },
      { text: 'SIMULACIÓN DE CARGA DE CIBERSEGURIDAD... SHIELD ACTIVE', type: 'success' },
      { text: 'INTEGRACIÓN DE AGENTE IA HACKTECK... ONLINE', type: 'success' },
      { text: 'SISTEMA ESTABLE Y LISTO PARA LA EVOLUCIÓN 2026.', type: 'info' }
    ];

    diagSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (idx === diagSteps.length - 1) {
          setIsDiagnosing(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="w-full glass-panel rounded-lg overflow-hidden border border-slate-800 flex flex-col font-mono text-xs shadow-2xl relative">
      {/* Console Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-slate-400 font-bold tracking-wider text-[10px]">CONSOLE_TELEMETRY://HACKTECK_CORE</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={runAutoDiagnostic}
            disabled={isDiagnosing}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border text-[10px] transition-all duration-300 ${
              isDiagnosing 
                ? 'border-slate-800 text-slate-600 bg-transparent' 
                : 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20 hover:bg-cyan-500 hover:text-black hover:border-cyan-400'
            }`}
          >
            <RefreshCw size={10} className={isDiagnosing ? 'animate-spin' : ''} />
            <span>DIAGNÓSTICO</span>
          </button>
          <div className="flex space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
          </div>
        </div>
      </div>

      {/* Console Logs Area */}
      <div className="flex-1 p-4 max-h-[220px] min-h-[160px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-slate-950 bg-slate-950/95 relative">
        {/* Glow grid background behind logs */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03),transparent)] pointer-events-none" />
        
        {logs.map((log, index) => {
          let colorClass = 'text-slate-400';
          let prefix = '[SYS]';

          if (log.type === 'success') {
            colorClass = 'text-cyan-400';
            prefix = '[OK]';
          } else if (log.type === 'warning') {
            colorClass = 'text-yellow-500';
            prefix = '[WRN]';
          } else if (log.type === 'error') {
            colorClass = 'text-red-500 font-bold';
            prefix = '[ERR]';
          } else if (log.type === 'info') {
            colorClass = 'text-magenta-400';
            prefix = '[INF]';
          } else if (log.type === 'user') {
            colorClass = 'text-slate-200';
            prefix = '>';
          }

          return (
            <div key={index} className={`flex items-start leading-relaxed select-all ${colorClass}`}>
              <span className="opacity-50 mr-2 shrink-0">{prefix}</span>
              <span>{log.text}</span>
            </div>
          );
        })}
        <div ref={consoleEndRef} />
      </div>

      {/* Input Terminal Command line */}
      <form onSubmit={handleCommandSubmit} className="bg-slate-950 border-t border-slate-800/80 px-4 py-2.5 flex items-center">
        <span className="text-cyan-500 mr-2 shrink-0 font-bold">user@hackteck:~$</span>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe 'help' o interactúa con el núcleo..."
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-700 text-xs py-0.5"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
