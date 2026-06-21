import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "sdkwork-mahjong-pc-core";
import { useToast } from "sdkwork-mahjong-pc-commons";

// Sub-components import
import { HeroSection } from "../components/HeroSection";
import { LiveMatches, LiveMatch } from "../components/LiveMatches";
import { TopAgents, Agent } from "../components/TopAgents";
import { QuickIntegration } from "../components/QuickIntegration";
import { AITeams, AITeam } from "../components/AITeams";
import { SystemStatus } from "../components/SystemStatus";

export default function AIArena() {
  const { t } = useTranslation();
  const { profile, deductComputeTokens, addPoints, addExp } = useUserStore();
  const { showToast, ToastComponent } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [bettingMatch, setBettingMatch] = useState<string | null>(null);

  const handleBet = (matchId: string) => {
    if (!profile || profile.computeTokens < 100) {
      showToast(t('insufficient_compute'), 'error');
      return;
    }

    setBettingMatch(matchId);
    setTimeout(() => {
      const success = deductComputeTokens(100);
      if (success) {
        // 50% chance to win
        const won = Math.random() > 0.5;
        if (won) {
          addPoints(500);
          addExp(50);
          showToast(t('bet_won'), 'success');
        } else {
          addExp(10);
          showToast(t('bet_lost'), 'error');
        }
      }
      setBettingMatch(null);
    }, 1500);
  };

  const rawTopAgents = [
    {
      id: 1,
      name: "AlphaGo_V4",
      level: "S+",
      elo: 3450,
      winRate: "99.8%",
      games: "1.2M",
      type: "go",
      developer: "DeepMind",
      trend: "up",
      status: "training",
      category: "strategy"
    },
    {
      id: 2,
      name: "Libratus_Pro",
      level: "S",
      elo: 3210,
      winRate: "95.2%",
      games: "850K",
      type: "poker",
      developer: "CMU",
      trend: "up",
      status: "idle",
      category: "strategy"
    },
    {
      id: 3,
      name: "DeepAgent_X",
      level: "A+",
      elo: 2980,
      winRate: "88.5%",
      games: "420K",
      type: "sichuan_mahjong",
      developer: "Tencent AI",
      trend: "down",
      status: "battling",
      category: "strategy"
    },
    {
      id: 4,
      name: "SuanFa_Master",
      level: "A",
      elo: 2850,
      winRate: "85.1%",
      games: "310K",
      type: "chinese_chess",
      developer: "Independent",
      trend: "up",
      status: "idle",
      category: "strategy"
    },
    {
      id: 5,
      name: "Neural_Knight",
      level: "A",
      elo: 2790,
      winRate: "82.4%",
      games: "280K",
      type: "chess",
      developer: "OpenAI",
      trend: "up",
      status: "battling",
      category: "strategy"
    },
    {
      id: 6,
      name: "Quick_Strike_Bot",
      level: "A-",
      elo: 2610,
      winRate: "78.9%",
      games: "150K",
      type: "action",
      developer: "GamerAI",
      trend: "up",
      status: "idle",
      category: "action"
    },
    {
      id: 7,
      name: "Lore_Master_RPG",
      level: "B+",
      elo: 2450,
      winRate: "74.1%",
      games: "95K",
      type: "rpg",
      developer: "Fictional_Lab",
      trend: "down",
      status: "idle",
      category: "rpg"
    },
    {
      id: 8,
      name: "Sim_City_Agent",
      level: "B",
      elo: 2310,
      winRate: "71.4%",
      games: "72K",
      type: "simulation",
      developer: "SimuCorp",
      trend: "up",
      status: "idle",
      category: "simulation"
    }
  ];

  // Map games and filter lists by tab
  const getGameLabel = (type: string) => {
    switch (type) {
      case "go": return t('game_go');
      case "chess": return t('game_chess');
      case "poker": return t('game_poker');
      case "sichuan_mahjong": return t('game_sichuan_mahjong');
      case "chinese_chess": return t('game_chinese_chess');
      case "action": return t('tab_action');
      case "rpg": return t('tab_rpg');
      case "simulation": return t('tab_simulation');
      default: return type;
    }
  };

  const agents: Agent[] = rawTopAgents
    .filter(a => activeTab === "all" || a.category === activeTab)
    .map(a => ({
      id: a.id,
      name: a.name,
      level: a.level,
      elo: a.elo,
      winRate: a.winRate,
      games: a.games,
      type: getGameLabel(a.type),
      developer: a.developer,
      trend: a.trend,
      status: a.status
    }));

  const liveMatches: LiveMatch[] = [
    {
      id: "m1",
      game: t('game_go'),
      agent1: "AlphaGo_V4",
      agent2: "Kejie_Clone_AI",
      winProb1: 78,
      winProb2: 22,
      viewers: 12500,
      time: "45:12",
    },
    {
      id: "m2",
      game: t('game_chess'),
      agent1: "Stockfish_16",
      agent2: "Neural_Knight",
      winProb1: 51,
      winProb2: 49,
      viewers: 8300,
      time: "12:05",
    }
  ];

  const aiTeams: AITeam[] = [
    { id: 1, name: "OpenClaw Team", members: 12, rank: 1, score: 9850, winRate: "76%" },
    { id: 2, name: "AutoMind Guild", members: 8, rank: 2, score: 8420, winRate: "71%" },
    { id: 3, name: "NeuralNet Alliance", members: 24, rank: 3, score: 7900, winRate: "68%" },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-[1600px] mx-auto px-4 md:px-0">
      <ToastComponent />
      
      {/* Hero Section */}
      <HeroSection 
        onDeployAI={() => showToast(t('deploy_my_ai') + " - Mock Mode", 'success')}
        onViewAPIDocs={() => showToast(t('view_api_docs') + " - Mock Mode", 'success')}
        onSpectateFeatured={() => showToast(t('observe_game', { viewers: "12.5k" }), 'success')}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Live Matches Grid */}
          <LiveMatches 
            matches={liveMatches}
            onBet={handleBet}
            bettingMatchId={bettingMatch}
            onViewAll={() => showToast(t('view_all_matches'), 'info')}
          />

          {/* Top Agents Leaderboard */}
          <TopAgents 
            agents={agents}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onChallenge={(id) => showToast(`Challenge Agent #${id} initiated!`, 'info')}
            onLoadMore={() => showToast(t('load_more_rankings'), 'info')}
          />
        </div>

        {/* Sidebar panels - Right Side */}
        <div className="space-y-8">
          <QuickIntegration 
            onCopy={(str) => {
              navigator.clipboard.writeText(str);
              showToast(t('copy') + " " + t('success_msg', '成功�?), 'success');
            }}
            onViewDocs={() => showToast(t('view_full_docs'), 'info')}
          />

          <AITeams 
            teams={aiTeams}
            onViewAllTeams={() => showToast(t('view_all_teams'), 'info')}
          />

          <SystemStatus />
        </div>
      </div>
    </div>
  );
}
