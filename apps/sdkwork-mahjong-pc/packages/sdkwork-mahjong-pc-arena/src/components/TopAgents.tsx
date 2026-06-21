import React from "react";
import { Trophy, TrendingUp, TrendingDown, Swords } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export interface Agent {
  id: number;
  name: string;
  level: string;
  elo: number;
  winRate: string;
  games: string;
  type: string;
  developer: string;
  trend: string;
  status: string;
}

export interface TopAgentsProps {
  agents: Agent[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChallenge?: (agentId: number) => void;
  onLoadMore?: () => void;
}

export const TopAgents: React.FC<TopAgentsProps> = ({
  agents,
  activeTab,
  onTabChange,
  onChallenge,
  onLoadMore
}) => {
  const { t } = useTranslation();

  const tabs = [
    { key: "all", label: t('tab_all') },
    { key: "action", label: t('tab_action') },
    { key: "strategy", label: t('tab_strategy') },
    { key: "rpg", label: t('tab_rpg') },
    { key: "simulation", label: t('tab_simulation') }
  ];

  return (
    <div id="arena-leaderboard" className="bg-zinc-900/80 rounded-[2rem] border border-zinc-800 p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-black flex items-center space-x-2 text-white">
          <Trophy className="text-amber-500" />
          <span>{t('leaderboard_title')}</span>
        </h2>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.key 
                  ? "bg-white text-zinc-900" 
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((agent, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={agent.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/80 hover:border-zinc-700/80 transition-all group gap-4 relative overflow-hidden"
          >
            {i < 3 && (
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                i === 0 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" :
                i === 1 ? "bg-zinc-300 shadow-[0_0_10px_rgba(212,212,216,0.8)]" :
                "bg-amber-700 shadow-[0_0_10px_rgba(180,83,9,0.8)]"
              }`} />
            )}
            <div className="flex items-center space-x-4 pl-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${
                  i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]" :
                  i === 1 ? "bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-800 shadow-[0_0_20px_rgba(212,212,216,0.3)]" :
                  i === 2 ? "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 shadow-[0_0_20px_rgba(180,83,9,0.3)]" :
                  "bg-zinc-800/80 text-zinc-500 border border-zinc-700/50"
                }`}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-black text-white text-base flex items-center gap-2 group-hover:text-amber-400 transition-colors">
                  {agent.name}
                  <span className={`px-2 py-0.5 text-[10px] rounded uppercase font-black ${
                      agent.level.includes('S')
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {agent.level}
                  </span>
                  {agent.trend === 'up' ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-rose-500" />}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs text-zinc-400 font-medium bg-zinc-800/50 px-2 py-0.5 rounded-md">{agent.developer}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-xs text-zinc-500 font-bold">{agent.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:gap-8 justify-end pr-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">{t('elo_rating')}</p>
                <p className="text-amber-400 font-mono font-black text-sm drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">{agent.elo}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">{t('win_rate')}</p>
                <p className="text-emerald-400 font-mono font-black text-sm drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{agent.winRate}</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">{t('games_count')}</p>
                <p className="text-zinc-300 font-mono font-bold text-sm">{agent.games}</p>
              </div>
              <button 
                onClick={() => onChallenge?.(agent.id)}
                className="w-10 h-10 rounded-xl bg-zinc-800/80 hover:bg-rose-600 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-zinc-700/50 hover:border-rose-500 hover:shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:scale-110"
              >
                <Swords size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <button 
        onClick={onLoadMore}
        className="w-full mt-6 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white text-sm font-bold transition-colors border border-zinc-800"
      >
        {t('load_more_rankings')}
      </button>
    </div>
  );
};
