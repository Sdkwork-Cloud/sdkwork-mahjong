import React from "react";
import { useTranslation } from "react-i18next";
import { Activity, ChevronRight, Users, Gamepad2, Play } from "lucide-react";
import { motion } from "motion/react";
import { LiveMatch } from "../../types/game.types";

interface LiveMatchesGridProps {
  liveMatches: LiveMatch[];
  onSpectate?: (match: LiveMatch) => void;
}

export default function LiveMatchesGrid({ liveMatches, onSpectate }: LiveMatchesGridProps) {
  const { t } = useTranslation();

  return (
    <div className="shrink-0 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <Activity className="text-emerald-500" />
          {t('live_matches', 'Live Matches')}
        </h2>
        <button className="text-sm font-bold text-zinc-500 hover:text-emerald-500 transition-colors flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          {t('view_all', 'View All')} <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveMatches.map((match) => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={match.id} 
            className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex flex-col gap-6 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity bg-[length:200%_auto] animate-gradient"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-black px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center gap-2 border border-emerald-100 dark:border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-white animate-ping"></span>
                {t('live', 'LIVE')}
              </span>
              <span className="text-xs font-bold text-zinc-500 flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 group-hover:border-emerald-500/30 group-hover:text-emerald-500 transition-colors">
                <Users size={12} className="text-emerald-500" /> {match.spectators}
              </span>
            </div>
            
            <div className="flex items-center justify-between px-2 relative z-10">
              <div className="flex flex-col items-center gap-3 w-1/3">
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-700 overflow-hidden shadow-lg z-10 relative group-hover:border-blue-500/50 transition-colors">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.teams[0].avatarSeed}&backgroundColor=b6e3f4`} alt="Human" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center z-20 shadow-md">
                    <span className="text-[10px] text-white font-black">P1</span>
                  </div>
                </div>
                <span className="text-sm font-black text-zinc-900 dark:text-white truncate w-full text-center group-hover:text-blue-500 transition-colors">{t(match.teams[0].nameKey)}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center px-2 w-1/3">
                <div className="text-2xl font-black text-zinc-300 dark:text-zinc-700 italic tracking-tighter mb-1 group-hover:scale-110 transition-transform group-hover:text-emerald-500/50">VS</div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20 whitespace-nowrap group-hover:bg-emerald-500 group-hover:text-white transition-colors">{t('ai_vs_human', 'AI vs Human')}</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 w-1/3">
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-emerald-500 overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] z-10 relative group-hover:bg-emerald-500/10 transition-colors">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${match.teams[1].avatarSeed}&backgroundColor=c0aede`} alt="AI" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center z-20 shadow-md">
                    <span className="text-[10px] text-white font-black">AI</span>
                  </div>
                </div>
                <span className="text-sm font-black text-zinc-900 dark:text-white truncate w-full text-center group-hover:text-emerald-500 transition-colors">{t(match.teams[1].nameKey)}</span>
              </div>
            </div>

            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex relative z-10">
              <div className="h-full bg-blue-500 w-[45%] relative">
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
              </div>
              <div className="h-full bg-emerald-500 w-[55%] relative"></div>
            </div>

            <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <Gamepad2 size={14} className="text-zinc-500 dark:text-zinc-400" />
                </div>
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{t(match.gameNameKey)} • {t('ranked_match', 'Ranked')}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onSpectate?.(match); }}
                className="text-xs font-black text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 px-5 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-1.5 active:scale-95 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white"
              >
                <Play size={12} fill="currentColor" /> {t('spectate', 'Spectate')}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
