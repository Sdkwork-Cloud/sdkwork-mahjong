import React from "react";
import { useTranslation } from "react-i18next";
import { Trophy, Target, Zap, Medal } from "lucide-react";
import { motion } from "motion/react";

interface StatsOverviewProps {
  points?: string;
  winRate?: string;
  matches?: string | number;
  rank?: string;
}

export default function StatsOverview({
  points = "4,250",
  winRate = "54.2%",
  matches = 128,
  rank = "rising_star",
}: StatsOverviewProps) {
  const { t } = useTranslation();

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center justify-center text-center hover:border-rose-500/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-rose-500/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-rose-100 dark:border-rose-500/20">
          <Trophy className="text-rose-500" size={26} />
        </div>
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">{points}</span>
        <span className="text-xs text-zinc-500 font-bold mt-1.5 uppercase tracking-wider">{t('current_points')}</span>
      </motion.div>
      
      <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center justify-center text-center hover:border-orange-500/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-orange-500/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-orange-100 dark:border-orange-500/20">
          <Target className="text-orange-500" size={26} />
        </div>
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">{winRate}</span>
        <span className="text-xs text-zinc-500 font-bold mt-1.5 uppercase tracking-wider">{t('total_win_rate')}</span>
      </motion.div>
      
      <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-emerald-100 dark:border-emerald-500/20">
          <Zap className="text-emerald-500" size={26} />
        </div>
        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">{matches}</span>
        <span className="text-xs text-zinc-500 font-bold mt-1.5 uppercase tracking-wider">{t('total_matches')}</span>
      </motion.div>
      
      <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-100 dark:border-blue-500/20">
          <Medal className="text-blue-500" size={26} />
        </div>
        <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">{t(rank)}</span>
        <span className="text-xs text-zinc-500 font-bold mt-1.5 uppercase tracking-wider">{t('current_rank')}</span>
      </motion.div>
    </section>
  );
}
