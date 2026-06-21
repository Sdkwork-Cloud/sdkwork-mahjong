import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Swords, Plus, User, Bot, Coins, ShieldAlert, Trophy, X, Zap, Flame, Crown, History, Star, TrendingUp, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserStore } from "sdkwork-mahjong-pc-core";
import { useToast } from "sdkwork-mahjong-pc-commons";

const GAME_TYPES = [
  "go",
  "chess_game",
  "chinese_chess",
  "texas_holdem",
  "sichuan_mahjong",
  "gomoku",
  "othello",
  "quiz"
];

interface Ring {
  id: string;
  creatorName: string;
  creatorType: "Human" | "AI" | "Team";
  gameType: string;
  points: number;
  status: "waiting" | "playing" | "finished";
  avatar: string;
  power?: number;
  winRate?: string;
  streak?: number;
  teamSize?: number;
  currentPlayers?: number;
}

export default function RingMatch() {
  const { t } = useTranslation();
  const { profile, deductPoints, addPoints, addExp } = useUserStore();
  const { showToast, ToastComponent } = useToast();
  const [challengingRing, setChallengingRing] = useState<string | null>(null);
  const [rings, setRings] = useState<Ring[]>([
    {
      id: "1",
      creatorName: "Alpha Claw",
      creatorType: "AI",
      gameType: "go",
      points: 50000,
      status: "waiting",
      avatar: "🦞",
      power: 9999,
      winRate: "98.5%",
      streak: 15,
    },
    {
      id: "2",
      creatorName: "ChessMaster99",
      creatorType: "Human",
      gameType: "chess_game",
      points: 20000,
      status: "waiting",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      winRate: "75.2%",
      streak: 3,
    },
    {
      id: "3",
      creatorName: "Deep Blue Shell",
      creatorType: "AI",
      gameType: "chinese_chess",
      points: 15000,
      status: "playing",
      avatar: "🦞",
      power: 8500,
      winRate: "88.0%",
      streak: 8,
    },
    {
      id: "4",
      creatorName: "Dragon Slayers",
      creatorType: "Team",
      gameType: "texas_holdem",
      points: 100000,
      status: "waiting",
      avatar: "🛡�?,
      winRate: "65.0%",
      streak: 5,
      teamSize: 4,
      currentPlayers: 2,
    },
    {
      id: "5",
      creatorName: "Quantum Mind",
      creatorType: "AI",
      gameType: "go",
      points: 80000,
      status: "waiting",
      avatar: "🧠",
      power: 9500,
      winRate: "92.1%",
      streak: 12,
    },
    {
      id: "6",
      creatorName: "Grandmaster Flash",
      creatorType: "Human",
      gameType: "chess_game",
      points: 45000,
      status: "playing",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
      winRate: "82.4%",
      streak: 6,
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRings = rings.filter(ring => {
    if (filter === "high_reward" && ring.points < 30000) return false;
    if (filter === "ai_only" && ring.creatorType !== "AI") return false;
    if (filter === "team" && ring.creatorType !== "Team") return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const creatorNameMatch = ring.creatorName.toLowerCase().includes(query);
      const gameTypeMatch = t(ring.gameType).toLowerCase().includes(query) || 
                            t(`${ring.gameType}_full`).toLowerCase().includes(query) ||
                            ring.gameType.toLowerCase().includes(query);
      if (!creatorNameMatch && !gameTypeMatch) return false;
    }
    return true;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRing, setNewRing] = useState({
    creatorType: "Human" as "Human" | "AI" | "Team",
    gameType: "go",
    points: 1000,
    selectedLobster: "1",
    teamSize: 2,
  });

  // Mock lobsters data
  const myLobsters = [
    { id: "1", name: "Alpha Claw", power: 9999 },
    { id: "2", name: "Deep Blue Shell", power: 8500 },
  ];

  const topPlayers = [
    { name: "Alpha Claw", points: 1250000, avatar: "🦞", isAI: true },
    { name: "GrandMaster_X", points: 980000, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80", isAI: false },
    { name: "Neural Knight", points: 850000, avatar: "🤖", isAI: true },
    { name: "ChessQueen", points: 720000, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", isAI: false },
    { name: "Lobster King", points: 650000, avatar: "🦞", isAI: true },
  ];

  const recentBattles = [
    { winner: "Alpha Claw", loser: "Human_Player_1", game: "Go", points: "+5000" },
    { winner: "GrandMaster_X", loser: "Deep Blue Shell", game: "Chess", points: "+8000" },
    { winner: "Neural Knight", loser: "ChessQueen", game: "Chinese Chess", points: "+3000" },
  ];

  const handleCreateRing = () => {
    const isAI = newRing.creatorType === "AI";
    const lobster = isAI ? myLobsters.find(l => l.id === newRing.selectedLobster) : null;
    
    if (!profile || profile.points < newRing.points) {
      showToast(t('insufficient_points', '积分不足'), 'error');
      return;
    }

    const success = deductPoints(newRing.points);
    if (!success) return;

    const ring: Ring = {
      id: Math.random().toString(36).substring(7),
      creatorName: isAI ? (lobster?.name || "Unknown Lobster") : newRing.creatorType === "Team" ? "My Team" : "Player_1",
      creatorType: newRing.creatorType,
      gameType: newRing.gameType,
      points: newRing.points,
      status: "waiting",
      avatar: isAI 
        ? "🦞"
        : newRing.creatorType === "Team" ? "🛡�? : "https://images.unsplash.com/photo-1527980975255-d3b416303d12?w=100&q=80",
      power: isAI ? lobster?.power : undefined,
      winRate: "0.0%",
      streak: 0,
      teamSize: newRing.creatorType === "Team" ? newRing.teamSize : undefined,
      currentPlayers: newRing.creatorType === "Team" ? 1 : undefined,
    };
    setRings([ring, ...rings]);
    setIsModalOpen(false);
  };

  const handleChallenge = (ring: Ring) => {
    if (!profile || profile.points < ring.points) {
      showToast(t('insufficient_points', '积分不足，无法支付挑战金'), 'error');
      return;
    }

    setChallengingRing(ring.id);
    setTimeout(() => {
      const success = deductPoints(ring.points);
      if (success) {
        // 30% chance to win against AI, 50% against human
        const winChance = ring.creatorType === 'AI' ? 0.3 : 0.5;
        const won = Math.random() < winChance;
        
        if (won) {
          addPoints(ring.points * 2); // Get back own points + ring points
          addExp(200);
          showToast(t('challenge_won', `挑战成功！你赢得�?${ring.points} 积分！`), 'success');
          // Remove ring if won
          setRings(rings.filter(r => r.id !== ring.id));
        } else {
          addExp(50);
          showToast(t('challenge_lost', `挑战失败，你失去�?${ring.points} 积分。`), 'error');
        }
      }
      setChallengingRing(null);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      <ToastComponent />
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content - Left Side */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10" />
            
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 flex items-center gap-4 drop-shadow-sm">
                <Swords className="text-rose-500" size={48} />
                {t('ring_match', '巅峰擂台�?)}
              </h1>
              <p className="text-zinc-400 mt-4 text-lg font-medium max-w-xl leading-relaxed">
                {t('ring_match_desc', '全网顶尖AI与人类高手汇聚于此。摆下擂台，接受全服挑战；或者主动出击，赢取海量赏金与无上荣耀�?)}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white rounded-2xl font-black text-lg transition-all shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)] hover:shadow-[0_0_60px_-15px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Plus size={24} strokeWidth={3} className="relative z-10" />
              <span className="relative z-10">{t('setup_ring', '我要摆擂')}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Flame className="text-orange-500" size={24} />
              {t('active_rings', '火热打擂�?)}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder={t('search_rings_placeholder', '搜索擂主或游�?..')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors w-full sm:w-48"
              />
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                <span onClick={() => setFilter("all")} className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${filter === "all" ? "bg-rose-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>{t('all', '全部')}</span>
                <span onClick={() => setFilter("high_reward")} className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${filter === "high_reward" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>{t('high_reward', '高赏�?)}</span>
                <span onClick={() => setFilter("ai_only")} className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${filter === "ai_only" ? "bg-purple-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>{t('ai_only', 'AI擂主')}</span>
                <span onClick={() => setFilter("team")} className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-colors ${filter === "team" ? "bg-blue-500 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>{t('team', '团队�?)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
            {filteredRings.length === 0 ? (
              <div className="col-span-full py-20 text-center text-zinc-500 font-bold">
                {t('no_matching_rings', '没有找到匹配的擂台，自己摆一个吧�?)}
              </div>
            ) : filteredRings.map((ring) => (
              <motion.div
                key={ring.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className="bg-zinc-900/80 backdrop-blur-sm rounded-[2rem] p-1 border border-zinc-800 shadow-xl relative group transition-all"
              >
                {ring.streak && ring.streak >= 5 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg shadow-orange-500/30 z-20 flex items-center gap-1 animate-bounce">
                    <Flame size={12} /> {ring.streak} {t('streak_suffix', '连胜')}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-[2rem] blur-xl -z-10 group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                
                <div className="bg-zinc-900 rounded-[1.8rem] p-6 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/5 to-transparent rounded-bl-full -z-10" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {ring.creatorType === "AI" ? (
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-3xl shadow-inner border border-zinc-700/50">
                            {ring.avatar}
                          </div>
                        ) : (
                          <img src={ring.avatar} alt={ring.creatorName} className="w-16 h-16 rounded-2xl object-cover border border-zinc-700/50 shadow-inner" />
                        )}
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center border-2 border-zinc-900 shadow-md">
                          {ring.creatorType === "AI" ? <Bot size={14} className="text-rose-500" /> : ring.creatorType === "Team" ? <User size={14} className="text-blue-500" /> : <User size={14} className="text-emerald-500" />}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                          {ring.creatorName}
                          {ring.status === "playing" && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                            {t(`${ring.gameType}_full`, ring.gameType)}
                          </span>
                          {ring.power && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                              <Zap size={12} /> {ring.power}
                            </span>
                          )}
                          {ring.teamSize && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                              <User size={12} /> {ring.currentPlayers}/{ring.teamSize}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-zinc-950/50 rounded-2xl p-4 mb-4 border border-zinc-800/50 flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <Star size={14} className="text-zinc-600" /> {t('reward_pool', '赏金�?)}
                      </span>
                      <div className="flex items-center gap-2 text-amber-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                        <Coins size={24} />
                        {ring.points.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {ring.status === "playing" ? (
                        <button 
                          className="flex-1 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700"
                        >
                          <Eye size={20} />
                          {t('spectate', '观战')}
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleChallenge(ring)}
                          disabled={challengingRing === ring.id || (profile?.points || 0) < ring.points}
                          className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 ${
                            (profile?.points || 0) < ring.points
                              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                              : "bg-white text-zinc-900 hover:bg-rose-500 hover:text-white hover:shadow-rose-500/25"
                          }`}
                        >
                          {challengingRing === ring.id ? (
                            <span className="animate-pulse">{t('battling', '战斗�?..')}</span>
                          ) : (
                            <>
                              <ShieldAlert size={20} />
                              {t('challenge_ring', '立即攻擂')}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 lg:sticky lg:top-8 h-fit">
          
          {/* Leaderboard Widget */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-[2rem] p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -z-10" />
            
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <Crown className="text-amber-500" size={24} />
              {t('ring_leaderboard', '擂台风云�?)}
            </h3>
            
            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-800/50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      index === 0 ? "bg-amber-500 text-amber-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]" :
                      index === 1 ? "bg-zinc-300 text-zinc-800 shadow-[0_0_15px_rgba(212,212,216,0.3)]" :
                      index === 2 ? "bg-amber-700 text-amber-100 shadow-[0_0_15px_rgba(180,83,9,0.3)]" :
                      "bg-zinc-800 text-zinc-400"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      {player.isAI ? (
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm border border-zinc-700">
                          {player.avatar}
                        </div>
                      ) : (
                        <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-lg object-cover border border-zinc-700" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[100px] xl:max-w-[120px]">{player.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-amber-400 font-mono font-bold text-sm flex items-center gap-1">
                    {player.points >= 1000000 ? `${(player.points / 1000000).toFixed(1)}M` : `${(player.points / 1000).toFixed(0)}K`}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
              {t('view_full_leaderboard', '查看完整榜单')}
            </button>
          </div>

          {/* Recent Battles Widget */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-[2rem] p-6 border border-zinc-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl -z-10" />
            
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              <History className="text-rose-500" size={24} />
              {t('recent_battles', '最新战�?)}
            </h3>
            
            <div className="space-y-4">
              {recentBattles.map((battle, index) => (
                <div key={index} className="p-4 rounded-2xl bg-zinc-950/50 border border-zinc-800/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md">{battle.game}</span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      <Coins size={12} /> {battle.points}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-emerald-400 truncate max-w-[100px]">{battle.winner}</span>
                    <Swords size={14} className="text-zinc-600 mx-2 flex-shrink-0" />
                    <span className="font-bold text-zinc-500 truncate max-w-[100px]">{battle.loser}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Create Ring Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 rounded-[2.5rem] p-8 max-w-md w-full border border-zinc-800 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-orange-500" />
              
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                  <Trophy className="text-rose-500" size={32} />
                  {t('setup_ring', '我要摆擂')}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-rose-500 transition-colors">
                  <X size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                    {t('ring_creator_type', '擂主类型')}
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setNewRing({ ...newRing, creatorType: "Human" })}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                        newRing.creatorType === "Human"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]"
                          : "border-zinc-800 text-zinc-500 hover:border-zinc-700 bg-zinc-950"
                      }`}
                    >
                      <User size={32} />
                      <span className="font-black text-sm">{t('human_player', '人类玩家')}</span>
                    </button>
                    <button
                      onClick={() => setNewRing({ ...newRing, creatorType: "AI" })}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                        newRing.creatorType === "AI"
                          ? "border-rose-500 bg-rose-500/10 text-rose-400 shadow-[inset_0_0_20px_rgba(244,63,94,0.1)]"
                          : "border-zinc-800 text-zinc-500 hover:border-zinc-700 bg-zinc-950"
                      }`}
                    >
                      <span className="text-3xl leading-none">🦞</span>
                      <span className="font-black text-sm">{t('ai_player', 'AI 代理')}</span>
                    </button>
                    <button
                      onClick={() => setNewRing({ ...newRing, creatorType: "Team" })}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                        newRing.creatorType === "Team"
                          ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
                          : "border-zinc-800 text-zinc-500 hover:border-zinc-700 bg-zinc-950"
                      }`}
                    >
                      <div className="flex -space-x-2">
                        <User size={24} />
                        <User size={24} />
                      </div>
                      <span className="font-black text-sm">{t('team_player', '团队组队')}</span>
                    </button>
                  </div>
                </div>

                {newRing.creatorType === "AI" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden"
                  >
                    <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                      {t('select_claw', '选择出战龙虾')}
                    </label>
                    <select
                      value={newRing.selectedLobster}
                      onChange={(e) => setNewRing({ ...newRing, selectedLobster: e.target.value })}
                      className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-4 py-4 text-white font-bold focus:outline-none focus:border-rose-500 transition-colors appearance-none"
                    >
                      {myLobsters.map(lobster => (
                        <option key={lobster.id} value={lobster.id}>
                          🦞 {lobster.name} ({t('compute_power_label', '算力')}: {lobster.power})
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                {newRing.creatorType === "Team" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden"
                  >
                    <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                      {t('team_size_label', '团队人数')}
                    </label>
                    <select
                      value={newRing.teamSize}
                      onChange={(e) => setNewRing({ ...newRing, teamSize: parseInt(e.target.value) })}
                      className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-4 py-4 text-white font-bold focus:outline-none focus:border-rose-500 transition-colors appearance-none"
                    >
                      <option value="2">{t('two_players_team', '2 人小�?)}</option>
                      <option value="3">{t('three_players_team', '3 人小�?)}</option>
                      <option value="4">{t('four_players_team', '4 人小�?)}</option>
                      <option value="5">{t('five_players_team', '5 人小�?)}</option>
                    </select>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                    {t('game_type', '游戏类型')}
                  </label>
                  <select
                    value={newRing.gameType}
                    onChange={(e) => setNewRing({ ...newRing, gameType: e.target.value })}
                    className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-4 py-4 text-white font-bold focus:outline-none focus:border-rose-500 transition-colors appearance-none"
                  >
                    {GAME_TYPES.map(game => (
                      <option key={game} value={game}>{t(`${game}_full`, game)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                    {t('prepaid_points', '预付积分 (胜者全�?')}
                  </label>
                  <div className="relative">
                    <Coins className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" size={24} />
                    <input
                      type="number"
                      min="100"
                      step="100"
                      value={newRing.points}
                      onChange={(e) => setNewRing({ ...newRing, points: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl pl-14 pr-4 py-4 text-amber-400 font-black text-xl focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreateRing}
                  className="w-full py-5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-rose-500/20 active:scale-95 mt-4"
                >
                  {t('confirm_setup', '确认摆擂')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

