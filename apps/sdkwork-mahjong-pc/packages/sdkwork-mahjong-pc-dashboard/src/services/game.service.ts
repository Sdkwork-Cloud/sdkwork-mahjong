import { Game, GetGamesParams, GameListResponse, FeatureBanner, LiveMatch } from '../types/game.types';

// Mock data store
const MOCK_GAMES: Game[] = [
  {
    id: "cyber-strike",
    name: "cyber_strike",
    category: "action",
    desc: "cyber_strike_desc",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    isHot: true,
    playersOnline: "125.4k",
    rating: 4.9,
    aiDifficulty: "S+",
    tags: ["cyber_strike_tag_1", "cyber_strike_tag_2", "cyber_strike_tag_3"]
  },
  {
    id: "stellar-empire",
    name: "stellar_empire",
    category: "strategy",
    desc: "stellar_empire_desc",
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
    isHot: true,
    playersOnline: "89.2k",
    rating: 4.8,
    aiDifficulty: "S",
    tags: ["stellar_empire_tag_1", "stellar_empire_tag_2", "stellar_empire_tag_3"]
  },
  {
    id: "neon-city",
    name: "neon_city",
    category: "simulation",
    desc: "neon_city_desc",
    img: "https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&q=80",
    isHot: false,
    playersOnline: "45.1k",
    rating: 4.7,
    aiDifficulty: "A",
    tags: ["neon_city_tag_1", "neon_city_tag_2", "neon_city_tag_3"]
  },
  {
    id: "fantasy-quest",
    name: "fantasy_quest",
    category: "rpg",
    desc: "fantasy_quest_desc",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    isHot: true,
    playersOnline: "210.5k",
    rating: 4.9,
    aiDifficulty: "A+",
    tags: ["fantasy_quest_tag_1", "fantasy_quest_tag_2", "fantasy_quest_tag_3"]
  },
  {
    id: "quiz-arena",
    name: 'quiz_arena',
    category: "quiz",
    desc: 'quiz_arena_desc',
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
    actionId: "quiz",
    isHot: true,
    playersOnline: "12.5k",
    rating: 4.9,
    aiDifficulty: "S",
    tags: ['knowledge', 'quick_answer', 'multiplayer']
  },
  {
    id: 9,
    name: 'guandan',
    category: "chess",
    desc: 'guandan_desc',
    img: "https://images.unsplash.com/photo-1501003878151-d3cb87799705?w=800&q=80",
    isHot: true,
    playersOnline: "88.5k",
    rating: 4.9,
    aiDifficulty: "S",
    tags: ['hit', 'four_players', 'social']
  },
  {
    id: 2,
    name: 'classic_mahjong',
    category: "mahjong",
    desc: 'classic_mahjong_desc',
    img: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80",
    isHot: true,
    playersOnline: "45.1k",
    rating: 4.7,
    aiDifficulty: "A+",
    tags: ['national', 'casual', 'team']
  },
  {
    id: 10,
    name: 'chinese_chess',
    category: "chess",
    desc: 'chinese_chess_desc',
    img: "https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800&q=80",
    isHot: true,
    playersOnline: "65.2k",
    rating: 4.8,
    aiDifficulty: "S+",
    tags: ['national_essence', 'strategy', 'classic']
  },
  {
    id: 3,
    name: 'sichuan_mahjong',
    category: "chess",
    desc: 'sichuan_mahjong_desc',
    img: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&q=80",
    isHot: true,
    playersOnline: "32.8k",
    rating: 4.9,
    aiDifficulty: "A",
    tags: ['local_feature', 'competitive', '4_player_table']
  },
  {
    id: 11,
    name: 'tractor',
    category: "chess",
    desc: 'tractor_desc',
    img: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=800&q=80",
    isHot: false,
    playersOnline: "22.4k",
    rating: 4.7,
    aiDifficulty: "B+",
    tags: ['coop', 'upgrade', 'casual']
  },
  {
    id: 1,
    name: 'chess_game',
    category: "chess",
    desc: 'chess_game_desc',
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    isHot: false,
    playersOnline: "8.2k",
    rating: 4.8,
    aiDifficulty: "S+",
    tags: ['strategy', "1v1", "AI"]
  },
  {
    id: 14,
    name: 'flying_chess',
    category: "casual",
    desc: 'flying_chess_desc',
    img: "https://images.unsplash.com/photo-1633327760690-d9ab06112bfd?w=800&q=80",
    isHot: true,
    playersOnline: "35.6k",
    rating: 4.8,
    aiDifficulty: "B",
    tags: ['childhood', 'party', 'joy']
  },
  {
    id: 4,
    name: 'texas_holdem',
    category: "chess",
    desc: 'texas_holdem_desc',
    img: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&q=80",
    isHot: false,
    playersOnline: "15.4k",
    rating: 4.6,
    aiDifficulty: "S",
    tags: ['psychological', 'tournament', 'high_difficulty']
  },
  {
    id: 12,
    name: 'guangdong_mahjong',
    category: "chess",
    desc: 'guangdong_mahjong_desc',
    img: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&q=80",
    isHot: false,
    playersOnline: "19.8k",
    rating: 4.6,
    aiDifficulty: "A",
    tags: ['push_down', 'buy_horse', 'fast_paced']
  },
  {
    id: 5,
    name: 'go',
    category: "chess",
    desc: 'go_desc',
    img: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?w=800&q=80",
    isHot: false,
    playersOnline: "5.6k",
    rating: 4.9,
    aiDifficulty: "S+",
    tags: ['national_essence', 'deep_thinking', 'human_vs_ai']
  },
  {
    id: 13,
    name: 'run_fast',
    category: "chess",
    desc: 'run_fast_desc',
    img: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80",
    isHot: false,
    playersOnline: "14.5k",
    rating: 4.5,
    aiDifficulty: "A",
    tags: ['extreme_speed', 'three_players', 'competitive']
  },
  {
    id: 15,
    name: 'bridge',
    category: "chess",
    desc: 'bridge_desc',
    img: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&q=80",
    isHot: false,
    playersOnline: "8.9k",
    rating: 4.9,
    aiDifficulty: "S",
    tags: ['high_difficulty', 'tournament', 'brain_burning']
  },
  {
    id: 16,
    name: 'military_chess',
    category: "chess",
    desc: 'military_chess_desc',
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    isHot: false,
    playersOnline: "12.3k",
    rating: 4.6,
    aiDifficulty: "A+",
    tags: ['dark_chess', 'reasoning', 'classic']
  },
  {
    id: 7,
    name: 'national_mahjong',
    category: "mahjong",
    desc: 'national_mahjong_desc',
    img: "https://images.unsplash.com/photo-1596423735880-5f2a689b903e?w=800&q=80",
    isHot: false,
    playersOnline: "18.9k",
    rating: 4.7,
    aiDifficulty: "A",
    tags: ['tournament', 'formal', 'competitive']
  },
  {
    id: 8,
    name: 'gomoku',
    category: "chess",
    desc: 'gomoku_desc',
    img: "https://images.unsplash.com/photo-1610890716175-32561b38f8c2?w=800&q=80",
    isHot: false,
    playersOnline: "11.2k",
    rating: 4.4,
    aiDifficulty: "B+",
    tags: ['casual', 'fast', 'two_players']
  },
  {
    id: 6,
    name: 'sudoku',
    category: "casual",
    desc: 'sudoku_desc',
    img: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=80",
    isHot: false,
    playersOnline: "3.2k",
    rating: 4.5,
    aiDifficulty: "B",
    tags: ['single_player', 'puzzle', 'breakthrough']
  }
];

const MOCK_BANNERS: FeatureBanner[] = [
  {
    id: "banner1",
    titleKey: 's3_peak_showdown',
    subtitleKey: 'win_millions',
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
    tagKey: 'season_event',
    color: "from-rose-600 to-orange-600"
  }
];

const MOCK_LIVE_MATCHES: LiveMatch[] = [
  {
    id: "lm1",
    gameId: "cyber-strike",
    gameNameKey: "cyber_strike",
    spectators: "12.4k",
    status: 'live',
    teams: [
      { id: "h1", nameKey: 'human_pro', avatarSeed: "Human1", type: "human" },
      { id: "a1", nameKey: 'alpha_bot', avatarSeed: "AI1", type: "ai" }
    ]
  },
  {
    id: "lm2",
    gameId: "fantasy-quest",
    gameNameKey: "fantasy_quest",
    spectators: "8.2k",
    status: 'live',
    teams: [
      { id: "h2", nameKey: 'human_pro', avatarSeed: "Human2", type: "human" },
      { id: "a2", nameKey: 'alpha_bot', avatarSeed: "AI2", type: "ai" }
    ]
  },
  {
    id: "lm3",
    gameId: "stellar-empire",
    gameNameKey: "stellar_empire",
    spectators: "15.1k",
    status: 'live',
    teams: [
      { id: "h3", nameKey: 'human_pro', avatarSeed: "Human3", type: "human" },
      { id: "a3", nameKey: 'alpha_bot', avatarSeed: "AI3", type: "ai" }
    ]
  }
];

/**
 * Game Service - Simulates backend API calls for game discovery and matchmaking.
 */
export class GameService {
  /**
   * Fetch games with optional filtering, searching, and sorting.
   */
  static async getGames(params: GetGamesParams = {}): Promise<GameListResponse> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filtered = [...MOCK_GAMES];

    // Apply strict category filtering
    if (params.category && params.category !== 'all') {
      if (params.category === 'featured') {
        filtered = filtered.filter(g => g.rating >= 4.8);
      } else {
        filtered = filtered.filter(g => g.category === params.category);
      }
    }

    // Apply search
    if (params.searchQuery) {
      const q = params.searchQuery.toLowerCase();
      filtered = filtered.filter(g => 
        g.name.toLowerCase().includes(q) || 
        g.desc.toLowerCase().includes(q) ||
        g.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    if (params.sortBy) {
      switch(params.sortBy) {
        case 'popular':
          filtered.sort((a, b) => parseFloat(b.playersOnline.toString()) - parseFloat(a.playersOnline.toString()));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Mock data lacks creation dates, randomize slightly to simulate "newest"
          filtered.sort(() => Math.random() - 0.5);
          break;
        case 'recommended':
        default:
          filtered.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
          break;
      }
    } else {
      // Default recommended sorting
      filtered.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
    }

    return {
      games: filtered,
      total: filtered.length
    };
  }

  /**
   * Fetch featured banners for the carousel.
   */
  static async getFeaturedBanners(): Promise<FeatureBanner[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_BANNERS;
  }

  /**
   * Fetch recently played games by the current user.
   */
  static async getRecentlyPlayed(): Promise<Game[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_GAMES.slice(0, 5); // Return a mix
  }

  /**
   * Fetch active, high-visibility matches to spectate.
   */
  static async getLiveMatches(): Promise<LiveMatch[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return MOCK_LIVE_MATCHES;
  }
}
