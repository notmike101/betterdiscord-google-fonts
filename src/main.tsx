import googleFonts from './google-fonts.json';
import SettingsPanel from './SettingsPanel';
import { updateURL, version } from '../betterdiscord.config.mjs';
import { React, getData, setData, injectCSS, clearCSS } from 'betterdiscord/bdapi';
import { Updater } from 'betterdiscord-plugin-updater';

class Plugin {
  public fonts: Font[];
  public selectedFont: string | null;
  public originalFont: string | null;
  private updater: Updater;

  public load() {
    this.selectedFont = getData('betterdiscord-google-fonts', 'selectedFont');
    this.fonts = googleFonts.items ?? [];
    this.updater = new Updater(updateURL, version);
  }

  public start() {
    this.update();

    this.originalFont = getComputedStyle(document.documentElement).getPropertyValue('--font-primary').trim();

    this.log('Original font:', this.originalFont);

    this.applyFont(this.selectedFont);
  }

  public stop() {
    this.applyFont(null);
  }

  private log(...message): void {
    console.log(`%c[GoogleFonts]%c (${version})%c ${message.join(' ')}`, 'color: lightblue;', 'color: gray', 'color: white');
  }

  private async update(): Promise<void>{
    const isUpdateAvailable = await this.updater.isUpdateAvailable();

    if (isUpdateAvailable) {
      this.updater.showUpdateBanner();
    }
  }

  private applyFont(fontName: string): void {
    let style = '';

    clearCSS('betterdiscord-google-fonts-customfont');

    if (fontName !== null && fontName !== '') {
      this.log(`Changing font to ${fontName}`);

      style = `
        @import url('https://fonts.googleapis.com/css?family=${fontName}&display=swap');

        :root {
          --font-primary: ${fontName} !important;
        }
      `;

      injectCSS('betterdiscord-google-fonts-customfont', style);
    } else {
      this.log(`Reverting to original font (${this.originalFont})`);
    }
  }

  private fontChangeCallback(fontName: string): void {
    this.selectedFont = fontName;
    setData('betterdiscord-google-fonts', 'selectedFont', fontName);

    this.applyFont(fontName);
  }

  public getSettingsPanel() {
    return <SettingsPanel fonts={this.fonts} fontChangeCallback={this.fontChangeCallback.bind(this)} />;
  }
}

export default Plugin;
