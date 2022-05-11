import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import pkg from './package.json';
import path from 'path';

const metaComment = {
  name: pkg.betterdiscord?.plugin_name ?? pkg.name,
  version: pkg.version ?? '1.0.0',
  description: pkg.description ?? '',
  author: pkg.betterdiscord?.author_name ?? pkg.author?.name ?? pkg.author,
  website: pkg.author?.url ?? pkg.homepage ?? '',
  authorLink: pkg.author?.url ?? pkg.homepage ?? '',
  authorId: pkg.betterdiscord?.discord_snowflake ?? '',
  updateUrl: pkg.betterdiscord?.update_url,
  source: pkg.betterdiscord?.source,
};

export default defineConfig(({ mode }) => ({
  plugins: [
    banner(
      Object.entries(metaComment)
        .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
        .reduce((acc, [key, value]) => `${acc}\n * @${key} ${value}`, '/**\n') + '\n */\n'
    ),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname),
    }, 
  },
  build: {
    sourcemap: 'inline',
    target: '',
    minify: mode === 'production' ? 'terser' : false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'betterdiscord/bdapi'],
      inlineDynamicImports: true,
      output: {
        entryFileNames: 'google-fonts.plugin.js',
        format: 'commonjs',
        manualChunks: () => 'bundle.js',
      },
    },
    lib: {
      name: 'plugin',
      entry: './src/main.tsx',
      format: 'cjs',
    },
  },
}));