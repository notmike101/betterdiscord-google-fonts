export const version = '2.0.4';
export const pluginName = 'GoogleFonts';
export const discordSnowflake = '142347724392497152';
export const author = 'DeNial';
export const updateURL = 'https://raw.githubusercontent.com/notmike101/betterdiscord-google-fonts/release/betterdiscord-google-fonts.plugin.js';
export const source = 'https://github.com/notmike101/betterdiscord-google-fonts';
export const website = 'https://mikeorozco.dev';
export const authorLink = 'https://mikeorozco.dev';
export const description = 'Injects Google Fonts into Discord';
export const donate = 'https://www.buymeacoffee.com/mikeorozcodev';

export const metaInfo = Object.freeze({
  version,
  source,
  website,
  author,
  donate,
  updateUrl: updateURL,
  authorLink,
  description,
  name: pluginName,
  authorId: discordSnowflake,
});

export function metaInfoAsJSComment() {
  return Object.entries(metaInfo)
    .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    .reduce((acc, [key, value]) => `${acc}\n * @${key} ${value}`, '/**\n') + '\n */\n'
}
