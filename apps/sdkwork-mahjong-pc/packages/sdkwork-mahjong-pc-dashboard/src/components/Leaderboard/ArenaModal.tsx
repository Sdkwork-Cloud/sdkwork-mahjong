import React from "react";
import { useTranslation } from "react-i18next";
import { ShieldAlert, X } from "lucide-react";
import { motion } from "motion/react";

interface ArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  wagerAmount: number;
  setWagerAmount: (amount: number) => void;
  onConfirm: (amount: number) => void;
}

export default function ArenaModal({
  isOpen,
  onClose,
  wagerAmount,
  setWagerAmount,
  onConfirm,
}: ArenaModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 p-1.5 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center mb-4">
            <ShieldAlert size={32} className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">{t('set_up_arena')}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t('arena_desc')}</p>
        </div>

        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('base_wager')}</label>
            <div className="relative">
              <input 
                type="number" 
                value={wagerAmount}
                onChange={(e) => setWagerAmount(Number(e.target.value))}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-4 text-zinc-900 dark:text-white font-mono text-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 font-bold">PTS</div>
            </div>
            <p className="text-xs text-zinc-500 mt-2">{t('wager_match_warning')}</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">{t('taunt_message')}</label>
            <textarea 
              placeholder={t('taunt_placeholder')}
              className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-4 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none h-24"
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {t('cancel')}
          </button>
          <button 
            onClick={() => onConfirm(wagerAmount)}
            className="flex-1 py-3 rounded-xl font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all"
          >
            {t('publish_arena')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
