/**
 * @name betterdiscord-google-fonts
 * @version 1.0.2
 * @description Allows use of Google Fonts through a simple settings UI
 * @author Mike Orozco
 * @authorLink https://mikeorozco.dev
 * @authorId 142347724392497152
 * @updateUrl https://raw.githubusercontent.com/notmike101/betterdiscord-google-fonts/release/betterdiscord-google-fonts.plugin.js
 * @source https://github.com/notmike101/betterdiscord-google-fonts
 */

// sass:/home/runner/work/betterdiscord-google-fonts/betterdiscord-google-fonts/src/styles/Global.scss
var Global_default = `
`;

// _dn70prxr4:/home/runner/work/betterdiscord-google-fonts/betterdiscord-google-fonts/src/templates/SettingsPanel.html
var SettingsPanel_default = '<div class="google-font-settings">\n  <div class="bd-setting-item">\n    <div class="bd-setting-header">\n      <label for="google-font-select" class="bd-setting-title">Selected Font</label>\n    </div>\n    <div class="bd-select">\n      <div class="bd-select-header-custom">\n        <div class="bd-select-value">{{ CURRENT_FONT }}</div>\n        <svg class="bd-select-arrow" fill="currentColor" viewBox="0 0 24 24">\n          <path d="M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"></path>\n        </svg>\n      </div>\n      <div class="bd-select-options"></div>\n    </div>\n  </div>\n</div>\n';

// sass:/home/runner/work/betterdiscord-google-fonts/betterdiscord-google-fonts/src/styles/SettingsPanel.scss
var SettingsPanel_default2 = `
.google-font-settings .bd-setting-item .bd-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.google-font-settings .bd-setting-item .bd-select .bd-select-header-custom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.google-font-settings .bd-setting-item .bd-select .bd-select-header-custom .bd-select-arrow {
  width: 16px;
  height: 16px;
}
.google-font-settings .bd-setting-item .bd-select .bd-select-options {
  display: none;
  position: initial;
  z-index: 0;
}`;

// src/DiscordPlugin.ts
var BdApi = window.BdApi || {};
var DiscordPlugin = class {
  selectedFont;
  fonts;
  constructor() {
    this.selectedFont = null;
    this.fonts = [];
  }
  getName() {
    return "Google Fonts";
  }
  async load() {
  }
  async start() {
    BdApi.injectCSS("bd-google-fonts-global-css", Global_default);
    BdApi.injectCSS("bd-google-fonts-settingspanel", SettingsPanel_default2);
    this.fonts = await this.getAvailableFonts();
    this.selectedFont = BdApi.getData("betterdiscord-google-fonts", "font");
    this.updateDomFont();
  }
  stop() {
    BdApi.clearCSS("bd-google-fonts-global-css");
    BdApi.clearCSS("bd-google-fonts-custom-font");
    BdApi.clearCSS("bd-google-fonts-settingspanel");
  }
  async getAvailableFonts() {
    const existingData = BdApi.getData("betterdiscord-google-fonts", "fonts");
    const lastFetchTime = BdApi.getData("betterdiscord-google-fonts", "lastFetchTime");
    const lastFetchExpiration = new Date(lastFetchTime);
    lastFetchExpiration.setDate(lastFetchExpiration.getDate() + 1 * 7);
    if (!existingData || lastFetchTime < lastFetchExpiration) {
      const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCfxANDwWkAP3JjzGLv5UOPYcPEwaVAz3k");
      const json = await response.json();
      const fonts = json.items.map((font) => font.family);
      fonts.unshift("Default");
      BdApi.setData("betterdiscord-google-fonts", "fonts", fonts);
      BdApi.setData("betterdiscord-google-fonts", "lastFetchTime", new Date().getTime());
      return fonts;
    }
    return existingData;
  }
  updateDomFont() {
    BdApi.clearCSS("bd-google-fonts-custom-font");
    if (this.selectedFont) {
      const newStyle = `
        @import url('https://fonts.googleapis.com/css?family=${this.selectedFont}');

        * {
          font-family: ${this.selectedFont} !important;
        }
      `;
      BdApi.injectCSS("bd-google-fonts-custom-font", newStyle);
    }
  }
  getSettingsPanel() {
    const template = document.createElement("template");
    const currentFontString = this.selectedFont ? this.selectedFont : "Default";
    template.innerHTML = SettingsPanel_default.replace("{{ CURRENT_FONT }}", currentFontString);
    const settingsPanel = template.content.firstElementChild;
    const fontSelection = settingsPanel.querySelector(".bd-select-options");
    settingsPanel.querySelector(".bd-select").addEventListener("click", () => {
      const dropdown = settingsPanel.querySelector(".bd-select-options");
      if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    });
    this.fonts.forEach((font) => {
      const option = document.createElement("div");
      option.classList.add("bd-select-option");
      option.textContent = font;
      option.addEventListener("click", (e) => {
        const target = e.target;
        const selectedFont = target.textContent;
        if (selectedFont === "Default") {
          this.selectedFont = null;
        } else {
          this.selectedFont = selectedFont;
        }
        this.updateDomFont();
        document.querySelector(".google-font-settings .bd-select-value").textContent = selectedFont;
        BdApi.setData("betterdiscord-google-fonts", "font", this.selectedFont);
      });
      fontSelection.appendChild(option);
    });
    return settingsPanel;
  }
};
module.exports = DiscordPlugin;
