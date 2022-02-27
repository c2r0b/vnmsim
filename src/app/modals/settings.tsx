import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";

import { LocaleContext } from "src/store/dispatcher";
import { getTheme, setTheme } from "src/themes/utils";

import {
  Panel, PanelType, Stack, ChoiceGroup,
  IChoiceGroupOption, IDropdownStyles,
  IDropdownOption, Dropdown
} from "@fluentui/react";

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

const Settings = observer((props) => {
  const Locale = useContext(LocaleContext);

  const [selTheme, setSelTheme] = useState(getTheme());

  const onChangeTheme = (ev, option) => {
    setTheme(option.key);
    setSelTheme(option.key);
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
      onDismiss={ props.onDismiss }
      closeButtonAriaLabel={ Locale.get("CLOSE") }
    >
      <Stack tokens={{ childrenGap: 20, padding: "15px 0" }}>
        <ChoiceGroup
          label={ Locale.get("SETTINGS_THEME") }
          selectedKey={ selTheme }
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
