import settingStyles from './styles.scss';
import { React, injectCSS, clearCSS } from 'betterdiscord/bdapi';

interface SupportPanelProps {
  fonts: Font[];
  fontChangeCallback?: any,
}

export const SettingsPanel = (props: SupportPanelProps) => {
  const fonts = props.fonts;
  const isMounted = React.useRef(false);
  const [ selectedFont, setSelectedFont ] = React.useState(BdApi.getData('betterdiscord-google-fonts', 'selectedFont'));

  const handleFontChange = (event) => {
    setSelectedFont(event.currentTarget.value);

    if (props.fontChangeCallback) {
      props.fontChangeCallback(event.currentTarget.value);
    }
  };

  const mountHandler = () => {
    isMounted.current = true;
    injectCSS('betterdiscord-google-fonts-settings-panel', settingStyles);
  };

  const unmountHandler = () => {
    clearCSS('betterdiscord-google-fonts-settings-panel', settingStyles);
  };

  React.useEffect(() => {
    if (isMounted.current === false) {
      mountHandler();
    }

    return unmountHandler.bind(this);
  })

  return (
    <div className="settings-panel">
      <div className="settings-panel-body">
        <span>Active Font:</span>
        <input type="text" list="font-list" placeholder="Search for a font..." value={selectedFont} onChange={handleFontChange} />
        <datalist id="font-list">
          {fonts.map((font) => (
            <option key={font.family} value={font.family}></option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default SettingsPanel;
