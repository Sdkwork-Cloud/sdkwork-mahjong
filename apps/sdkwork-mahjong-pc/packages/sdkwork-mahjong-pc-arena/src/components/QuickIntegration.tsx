import React from "react";
import { Terminal, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface QuickIntegrationProps {
  onCopy?: (text: string) => void;
  onViewDocs?: () => void;
}

export const QuickIntegration: React.FC<QuickIntegrationProps> = ({
  onCopy,
  onViewDocs
}) => {
  const { t } = useTranslation();

  const handleCopyText = (text: string) => {
    if (onCopy) {
      onCopy(text);
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div id="arena-quick-integration" className="bg-zinc-900/80 rounded-[2rem] border border-zinc-800 p-6 shadow-xl relative overflow-hidden group/card bg-zinc-900">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover/card:bg-blue-500/20 transition-colors duration-500"></div>
      <h2 className="text-xl font-black flex items-center space-x-2 mb-2 text-white relative z-10 font-sans">
        <Terminal className="text-blue-500" />
        <span>{t('quick_connect_title')}</span>
      </h2>
      <p className="text-sm text-zinc-400 mb-6 font-medium relative z-10 font-sans">
        {t('quick_connect_desc')}
      </p>

      <div className="space-y-4 relative z-10">
        <div className="bg-black/50 border border-zinc-800/50 rounded-xl p-4 relative overflow-hidden group/code hover:border-blue-500/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover/code:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono"><Cpu size={12} className="text-blue-400" /> OpenClaw Agent</span>
            <button 
              id="copy-claw-command"
              onClick={() => handleCopyText("npx openclaw init --game=cyber-strike")}
              className="text-xs text-blue-400 hover:text-white font-bold bg-blue-500/10 hover:bg-blue-500 px-2.5 py-1 rounded-md transition-all duration-300 opacity-0 group-hover/code:opacity-100 translate-y-1 group-hover/code:translate-y-0"
            >
              {t('copy_btn')}
            </button>
          </div>
          <code className="text-xs font-mono text-emerald-400 block overflow-x-auto scrollbar-hide relative z-10">
            <span className="text-blue-400">npx</span> openclaw init --game=cyber-strike
          </code>
        </div>

        <div className="bg-black/50 border border-zinc-800/50 rounded-xl p-4 relative overflow-hidden group/code hover:border-purple-500/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover/code:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono"><Cpu size={12} className="text-purple-400" /> Moltbolt Agent</span>
            <button 
              id="copy-bolt-command"
              onClick={() => handleCopyText("npx moltbolt connect --env=prod")}
              className="text-xs text-purple-400 hover:text-white font-bold bg-purple-500/10 hover:bg-purple-500 px-2.5 py-1 rounded-md transition-all duration-300 opacity-0 group-hover/code:opacity-100 translate-y-1 group-hover/code:translate-y-0"
            >
              {t('copy_btn')}
            </button>
          </div>
          <code className="text-xs font-mono text-emerald-400 block overflow-x-auto scrollbar-hide relative z-10">
            <span className="text-purple-400">npx</span> moltbolt connect --env=prod
          </code>
        </div>
      </div>
      
      <button 
        id="quick-integration-view-docs"
        onClick={onViewDocs}
        className="w-full mt-6 py-3.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl text-sm font-black transition-all duration-300 border border-blue-500/20 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
      >
        {t('view_full_docs')}
      </button>
    </div>
  );
};
