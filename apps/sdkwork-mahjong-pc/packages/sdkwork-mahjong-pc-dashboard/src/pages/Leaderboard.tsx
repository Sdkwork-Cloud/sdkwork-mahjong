import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Trophy,
  Medal,
  Crown,
  User,
  Cpu,
  Users,
  Flame,
  TrendingUp,
  Timer,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Swords
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "sdkwork-mahjong-pc-commons";

// Sub-components
import LeaderboardHeader from "../components/Leaderboard/LeaderboardHeader";
import ChallengeModal from "../components/Leaderboard/ChallengeModal";
import ArenaModal from "../components/Leaderboard/ArenaModal";

interface LeaderboardProps {
  onViewPlayer?: (player: any) => void;
}

export default function Leaderboard({ onViewPlayer }: LeaderboardProps) {
  const { t } = useTranslation();
  const { showToast, ToastComponent } = useToast();
  const [activeTab, setActiveTab] = useState("global");
  const [timeRange, setTimeRange] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [showArenaModal, setShowArenaModal] = useState(false);
  const [wagerAmount, setWagerAmount] = useState(100);
  const itemsPerPage = 100;

  const tabs = [
    { id: "global", name: t('global_leaderboard'), icon: <Trophy size={16} /> },
    { id: "human", name: t('human_peak'), icon: <User size={16} /> },
    { id: "ai", name: t('strongest_ai'), icon: <Cpu size={16} /> },
    { id: "team", name: t('team_rankings'), icon: <Users size={16} /> },
  ];

  const timeRanges = [
    { id: "hourly", name: t('hourly') },
    { id: "daily", name: t('daily') },
    { id: "weekly", name: t('weekly') },
    { id: "monthly", name: t('monthly') },
    { id: "season", name: t('season') },
    { id: "yearly", name: t('yearly') },
    { id: "all-time", name: t('all_time') },
  ];

  // Reset page when time range or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [timeRange, activeTab]);

  // Generate 500 mock users
  const rankings = useMemo(() => {
    const multiplier = timeRange === "hourly" ? 0.1 : timeRange === "daily" ? 0.5 : timeRange === "weekly" ? 1 : timeRange === "monthly" ? 2 : timeRange === "season" ? 5 : timeRange === "yearly" ? 12 : 25;
    
    let baseUsers: { name: string, type: string, baseScore: number, title: string, avatar: string, provider?: string, sponsorPrice?: string }[] = [];

    if (activeTab === "ai") {
      baseUsers = [
        { name: "Gemini 3.1 Pro", type: "AI", baseScore: 15500, title: t('omniscient', '全知�?), avatar: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&q=80", provider: "Google", sponsorPrice: "¥999/�? },
        { name: "GPT-4o", type: "AI", baseScore: 15200, title: t('god_of_compute', '算力之神'), avatar: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=100&q=80", provider: "OpenAI", sponsorPrice: "¥899/�? },
        { name: "Claude 3.5 Sonnet", type: "AI", baseScore: 14800, title: t('logic_master', '逻辑大师'), avatar: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&q=80", provider: "Anthropic", sponsorPrice: "¥799/�? },
        { name: "AlphaGo Zero", type: "AI", baseScore: 14500, title: t('peak_of_go', '围棋巅峰'), avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80", provider: "DeepMind", sponsorPrice: "¥1299/�? },
        { name: "DeepSeek-V3", type: "AI", baseScore: 14200, title: t('deep_exploration', '深度探索'), avatar: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=100&q=80", provider: "DeepSeek", sponsorPrice: "¥599/�? },
      ];
    } else {
      baseUsers = [
        { name: "AlphaGo_V4", type: "AI", baseScore: 12500, title: t('god_of_compute', '算力之神'), avatar: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&q=80" },
        { name: "人类_柯洁", type: "Human", baseScore: 11820, title: t('light_of_humanity', '人类之光'), avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" },
        { name: "Libratus", type: "AI", baseScore: 11500, title: t('game_master', '博弈之皇'), avatar: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&q=80" },
        { name: "赌神高进", type: "Human", baseScore: 10600, title: t('king_of_cards', '卡牌之王'), avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" },
        { name: "DeepAgent", type: "AI", baseScore: 10250, title: t('strategy_core', '策略核心'), avatar: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=100&q=80" },
        { name: "AI猎手_007", type: "Human", baseScore: 9750, title: t('ai_hunter', 'AI猎手'), avatar: "https://images.unsplash.com/photo-1527980975255-d3b416303d12?w=100&q=80" },
        { name: "四川麻将�?, type: "Human", baseScore: 9600, title: t('mahjong_saint', '麻坛宗师'), avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
      ];
    }

    const generated = [...baseUsers];
    
    // Generate the rest up to 500
    for (let i = baseUsers.length; i < 500; i++) {
      const isAI = activeTab === "ai" ? true : activeTab === "human" ? false : i % 3 === 0;
      generated.push({
        name: isAI ? `Model_Node_${i}` : `Player_${Math.floor(Math.random() * 9000) + 1000}`,
        type: isAI ? "AI" : "Human",
        baseScore: (activeTab === "ai" ? 14000 : 9500) - (i * 15) - Math.floor(Math.random() * 100),
        title: isAI ? t('compute_node', '算力节点') : t('high_tier_player', '高阶玩家'),
        avatar: isAI 
          ? `https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80&seed=${i}`
          : `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80&seed=${i}`,
        provider: isAI ? ["Google", "OpenAI", "Anthropic", "Meta", "Local"][Math.floor(Math.random() * 5)] : undefined,
        sponsorPrice: isAI ? `¥${Math.floor(Math.random() * 500 + 99)}/月` : undefined
      });
    }

    return generated.map((item, index) => {
      const winRateNum = Math.max(45, 99.8 - (index * 0.1) + (Math.random() * 5 - 2.5));
      const trendVal = Math.floor(Math.random() * 100) - 30;
      
      return {
        ...item,
        rank: index + 1,
        score: Math.floor(item.baseScore * multiplier),
        winRate: `${winRateNum.toFixed(1)}%`,
        trend: trendVal > 0 ? `+${trendVal}` : trendVal === 0 ? "0" : `${trendVal}`
      };
    });
  }, [timeRange, activeTab, t]);

  const totalPages = Math.ceil(rankings.length / itemsPerPage);
  const currentRankings = rankings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const myScoreMultiplier = timeRange === "hourly" ? 0.1 : timeRange === "daily" ? 0.5 : timeRange === "weekly" ? 1 : timeRange === "monthly" ? 2 : timeRange === "season" ? 5 : timeRange === "yearly" ? 12 : 25;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChallengeConfirm = (amount: number) => {
    showToast(t('challenged_alert', { name: selectedPlayer?.name, points: amount }), 'success');
    setShowChallengeModal(false);
  };

  const handleArenaPublishConfirm = (amount: number) => {
    showToast(t('arena_success_alert', { points: amount }), 'success');
    setShowArenaModal(false);
  };

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      <ToastComponent />
      
      {/* Header */}
      <LeaderboardHeader onSetupArena={() => setShowArenaModal(true)} />

      {/* Controls Area */}
      <div className="flex flex-col gap-4 shrink-0">
        {/* Main Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl text-sm font-black tracking-wide transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.3)] border border-rose-400/50"
                  : "bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Time Ranges Segmented Control & Refresh Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 dark:bg-zinc-900/40 p-2 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide w-full sm:w-auto">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className="relative px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap transition-colors flex-1 sm:flex-none"
              >
                {timeRange === range.id && (
                  <motion.div
                    layoutId="timeTabIndicator"
                    className="absolute inset-0 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 ${timeRange === range.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
                  {range.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-zinc-100/50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 text-xs font-medium text-zinc-500 dark:text-zinc-400 shrink-0">
            <Timer size={14} className="text-rose-500 animate-pulse" />
            <span>{t('next_refresh_in')} <span className="text-zinc-900 dark:text-zinc-200 font-mono font-bold">14:23</span></span>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col shadow-lg dark:shadow-2xl relative min-h-[500px]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-200 dark:border-zinc-800 text-xs font-black tracking-wider text-zinc-500 uppercase bg-zinc-50/80 dark:bg-zinc-950/80 shrink-0">
          <div className="col-span-1 text-center">{t('rank')}</div>
          <div className="col-span-3">{t('player_ai')}</div>
          <div className="col-span-2 text-center">{activeTab === "ai" ? t('provider') : t('title')}</div>
          <div className="col-span-2 text-center">{t('win_rate')}</div>
          <div className="col-span-2 text-right">{activeTab === "ai" ? t('compute_power') : t('points')}</div>
          <div className="col-span-2 text-center">{t('action')}</div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 pb-36 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage + timeRange + activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {currentRankings.map((user) => (
                <div
                  key={`${user.rank}-${user.name}`}
                  className={`grid grid-cols-12 gap-4 px-4 py-3 items-center rounded-xl border transition-all hover:scale-[1.005] ${
                    user.rank === 1
                      ? "bg-gradient-to-r from-yellow-900/30 to-amber-900/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                      : user.rank === 2
                        ? "bg-gradient-to-r from-zinc-400/20 to-zinc-800/10 border-zinc-400/40"
                        : user.rank === 3
                          ? "bg-gradient-to-r from-orange-900/30 to-amber-900/10 border-orange-700/40"
                          : user.rank <= 10
                            ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-200"
                            : "bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-100/50 dark:border-zinc-800/50 hover:bg-zinc-100"
                  }`}
                >
                  <div className="col-span-1 flex justify-center cursor-pointer" onClick={() => onViewPlayer && onViewPlayer(user)}>
                    {user.rank === 1 ? (
                      <Crown className="text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" size={24} />
                    ) : user.rank === 2 ? (
                      <Medal className="text-zinc-400 drop-shadow-[0_0_5px_rgba(161,161,170,0.5)]" size={22} />
                    ) : user.rank === 3 ? (
                      <Medal className="text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" size={22} />
                    ) : (
                      <span className={`text-lg font-black ${user.rank <= 10 ? 'text-rose-500/80' : 'text-zinc-500 dark:text-zinc-600'}`}>{user.rank}</span>
                    )}
                  </div>

                  <div className="col-span-3 flex items-center space-x-3 cursor-pointer" onClick={() => onViewPlayer && onViewPlayer(user)}>
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-10 h-10 rounded-xl object-cover border-2 ${
                          user.type === "AI" ? "border-rose-500" : "border-orange-500"
                        }`}
                      />
                      <div className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-md flex items-center justify-center border-2 border-white dark:border-zinc-900 ${
                          user.type === "AI" ? "bg-rose-600" : "bg-orange-600"
                        }`}>
                        {user.type === "AI" ? <Cpu size={10} className="text-white" /> : <User size={10} className="text-white" />}
                      </div>
                    </div>
                    <div className="truncate">
                      <span className={`font-black text-base block truncate ${
                          user.rank === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-300 dark:to-amber-500" : 
                          user.rank === 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 dark:from-zinc-200 dark:to-zinc-400" :
                          user.rank === 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-300 dark:to-orange-500" :
                          user.rank <= 10 ? "text-zinc-900 dark:text-white" :
                          "text-zinc-700 dark:text-zinc-200"
                        }`}>
                        {user.name}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-center cursor-pointer" onClick={() => onViewPlayer && onViewPlayer(user)}>
                    {activeTab === "ai" && user.provider ? (
                      <span className="px-2.5 py-1 text-[10px] font-black tracking-wider rounded-md border bg-zinc-150 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700">
                        {user.provider}
                      </span>
                    ) : (
                      <span className={`px-2.5 py-1 text-[10px] font-black tracking-wider rounded-md border ${
                          user.type === "AI"
                            ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20"
                            : "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20"
                        }`}>
                        {user.title}
                      </span>
                    )}
                  </div>

                  <div className="col-span-2 text-center cursor-pointer" onClick={() => onViewPlayer && onViewPlayer(user)}>
                    <div className="inline-flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-950 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800">
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs">{user.winRate}</span>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-end cursor-pointer" onClick={() => onViewPlayer && onViewPlayer(user)}>
                    <div className={`font-mono font-black text-xl ${
                      user.rank <= 3 ? "text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400" : "text-zinc-700 dark:text-zinc-300"
                    }`}>
                      {user.score.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlayer(user);
                        setShowChallengeModal(true);
                      }}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-rose-600 dark:hover:bg-rose-600 text-zinc-600 dark:text-zinc-300 hover:text-white rounded-lg text-xs font-bold transition-all border border-zinc-200 dark:border-zinc-700 hover:border-transparent active:scale-95 shadow-sm"
                    >
                      <Swords size={14} />
                      <span>{t('challenge')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <div className="absolute bottom-[88px] left-0 right-0 p-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between z-20 gap-2 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium px-4">
            {t('showing_pagination', { start: (currentPage - 1) * itemsPerPage + 1, end: Math.min(currentPage * itemsPerPage, rankings.length), total: rankings.length })}
          </div>
          <div className="flex items-center space-x-2 px-4">
            <button 
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsLeft size={16} />
            </button>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex space-x-1 px-2">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNum = currentPage;
                if (currentPage <= 3) pageNum = idx + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + idx;
                else pageNum = currentPage - 2 + idx;
                
                if (pageNum < 1 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                      currentPage === pageNum
                        ? "bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]"
                        : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>

        {/* Sticky Footer: My Rank */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-t border-rose-500/30 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.5)] z-30">
          <div className="grid grid-cols-12 gap-4 items-center max-w-full">
            <div className="col-span-1 flex justify-center">
              <span className="text-xl font-black text-zinc-400 dark:text-zinc-500">842</span>
            </div>
            <div className="col-span-4 flex items-center space-x-4">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80" alt="Me" className="w-12 h-12 rounded-xl object-cover border-2 border-rose-500/50" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg flex items-center justify-center border-2 border-white dark:border-zinc-900 bg-orange-600">
                  <User size={12} className="text-white" />
                </div>
              </div>
              <div>
                <span className="font-black text-lg text-zinc-900 dark:text-white block">{t('me')} (Player_1)</span>
                <span className="text-xs text-rose-500 dark:text-rose-400 font-medium">{t('points_to_next_rank', { points: Math.floor(150 * myScoreMultiplier) })}</span>
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <span className="px-3 py-1 text-xs font-black tracking-wider rounded-lg border bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700">
                {t('rising_star')}
              </span>
            </div>
            <div className="col-span-2 text-center">
              <div className="inline-flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">54.2%</span>
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-end space-x-4 pr-4">
              <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-500">
                <TrendingUp size={14} />
                <span>+{Math.floor(24 * myScoreMultiplier)}</span>
              </div>
              <div className="font-mono font-black text-2xl text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
                {Math.floor(4250 * myScoreMultiplier).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MoDals */}
      <ChallengeModal 
        isOpen={showChallengeModal} 
        onClose={() => setShowChallengeModal(false)} 
        player={selectedPlayer}
        wagerAmount={wagerAmount}
        setWagerAmount={setWagerAmount}
        onConfirm={handleChallengeConfirm}
      />

      <ArenaModal 
        isOpen={showArenaModal} 
        onClose={() => setShowArenaModal(false)} 
        wagerAmount={wagerAmount}
        setWagerAmount={setWagerAmount}
        onConfirm={handleArenaPublishConfirm}
      />
    </div>
  );
}
