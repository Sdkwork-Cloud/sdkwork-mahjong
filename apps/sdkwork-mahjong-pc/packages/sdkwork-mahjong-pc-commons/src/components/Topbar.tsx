import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, Settings, Users, Zap, LogOut, User as UserIcon, Shield, ChevronRight, Star, Trophy, Globe, Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { useConfigStore, useUserStore } from "sdkwork-mahjong-pc-core";
import { useTheme } from "next-themes";
import StoreModal from "./StoreModal";

interface TopbarProps {
  setCurrentView?: (view: string) => void;
}

export default function Topbar({ setCurrentView }: TopbarProps) {
  const { t } = useTranslation();
  const { region, language, setRegion, setLanguage } = useConfigStore();
  const { profile, logout } = useUserStore();
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  };

  const toggleRegion = () => {
    const newRegion = region === 'CN' ? 'GLOBAL' : 'CN';
    setRegion(newRegion);
  };

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const currentLevel = profile?.level || 1;
  const currentXP = profile?.exp || 0;
  const nextLevelXP = currentLevel * 1000;
  const xpPercentage = (currentXP / nextLevelXP) * 100;

  const handleLogout = () => {
    logout();
    if (setCurrentView) setCurrentView("auth");
    setIsDropdownOpen(false);
  };

  return (
    <header className="h-20 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-900/80 rounded-full px-4 py-2 w-96 border border-zinc-200 dark:border-zinc-800 focus-within:border-rose-500/50 focus-within:ring-1 focus-within:ring-rose-500/50 transition-all shadow-inner">
        <Search size={18} className="text-zinc-500" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          className="bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-200 ml-3 w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4 mr-4 bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-1.5">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{profile?.points?.toLocaleString() || 0}</span>
          </div>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="flex items-center space-x-1.5">
            <Zap size={16} className="text-rose-500" />
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{profile?.computeTokens?.toLocaleString() || 0}</span>
          </div>
        </div>

        <button 
          onClick={toggleRegion}
          className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors text-sm font-medium"
        >
          <Globe size={18} />
          <span className="hidden sm:inline">{region === 'CN' ? t('region_cn') : t('region_global')}</span>
        </button>
        <button 
          onClick={toggleLanguage}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors text-sm font-bold"
        >
          {language === 'zh' ? 'EN' : '�?}
        </button>
        <button 
          onClick={cycleTheme}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          {theme === 'dark' ? <Moon size={20} /> : theme === 'light' ? <Sun size={20} /> : <Monitor size={20} />}
        </button>

        <button 
          onClick={() => setIsStoreModalOpen(true)}
          className="text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors relative group"
        >
          <Zap size={20} className="group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
        </button>
        <button className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 text-[9px] font-bold flex items-center justify-center rounded-full text-white border-2 border-white dark:border-zinc-950">
            3
          </span>
        </button>
        <button className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
          <Settings size={20} />
        </button>

        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 rounded-xl transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">{profile?.username || 'Guest'}</p>
              <div className="flex items-center justify-end space-x-1">
                <Shield size={12} className="text-rose-500 dark:text-rose-400" />
                <p className="text-xs text-rose-500 dark:text-rose-400 font-medium">Lv.{currentLevel} {profile?.vipLevel !== 'none' ? `VIP ${profile?.vipLevel.toUpperCase()}` : t('strategy_master')}</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-orange-500 border-2 border-white dark:border-zinc-800 p-0.5">
                <div className="w-full h-full rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <img src={profile?.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80"} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-[9px] font-black text-rose-500 dark:text-rose-400">{currentLevel}</span>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                {/* Header / Level Info */}
                <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/50 bg-gradient-to-b from-zinc-50 dark:from-zinc-800/30 to-transparent">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-orange-500 p-0.5">
                      <img src={profile?.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80"} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-zinc-900" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white">{profile?.username || 'Guest'}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">ID: {profile?.id || '---'}</p>
                    </div>
                  </div>
                  
                  {/* Level Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center space-x-1.5">
                        <Shield size={14} className="text-rose-600 dark:text-rose-500" />
                        <span className="text-sm font-black text-rose-500 dark:text-rose-400">Lv.{currentLevel} {t('strategy_master')}</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">{currentXP} / {nextLevelXP} XP</span>
                    </div>
                    <div className="h-2 bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${xpPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-rose-600 to-orange-500 relative"
                      >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9ImIiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMjBMMjAgMCAwIDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2IpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-30 animate-[slide_1s_linear_infinite]"></div>
                      </motion.div>
                    </div>
                    <p className="text-[10px] text-zinc-500 text-right">{t('xp_to_next_level')} {nextLevelXP - currentXP} XP</p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => {
                      if (setCurrentView) setCurrentView("profile");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <UserIcon size={16} className="text-zinc-400 dark:text-zinc-500 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors" />
                      <span className="text-sm font-medium">{t('profile')}</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (setCurrentView) setCurrentView("leaderboard");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Trophy size={16} className="text-zinc-400 dark:text-zinc-500 group-hover:text-yellow-500 transition-colors" />
                      <span className="text-sm font-medium">{t('my_ranking')}</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
                  </button>

                  <button 
                    onClick={() => {
                      setIsStoreModalOpen(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Star size={16} className="text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
                      <span className="text-sm font-medium">{t('privileges_subscription')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-500/20">PRO</span>
                      <ChevronRight size={14} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
                    </div>
                  </button>
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-zinc-200 dark:border-zinc-800/50">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="text-sm font-medium">{t('logout')}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <StoreModal 
        isOpen={isStoreModalOpen} 
        onClose={() => setIsStoreModalOpen(false)} 
      />
    </header>
  );
}
