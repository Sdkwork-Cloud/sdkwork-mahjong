import React from "react";
import { useTranslation } from "react-i18next";
import { Trophy, ArrowRight, Cpu, User, TrendingUp, Zap, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PlayerRank {
  name: string;
  type: string;
  score: number;
  trend: string;
  rank: number;
}

interface LeaderboardPreviewProps {
  topRankings: PlayerRank[];
  leaderboardTab: string;
  setLeaderboardTab: (tab: string) => void;
  onNavigate: (view: string) => void;
}

export default function LeaderboardPreview({
  topRankings,
  leaderboardTab,
  setLeaderboardTab,
  onNavigate,
}: LeaderboardPreviewProps) {
  const { t } = useTranslation();

  return (
    <div className="xl:col-span-1 flex flex-col gap-8">
      <section className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 p-6 h-full flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-5 relative z-10">
          <h2 className="text-2xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
            <Trophy className="text-orange-500" />
            <span className="tracking-tight">{t('top_10_leaderboard')}</span>
          </h2>
          <button
            onClick={() => onNavigate("leaderboard")}
            className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-500 dark:hover:text-rose-300 font-black flex items-center group bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-xl transition-colors border border-rose-100 dark:border-rose-500/20"
          >
            {t('full_leaderboard')}{" "}
            <ArrowRight
              size={14}
              className="ml-1 transform group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Leaderboard Tabs */}
        <div className="flex items-center space-x-2 mb-5 bg-zinc-50 dark:bg-zinc-950/50 p-1.5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 relative z-10">
          {[
            { id: "daily", label: t('daily_rank') },
            { id: "season", label: t('season_rank') },
            { id: "allTime", label: t('all_time_rank') }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setLeaderboardTab(tab.id)}
              className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
                leaderboardTab === tab.id 
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-700/50" 
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-2 relative z-10 overflow-y-auto pr-2 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={leaderboardTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {topRankings.map((player, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 group hover:scale-[1.02] ${
                    i < 3 ? 'bg-zinc-50 dark:bg-zinc-950/80 border-zinc-200/50 dark:border-zinc-800/80 shadow-sm' : 'bg-transparent dark:bg-zinc-950/30 border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-950/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                        i === 0
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-zinc-950 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                          : i === 1
                            ? "bg-zinc-300 text-zinc-900"
                            : i === 2
                              ? "bg-amber-700 text-amber-100"
                              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {player.rank}
                    </div>
                    <div>
                      <p className={`font-bold text-sm flex items-center ${i < 3 ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                        {player.name}
                        {player.type === "AI" ? (
                          <Cpu size={12} className="ml-1.5 text-rose-500 dark:text-rose-400" />
                        ) : (
                          <User size={12} className="ml-1.5 text-orange-500 dark:text-orange-400" />
                        )}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">
                        {player.score.toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center ${player.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    <TrendingUp
                      size={16}
                      className={
                        player.trend === "down" ? "transform rotate-180" : ""
                      }
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 relative z-10 shrink-0">
          <div className="bg-gradient-to-r from-rose-50 dark:from-rose-500/10 to-orange-50 dark:to-orange-500/10 rounded-2xl p-5 border border-rose-100 dark:border-rose-500/20 flex items-center justify-between shadow-inner">
            <div>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-black uppercase tracking-wider mb-1">
                {t('your_rank')}
              </p>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600 dark:from-rose-400 dark:to-orange-400">#12,458</p>
            </div>
            <button 
              onClick={() => onNavigate("leaderboard")}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white text-sm font-black rounded-xl transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] border border-rose-400/50"
            >
              {t('go_rank_up')}
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="space-y-4">
        <motion.div 
          whileHover={{ y: -4 }}
          onClick={() => onNavigate("compute")}
          className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex items-center justify-between cursor-pointer hover:border-emerald-500/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-emerald-100 dark:border-emerald-500/20 shadow-inner">
              <Zap className="text-emerald-500" size={26} />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-1">{t('compute_center')}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t('balance')}</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-500/20">245K Tokens</span>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-emerald-400 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] font-black">
            <ArrowRight className="text-zinc-400 group-hover:text-white transition-colors" size={20} />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          onClick={() => onNavigate("mall")}
          className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex items-center justify-between cursor-pointer hover:border-rose-500/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-rose-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-rose-100 dark:border-rose-500/20 shadow-inner">
              <ShoppingBag className="text-rose-500" size={26} />
            </div>
            <div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight mb-1">{t('points_mall')}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t('balance')}</span>
                <span className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-100 dark:border-rose-500/20">12,450 pts</span>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-orange-500 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]">
            <ArrowRight className="text-zinc-400 group-hover:text-white transition-colors" size={20} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
