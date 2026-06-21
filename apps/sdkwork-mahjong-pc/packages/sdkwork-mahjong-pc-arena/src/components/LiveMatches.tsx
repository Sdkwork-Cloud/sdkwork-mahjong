import React from "react";
import { Cpu, Activity } from "lucide-react";
import { Eye } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export interface LiveMatch {
  id: string;
  game: string;
  agent1: string;
  agent2: string;
  winProb1: number;
  winProb2: number;
  viewers: number;
  time: string;
}

export interface LiveMatchesProps {
  matches: LiveMatch[];
  onBet: (matchId: string) => void;
  bettingMatchId: string | null;
  onViewAll?: () => void;
}

export const LiveMatches: React.FC<LiveMatchesProps> = ({
  matches,
  onBet,
  bettingMatchId,
  onViewAll
}) => {
  const { t } = useTranslation();

  return (
    <div id="arena-live-matches-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black flex items-center space-x-2 text-white">
          <Activity className="text-rose-500" />
          <span>{t('live_matches_title')}</span>
        </h2>
        <button 
          onClick={onViewAll}
          className="text-sm text-zinc-400 hover:text-white font-bold transition-colors"
        >
          {t('view_all_matches')}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match) => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={match.id} 
            className="bg-zinc-900/80 border border-zinc-800/50 hover:border-zinc-700/50 rounded-[2rem] p-5 transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl hover:shadow-rose-500/5"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black text-zinc-300 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/50 backdrop-blur-md">
                {match.game}
              </span>
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-500 bg-zinc-950/50 px-3 py-1.5 rounded-lg">
                <span className="flex items-center gap-1.5"><Eye size={14} className="text-zinc-400" /> {match.viewers}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1.5"><Activity size={14} className="text-rose-500 animate-pulse" /> {match.time}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center shadow-inner relative group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow">
                  <Cpu size={20} className="text-blue-400" />
                </div>
                <span className="font-black text-white text-sm truncate w-full text-center">{match.agent1}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center w-1/3">
                <div className="text-xl font-black text-zinc-700 italic tracking-tighter mb-1">VS</div>
              </div>

              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center shadow-inner relative group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-shadow">
                  <Cpu size={20} className="text-orange-400" />
                </div>
                <span className="font-black text-white text-sm truncate w-full text-center">{match.agent2}</span>
              </div>
            </div>

            <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden flex shadow-inner mb-2">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 relative" style={{ width: `${match.winProb1}%` }}>
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
              </div>
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 relative" style={{ width: `${match.winProb2}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono font-black mb-4 px-1">
              <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{match.winProb1}%</span>
              <span className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">{match.winProb2}%</span>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onBet(match.id); }}
                disabled={bettingMatchId === match.id}
                className="flex-1 py-2.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl text-xs font-black transition-all duration-300 border border-blue-500/20 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                {bettingMatchId === match.id ? t('predicting') : t('support_agent', { name: match.agent1 })}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onBet(match.id); }}
                disabled={bettingMatchId === match.id}
                className="flex-1 py-2.5 bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white rounded-xl text-xs font-black transition-all duration-300 border border-orange-500/20 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
              >
                {bettingMatchId === match.id ? t('predicting') : t('support_agent', { name: match.agent2 })}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
