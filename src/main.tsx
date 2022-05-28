import googleFonts from './google-fonts.json';
import SettingsPanel from './SettingsPanel';
import { React, getData, setData, injectCSS, clearCSS } from 'betterdiscord/bdapi';
import { Updater } from 'betterdiscord-plugin-updater';

class Plugin {
  public fonts: Font[];
  public selectedFont: string | null;
  public originalFont: string | null;
  private updater: Updater;

  public load(): void {
    this.selectedFont = getData('betterdiscord-google-fonts', 'selectedFont') ?? null;
    this.fonts = googleFonts.items ?? [];
    this.updater = new Updater(BETTERDISCORD_UPDATEURL, PACKAGE_VERSION);

    this.log('Loaded plugin');
  }

  public start(): void {
    this.update();

    this.originalFont = getComputedStyle(document.documentElement).getPropertyValue('--font-primary').trim();

    this.applyFont(this.selectedFont);
    this.log('Started plugin');
  }

  public stop(): void {
    this.applyFont(null);
  }

  private log(...message: string[]): void {
    console.log(`%c[GoogleFonts]%c (${PACKAGE_VERSION})%c ${message.join(' ')}`, 'color: lightblue;', 'color: gray', 'color: white');
  }

  private async update(): Promise<void>{
    const isUpdateAvailable: boolean = await this.updater.isUpdateAvailable();

    if (isUpdateAvailable) {
      this.updater.showUpdateBanner();
    }
  }

  private applyFont(fontName: string | null): void {
    clearCSS('betterdiscord-google-fonts-customfont');

    if (!!fontName) {
      this.log(`Changing font to ${fontName}`);

      const style: string = `
        @import url('https://fonts.googleapis.com/css?family=${fontName}&display=swap');

        :root {
          --font-primary: ${fontName} !important;
        }

        *:not([class*="hljs"]):not(code){
          font-family: var(--font-primary) !important;
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

  public getSettingsPanel(): JSX.Element {
    return <SettingsPanel fonts={this.fonts} fontChangeCallback={this.fontChangeCallback.bind(this)} />;
  }
}

export default Plugin;
