import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Region = 'CN' | 'GLOBAL';
export type Language = 'zh' | 'en';

interface ConfigState {
  region: Region;
  language: Language;
  setRegion: (region: Region) => void;
  setLanguage: (language: Language) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      region: 'CN', // Default to China region
      language: 'zh', // Default to Chinese
      setRegion: (region) => set({ region }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-config-storage',
    }
  )
);
