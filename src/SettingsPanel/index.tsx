import settingStyles from './styles.scss';
import { React, injectCSS, clearCSS, getData } from 'betterdiscord/bdapi';

interface SupportPanelProps {
  fonts: string[];
  fontChangeCallback?: any,
}

export const SettingsPanel = (props: SupportPanelProps): JSX.Element => {
  let fonts = props.fonts;
  const debounceTimer = React.useRef(null);
  const isMounted = React.useRef(false);
  const [ selectedFont, setSelectedFont ] = React.useState(getData('betterdiscord-google-fonts', 'selectedFont'));
  const [ searchFilter, setSearchFilter ] = React.useState('');

  const handleFontChange = (fontName: string | null): void => {
    setSelectedFont(fontName);

    if (props.fontChangeCallback) {
      props.fontChangeCallback(fontName);
    }
  };

  const updateSearchFilter = (event: any): void => {
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setSearchFilter(event.target.value);

      debounceTimer.current = null;
    }, 150);
  };

  const mountHandler = (): void => {
    isMounted.current = true;
    injectCSS('betterdiscord-google-fonts-settings-panel', settingStyles);
  };

  const unmountHandler = (): void => {
    clearCSS('betterdiscord-google-fonts-settings-panel', settingStyles);
  };

  const handleFontPropChange = (propFonts): void => {
    fonts = propFonts;
  };

  React.useEffect((): Function => {
    if (isMounted.current === false) {
      mountHandler();
    }

    handleFontPropChange(props.fonts);

    return unmountHandler;
  }, [props.fonts]);

  return (
    <div className="settings-panel">
      <div className="settings-panel-body">
        <div className="settings-panel-row border-bottom">
          <span>Active Font:</span>
          <p>{ selectedFont ?? 'Default' }</p>
        </div>
        <div className="settings-panel-row">
          <input className="font-list-filter" type="text" placeholder="Search for a font..." onChange={updateSearchFilter} />
        </div>
        <div className="settings-panel-row scrollable">
          <div className="font-list">
          <div className="font-list-item" onClick={() => handleFontChange(null) }>Default</div>
            {
              fonts
                .filter((font: string) => font.toLowerCase().includes(searchFilter.toLowerCase()))
                .map((font: string) => (
                  <div className="font-list-item" key={font} onClick={() => handleFontChange(font) }>{ font }</div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
