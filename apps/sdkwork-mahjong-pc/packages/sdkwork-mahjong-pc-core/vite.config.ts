import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SdkworkMahjongCore',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['zustand', 'zustand/middleware']
    }
  }
});
