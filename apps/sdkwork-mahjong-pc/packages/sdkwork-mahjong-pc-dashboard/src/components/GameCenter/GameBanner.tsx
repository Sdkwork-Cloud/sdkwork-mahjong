import React from "react";
import { useTranslation } from "react-i18next";
import { Flame, Cpu, Play } from "lucide-react";
import { motion } from "motion/react";
import { FeatureBanner } from "../../types/game.types";

interface GameBannerProps {
  banner: FeatureBanner;
  onQuickMatch: (name: string) => void;
}

export default function GameBanner({ banner, onQuickMatch }: GameBannerProps) {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl shrink-0 h-[32rem] mt-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay z-10"></div>
      <img 
        src={banner.image} 
        alt="Featured" 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-[2s] ease-out"
      />
      <div className="absolute inset-0 z-20 p-12 flex flex-col justify-center w-full md:w-2/3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white text-xs font-black rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] uppercase tracking-wider group-hover:scale-105 transition-transform">
            <Flame size={14} className="animate-pulse" />
            {t(banner.tagKey)}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 text-emerald-400 text-xs font-black rounded-full uppercase tracking-wider group-hover:border-emerald-500/50 transition-colors">
            <Cpu size={14} />
            {t('ai_vs_human', 'AI vs Human')}
          </span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-tight drop-shadow-2xl group-hover:text-emerald-400 transition-colors duration-500"
        >
          {t(banner.titleKey)}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-zinc-300 font-medium mb-10 max-w-xl leading-relaxed drop-shadow-lg group-hover:text-white transition-colors duration-500"
        >
          {t(banner.subtitleKey)}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <button 
            onClick={() => onQuickMatch(t('ranked_match'))}
            className={`px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-black text-lg flex items-center space-x-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 active:scale-95 group/btn`}
          >
            <Play size={24} fill="currentColor" className="group-hover/btn:scale-110 transition-transform" />
            <span>{t('join_now')}</span>
          </button>
          <button 
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold text-lg flex items-center space-x-3 transition-all duration-300 border border-white/10 hover:border-white/30 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-white/20"
          >
            <span>{t('view_details', '查看详情')}</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
