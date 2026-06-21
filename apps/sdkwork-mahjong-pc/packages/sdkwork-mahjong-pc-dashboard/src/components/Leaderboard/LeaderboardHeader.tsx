import React from "react";
import { useTranslation } from "react-i18next";
import { Flame, Zap, ShieldAlert } from "lucide-react";

interface LeaderboardHeaderProps {
  onSetupArena: () => void;
}

export default function LeaderboardHeader({ onSetupArena }: LeaderboardHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white/80 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden shrink-0 shadow-sm dark:shadow-none">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-2">
          <Flame className="text-rose-500" size={28} />
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">
            {t('leaderboard_title')}
          </h1>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium font-sans">
          {t('leaderboard_desc')}
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-end gap-3">
        <div className="flex items-center space-x-2 bg-zinc-100/80 dark:bg-zinc-950/80 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
          <Zap size={16} className="text-orange-500" />
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-300">{t('s3_in_progress')}</span>
          <span className="text-xs text-zinc-500 ml-2">{t('days_left')}</span>
        </div>
        <button 
          onClick={onSetupArena}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border border-orange-400/50"
        >
          <ShieldAlert size={16} />
          <span>{t('set_up_arena')}</span>
        </button>
      </div>
    </div>
  );
}
