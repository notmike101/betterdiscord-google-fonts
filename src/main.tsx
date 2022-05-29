import googleFonts from './google-fonts.json';
import SettingsPanel from './SettingsPanel';
import BdAPI, { React, getData, setData, injectCSS, clearCSS } from 'betterdiscord/bdapi';
import { Updater, Logger } from 'betterdiscord-plugin-libs';

class Plugin {
  public fonts: Font[];
  public selectedFont: string | null;
  public originalFont: string | null;
  private updater: Updater;
  private logger: Logger;

  public load(): void {
    this.selectedFont = getData('betterdiscord-google-fonts', 'selectedFont') ?? null;
    this.fonts = googleFonts.items ?? [];
    this.updater = new Updater({
      BdAPI,
      currentVersion: PACKAGE_VERSION,
      updatePath: BETTERDISCORD_UPDATEURL,
      showToasts: true,
    });
    this.logger = new Logger('GoogleFonts v' + PACKAGE_VERSION, 'lightblue', 'white');
  }

  public start(): void {
    this.update();

    this.originalFont = getComputedStyle(document.documentElement).getPropertyValue('--font-primary').trim();

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
