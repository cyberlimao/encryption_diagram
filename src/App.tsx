import React from 'react';
import { Lock, Unlock, Server, User, AlertTriangle, ShieldCheck, EyeOff, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';

const NodeCard = ({ title, subtitle, icon: Icon, children, className = "", iconColor = "text-neutral-400", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`flex flex-col items-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md w-full md:w-48 relative z-10 transition-colors hover:bg-white/[0.04] ${className}`}
  >
    <h3 className="text-neutral-200 font-medium mb-4 tracking-wide">{title}</h3>
    <div className={`w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4 border border-white/5 shadow-inner ${iconColor}`}>
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <div className="text-xs text-neutral-400 text-center h-8 flex items-center">
      {subtitle}
    </div>
    {children && <div className="mt-4 w-full">{children}</div>}
  </motion.div>
);

const ConnectionLine = ({ label, icon: Icon, colorClass, lineStyle = "dashed", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    className="flex-1 flex flex-col items-center justify-center relative min-w-[40px] md:min-w-[120px] h-16 md:h-auto my-4 md:my-0"
  >
    {/* Line (Desktop: horizontal, Mobile: vertical) */}
    <div className={`absolute z-0 opacity-40
      md:w-full md:h-[1px] md:top-1/2 md:-translate-y-1/2 md:left-0 md:-translate-x-0
      w-[1px] h-full left-1/2 -translate-x-1/2 top-0
      ${lineStyle === 'dashed' 
        ? `border-l md:border-l-0 md:border-t border-dashed ${colorClass.replace('text-', 'border-')}` 
        : `${colorClass.replace('text-', 'bg-')}`
      }`} 
    />
    
    {/* Badge */}
    <div className="relative z-10 bg-[#050505] px-3 py-1.5 flex flex-col items-center gap-1.5 rounded-lg border border-white/5">
      <Icon size={14} className={colorClass} strokeWidth={2} />
      <span className="text-[10px] text-neutral-500 uppercase tracking-wider whitespace-nowrap hidden md:block">{label}</span>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center selection:bg-white/10">
      <div className="max-w-5xl w-full space-y-16 md:space-y-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-widest text-white/90">
            加密方式比較
          </h1>
          <p className="text-sm text-neutral-500 font-mono tracking-widest uppercase">
            E2EE <span className="mx-2 text-neutral-700">vs</span> HTTPS/TLS
          </p>
        </motion.div>

        {/* HTTPS/TLS Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-12 pt-12 md:pt-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6 py-2 border border-white/5 rounded-full flex items-center gap-3 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <h2 className="text-neutral-300 text-xs font-mono tracking-widest uppercase">HTTPS/TLS 加密</h2>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4">
            <NodeCard 
              title="發送者" 
              subtitle="明文數據" 
              icon={User}
              iconColor="text-neutral-300"
              delay={0.2}
            />
            
            <ConnectionLine 
              label="加密傳輸" 
              icon={Lock} 
              colorClass="text-amber-500/70" 
              lineStyle="dashed"
              delay={0.3}
            />

            <NodeCard 
              title="伺服器" 
              subtitle="數據在此解密與重新加密" 
              icon={Server}
              className="border-red-500/10 bg-red-500/[0.01]"
              iconColor="text-red-400/80"
              delay={0.4}
            >
              <div className="flex items-center justify-center gap-2 text-[11px] text-red-400/80 bg-red-500/5 py-2 px-3 rounded-md border border-red-500/10">
                <AlertTriangle size={12} />
                <span>可讀取明文</span>
              </div>
            </NodeCard>

            <ConnectionLine 
              label="加密傳輸" 
              icon={Lock} 
              colorClass="text-amber-500/70" 
              lineStyle="dashed"
              delay={0.5}
            />

            <NodeCard 
              title="接收者" 
              subtitle="明文數據" 
              icon={User}
              iconColor="text-neutral-300"
              delay={0.6}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 md:mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 text-center">
              <AlertTriangle size={14} className="text-amber-500/70 shrink-0" />
              <span>伺服器可以讀取、存儲和處理所有數據</span>
            </div>
          </motion.div>
        </motion.section>

        {/* E2EE Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-12 pt-12 md:pt-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6 py-2 border border-white/5 rounded-full flex items-center gap-3 whitespace-nowrap">
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
            <h2 className="text-neutral-300 text-xs font-mono tracking-widest uppercase">端到端加密 (E2EE)</h2>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4">
            <NodeCard 
              title="發送者" 
              subtitle="" 
              icon={User}
              iconColor="text-neutral-300"
              delay={0.5}
            >
              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400/80 bg-emerald-500/5 py-2 px-3 rounded-md border border-emerald-500/10">
                <Lock size={12} />
                <span>本地加密</span>
              </div>
            </NodeCard>
            
            <ConnectionLine 
              label="保持加密" 
              icon={KeyRound} 
              colorClass="text-emerald-500/70" 
              lineStyle="solid"
              delay={0.6}
            />

            <NodeCard 
              title="伺服器" 
              subtitle="只轉發加密數據" 
              icon={Server}
              className="border-white/5"
              iconColor="text-neutral-500"
              delay={0.7}
            >
              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 bg-white/5 py-2 px-3 rounded-md border border-white/5">
                <EyeOff size={12} />
                <span>無法解密</span>
              </div>
            </NodeCard>

            <ConnectionLine 
              label="保持加密" 
              icon={KeyRound} 
              colorClass="text-emerald-500/70" 
              lineStyle="solid"
              delay={0.8}
            />

            <NodeCard 
              title="接收者" 
              subtitle="" 
              icon={User}
              iconColor="text-neutral-300"
              delay={0.9}
            >
              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400/80 bg-emerald-500/5 py-2 px-3 rounded-md border border-emerald-500/10">
                <Unlock size={12} />
                <span>本地解密</span>
              </div>
            </NodeCard>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-10 md:mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5 text-center">
              <ShieldCheck size={14} className="text-emerald-500/70 shrink-0" />
              <span>只有發送者和接收者擁有解密密鑰</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Legend */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4 text-xs text-neutral-500 font-mono uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-amber-500/70" />
            <span>傳輸中加密</span>
          </div>
          <div className="flex items-center gap-2">
            <KeyRound size={14} className="text-emerald-500/70" />
            <span>端到端加密</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-400/70" />
            <span>可讀取明文</span>
          </div>
          <div className="flex items-center gap-2">
            <EyeOff size={14} className="text-neutral-400" />
            <span>無法讀取</span>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
