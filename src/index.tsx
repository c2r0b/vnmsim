import React from "react";
import ReactDOM from "react-dom";

import App from "./app/app";
import { SimulatorContext, SimulatorStore } from "./store/dispatcher";

import { registerIcons } from "@fluentui/react/lib/Styling";
import {
  FolderHorizontalIcon, SaveIcon, LifesaverIcon, 
  TestBeakerSolidIcon, ErrorBadgeIcon, SettingsIcon, 
  PlayIcon, PauseIcon, ThreeQuarterCircleIcon, 
  NextIcon, StopIcon, CancelIcon, MoreIcon, 
  DownloadDocumentIcon, InfoIcon, SunnyIcon, 
  ClearNightIcon, ClearIcon, ChevronUpSmallIcon,
  ChevronDownSmallIcon, AddIcon
} from "@fluentui/react-icons-mdl2";

registerIcons({
  icons: {
    Open: <FolderHorizontalIcon />,
    Save: <SaveIcon />,
    Sample: <TestBeakerSolidIcon />,
    Help: <LifesaverIcon />,
    Settings: <SettingsIcon />,
    Play: <PlayIcon />,
    Pause: <PauseIcon />,
    Circle: <ThreeQuarterCircleIcon />,
    Step: <NextIcon />,
    Stop: <StopIcon />,
    Cancel: <CancelIcon />,
    More: <MoreIcon />,
    DownloadDocument: <DownloadDocumentIcon />,
    Info: <InfoIcon />,
    Light: <SunnyIcon />,
    Dark: <ClearNightIcon />,
    ErrorBadge: <ErrorBadgeIcon />,
    Clear: <ClearIcon />,
    ChevronUpSmall: <ChevronUpSmallIcon />,
    ChevronDownSmall: <ChevronDownSmallIcon />,
    Add: <AddIcon />,
  }
});

import { loadTheme } from "@fluentui/react";

loadTheme({
  palette: {
    themePrimary: "#000000",
    themeLighterAlt: "#898989",
    themeLighter: "#737373",
    themeLight: "#595959",
    themeTertiary: "#373737",
    themeSecondary: "#2f2f2f",
    themeDarkAlt: "#252525",
    themeDark: "#151515",
    themeDarker: "#0b0b0b",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
  fonts: {
    small: {
      fontSize: "11px",
      fontFamily: "Arial"
    },
    medium: {
      fontSize: "12px",
      fontFamily: "Arial"
    },
    large: {
      fontSize: "20px",
      fontWeight: "semibold",
      fontFamily: "Arial"
    },
    xLarge: {
      fontSize: "22px",
      fontWeight: "semibold",
      fontFamily: "Arial"
    },
  },
});

ReactDOM.render(
  <SimulatorContext.Provider value={ new SimulatorStore() }>
    <App />
  </SimulatorContext.Provider>,
  document.getElementById("app")
);
