import 'dotenv/config';
import fs from 'fs/promises';

async function getRemoteFonts() {
  const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GFONT_API_KEY}`);
  const fonts = await response.json();

  return fonts.items.map((font) => font.family);
}

async function main() {
  const fonts = await getRemoteFonts();
  const content = JSON.stringify(fonts, null, 2);

  await fs.writeFile('./dist/google-fonts.json', content);

  return;
}

main();
