import SettingsPanel from './SettingsPanel';
import BdAPI, { React, getData, setData, injectCSS, clearCSS } from 'betterdiscord/bdapi';
import { Updater, Logger } from 'betterdiscord-plugin-libs';

class Plugin {
  public fonts: string[];
  public selectedFont: string | null;
  public originalFont: string | null;
  private updater: Updater;
  private logger: Logger;
  private fontFetcher: Promise<any>;

  private async getGoogleFonts(): Promise<void> {
    try {
      const res = await fetch('https://raw.githubusercontent.com/notmike101/betterdiscord-google-fonts/release/google-fonts.json');
      const fonts = await res.json();

      this.fonts = fonts;
    } catch (err) {
      this.logger.error(err.message);

      this.fonts = [];
    }
  }

  public load(): void {
    this.logger = new Logger('GoogleFonts v' + PACKAGE_VERSION, 'lightblue', 'white');
    this.selectedFont = getData('betterdiscord-google-fonts', 'selectedFont') ?? null;
    this.updater = new Updater({
      BdAPI,
      currentVersion: PACKAGE_VERSION,
      updatePath: BETTERDISCORD_UPDATEURL,
      showToasts: true,
    });

    this.fontFetcher = this.getGoogleFonts();

    this.logger.log(this.fonts);
  }

  public async start(): Promise<void> {
    this.update();

    this.originalFont = getComputedStyle(document.documentElement).getPropertyValue('--font-primary').trim();

    await this.fontFetcher;
    this.applyFont(this.selectedFont);
  }

  public stop(): void {
    this.applyFont(null);
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
      this.logger.log(`Changing font to ${fontName}`);

      const style: string = `
        @import url('https://fonts.googleapis.com/css?family=${fontName}&display=swap');

        :root {
          --font-gfont: ${fontName} !important;
        }

        *:not([class*="hljs"]):not(code){
          font-family: var(--font-gfont) !important;
        }
      `;

      injectCSS('betterdiscord-google-fonts-customfont', style);
    } else {
      this.logger.log(`Reverting to original font (${this.originalFont})`);
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
