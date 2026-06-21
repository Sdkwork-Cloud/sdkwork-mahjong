import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Users, Lock, Unlock, Settings, Gamepad2, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoomModal({ isOpen, onClose }: CreateRoomModalProps) {
  const { t } = useTranslation();
  const [roomName, setRoomName] = useState(t('default_room_name'));
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [gameMode, setGameMode] = useState("standard");
  const [playerLimit, setPlayerLimit] = useState(2);

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
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }} 
          className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <Users className="text-orange-500" />
              {t('create_room')}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <Settings size={16} /> {t('room_name')}
              </label>
              <input 
                type="text" 
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                placeholder={t('enter_room_name')}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <Gamepad2 size={16} /> {t('game_mode')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setGameMode("standard")}
                  className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${
                    gameMode === "standard" 
                      ? "bg-orange-50 dark:bg-orange-500/10 border-orange-500 text-orange-600 dark:text-orange-500" 
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {t('standard_competitive')}
                </button>
                <button 
                  onClick={() => setGameMode("casual")}
                  className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${
                    gameMode === "casual" 
                      ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-500" 
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  {t('casual_entertainment')}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <Users size={16} /> {t('player_count')}
              </label>
              <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2">
                {[2, 3, 4, 8].map(num => (
                  <button
                    key={num}
                    onClick={() => setPlayerLimit(num)}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${
                      playerLimit === num
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm dark:shadow-none"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    {t('players_count', { count: num })}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                  <Shield size={16} /> {t('private_room')}
                </label>
                <button 
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isPrivate ? "bg-orange-500" : "bg-zinc-200 dark:bg-zinc-800"}`}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"
                    animate={{ x: isPrivate ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {isPrivate && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder={t('set_room_password')}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-bold transition-colors"
            >
              {t('cancel')}
            </button>
            <button 
              onClick={() => {
                // Handle room creation
                onClose();
              }}
              className="flex-1 py-3.5 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              {t('create_room')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
