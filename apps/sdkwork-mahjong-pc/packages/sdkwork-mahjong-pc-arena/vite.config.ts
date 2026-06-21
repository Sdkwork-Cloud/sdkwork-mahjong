import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SdkworkMahjongArena',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-i18next', 'lucide-react', 'motion/react', 'sdkwork-mahjong-pc-core', 'sdkwork-mahjong-pc-i18n']
    }
  }
});
