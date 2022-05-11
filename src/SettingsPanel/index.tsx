import settingStyles from './styles.scss';
import { React, injectCSS, clearCSS } from 'betterdiscord/bdapi';

interface SupportPanelProps {
  fonts: Font[];
  fontChangeCallback?: any,
}

export const SettingsPanel = (props: SupportPanelProps) => {
  const fonts = props.fonts;
  const debounceTimer = React.useRef(null);
  const isMounted = React.useRef(false);
  const [ selectedFont, setSelectedFont ] = React.useState(BdApi.getData('betterdiscord-google-fonts', 'selectedFont'));
  const [ searchFilter, setSearchFilter ] = React.useState('');

  const handleFontChange = (fontName: string) => {
    setSelectedFont(fontName);

    if (props.fontChangeCallback) {
      props.fontChangeCallback(fontName);
    }
  };

  const updateSearchFilter = (event) => {
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setSearchFilter(event.target.value);

      debounceTimer.current = null;
    }, 150);
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
  }, []);

  return (
    <div className="settings-panel">
      <div className="settings-panel-body">
        <div className="settings-panel-row border-bottom">
          <span>Active Font:</span>
          <p>{ selectedFont }</p>
        </div>
        <div className="settings-panel-row">
          <input className="font-list-filter" type="text" placeholder="Search for a font..." onChange={updateSearchFilter} />
        </div>
        <div className="settings-panel-row scrollable">
          <div className="font-list">
            {
            fonts
              .filter((font: Font) => font.family.includes(searchFilter))
              .map((font: Font) => (
                <div className="font-list-item" key={font.family} onClick={() => handleFontChange(font.family) }>{ font.family }</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
