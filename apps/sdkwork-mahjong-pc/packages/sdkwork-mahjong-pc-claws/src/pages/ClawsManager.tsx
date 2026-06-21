import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, Edit3, ShieldAlert, Activity, Cpu, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { isBlank, uuid } from "@sdkwork/utils";
import { useUserStore } from "sdkwork-mahjong-pc-core";
import { useToast } from "sdkwork-mahjong-pc-commons";

export interface Lobster {
  id: string;
  name: string;
  level: number;
  winRate: number;
  matches: number;
  power: number;
  status: "idle" | "training" | "defending";
}

interface ClawsManagerProps {
  setCurrentView?: (view: string) => void;
}

export default function ClawsManager({ setCurrentView }: ClawsManagerProps) {
  const { t } = useTranslation();
  const { profile, deductComputeTokens } = useUserStore();
  const { showToast, ToastComponent } = useToast();
  const [trainingLobster, setTrainingLobster] = useState<string | null>(null);
  const [lobsters, setLobsters] = useState<Lobster[]>([
    {
      id: "1",
      name: "Alpha Claw",
      level: 42,
      winRate: 68.5,
      matches: 124,
      power: 8500,
      status: "idle",
    },
    {
      id: "2",
      name: "Deep Blue Shell",
      level: 15,
      winRate: 45.2,
      matches: 31,
      power: 3200,
      status: "defending",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLobsterName, setNewLobsterName] = useState("");

  const handleCreateLobster = () => {
    if (isBlank(newLobsterName)) return;
    const newLobster: Lobster = {
      id: uuid(),
      name: newLobsterName,
      level: 1,
      winRate: 0,
      matches: 0,
      power: 1000,
      status: "idle",
    };
    setLobsters([newLobster, ...lobsters]);
    setNewLobsterName("");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setLobsters(lobsters.filter(l => l.id !== id));
  };

  const handleTrain = (id: string) => {
    if (!profile || profile.computeTokens < 500) {
      showToast(t('insufficient_compute', '??????????500 Tokens'), 'error');
      return;
    }

    setTrainingLobster(id);
    setTimeout(() => {
      const success = deductComputeTokens(500);
      if (success) {
        setLobsters(lobsters.map(l => {
          if (l.id === id) {
            return {
              ...l,
              power: l.power + Math.floor(Math.random() * 500) + 100,
              level: l.level + 1
            };
          }
          return l;
        }));
        showToast(t('train_success', '??????????'), 'success');
      }
      setTrainingLobster(null);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ToastComponent />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
            <span className="text-4xl">??</span>
            {t('my_claws', '????')}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-lg">
            {t('claws_desc', '????????????????????)}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20 hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          {t('create_claw', '??????)}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lobsters.map((lobster) => (
          <motion.div
            key={lobster.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl -z-10 group-hover:bg-rose-500/20 transition-colors" />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/30">
                  ??
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{lobster.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-xs font-bold text-zinc-300 border border-zinc-700">
                      Lv.{lobster.level}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                      lobster.status === 'idle' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      lobster.status === 'defending' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {lobster.status === 'idle' ? t('status_idle', '????) : 
                       lobster.status === 'defending' ? t('status_defending', '????) : 
                       t('status_training', '????)}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(lobster.id)}
                className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Activity size={14} />
                  <span className="text-xs font-medium uppercase tracking-wider">{t('win_rate', '??')}</span>
                </div>
                <div className="text-2xl font-black text-white">{lobster.winRate}%</div>
              </div>
              <div className="bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <Zap size={14} />
                  <span className="text-xs font-medium uppercase tracking-wider">{t('power', '??')}</span>
                </div>
                <div className="text-2xl font-black text-rose-400">{lobster.power}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => handleTrain(lobster.id)}
                disabled={trainingLobster === lobster.id || (profile?.computeTokens || 0) < 500}
                className={`flex-1 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                  (profile?.computeTokens || 0) < 500
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                {trainingLobster === lobster.id ? (
                  <span className="animate-pulse">{t('training', '????..')}</span>
                ) : (
                  <>
                    <Cpu size={18} />
                    {t('train_claw', '?? (500 Tokens)')}
                  </>
                )}
              </button>
              <button 
                onClick={() => setCurrentView?.("ringmatch")}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
              >
                <ShieldAlert size={18} />
                {t('go_defend', '????)}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 rounded-3xl p-8 max-w-md w-full border border-zinc-800 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <span>??</span> {t('create_claw', '??????)}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">
                <Plus className="rotate-45" size={24} />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">{t('claw_name', '????')}</label>
                <input
                  type="text"
                  value={newLobsterName}
                  onChange={(e) => setNewLobsterName(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                  placeholder={t('claw_name_placeholder', '????????)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-colors"
              >
                {t('cancel', '??')}
              </button>
              <button
                onClick={handleCreateLobster}
                disabled={isBlank(newLobsterName)}
                className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-rose-500/20"
              >
                {t('confirm_create', '????')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
