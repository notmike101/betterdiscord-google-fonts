import { Font } from './FontInterface';
import { ExtendedWindow } from './ExtendedWindowInterface';

import globalCSS from './Global.scss';
import settingsPanelHtml from 'inline:./SettingsPanel.html';
import settingsPanelCSS from './SettingsPanel.scss';

declare let window: ExtendedWindow;

const BdApi = window.BdApi || {};

class DiscordPlugin {
  private selectedFont: string | null;
  private fonts: string[];

  public constructor() {
    this.selectedFont = null;
    this.fonts = [];
  }

  public getName() {
    return 'Google Fonts';
  }

  public async load() {}

  public async start() {
    BdApi.injectCSS('bd-google-fonts-global-css', globalCSS);
    BdApi.injectCSS('bd-google-fonts-settingspanel', settingsPanelCSS);
    this.fonts = await this.getAvailableFonts();
    this.selectedFont = BdApi.getData('betterdiscord-google-fonts', 'font');
    this.updateDomFont();
  }

  public stop() {
    BdApi.clearCSS('bd-google-fonts-global-css');
    BdApi.clearCSS('bd-google-fonts-custom-font');
    BdApi.clearCSS('bd-google-fonts-settingspanel');
  }

  private async getAvailableFonts(): Promise<string[]> {
    const existingData = BdApi.getData('betterdiscord-google-fonts', 'fonts');
    const lastFetchTime = BdApi.getData(
      'betterdiscord-google-fonts',
      'lastFetchTime'
    );
    const lastFetchExpiration = new Date(lastFetchTime);
    lastFetchExpiration.setDate(lastFetchExpiration.getDate() + 1 * 7);

    if (!existingData || lastFetchTime < lastFetchExpiration) {
      const response = await fetch(
        'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCfxANDwWkAP3JjzGLv5UOPYcPEwaVAz3k'
      );
      const json = await response.json();
      const fonts = json.items.map((font: Font) => font.family);

      fonts.unshift('Default');

      BdApi.setData('betterdiscord-google-fonts', 'fonts', fonts);
      BdApi.setData(
        'betterdiscord-google-fonts',
        'lastFetchTime',
        new Date().getTime()
      );

      return fonts;
    }

    return existingData;
  }

  private updateDomFont() {
    BdApi.clearCSS('bd-google-fonts-custom-font');

    if (this.selectedFont) {
      const newStyle = `
        @import url('https://fonts.googleapis.com/css?family=${this.selectedFont}');

        * {
          font-family: ${this.selectedFont} !important;
        }
      `;

      BdApi.injectCSS('bd-google-fonts-custom-font', newStyle);
    }
  }

  public getSettingsPanel(): Element {
    const template = document.createElement('template');

    const currentFontString = this.selectedFont ? this.selectedFont : 'Default';

    template.innerHTML = settingsPanelHtml.replace(
      '{{ CURRENT_FONT }}',
      currentFontString
    );

    const settingsPanel = template.content.firstElementChild;
    const fontSelection = settingsPanel.querySelector('.bd-select-options');

    settingsPanel.querySelector('.bd-select').addEventListener('click', () => {
      const dropdown: HTMLElement =
        settingsPanel.querySelector('.bd-select-options');

      if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    });

    this.fonts.forEach((font) => {
      const option = document.createElement('div');

      option.classList.add('bd-select-option');
      option.textContent = font;

      option.addEventListener('click', (e) => {
        const target: HTMLElement = e.target as HTMLElement;
        const selectedFont = target.textContent;

        if (selectedFont === 'Default') {
          this.selectedFont = null;
        } else {
          this.selectedFont = selectedFont;
        }

        this.updateDomFont();
        document.querySelector(
          '.google-font-settings .bd-select-value'
        ).textContent = selectedFont;
        BdApi.setData('betterdiscord-google-fonts', 'font', this.selectedFont);
      });

      fontSelection.appendChild(option);
    });

    return settingsPanel;
  }
}

module.exports = DiscordPlugin;
