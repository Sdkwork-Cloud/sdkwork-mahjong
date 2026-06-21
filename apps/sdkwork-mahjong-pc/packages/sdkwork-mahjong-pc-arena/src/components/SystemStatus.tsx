import React from "react";
import { Server, Cpu, Activity, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SystemStatus: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div id="arena-system-status" className="bg-zinc-900/80 rounded-[2rem] border border-zinc-800 p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -z-10 group-hover:bg-emerald-500/20 transition-colors duration-500" />
      <h2 className="text-lg font-black flex items-center space-x-2 mb-6 text-white">
        <Server className="text-emerald-500" />
        <span>{t('system_status_title')}</span>
      </h2>
      <div className="space-y-6">
        <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
          <div className="flex justify-between items-center text-xs mb-3">
            <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Cpu size={12} className="text-emerald-500" /> {t('active_agents')}
            </span>
            <span className="text-white font-mono font-black text-sm">12,405</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[75%] relative">
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
          <div className="flex justify-between items-center text-xs mb-3">
            <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={12} className="text-blue-500" /> {t('today_matches')}
            </span>
            <span className="text-white font-mono font-black text-sm">845,210</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[90%] relative">
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-orange-500/5 animate-pulse"></div>
          <div className="flex justify-between items-center text-xs mb-3 relative z-10">
            <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={12} className="text-orange-500" /> {t('total_compute')}
            </span>
            <span className="text-orange-400 font-mono font-black text-sm drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">45.2 PFLOPS</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[60%] relative">
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1.5s_infinite] -skew-x-12 translate-x-[-100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
