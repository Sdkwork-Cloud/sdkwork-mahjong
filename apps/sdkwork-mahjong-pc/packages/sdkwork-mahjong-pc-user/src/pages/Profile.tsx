import React from "react";
import {
  User,
  Settings,
  Medal,
  Trophy,
  Activity,
  History,
  Star,
  Shield,
  UserPlus,
  Swords,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface ProfileProps {
  isPublic?: boolean;
  playerData?: any;
  onBack?: () => void;
}

export default function Profile({ isPublic = false, playerData, onBack }: ProfileProps) {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('total_games'),
      value: playerData?.totalGames || "1,245",
      icon: <Activity className="text-rose-400" />,
    },
    {
      label: t('win_rate'),
      value: playerData?.winRate || "68.5%",
      icon: <Trophy className="text-emerald-400" />,
    },
    {
      label: t('max_streak'),
      value: playerData?.maxStreak || "12",
      icon: <Star className="text-orange-400" />,
    },
    {
      label: t('ai_defeats'),
      value: playerData?.aiDefeats || "342",
      icon: <Shield className="text-rose-500" />,
    },
  ];

  const achievements = [
    {
      id: 1,
      name: t('ai_terminator'),
      desc: t('ai_terminator_desc'),
      icon: "🤖",
      unlocked: true,
    },
    {
      id: 2,
      name: t('texas_king'),
      desc: t('texas_king_desc'),
      icon: "🃏",
      unlocked: true,
    },
    {
      id: 3,
      name: t('invincible'),
      desc: t('invincible_desc'),
      icon: "⚔️",
      unlocked: true,
    },
    {
      id: 4,
      name: t('chess_master'),
      desc: t('chess_master_desc'),
      icon: "♟️",
      unlocked: false,
    },
  ];

  const history = [
    {
      id: 1,
      game: t('game_mahjong'),
      result: t('victory'),
      opponent: "DeepAgent (A级)",
      time: "10分钟前",
      score: "+25",
    },
    {
      id: 2,
      game: t('game_texas_holdem'),
      result: t('defeat'),
      opponent: "人类_赌神",
      time: "2小时前",
      score: "-15",
    },
    {
      id: 3,
      game: t('game_chinese_chess'),
      result: t('victory'),
      opponent: "SuanFa_Master (A级)",
      time: "昨天",
      score: "+30",
    },
  ];

  const currentLevel = playerData?.level || 42;
  const currentXP = playerData?.xp || 8450;
  const nextLevelXP = 10000;
  const xpPercentage = (currentXP / nextLevelXP) * 100;
  
  const playerName = playerData?.name || "人类玩家_9527";
  const playerTitle = playerData?.title || t('strategy_master');
  const playerAvatar = playerData?.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80";
  const isAI = playerData?.type === "AI";

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button for Public Profile */}
      {isPublic && onBack && (
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-bold">{t('back_to_leaderboard')}</span>
        </button>
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 relative overflow-hidden shadow-xl">
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${isAI ? 'bg-rose-600/10 dark:bg-rose-600/20' : 'bg-orange-600/10 dark:bg-orange-600/20'}`}></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className={`w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 flex-shrink-0 relative p-1 ${isAI ? 'bg-gradient-to-tr from-rose-600 to-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.3)]' : 'bg-gradient-to-tr from-orange-500 to-amber-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]'}`}>
            <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
              <img src={playerAvatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {!isPublic && (
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <Settings size={16} className="text-zinc-600 dark:text-zinc-300" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight flex items-center justify-center md:justify-start space-x-3">
                  <span>{playerName}</span>
                  {isAI && (
                    <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs rounded-md border border-rose-200 dark:border-rose-500/30">AI Agent</span>
                  )}
                </h1>
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-black flex items-center space-x-1 ${isAI ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 shadow-[0_0_10px_rgba(225,29,72,0.1)]' : 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]'}`}>
                    <Shield size={14} />
                    <span>Lv.{currentLevel} {playerTitle}</span>
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                    ID: {playerData?.id || "88482931"}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-3 justify-center">
                {isPublic ? (
                  <>
                    {!isAI && (
                      <button className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors border border-zinc-200 dark:border-zinc-700 flex items-center space-x-2">
                        <UserPlus size={18} />
                        <span>{t('add_friend')}</span>
                      </button>
                    )}
                    <button className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] flex items-center space-x-2">
                      <Swords size={18} />
                      <span>{t('challenge')}</span>
                    </button>
                  </>
                ) : (
                  <button className="px-6 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors border border-zinc-200 dark:border-zinc-700">
                    {t('edit_profile')}
                  </button>
                )}
              </div>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-2xl font-medium italic mb-6">
              {isAI ? t('ai_quote') : t('human_quote')}
            </p>

            {/* Level Progress Bar */}
            <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800/50 max-w-2xl">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{t('current_level_progress')}</span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400"><span className={`${isAI ? 'text-rose-600 dark:text-rose-400' : 'text-orange-600 dark:text-orange-400'} font-bold`}>{currentXP}</span> / {nextLevelXP} XP</span>
              </div>
              <div className="h-3 bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full relative ${isAI ? 'bg-gradient-to-r from-rose-600 to-rose-500' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`}
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9ImIiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMjBMMjAgMCAwIDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2IpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-30 animate-[slide_1s_linear_infinite]"></div>
                </motion.div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-medium">
                <span>Lv.{currentLevel}</span>
                <span>{t('xp_to_next_level')} {nextLevelXP - currentXP} XP</span>
                <span>Lv.{currentLevel + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 flex items-center space-x-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/50">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 font-bold">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white font-mono">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Path */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
              <Shield className="text-orange-500" />
              <span>{t('growth_path')}</span>
            </h2>
            <button className="text-sm text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-bold">
              {t('view_privileges')}
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 overflow-hidden shadow-xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-orange-500/5 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              {[
                { level: 1, title: t('novice'), xp: "0", active: true, passed: true },
                { level: 10, title: t('advanced'), xp: "1,000", active: true, passed: true },
                { level: 30, title: t('expert'), xp: "5,000", active: true, passed: true },
                { level: 42, title: t('strategy_master'), xp: "8,450", active: true, current: true },
                { level: 50, title: t('grandmaster'), xp: "12,000", active: false },
                { level: 100, title: t('chess_saint'), xp: "50,000", active: false },
              ].map((tier, index, array) => (
                <div key={tier.level} className="flex flex-col items-center relative flex-1">
                  {/* Connecting Line */}
                  {index < array.length - 1 && (
                    <div className={`absolute top-6 left-[50%] right-[-50%] h-1 -z-10 ${tier.passed ? 'bg-rose-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                      {tier.current && (
                        <motion.div 
                          className="h-full bg-rose-500"
                          initial={{ width: 0 }}
                          animate={{ width: "40%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Node */}
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center mb-3 bg-white dark:bg-zinc-900 z-10 transition-all ${
                    tier.current ? 'border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.5)] scale-110' : 
                    tier.passed ? 'border-rose-500/50 text-rose-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'
                  }`}>
                    <span className={`font-black ${tier.current ? 'text-rose-500' : ''}`}>{tier.level}</span>
                  </div>
                  
                  {/* Text */}
                  <div className="text-center">
                    <p className={`font-bold text-sm ${tier.current ? 'text-zinc-900 dark:text-white' : tier.passed ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-600'}`}>{tier.title}</p>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">{tier.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <h2 className="text-xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
            <Medal className="text-orange-500" />
            <span>{t('honor_medals')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all ${
                  ach.unlocked
                    ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-rose-500/50 shadow-lg"
                    : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 opacity-50 grayscale"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{ach.icon}</div>
                  <div>
                    <h4 className="font-black text-zinc-900 dark:text-zinc-200 mb-1">
                      {ach.name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black flex items-center space-x-2 text-zinc-900 dark:text-white">
              <History className="text-rose-500" />
              <span>{t('recent_matches')}</span>
            </h2>
            <button className="text-sm text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 font-bold">
              {t('view_all')}
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xl">
            {history.map((h, i) => (
              <div
                key={h.id}
                className={`flex items-center justify-between p-5 ${i !== history.length - 1 ? "border-b border-zinc-200 dark:border-zinc-800" : ""} hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-10 rounded-full ${h.result === t('victory') ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.4)]"}`}
                  ></div>
                  <div>
                    <h4 className="font-black text-zinc-900 dark:text-zinc-200">{h.game}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                      vs {h.opponent} • {h.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-black font-mono text-lg ${h.result === t('victory') ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}
                  >
                    {h.result}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-bold">
                    {h.score} {t('points')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
