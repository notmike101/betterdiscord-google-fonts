const { build } = require('esbuild');
const packageJson = require('./package.json');
const inlineImportPlugin = require('esbuild-plugin-inline-import');
const { sassPlugin } = require('esbuild-sass-plugin');

const { main, name, version, description, author, betterdiscord, homepage } =
  packageJson;

const metaComment = {
  name,
  version: version ?? '0.0.1',
  description,
  author: author?.name ?? author ?? undefined,
  authorLink: author.url ?? homepage ?? undefined,
  authorId: betterdiscord?.discord_snowflake,
  updateUrl: betterdiscord?.update_url,
  website: betterdiscord?.website,
  source: betterdiscord?.source,
  invite: betterdiscord?.invite,
  donate: betterdiscord?.donate,
  patreon: betterdiscord?.patreon,
};
Object.keys(metaComment).forEach((key) => {
  if (metaComment[key] === undefined) {
    delete metaComment[key];
  }
});

const bdApiIgnore = {
  name: 'bdapi-ignore',
  setup(build) {
    build.onResolve({ filter: /bandagedbd__bdapi/ }, (args) => {
      return null;
    });
  },
};

const options = {
  entryPoints: [main],
  outfile: `dist/${name}.plugin.js`,
  bundle: true,
  minify: false,
  format: 'cjs',
  platform: 'node',
  sourcemap: false,
  plugins: [
    inlineImportPlugin(),
    sassPlugin({
      type: 'css-text',
    }),
    bdApiIgnore,
  ],
  banner: {
    js:
      Object.entries(metaComment).reduce(
        (acc, [key, value]) => `${acc}\n * @${key} ${value}`,
        '/**'
      ) + '\n */\n',
  },
};

build(options).catch((err) => {
  // eslint-disable-next-line no-console
  console.warn(err);
  process.exit(1);
});
