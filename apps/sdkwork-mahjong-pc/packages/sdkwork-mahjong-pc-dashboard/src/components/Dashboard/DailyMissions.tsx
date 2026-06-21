import React from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Gift } from "lucide-react";
import { motion } from "motion/react";

interface Mission {
  id: number;
  title: string;
  progress: number;
  total: number;
  completed: boolean;
  reward: string;
  icon: React.ReactNode;
}

interface DailyMissionsProps {
  missions: Mission[];
}

export default function DailyMissions({ missions }: DailyMissionsProps) {
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
          <Calendar className="text-emerald-500" />
          <span className="tracking-tight">{t('daily_missions')}</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map(mission => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={mission.id} 
            className={`p-5 rounded-[2rem] border transition-all duration-300 shadow-sm hover:shadow-xl ${mission.completed ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-500/20 hover:shadow-emerald-500/5' : 'bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800/50 hover:border-emerald-500/30 hover:shadow-emerald-500/5'}`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`p-2.5 rounded-xl ${mission.completed ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                {mission.icon}
              </div>
              {mission.completed ? (
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">{t('completed')}</span>
              ) : (
                <span className="text-xs font-black text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">{mission.progress} / {mission.total}</span>
              )}
            </div>
            <h3 className={`text-sm font-black mb-3 ${mission.completed ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-zinc-200'}`}>{mission.title}</h3>
            
            {!mission.completed && (
              <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" 
                  style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                ></div>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-100 dark:border-orange-500/20 w-max mt-auto">
              <Gift size={14} />
              <span>{t('reward')} {mission.reward}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
