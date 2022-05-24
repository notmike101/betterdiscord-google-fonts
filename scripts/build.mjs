import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export const metaInfo = Object.freeze({
  version: packageJson.version,
  source: 'https://github.com/notmike101/betterdiscord-google-fonts',
  website: 'https://mikeorozco.dev',
  author: 'DeNial',
  donate: 'https://buymeacoffee.com/mikeorozcodev',
  updateUrl: 'https://raw.githubusercontent.com/notmike101/betterdiscord-google-fonts/release/betterdiscord-google-fonts.plugin.js',
  authorLink: 'https://mikeorozco.dev',
  description: packageJson.description,
  name: 'GoogleFonts',
  authorId: '142347724392497152',
});

function metaInfoAsJSComment() {
  return Object.entries(metaInfo)
    .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    .reduce((acc, [key, value]) => `${acc}\n * @${key} ${value}`, '/**\n') + '\n */\n'
}

async function main() {
  await esbuild.build({
    plugins: [sassPlugin({
      type: 'css-text'
    })],
    watch: process.argv.slice(2).includes('--watch'),
    banner: {
      js: metaInfoAsJSComment(),
    },
    define: {
      PACKAGE_VERSION: JSON.stringify(metaInfo.version),
      PACKAGE_DESCRIPTION: JSON.stringify(metaInfo.description),
      BETTERDISCORD_UPDATEURL: JSON.stringify(metaInfo.updateUrl),
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
