import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { LocaleContext } from "src/locale/dispatcher";
import { ThemeContext } from "src/themes/dispatcher";

import { Text, RadioGroup, Radio, Label, useId, Button } from "@fluentui/react-components";
import { Settings24Regular, WeatherMoon24Regular, WeatherSunny24Regular } from "@fluentui/react-icons";
import { Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Dropdown, Option } from "@fluentui/react-components/unstable";

import { SimulatorContext } from "src/store/dispatcher";

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
  const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);
  const Theme = useContext(ThemeContext);

  const onChangeTheme = (ev, option) => {
    Theme.setTheme(option.optionValue);
  };

  const onChangeLanguage = (ev, option) => {
    Locale.setLanguage(option.optionValue);
  };

  const themeLabelId = useId('label');
  const languageLabelId = useId('label');

  const selectedTheme = themeOptions
  .find(o => o.value === Theme.getCurrentThemeName())
  .label;

  const selectedLanguage = languageOptions
    .find(o => o.value === Locale.getLanguage())
    .label;

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
              <Dropdown
                aria-labelledby={ themeLabelId }
                selectedOptions={ [selectedTheme] }
                style={{ width: 300 }}
                onOptionSelect={ onChangeTheme }
              >
                { themeOptions.map((option) => (
                  <Option value={ option.value }>{ option.label }</Option>
                ))}
              </Dropdown>
            </div>
            <div style={ Styles.setting }>
              <Label id={ languageLabelId }>{ Locale.get("SETTINGS_LANGUAGE") }</Label>
              <Dropdown
                aria-labelledby={ themeLabelId }
                selectedOptions={ [selectedLanguage] }
                style={{ width: 300 }}
                onOptionSelect={ onChangeLanguage }
              >
                { languageOptions.map((option) => (
                  <Option value={ option.value }>{ option.label }</Option>
                ))}
              </Dropdown>
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
