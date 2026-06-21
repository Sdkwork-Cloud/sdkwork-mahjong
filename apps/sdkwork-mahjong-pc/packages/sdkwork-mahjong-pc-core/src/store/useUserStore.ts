import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type VipLevel = 'none' | 'pro' | 'peak';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'exchange';
  amount: number;
  status: 'success' | 'processing' | 'failed';
  date: string;
  method: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  exp: number;
  points: number;
  computeTokens: number;
  vipLevel: VipLevel;
  vipExpiry?: number;
}

interface UserState {
  profile: UserProfile | null;
  transactions: Transaction[];
  login: (profile: UserProfile) => void;
  logout: () => void;
  addPoints: (amount: number, method?: string) => void;
  deductPoints: (amount: number, method?: string) => boolean;
  addComputeTokens: (amount: number, method?: string) => void;
  deductComputeTokens: (amount: number, method?: string) => boolean;
  setVipLevel: (level: VipLevel, days: number) => void;
  addExp: (amount: number) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
}

const defaultProfile: UserProfile = {
  id: 'user-1',
  username: 'Player_001',
  avatar: 'https://picsum.photos/seed/user1/200/200',
  level: 5,
  exp: 1250,
  points: 10000,
  computeTokens: 500,
  vipLevel: 'none',
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      transactions: [],
      login: (profile) => set({ profile }),
      logout: () => set({ profile: null, transactions: [] }),
      
      addTransaction: (tx) => set((state) => {
        const newTx: Transaction = {
          ...tx,
          id: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        return { transactions: [newTx, ...state.transactions] };
      }),

      addPoints: (amount, method) => set((state) => {
        if (!state.profile) return state;
        
        if (method) {
          get().addTransaction({
            type: 'deposit',
            amount,
            status: 'success',
            method
          });
        }
        
        return {
          profile: {
            ...state.profile,
            points: state.profile.points + amount
          }
        };
      }),
      
      deductPoints: (amount, method) => {
        const state = get();
        if (!state.profile || state.profile.points < amount) return false;
        
        if (method) {
          get().addTransaction({
            type: method === 'withdraw' ? 'withdraw' : 'exchange',
            amount: -amount,
            status: method === 'withdraw' ? 'processing' : 'success',
            method
          });
        }
        
        set({
          profile: {
            ...state.profile,
            points: state.profile.points - amount
          }
        });
        return true;
      },
      
      addComputeTokens: (amount, method) => set((state) => {
        if (!state.profile) return state;
        
        if (method) {
          get().addTransaction({
            type: 'exchange',
            amount,
            status: 'success',
            method
          });
        }
        
        return {
          profile: {
            ...state.profile,
            computeTokens: state.profile.computeTokens + amount
          }
        };
      }),
      
      deductComputeTokens: (amount, method) => {
        const state = get();
        if (!state.profile || state.profile.computeTokens < amount) return false;
        
        if (method) {
          get().addTransaction({
            type: 'exchange',
            amount: -amount,
            status: 'success',
            method
          });
        }
        
        set({
          profile: {
            ...state.profile,
            computeTokens: state.profile.computeTokens - amount
          }
        });
        return true;
      },
      
      setVipLevel: (level, days) => set((state) => {
        if (!state.profile) return state;
        const now = Date.now();
        const expiry = now + days * 24 * 60 * 60 * 1000;
        return {
          profile: {
            ...state.profile,
            vipLevel: level,
            vipExpiry: expiry
          }
        };
      }),
      
      addExp: (amount) => set((state) => {
        if (!state.profile) return state;
        const newExp = state.profile.exp + amount;
        // Simple level up logic: 1000 exp per level
        const newLevel = Math.floor(newExp / 1000) + 1;
        return {
          profile: {
            ...state.profile,
            exp: newExp,
            level: newLevel
          }
        };
      }),
    }),
    {
      name: 'user-storage',
    }
  )
);
