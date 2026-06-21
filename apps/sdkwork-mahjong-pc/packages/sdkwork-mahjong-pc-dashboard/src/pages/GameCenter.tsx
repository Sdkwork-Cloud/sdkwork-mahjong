import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Filter,
  Users,
  LayoutGrid,
  BrainCircuit,
  Star,
  Activity,
  Flame,
  ChevronRight,
  Gamepad2,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MatchmakingModal, CreateRoomModal } from "sdkwork-mahjong-pc-commons";

// Imported split components
import RecentGamesList from "../components/GameCenter/RecentGamesList";
import GameBanner from "../components/GameCenter/GameBanner";
import LiveMatchesGrid from "../components/GameCenter/LiveMatchesGrid";
import GameCard from "../components/GameCenter/GameCard";

export default function GameCenter({
  setCurrentView,
}: {
  setCurrentView: (view: string) => void;
}) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMatchmakingOpen, setIsMatchmakingOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("随机匹配");

  const [games, setGames] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'newest' | 'rating'>('recommended');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const categories = [
    { id: "all", name: t('all_games'), icon: <LayoutGrid size={16} /> },
    { id: "featured", name: t('featured'), icon: <Star size={16} /> },
    { id: "action", name: t('action'), icon: <Flame size={16} /> },
    { id: "rpg", name: t('rpg'), icon: <Users size={16} /> },
    { id: "strategy", name: t('strategy'), icon: <BrainCircuit size={16} /> },
    { id: "simulation", name: t('simulation'), icon: <Activity size={16} /> },
    { id: "quiz", name: t('quiz'), icon: <BrainCircuit size={16} /> },
    { id: "chess", name: t('chess'), icon: <Gamepad2 size={16} /> },
    { id: "casual", name: t('casual'), icon: <Cpu size={16} /> },
  ];

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Data
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { GameService } = await import('../services/game.service');
        const [gamesRes, bannersRes, recentRes, liveRes] = await Promise.all([
          GameService.getGames({ category: activeTab, searchQuery: debouncedSearch, sortBy }),
          GameService.getFeaturedBanners(),
          GameService.getRecentlyPlayed(),
          GameService.getLiveMatches()
        ]);
        if (isMounted) {
          setGames(gamesRes.games);
          setBanners(bannersRes);
          setRecentGames(recentRes);
          setLiveMatches(liveRes);
        }
      } catch (error) {
        console.error("Failed to load Game Center data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [activeTab, debouncedSearch, sortBy]);

  const handleQuickMatch = (gameName: string) => {
    const canonicalName = t(gameName);
    if (gameName === 'quiz' || gameName === 'quiz_arena') {
       setCurrentView('quiz');
       return;
    }
    setSelectedGame(canonicalName);
    setIsMatchmakingOpen(true);
  };

  const handlePlayAction = (game: any) => {
    if (game.actionId === 'quiz') {
      setCurrentView('quiz');
    } else {
      handleQuickMatch(game.name);
    }
  };

  const handleCreateRoomAction = (game: any) => {
    setIsCreateRoomOpen(true);
  };

  const handleChallengeAIAction = (game: any) => {
    handleQuickMatch(`${game.name} (${t('ai')})`);
  };

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-zinc-900/50 rounded-[2rem] border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden flex flex-col animate-pulse h-[390px]">
      <div className="h-56 bg-zinc-200 dark:bg-zinc-800 w-full shrink-0"></div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="flex justify-between mb-4">
          <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
          <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
        </div>
        <div className="mt-auto flex gap-2">
          <div className="flex-1 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
          <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
          <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="group cursor-default">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 tracking-tight mb-2 group-hover:from-emerald-600 group-hover:to-teal-500 dark:group-hover:from-emerald-400 dark:group-hover:to-teal-300 transition-all duration-500">
            {t('game_center')}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors duration-300">
            {t('explore_multiverse')}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 relative z-20">
          <div className="flex items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl px-4 py-3 border border-zinc-200/80 dark:border-zinc-800/80 focus-within:border-emerald-500/50 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all shadow-sm dark:shadow-inner group hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <Search size={18} className="text-zinc-500 group-focus-within:text-emerald-500 group-hover:text-emerald-400 transition-colors" />
            <input
              type="text"
              placeholder={t('search_games')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-200 ml-3 w-48 lg:w-64 font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl transition-all shadow-sm active:scale-95 ${isFilterOpen ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:bg-emerald-50 dark:hover:bg-emerald-500/10'}`}
            >
              <Filter size={20} />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 p-2"
                >
                  <div className="px-3 py-2 text-xs font-black text-zinc-400 uppercase tracking-wider">{t('sort_by', '排序方式')}</div>
                  <div className="flex flex-col gap-1">
                    {[
                      { id: 'recommended', label: t('recommended_sort', '推荐排序') },
                      { id: 'popular', label: t('most_popular', '最受欢�?) },
                      { id: 'newest', label: t('newest_release', '最新上�?) },
                      { id: 'rating', label: t('highest_rating', '评分最�?) }
                    ].map(sortOpt => (
                      <button
                        key={sortOpt.id}
                        onClick={() => { setSortBy(sortOpt.id as any); setIsFilterOpen(false); }}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${sortBy === sortOpt.id ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
                      >
                        {sortOpt.label}
                        {sortBy === sortOpt.id && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Recently Played Section */}
      {activeTab === "all" && !searchQuery && recentGames.length > 0 && (
        <RecentGamesList 
          recentGames={recentGames}
          onPlay={handlePlayAction}
        />
      )}

      {/* Featured Banner */}
      {activeTab === "all" && !searchQuery && banners.length > 0 && (
        <GameBanner 
          banner={banners[0]}
          onQuickMatch={handleQuickMatch}
        />
      )}

      {/* Live Matches Section */}
      {activeTab === "all" && !searchQuery && liveMatches.length > 0 && (
        <LiveMatchesGrid 
          liveMatches={liveMatches}
          onSpectate={handlePlayAction}
        />
      )}

      {/* Categories Tabs Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide shrink-0 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-black whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
              activeTab === cat.id
                ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-white/20 scale-105"
                : "bg-white dark:bg-zinc-900/80 backdrop-blur-xl text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-500/30"
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="shrink-0 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Flame className="text-orange-500" />
            {searchQuery ? t('search_results', 'Search Results') : activeTab === 'all' ? t('trending_now') : categories.find(c => c.id === activeTab)?.name}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <motion.div
                key={`skel-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonCard />
              </motion.div>
            ))
          ) : (
            games.map((game, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                key={game.id}
              >
                <GameCard 
                  game={game}
                  categoryName={categories.find(c => c.id === game.category)?.name}
                  onPlay={handlePlayAction}
                  onCreateRoom={handleCreateRoomAction}
                  onChallengeAI={handleChallengeAIAction}
                />
              </motion.div>
            )))}
          </AnimatePresence>
        </div>
      </div>

      {/* New Arrivals Section */}
      {activeTab === "all" && !searchQuery && games.length > 0 && !loading && (
        <div className="shrink-0 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <Star className="text-emerald-500" />
              {t('new_arrivals', 'New Arrivals')}
            </h2>
            <button className="text-sm font-bold text-zinc-500 hover:text-emerald-500 transition-colors flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              {t('view_all', 'View All')} <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.slice(0, 6).map((game, i) => (
              <motion.div 
                whileHover={{ y: -4 }}
                key={`new-${game.id}`} 
                className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="h-36 relative overflow-hidden shrink-0">
                  <img src={game.img} alt={t(game.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute top-2 left-2">
                    {game.aiDifficulty && (
                      <div className="bg-zinc-900/80 text-emerald-400 text-[8px] font-black px-2 py-1 rounded-md shadow-lg flex items-center gap-1 backdrop-blur-md border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <Cpu size={10} />
                        {game.aiDifficulty}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-black text-white truncate drop-shadow-md group-hover:text-emerald-400 transition-colors">{t(game.name)}</h3>
                  </div>
                </div>
                <div className="p-3 flex-1 flex justify-between items-center bg-white dark:bg-zinc-900/50 relative z-10">
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20 uppercase tracking-wider group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    {t('play_free', 'Play Free')}
                  </span>
                  <button onClick={() => handleQuickMatch(game.name)} className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm hover:scale-110 active:scale-95 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {games.length === 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center text-zinc-500 py-32 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/50 mt-8 shadow-inner"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
            <div className="w-32 h-32 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-2xl border border-zinc-200/50 dark:border-zinc-700/50 relative z-10">
              <Gamepad2 size={64} className="text-zinc-300 dark:text-zinc-600" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">{t('no_games_found')}</h3>
          <p className="text-zinc-500 font-medium text-lg max-w-md text-center">{t('try_changing_search')}</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="mt-8 px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-black hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
          >
            {t('clear_search', 'Clear Search')}
          </button>
        </motion.div>
      )}

      <MatchmakingModal 
        isOpen={isMatchmakingOpen} 
        onClose={() => setIsMatchmakingOpen(false)} 
        gameName={selectedGame}
      />
      <CreateRoomModal 
        isOpen={isCreateRoomOpen} 
        onClose={() => setIsCreateRoomOpen(false)} 
      />
    </div>
  );
}
