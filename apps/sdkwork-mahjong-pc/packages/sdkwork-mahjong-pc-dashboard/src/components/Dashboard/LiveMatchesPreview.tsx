import React from "react";
import { useTranslation } from "react-i18next";
import { Eye, Cpu, User } from "lucide-react";
import { motion } from "motion/react";

interface LiveMatch {
  id: number;
  game: string;
  player1: string;
  player2: string;
  status: string;
  viewers: string;
}

interface LiveMatchesPreviewProps {
  matches: LiveMatch[];
}

export default function LiveMatchesPreview({ matches }: LiveMatchesPreviewProps) {
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
          <Eye className="text-rose-500" />
          <span className="tracking-tight">{t('live_peak_showdown')}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            key={match.id}
            className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 p-5 flex flex-col gap-5 hover:shadow-xl hover:shadow-rose-500/5 hover:border-rose-500/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-bold rounded-full text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">
                {match.game}
              </span>
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 text-xs font-black tracking-wider bg-rose-50 dark:bg-rose-500/10 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_5px_rgba(244,63,94,1)]"></div>
                <span>LIVE {match.viewers}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-700 overflow-hidden shadow-md z-10 relative flex items-center justify-center">
                    <Cpu size={24} className="text-rose-500" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center z-20">
                    <span className="text-[8px] text-white font-bold">AI</span>
                  </div>
                </div>
                <span className="text-sm font-black text-zinc-900 dark:text-white truncate max-w-[80px] text-center">{match.player1.split(' ')[0]}</span>
              </div>
              
              <div className="flex flex-col items-center justify-center px-2">
                <div className="text-2xl font-black text-zinc-300 dark:text-zinc-700 italic tracking-tighter">VS</div>
                <span className="text-[10px] font-black text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-full mt-1 border border-orange-100 dark:border-orange-500/20">{match.status}</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-700 overflow-hidden shadow-md z-10 relative flex items-center justify-center">
                    <User size={24} className="text-orange-500" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center z-20">
                    <span className="text-[8px] text-white font-bold">P1</span>
                  </div>
                </div>
                <span className="text-sm font-black text-zinc-900 dark:text-white truncate max-w-[80px] text-center">{match.player2.split(' ')[0]}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
