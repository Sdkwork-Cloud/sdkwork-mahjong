import React from "react";
import { useTranslation } from "react-i18next";
import { Flame, Cpu, Star, Activity, Users, Play } from "lucide-react";
import { Game } from "../../types/game.types";

interface GameCardProps {
  game: Game;
  categoryName?: string;
  onPlay: (game: Game) => void;
  onCreateRoom: (game: Game) => void;
  onChallengeAI: (game: Game) => void;
}

export default function GameCard({
  game,
  categoryName,
  onPlay,
  onCreateRoom,
  onChallengeAI,
}: GameCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group relative bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="h-56 relative overflow-hidden shrink-0">
        <img
          src={game.img}
          alt={t(game.name)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {game.isHot && (
            <div className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 w-max backdrop-blur-md uppercase tracking-wider group-hover:scale-105 transition-transform shadow-orange-500/20">
              <Flame size={12} fill="currentColor" className="animate-pulse" />
              {t('hot', 'HOT')}
            </div>
          )}
          {game.aiDifficulty && (
            <div className="bg-zinc-900/80 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 w-max backdrop-blur-md border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Cpu size={12} />
              AI: {game.aiDifficulty}
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 bg-zinc-900/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 group-hover:bg-zinc-800 transition-colors shadow-lg">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          {game.rating}
        </div>

        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-lg mb-2 group-hover:text-emerald-400 transition-colors">
            {t(game.name)}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-md group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors">
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between bg-white dark:bg-zinc-900/50 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
            <Activity size={12} />
            {game.playersOnline} {t('online')}
          </div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{categoryName}</span>
        </div>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 mb-6">
          {t(game.desc)}
        </p>

        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onPlay(game)}
            className="flex-1 py-3.5 bg-zinc-900 dark:bg-white hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-zinc-900 hover:text-white rounded-xl font-black flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white group/playbtn"
          >
            <Play size={16} fill="currentColor" className="group-hover/playbtn:scale-110 transition-transform" />
            <span>{game.actionId ? t('enter_lobby') : t('play_now', '立即游玩')}</span>
          </button>

          <div className="flex gap-2">
            <button 
              onClick={() => onCreateRoom(game)}
              className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl flex items-center justify-center transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:text-emerald-500 dark:hover:text-emerald-400 shadow-sm active:scale-95 hover:border-emerald-500/30 group/btn hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              title={t('create_room')}
            >
              <Users size={18} className="group-hover/btn:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => onChallengeAI(game)}
              className="w-12 h-12 bg-emerald-50/50 dark:bg-emerald-500/5 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center transition-all duration-300 border border-emerald-200/50 dark:border-emerald-500/20 hover:text-emerald-700 dark:hover:text-emerald-300 shadow-sm active:scale-95 hover:border-emerald-500/50 group/btn hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              title={t('challenge_ai')}
            >
              <Cpu size={18} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
