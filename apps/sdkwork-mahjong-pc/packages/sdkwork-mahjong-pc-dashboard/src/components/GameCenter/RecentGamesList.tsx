import React from "react";
import { useTranslation } from "react-i18next";
import { History, Clock, Play } from "lucide-react";
import { motion } from "motion/react";
import { Game } from "../../types/game.types";

interface RecentGamesListProps {
  recentGames: Game[];
  onPlay: (game: Game) => void;
}

export default function RecentGamesList({ recentGames, onPlay }: RecentGamesListProps) {
  const { t } = useTranslation();

  return (
    <div className="shrink-0 mt-2 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <History className="text-emerald-500" size={20} />
          {t('recently_played', 'Recently Played')}
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recentGames.slice(0, 3).map((game) => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={`recent-${game.id}`}
            onClick={() => onPlay(game)}
            className="flex items-center gap-4 bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-3 rounded-[1.5rem] border border-zinc-200/50 dark:border-zinc-800/50 min-w-[280px] cursor-pointer hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative z-10 shadow-md group-hover:shadow-emerald-500/20 transition-shadow">
              <img src={game.img} alt={t(game.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <Play size={14} fill="currentColor" className="ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0 relative z-10">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white truncate mb-1 group-hover:text-emerald-500 transition-colors">{t(game.name)}</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                <Clock size={12} className="group-hover:text-emerald-500 transition-colors" />
                <span>2 {t('hours_ago', 'hours ago')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
