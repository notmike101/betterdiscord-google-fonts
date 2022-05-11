import fs from 'fs/promises';

async function getRemoteFonts() {
  const response = await fetch(
    'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDprsWbtpdexhyLHG6vvSTzH9-dHt-XMEw'
  );

  const fonts = await response.json();

  return fonts;
}

async function main() {
  const fonts = await getRemoteFonts();

  const content = JSON.stringify(fonts, null, 2);

  await fs.writeFile('./src/google-fonts.json', content);

  return;
}

main();
