import React from "react";
import { useTranslation } from "react-i18next";
import {
  Swords,
  Calendar,
  Clock,
  Trophy,
  Users,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";

export default function Tournaments() {
  const { t } = useTranslation();

  const tournaments = [
    {
      id: 1,
      title: t('human_vs_ai_go'),
      type: t('special_event'),
      date: t('today_2000'),
      prize: t('100k_points'),
      status: t('registering'),
      players: "12k/50k",
      img: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?w=800&q=80",
    },
    {
      id: 2,
      title: t('ai_mahjong_spring'),
      type: t('ai_league'),
      date: t('tomorrow_1400'),
      prize: t('s_tier_ai_cert'),
      status: t('starting_soon'),
      players: "256 AI",
      img: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80",
    },
    {
      id: 3,
      title: t('texas_weekend_masters'),
      type: t('weekly'),
      date: t('saturday_1900'),
      prize: t('50k_points'),
      status: t('registering'),
      players: "4.5k/10k",
      img: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&q=80",
    },
  ];

  const quickMatches = [
    {
      id: 1,
      name: t('mahjong_quick'),
      entry: t('100_points'),
      reward: t('500_points'),
      players: t('starts_with_3'),
    },
    {
      id: 2,
      name: t('chess_endgame'),
      entry: t('free'),
      reward: t('title_fragments'),
      players: t('solo_challenge'),
    },
    {
      id: 3,
      name: t('mahjong_bloody'),
      entry: t('500_points'),
      reward: t('2000_points'),
      players: t('starts_with_4'),
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
          {t('tournament_system')}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">
          {t('tournament_desc')}
        </p>
      </div>

      {/* Featured Tournaments */}
      <div className="space-y-6">
        <h2 className="text-xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
          <Trophy className="text-orange-500" />
          <span>{t('major_tournaments')}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tournaments.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              key={t.id}
              className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden group cursor-pointer hover:border-rose-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-rose-500/5 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>
              <div className="h-48 relative overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-rose-500/90 backdrop-blur-md text-white text-xs font-black rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-rose-400/50">
                    {t.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                    {t.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                    <Calendar size={16} className="text-zinc-500" />
                    <span className="truncate">{t.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-orange-50 dark:bg-orange-500/10 p-2.5 rounded-xl border border-orange-100 dark:border-orange-500/20">
                    <Trophy size={16} className="text-orange-500" />
                    <span className="text-orange-600 dark:text-orange-400 font-black truncate">
                      {t.prize}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-700/50 col-span-2">
                    <Users size={16} className="text-zinc-500" />
                    <span>{t.players}</span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-gradient-to-r hover:from-rose-600 hover:to-orange-600 text-zinc-900 dark:text-white hover:text-white rounded-xl font-black transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:border-transparent hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                  {t.status}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Matches */}
      <div className="space-y-6">
        <h2 className="text-xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
          <Clock className="text-rose-500" />
          <span>{t('quick_matches_play_now')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickMatches.map((qm, i) => (
            <motion.div
              whileHover={{ y: -2 }}
              key={qm.id}
              className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900 rounded-[1.5rem] border border-zinc-200/50 dark:border-zinc-800/50 hover:border-rose-500/30 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-rose-500/5 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div>
                <h4 className="font-black text-zinc-900 dark:text-zinc-200 mb-1.5">{qm.name}</h4>
                <div className="flex items-center space-x-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{t('entry')} {qm.entry}</span>
                  <span className="text-orange-600 dark:text-orange-400 font-bold bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded-md border border-orange-100 dark:border-orange-500/20">
                    {t('reward')} {qm.reward}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-orange-500 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                <ChevronRight
                  size={20}
                  className="text-zinc-400 group-hover:text-white transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
