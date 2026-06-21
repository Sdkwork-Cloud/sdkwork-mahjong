import React, { useState } from "react";
import { motion } from "motion/react";
import {
  BrainCircuit,
  Zap,
  Trophy,
  ArrowLeft,
  BookOpen,
  Atom,
  Calculator,
  Globe,
  Users,
} from "lucide-react";
import QuizGame from "./QuizGame";
import { useTranslation } from "react-i18next";

export default function QuizArena({
  setCurrentView,
}: {
  setCurrentView: (view: string) => void;
}) {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<"lobby" | "playing">("lobby");
  const [selectedMode, setSelectedMode] = useState<"stage" | "pk">("stage");
  const [selectedSubject, setSelectedSubject] = useState<string>("general");

  const subjects = [
    {
      id: "general",
      name: t('general_knowledge'),
      icon: <Globe size={24} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "math",
      name: t('extreme_math'),
      icon: <Calculator size={24} />,
      color: "from-rose-500 to-orange-500",
    },
    {
      id: "physics",
      name: t('quantum_physics'),
      icon: <Atom size={24} />,
      color: "from-purple-500 to-fuchsia-500",
    },
    {
      id: "history",
      name: t('history_river'),
      icon: <BookOpen size={24} />,
      color: "from-amber-500 to-yellow-500",
    },
  ];

  if (gameState === "playing") {
    return (
      <QuizGame
        mode={selectedMode}
        subject={selectedSubject}
        onExit={() => setGameState("lobby")}
      />
    );
  }

  return (
    <div className="space-y-8 pb-12 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentView("games")}
          className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight flex items-center gap-3">
            <BrainCircuit className="text-rose-500" size={32} />
            {t('quiz_arena_title')} <span className="text-rose-500">{t('quiz_arena_subtitle')}</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            {t('quiz_arena_desc')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Left Column: Modes */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Zap className="text-orange-500" /> {t('select_mode')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stage Mode */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMode("stage")}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                selectedMode === "stage"
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10 shadow-[0_0_30px_rgba(225,29,72,0.2)]"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl text-white shadow-lg shadow-rose-500/30">
                  <Trophy size={28} />
                </div>
                {selectedMode === "stage" && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {t('selected')}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">{t('extreme_stage')}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                {t('extreme_stage_desc')}
              </p>
            </motion.div>

            {/* PK Mode */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMode("pk")}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                selectedMode === "pk"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl text-white shadow-lg shadow-blue-500/30">
                  <Users size={28} />
                </div>
                {selectedMode === "pk" && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {t('selected')}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                {t('1v1_pk')}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                {t('1v1_pk_desc')}
              </p>
            </motion.div>
          </div>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mt-8">
            <BookOpen className="text-emerald-500" /> {t('select_subject')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((sub) => (
              <motion.button
                key={sub.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSubject(sub.id)}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all ${
                  selectedSubject === sub.id
                    ? `border-transparent bg-gradient-to-br ${sub.color} text-white shadow-lg`
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {sub.icon}
                <span className="font-bold text-sm">{sub.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Action */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col shadow-xl">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">{t('current_season_rewards')}</h3>
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 mb-6">
              <div className="text-center">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">{t('prize_pool_coins')}</p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 dark:from-rose-400 dark:to-orange-400 font-mono">
                  1,000,000
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">{t('my_revive_cards')}</span>
                <span className="text-zinc-900 dark:text-white font-bold font-mono">3 {t('cards')}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">{t('weekly_win_rate_pk')}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                  68%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">{t('rank_tier')}</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold">{t('knowledge_grandmaster')}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setGameState("playing")}
            className="w-full py-4 mt-6 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.5)] hover:scale-[1.02]"
          >
            <Zap fill="currentColor" />
            {selectedMode === "stage" ? t('start_stage') : t('match_opponent')}
          </button>
        </div>
      </div>
    </div>
  );
}
