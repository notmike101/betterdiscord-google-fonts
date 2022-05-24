import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import { metaInfoAsJSComment } from '../betterdiscord.config.mjs';

async function main() {
  await esbuild.build({
    plugins: [sassPlugin({
      type: 'css-text'
    })],
    watch: process.argv.slice(2).includes('--watch'),
    banner: {
      js: metaInfoAsJSComment(),
    },
    entryPoints: ['./src/main.tsx'],
    outfile: './dist/betterdiscord-google-fonts.plugin.js',
    external: ['betterdiscord/bdapi'],
    bundle: true,
    sourcemap: false,
    format: 'cjs',
    target: 'esnext',
    jsx: 'transform',
    logLevel: 'info',
    minify: false,
  });
}

main();
