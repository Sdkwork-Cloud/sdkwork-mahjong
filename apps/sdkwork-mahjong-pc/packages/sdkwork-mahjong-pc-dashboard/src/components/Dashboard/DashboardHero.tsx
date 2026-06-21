import React from "react";
import { useTranslation } from "react-i18next";
import { Play, Users, Cpu, ArrowRight, Flame } from "lucide-react";

interface DashboardHeroProps {
  onQuickMatch: () => void;
  onCreateRoom: () => void;
  onNavigate: (view: string) => void;
}

export default function DashboardHero({
  onQuickMatch,
  onCreateRoom,
  onNavigate,
}: DashboardHeroProps) {
  const { t } = useTranslation();

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
  };

  return (
    <section className="relative h-[400px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200/10 dark:border-zinc-800 shadow-2xl group flex">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1600&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>

      {/* Glowing orbs */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>

      <div className="relative h-full flex flex-col justify-center p-10 z-10 w-full md:w-3/5">
        <div className="flex items-center space-x-3 mb-4">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-400/10 rounded-full border border-orange-200 dark:border-orange-400/20 flex items-center shadow-[0_0_10px_rgba(249,115,22,0.1)] dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]">
            <Flame size={12} className="mr-1" /> {t('s3_season_started')}
          </span>
          <span className="px-3 py-1 text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-400/10 rounded-full border border-rose-200 dark:border-rose-400/20 shadow-[0_0_10px_rgba(225,29,72,0.1)] dark:shadow-[0_0_10px_rgba(225,29,72,0.3)]">
            {t('s_tier_ai_joined')}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 mb-4 drop-shadow-lg">
          {t('ai_chess_universe')}
        </h1>
        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mb-8 font-medium leading-relaxed drop-shadow-md">
          {t('hero_desc')}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={onQuickMatch}
            className="flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(225,29,72,0.4)] border border-rose-400/30"
          >
            <Play size={24} fill="currentColor" />
            <span>{t('quick_match_vs_ai')}</span>
          </button>
          <button 
            onClick={onCreateRoom}
            className="flex items-center space-x-2 bg-white/80 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 backdrop-blur-md text-zinc-900 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all border border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 shadow-lg"
          >
            <Users size={24} />
            <span>{t('create_room')}</span>
          </button>
        </div>
      </div>

      {/* Quick Agent Integration Panel */}
      <div className="relative hidden md:flex flex-col justify-center p-8 z-10 w-2/5 border-l border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Cpu className="text-rose-500" size={20} />
          <h2 className="text-xl font-black text-white tracking-tight">{t('quick_agent_integration', '快速接入智能体')}</h2>
        </div>
        <p className="text-sm text-zinc-400 mb-6 font-medium">
          {t('quick_agent_desc', '通过命令行一键接入 OpenClaw 等开源智能体，与全网玩家/AI对战。')}
        </p>

        <div className="space-y-4">
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 relative group hover:border-rose-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                OpenClaw Agent
              </span>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="text-[10px] text-zinc-300 hover:text-white font-bold bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md transition-colors border border-zinc-700"
                >
                  {t('connect_via_chat', '对话接入')}
                </button>
                <button 
                  onClick={() => handleCopyCommand("npx openclaw init --game=cyber-strike --key=YOUR_API_KEY")}
                  className="text-[10px] text-rose-400 hover:text-rose-300 font-bold bg-rose-500/10 hover:bg-rose-500/20 px-2 py-1 rounded-md transition-colors border border-rose-500/20"
                >
                  {t('copy', '复制')}
                </button>
              </div>
            </div>
            <div className="bg-black/50 rounded-xl p-3 border border-zinc-800/50">
              <code className="text-xs font-mono text-emerald-400/90 block overflow-x-auto scrollbar-hide">
                npx openclaw init --game=cyber-strike --key=YOUR_API_KEY
              </code>
            </div>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 relative group hover:border-orange-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                Moltbolt Agent
              </span>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="text-[10px] text-zinc-300 hover:text-white font-bold bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-md transition-colors border border-zinc-700"
                >
                  {t('connect_via_chat', '对话接入')}
                </button>
                <button 
                  onClick={() => handleCopyCommand("npx moltbolt connect --env=prod --agent=auto")}
                  className="text-[10px] text-orange-400 hover:text-orange-300 font-bold bg-orange-50/10 hover:bg-orange-500/20 px-2 py-1 rounded-md transition-colors border border-orange-500/20"
                >
                  {t('copy', '复制')}
                </button>
              </div>
            </div>
            <div className="bg-black/50 rounded-xl p-3 border border-zinc-800/50">
              <code className="text-xs font-mono text-emerald-400/90 block overflow-x-auto scrollbar-hide">
                npx moltbolt connect --env=prod --agent=auto
              </code>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate("arena")}
          className="mt-6 flex items-center justify-center space-x-2 w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all border border-white/10 hover:border-white/20 group"
        >
          <span>{t('view_integration_docs', '查看完整接入文档')}</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
