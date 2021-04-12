import React from "react";
import ReactDOM from "react-dom";

import App from "./app/app";
import store from "./store/dispatcher";

import { registerIcons } from "@fluentui/react/lib/Styling";
import {
  FolderHorizontalIcon, DownloadIcon, LifesaverIcon, TestBeakerSolidIcon,
  SettingsIcon, PlayIcon, PauseIcon, ThreeQuarterCircleIcon, NextIcon, StopIcon,
  CancelIcon
} from "@fluentui/react-icons-mdl2";

registerIcons({
  icons: {
    Open: <FolderHorizontalIcon />,
    Save: <DownloadIcon />,
    Sample: <TestBeakerSolidIcon />,
    Help: <LifesaverIcon />,
    Settings: <SettingsIcon />,
    Play: <PlayIcon />,
    Pause: <PauseIcon />,
    Circle: <ThreeQuarterCircleIcon />,
    Step: <NextIcon />,
    Stop: <StopIcon />,
    Cancel: <CancelIcon />,
  }
});

import { loadTheme } from "@fluentui/react";

loadTheme({
  palette: {
    themePrimary: "#e67e22",
    themeLighterAlt: "#ef8222",
    themeLighter: "#fe8a25",
    themeLight: "#ef8222",
    themeTertiary: "#ce701e",
    themeSecondary: "#ce701e",
    themeDarkAlt: "#c36a1c",
    themeDark: "#ce701e",
    themeDarker: "#c36a1c"
  },
  fonts: {
    small: {
      fontSize: '11px',
    },
    medium: {
      fontSize: '12px',
    },
    large: {
      fontSize: '20px',
      fontWeight: 'semibold',
    },
    xLarge: {
      fontSize: '22px',
      fontWeight: 'semibold',
    },
  },
});

ReactDOM.render(
  <App store={ store } />,
  document.getElementById("app")
);
