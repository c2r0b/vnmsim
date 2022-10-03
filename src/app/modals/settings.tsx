import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { githubDark } from "@uiw/codemirror-theme-github";

import { LocaleContext } from "src/locale/dispatcher";
import { ThemeContext } from "src/themes/dispatcher";

import {
  Panel, PanelType, Stack, ChoiceGroup,
  IChoiceGroupOption, IDropdownStyles,
  IDropdownOption, Dropdown
} from "@fluentui/react";
import { SimulatorContext } from "src/store/dispatcher";

const themeOptions: IChoiceGroupOption[] = [
  {
    key: "system",
    text: "System",
    iconProps: { iconName: "Settings" }
  },
  {
    key: "light",
    text: "Light",
    iconProps: { iconName: "Light" }
  },
  {
    key: "dark",
    text: "Dark",
    iconProps: { iconName: "Dark" }
  },
];

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const languageOptions: IDropdownOption[] = [
  { key: "en", text: "English" },
  { key: "it", text: "Italiano" },
  { key: "es", text: "Español" },
  { key: "de", text: "Deutsche" }
];

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Settings = observer((props:IProps) => {
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);
  const Theme = useContext(ThemeContext);

  const onChangeTheme = (ev, option) => {
    Theme.setTheme(option.key);
  };

  const onChangeLanguage = (ev, option) => {
    Locale.setLanguage(option.key);
  };

  return (
    <Panel
      headerText={ Locale.get("SETTINGS") }
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      styles={{ main: { width: 500 }}}
      onDismiss={ () => props.onDismiss() }
      closeButtonAriaLabel={ Locale.get("CLOSE") }
    >
      <Stack tokens={{ childrenGap: 20, padding: "15px 0" }}>
        <ChoiceGroup
          label={ Locale.get("SETTINGS_THEME") }
          selectedKey={ Theme.getCurrentThemeName() }
          options={ themeOptions }
          onChange={ onChangeTheme }
        />
        <Dropdown
          label={ Locale.get("SETTINGS_LANGUAGE") }
          selectedKey={ Locale.getLanguage() }
          options={ languageOptions }
          styles={ dropdownStyles }
          onChange={ onChangeLanguage }
        />
      </Stack>
    </Panel>
  );
});

export default Settings;
