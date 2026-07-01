import { slugify } from '@sdkwork/utils';

export type MahjongMatchStatus = 'draft' | 'published' | 'archived';

export interface MahjongMatchSummary {
  id: string;
  matchCode: string;
  title: string;
  status: MahjongMatchStatus;
}

export function normalizeMatchCode(title: string): string {
  return slugify(title);
}

export const MAHJONG_APP_API_PREFIX = '/app/v3/api';
export const MAHJONG_BACKEND_API_PREFIX = '/backend/v3/api';
