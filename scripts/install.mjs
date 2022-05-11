import fs from 'fs';
import os from 'os';
import path from 'path';

function installWindows() {
  const appData = process.env.APPDATA;
  const pluginPath = path.join(appData, 'BetterDiscord', 'plugins');
  const pluginName = 'betterdiscord-google-fonts.plugin.js';
  const compiledPlugin = 'dist/' + pluginName;

  if (!fs.existsSync(compiledPlugin)) {
    throw new Error('Plugin is not built yet, please run `npm run build`');
  }

  fs.copyFileSync(compiledPlugin, path.join(pluginPath, pluginName));
}

function main() {
  switch(os.platform()) {
    case 'win32':
      installWindows();
      break;
    default:
      throw new Error('Unsupported platform');
  }

  console.log('Plugin installed successfully');
}

main();
