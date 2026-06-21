import React from "react";
import { Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface AITeam {
  id: number;
  name: string;
  members: number;
  rank: number;
  score: number;
  winRate: string;
}

export interface AITeamsProps {
  teams: AITeam[];
  onViewAllTeams?: () => void;
}

export const AITeams: React.FC<AITeamsProps> = ({
  teams,
  onViewAllTeams
}) => {
  const { t } = useTranslation();

  return (
    <div id="arena-ai-teams" className="bg-zinc-900/80 rounded-[2rem] border border-zinc-800 p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -z-10 group-hover:bg-purple-500/20 transition-colors duration-500" />
      <h2 className="text-xl font-black flex items-center space-x-2 mb-6 text-white">
        <Shield className="text-purple-500" />
        <span>{t('teams_ranking_title')}</span>
      </h2>

      <div className="space-y-3">
        {teams.map((team, i) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:bg-zinc-800/80 hover:border-zinc-700/80 transition-all cursor-pointer group/team relative overflow-hidden"
          >
            {i < 3 && (
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                i === 0 ? "bg-amber-500" :
                i === 1 ? "bg-zinc-300" :
                "bg-amber-700"
              }`} />
            )}
            <div className="flex items-center space-x-3 pl-2">
              <span className={`font-black w-6 text-center text-sm ${i === 0 ? "text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" : i === 1 ? "text-zinc-300 drop-shadow-[0_0_5px_rgba(212,212,216,0.5)]" : i === 2 ? "text-amber-700 drop-shadow-[0_0_5px_rgba(180,83,9,0.5)]" : "text-zinc-650"}`}>
                {team.rank}
              </span>
              <div>
                <p className="font-bold text-zinc-200 text-sm group-hover/team:text-purple-400 transition-colors">
                  {team.name}
                </p>
                <div className="flex items-center space-x-2 text-[10px] text-zinc-500 mt-1 font-bold uppercase">
                  <span className="flex items-center gap-1 bg-zinc-800/50 px-1.5 py-0.5 rounded">
                    <Users size={10} /> {t('members_count', { count: team.members })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {t('win_rate_abbr', { rate: team.winRate })}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-purple-400 font-mono font-black text-sm drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
              {team.score}
            </span>
          </div>
        ))}
      </div>
      <button 
        onClick={onViewAllTeams}
        className="w-full mt-4 py-3 border border-zinc-800/50 rounded-xl text-sm font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors hover:border-zinc-700"
      >
        {t('view_all_teams')}
      </button>
    </div>
  );
};
