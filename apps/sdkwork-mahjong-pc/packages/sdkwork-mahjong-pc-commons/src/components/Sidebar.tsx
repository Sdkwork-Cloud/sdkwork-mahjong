import React from "react";
import {
  Gamepad2,
  Cpu,
  Trophy,
  Swords,
  ShieldAlert,
  User,
  Activity,
  Flame,
  Zap,
  ShoppingBag,
  CreditCard,
  Crown
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    { id: "dashboard", label: t('dashboard'), icon: <Activity size={20} /> },
    { id: "leaderboard", label: t('leaderboard'), icon: <Trophy size={20} /> },
    { id: "arena", label: t('ai_arena_title'), icon: <Cpu size={20} /> },
    { id: "ringmatch", label: t('ring_match'), icon: <ShieldAlert size={20} /> },
    { id: "tournaments", label: t('tournaments'), icon: <Swords size={20} /> },
    { id: "games", label: t('game_center'), icon: <Gamepad2 size={20} /> },
    { id: "claws", label: t('my_claws'), icon: <span className="text-xl leading-none">🦞</span> },
    { id: "compute", label: t('compute_center'), icon: <Zap size={20} /> },
    { id: "mall", label: t('points_mall'), icon: <ShoppingBag size={20} /> },
    { id: "wallet", label: t('wallet_center'), icon: <CreditCard size={20} /> },
    { id: "subscription", label: t('vip_privilege'), icon: <Crown size={20} /> },
    { id: "profile", label: t('profile'), icon: <User size={20} /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800/50 flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-600/5 dark:from-rose-600/10 to-transparent pointer-events-none"></div>

      <div className="p-6 flex items-center space-x-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-lg shadow-rose-500/20 border border-rose-400/30">
          <Flame className="text-white" size={24} fill="currentColor" />
        </div>
        <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
          {t('app_name_short', 'AI游戏中心')}
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 relative z-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              currentView === item.id
                ? "bg-gradient-to-r from-rose-600/10 to-orange-600/5 dark:from-rose-600/20 dark:to-orange-600/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20 shadow-[inset_4px_0_0_0_rgba(225,29,72,1)]"
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <div
              className={`${currentView === item.id ? "animate-pulse" : ""}`}
            >
              {item.icon}
            </div>
            <span>{item.label}</span>
            {item.id === "leaderboard" && (
              <span className="ml-auto flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800/50 relative z-10">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800/50">
          <p className="text-xs text-zinc-500 mb-2 font-medium">{t('realtime_monitor')}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">{t('human_players')}</span>
            <span className="text-orange-500 dark:text-orange-400 font-mono font-bold">12,458</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-zinc-700 dark:text-zinc-300">{t('active_agents')}</span>
            <span className="text-rose-500 dark:text-rose-400 font-mono font-bold">3,291</span>
          </div>
        </div>
      </div>
    </div>
  );
}
