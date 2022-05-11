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
    external: ['betterdiscord'],
    bundle: true,
    sourcemap: 'inline',
    format: 'cjs',
    target: 'esnext',
    jsx: 'transform',
    logLevel: 'info',
    minify: !process.argv.slice(2).includes('--dev'),
  });
}

main();
