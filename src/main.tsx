import SettingsPanel from './SettingsPanel';
import BdAPI, { React, getData, setData, injectCSS, clearCSS, Plugins, showToast } from 'betterdiscord/bdapi';
import { Updater, Logger, Banners } from 'betterdiscord-plugin-libs';

class Plugin {
  private updater: Updater;
  private logger: Logger;
  private banners: Banners;
  public fonts: string[];
  public selectedFont: string | null;
  public originalFont: string | null;
  private fontLoader: Promise<void>;
  private updateBannerId: number;

  private async getGoogleFonts(): Promise<void> {
    try {
      const res = await fetch('https://cdn.jsdelivr.net/gh/notmike101/betterdiscord-google-fonts@google-fonts-host/google-fonts.json');
      const fonts = await res.json();

      this.fonts = fonts;

      this.logger.log('Loaded fonts from GitHub');
    } catch (err) {
      this.logger.error(err.message);

      this.fonts = [];
    }
  }

  public async load(): Promise<void> {
    this.logger = this.logger ?? new Logger('GoogleFonts v' + PACKAGE_VERSION, 'lightblue', 'white');
    this.updater = this.updater ?? new Updater({
      storagePath: Plugins.folder,
      currentVersion: PACKAGE_VERSION,
      updatePath: BETTERDISCORD_UPDATEURL,
    });
    this.banners = this.banners ?? new Banners(document.querySelector('.' + BdApi.findModuleByProps('app', 'layers').app));
    this.fontLoader = this.getGoogleFonts();

    this.logger.log('Loading Plugin');
  }

  public async start(): Promise<void> {
    this.logger.log('Starting plugin');
    this.selectedFont = getData('betterdiscord-google-fonts', 'selectedFont') ?? null;
    this.originalFont = getComputedStyle(document.documentElement).getPropertyValue('--font-primary').trim();
  
    this.update();

    await this.fontLoader;
    this.fontLoader = null;

    this.applyFont(this.selectedFont);
  }

  public stop(): void {
    this.applyFont(null);
    
    if (this.updateBannerId !== null) {
      this.banners.dismissBanner(this.updateBannerId);
    }
  }

  private async update(): Promise<void>{
    const isUpdateAvailable: boolean = await this.updater.isUpdateAvailable();

    if (isUpdateAvailable) {
      this.updateBannerId = this.banners.createBanner('Update available for GoogleFonts', {
        acceptCallback: async () => {
          const updateSuccess = await this.updater.installUpdate();

          if (updateSuccess) {
            showToast('GoogleFonts successfully updated', { type: 'success'});
          } else {
            showToast('Failed to update GoogleFonts', { type: 'error'});
          }
        },
      });
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
    const isLoadingFonts = this.fontLoader !== null;

    if (isLoadingFonts) {
      return <div style={{ color: 'var(--text-normal)' }}>Font list is still being built, please wait a few minutes and then open this panel again</div>;
    } else {
      return <SettingsPanel fonts={this.fonts} fontChangeCallback={this.fontChangeCallback.bind(this)} />;
    }
  }
}

export default Plugin;
