import React from "react";

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

const Settings = (props) => {
  return (
    <Panel
      headerText="Settings"
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      styles={{ main: { width: 500 }}}
      onDismiss={ props.onDismiss }
      closeButtonAriaLabel="Close"
    >
      <Stack tokens={{ childrenGap: 20, padding: "15px 0" }}>
        <ChoiceGroup
          label="Theme"
          defaultSelectedKey="system"
          options={ themeOptions }
        />
        <Dropdown
          placeholder="Select a language..."
          label="Language"
          options={ languageOptions }
          styles={ dropdownStyles }
        />
      </Stack>
    </Panel>
  );
};

export default Settings;
