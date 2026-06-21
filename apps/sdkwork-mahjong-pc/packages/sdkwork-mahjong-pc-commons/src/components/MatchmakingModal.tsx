import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cpu, User, Search, ShieldAlert, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MatchmakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName?: string;
}

export default function MatchmakingModal({ isOpen, onClose, gameName }: MatchmakingModalProps) {
  const { t } = useTranslation();
  const defaultGameName = gameName || t('random_match');
  const [status, setStatus] = useState(t('searching_opponent'));
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setTimeElapsed(0);
      setStatus(t('searching_opponent'));
      
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);

      // Simulate matchmaking process
      setTimeout(() => setStatus(t('analyzing_strength')), 2000);
      setTimeout(() => setStatus(t('allocating_server')), 4000);
      setTimeout(() => setStatus(t('match_success')), 6000);
      setTimeout(() => {
        if (isOpen) {
          onClose();
          // Here you would typically navigate to the game room
        }
      }, 7500);
    }
    return () => clearInterval(timer);
  }, [isOpen, onClose, t]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 20 }} 
          className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Radar Animation Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <motion.div 
              animate={{ scale: [1, 2, 3], opacity: [0.5, 0.2, 0] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border border-rose-500"
            />
            <motion.div 
              animate={{ scale: [1, 2, 3], opacity: [0.5, 0.2, 0] }} 
              transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border border-rose-500"
            />
            <motion.div 
              animate={{ scale: [1, 2, 3], opacity: [0.5, 0.2, 0] }} 
              transition={{ duration: 2, delay: 1.2, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border border-rose-500"
            />
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 flex flex-col items-center text-center relative z-10">
            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-950 rounded-full border-2 border-rose-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(225,29,72,0.3)] relative">
              <Search size={40} className="text-rose-500 animate-pulse" />
              <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-900">
                {defaultGameName}
              </div>
            </div>

            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
              {status}
            </h2>
            
            <p className="text-zinc-500 dark:text-zinc-400 font-mono text-lg mb-8">
              00:{timeElapsed.toString().padStart(2, '0')}
            </p>

            <div className="w-full grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center">
                <User size={24} className="text-orange-500 mb-2" />
                <span className="text-xs text-zinc-500 font-bold">{t('my_power')}</span>
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-200">4,250</span>
              </div>
              <div className="bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-rose-500/5 animate-pulse"></div>
                <Cpu size={24} className="text-rose-500 mb-2 relative z-10" />
                <span className="text-xs text-zinc-500 font-bold relative z-10">{t('match_range')}</span>
                <span className="text-lg font-black text-zinc-900 dark:text-zinc-200 relative z-10">4,000 - 4,500</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-3.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors"
            >
              {t('cancel_match')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
