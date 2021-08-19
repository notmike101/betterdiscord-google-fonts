import fs from 'fs';
import os from 'os';
import path from 'path';
import packageJson from './package.json';

const name = packageJson.name;

function installWindows() {
  return new Promise((resolve, reject) => {
    const appData = process.env.APPDATA;
    const pluginPath = path.join(appData, 'BetterDiscord', 'plugins');
    const pluginName = `${name}.plugin.js`;
    const compiledPlugin = `./dist/${pluginName}`;

    if (!fs.existsSync(compiledPlugin))
      reject('Plugin is not built yet, please run npm run build');

    fs.copyFile(compiledPlugin, path.join(pluginPath, pluginName), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

function main() {
  switch (os.platform()) {
    case 'win32':
      installWindows();
      break;
    default:
      throw new Error('Unsupported OS');
  }
}

main();
