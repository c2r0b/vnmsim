import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { LocaleContext } from "src/locale/dispatcher";
import { ThemeContext } from "src/themes/dispatcher";

import { Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Label, useId, Button, Select } from "@fluentui/react-components";
import { Settings24Regular, WeatherMoon24Regular, WeatherSunny24Regular } from "@fluentui/react-icons";

import * as Styles from "./settings.styles";

const themeOptions = [
  {
    value: "system",
    label: "System",
    icon: <Settings24Regular />
  },
  {
    value: "light",
    label: "Light",
    icon: <WeatherSunny24Regular />
  },
  {
    value: "dark",
    label: "Dark",
    icon: <WeatherMoon24Regular />
  },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "it", label: "Italiano" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsche" }
];

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Settings = observer((props:IProps) => {
  const Locale = useContext(LocaleContext);
  const Theme = useContext(ThemeContext);

  const onChangeTheme = (ev, option) => {
    if (!option.value) return;
    Theme.setTheme(option.value);
  };

  const onChangeLanguage = (ev, option) => {
    if (!option.value) return;
    Locale.setLanguage(option.value);
  };

  const themeLabelId = useId('label');
  const languageLabelId = useId('label');

  const selectedTheme = Theme.getCurrentThemeName();
  const selectedLanguage = Locale.getLanguage();

  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{ Locale.get("SETTINGS") }</DialogTitle>
          <DialogContent style={ Styles.container }>
            <div style={ Styles.setting }>
              <Label id={ themeLabelId }>{ Locale.get("SETTINGS_THEME") }</Label>
              <Select
                aria-labelledby={ themeLabelId }
                value={ selectedTheme }
                style={{ width: 300 }}
                onChange={ onChangeTheme }
              >
                { themeOptions.map((option) => (
                  <option 
                    key={ option.value }
                    value={ option.value }
                  >
                    { option.label }
                  </option>
                ))}
              </Select>
            </div>
            <div style={ Styles.setting }>
              <Label id={ languageLabelId }>{ Locale.get("SETTINGS_LANGUAGE") }</Label>
              <Select
                aria-labelledby={ themeLabelId }
                value={ selectedLanguage }
                style={{ width: 300 }}
                onChange={ onChangeLanguage }
              >
                { languageOptions.map((option) => (
                  <option
                    key={ option.value }
                    value={ option.value }
                  >
                    { option.label }
                  </option>
                ))}
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">
                { Locale.get("DONE") }
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
});

export default Settings;
