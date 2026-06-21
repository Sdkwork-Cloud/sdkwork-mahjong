export type Tag = string;

export interface Game {
  id: string | number;
  name: string;
  category: string;
  desc: string;
  img: string;
  isHot: boolean;
  playersOnline: string | number;
  rating: number;
  aiDifficulty?: string;
  tags: Tag[];
  actionId?: string; // used to trigger specific UI actions.
}

export interface GameCategory {
  id: string;
  nameKey: string;
  iconName: string;
}

export interface FeatureBanner {
  id: string;
  titleKey: string;
  subtitleKey: string;
  image: string;
  tagKey: string;
  color?: string;
}

export interface LiveMatchPlayer {
  id: string;
  nameKey: string;
  avatarSeed: string;
  type: 'human' | 'ai';
}

export interface LiveMatch {
  id: string;
  gameId: string | number;
  gameNameKey: string;
  spectators: string | number;
  status: 'live';
  teams: [LiveMatchPlayer, LiveMatchPlayer];
}

export interface GameListResponse {
  games: Game[];
  total: number;
}

export type SortOption = 'recommended' | 'popular' | 'newest' | 'rating';

export interface GetGamesParams {
  category?: string;
  searchQuery?: string;
  sortBy?: SortOption;
  limit?: number;
  offset?: number;
}
