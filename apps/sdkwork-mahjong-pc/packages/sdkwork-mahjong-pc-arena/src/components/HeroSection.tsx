import React from "react";
import { Cpu, Upload, Zap, Swords, Play, Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface HeroSectionProps {
  onDeployAI?: () => void;
  onViewAPIDocs?: () => void;
  onSpectateFeatured?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDeployAI,
  onViewAPIDocs,
  onSpectateFeatured
}) => {
  const { t } = useTranslation();

  return (
    <div id="arena-hero-section" className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold mb-6">
            <Zap size={14} className="animate-pulse" />
            <span>{t('season_title')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            {t('arena_title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              {t('arena_subtitle')}
            </span>
          </h1>
          <p className="text-zinc-400 text-lg font-medium mb-8 leading-relaxed">
            {t('arena_desc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              id="deploy-ai-btn"
              onClick={onDeployAI}
              className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95"
            >
              <Upload size={20} />
              <span>{t('deploy_my_ai')}</span>
            </button>
            <button 
              id="view-api-docs-btn"
              onClick={onViewAPIDocs}
              className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-zinc-700 hover:border-zinc-600"
            >
              <Terminal size={20} />
              <span>{t('view_api_docs')}</span>
            </button>
          </div>
        </div>

        {/* Featured Match Card */}
        <div className="w-full md:w-[400px] shrink-0">
          <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-6 shadow-2xl relative overflow-hidden group hover:border-zinc-700/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <span className="flex items-center gap-2 text-xs font-black text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 shadow-[0_0_10px_rgba(225,29,72,0.2)]">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                {t('featured_live')}
              </span>
              <span className="text-xs font-bold text-zinc-400 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800">
                {t('game_go')}
              </span>
            </div>
            
            <div className="flex items-center justify-between my-8 relative z-10">
              <div className="text-center w-1/3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl border border-blue-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(59,130,246,0.2)] mb-3 relative group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="text-blue-400" size={28} />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-zinc-950 flex items-center justify-center z-20">
                    <span className="text-[8px] text-white font-bold">{t('featured_p1')}</span>
                  </div>
                </div>
                <div className="font-black text-white text-sm truncate">AlphaGo_V4</div>
                <div className="text-xs text-blue-400 font-bold mt-1 bg-blue-500/10 inline-block px-2 py-0.5 rounded">
                  {t('win_prob', { prob: 78 })}
                </div>
              </div>
              
              <div className="flex flex-col items-center w-1/3">
                <div className="relative">
                  <Swords className="text-rose-500 mb-2 relative z-10" size={32} />
                  <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20" />
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800">BO5 - G3</span>
              </div>

              <div className="text-center w-1/3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl border border-orange-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(249,115,22,0.2)] mb-3 relative group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="text-orange-400" size={28} />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-zinc-950 flex items-center justify-center z-20">
                    <span className="text-[8px] text-white font-bold">{t('featured_p2')}</span>
                  </div>
                </div>
                <div className="font-black text-white text-sm truncate">Kejie_Clone</div>
                <div className="text-xs text-orange-400 font-bold mt-1 bg-orange-500/10 inline-block px-2 py-0.5 rounded">
                  {t('win_prob', { prob: 22 })}
                </div>
              </div>
            </div>

            <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden flex shadow-inner mb-6 relative z-10 border border-zinc-800/50">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 relative" style={{ width: '78%' }}>
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
              </div>
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 relative" style={{ width: '22%' }}></div>
            </div>

            <button 
              id="spectate-featured-btn"
              onClick={onSpectateFeatured || onDeployAI}
              className="w-full py-3.5 bg-white text-zinc-900 hover:bg-zinc-200 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 relative z-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={16} fill="currentColor" /> {t('observe_game', { viewers: "12.5K" })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
