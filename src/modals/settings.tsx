import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import { T } from "@transifex/react";
import { LocaleContext } from "src/store/locale.context";
import { useCookies } from "react-cookie";

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Label,
  useId,
  Button,
  Select,
} from "@fluentui/react-components";
import {
  Settings24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";

import { useAppDispatch, useAppSelector } from "src/hooks/store";

import * as Styles from "./settings.styles";
import { setTheme } from "src/store/theme.slice";

const themeOptions = [
  {
    value: "system",
    label: "System",
    icon: <Settings24Regular />,
  },
  {
    value: "light",
    label: "Light",
    icon: <WeatherSunny24Regular />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <WeatherMoon24Regular />,
  },
];

interface IProps {
  show: boolean;
  onDismiss: Function;
}

export default (props: IProps) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.name);

  const Locale = useContext(LocaleContext);

  const router = useRouter();
  const [_, setCookie] = useCookies(["NEXT_LOCALE"]);

  const onChangeTheme = (_, option) => {
    if (!option.value) return;
    dispatch(setTheme(option.value));
  };

  const onChangeLanguage = (_, option) => {
    if (!option.value) return;

    // Update the URL with the new locale while keeping the current path
    setCookie("NEXT_LOCALE", option.value, { path: "/" });
    router.push("/" + option.value);
  };

  const themeLabelId = useId("label");
  const languageLabelId = useId("label");

  return (
    <Dialog open={props.show} onOpenChange={() => props.onDismiss()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <T _str="Settings" />
          </DialogTitle>
          <DialogContent style={Styles.container}>
            <div style={Styles.setting}>
              <Label id={themeLabelId}>
                <T _str="Theme" />
              </Label>
              <Select
                aria-labelledby={themeLabelId}
                value={theme}
                style={{ width: 300 }}
                onChange={onChangeTheme}
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div style={Styles.setting}>
              <Label id={languageLabelId}>
                <T _str="Language" />
              </Label>
              <Select
                aria-labelledby={themeLabelId}
                value={Locale.locale}
                style={{ width: 300 }}
                onChange={onChangeLanguage}
              >
                {Locale.languages?.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
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
};
