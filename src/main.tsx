import googleFonts from './google-fonts.json';
import SettingsPanel from './SettingsPanel';
import { React, getData, setData, injectCSS, clearCSS } from 'betterdiscord/bdapi';

class Plugin {
  public fonts: Font[];
  public selectedFont: string | null;

  public load() {
    this.selectedFont = getData('betterdiscord-google-fonts', 'selectedFont');
  }

  public start() {
    this.fonts = googleFonts.items ?? [];
  }

  public stop() {}

  private fontChangeCallback(fontName: string): void {
    this.selectedFont = fontName;
    setData('betterdiscord-google-fonts', 'selectedFont', fontName);
    clearCSS('betterdiscord-google-fonts-customfont');
    
    if (fontName !== null || fontName !== '') {
      injectCSS('betterdiscord-google-fonts-customfont',
        `@import url('https://fonts.googleapis.com/css?family=${fontName}&display=swap');

        :root {
          --font-primary: ${fontName} !important;
        }`
      );
    }
  }

  public getSettingsPanel() {
    return <SettingsPanel fonts={this.fonts} fontChangeCallback={this.fontChangeCallback.bind(this)} />;
  }
}

export default Plugin;
