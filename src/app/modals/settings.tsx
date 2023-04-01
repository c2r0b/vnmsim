import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ThemeContext } from "src/themes/dispatcher";
import { T, useTX, useLanguages, useLocale } from "@transifex/react";

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
interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Settings = observer((props:IProps) => {
  const Theme = useContext(ThemeContext);

  const tx = useTX();
  const languages = useLanguages();
  const locale = useLocale();

  const onChangeTheme = (_, option) => {
    if (!option.value) return;
    Theme.setTheme(option.value);
  };

  const onChangeLanguage = (_, option) => {
    if (!option.value) return;
    tx.setCurrentLocale(option.value);
  };

  const themeLabelId = useId('label');
  const languageLabelId = useId('label');

  const selectedTheme = Theme.getCurrentThemeName();
  
  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <T _str="Settings" />
          </DialogTitle>
          <DialogContent style={ Styles.container }>
            <div style={ Styles.setting }>
              <Label id={ themeLabelId }>
                <T _str="Theme" />
              </Label>
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
              <Label id={ languageLabelId }>
                <T _str="Language" />
              </Label>
              <Select
                aria-labelledby={ themeLabelId }
                value={ locale }
                style={{ width: 300 }}
                onChange={ onChangeLanguage }
              >
                { languages.map(({ code, name }) => (
                  <option
                    key={ code }
                    value={ code }
                  >
                    { name }
                  </option>
                ))}
              </Select>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">
                <T _str="Done" />
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
});

export default Settings;
