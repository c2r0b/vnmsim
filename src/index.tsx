import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app/app";
import { SimulatorContext, SimulatorStore } from "./store/dispatcher";
import { LocaleContext, LocaleStore } from "./locale/dispatcher";
import { ThemeContext, ThemeStore } from "./themes/dispatcher";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

import { registerIcons } from "@fluentui/react/lib/Styling";
import {
  FolderHorizontalIcon, SaveIcon, LifesaverIcon, 
  TestBeakerSolidIcon, ErrorBadgeIcon, SettingsIcon, 
  PlayIcon, PauseIcon, ThreeQuarterCircleIcon, 
  NextIcon, StopIcon, CancelIcon, MoreIcon, 
  DownloadDocumentIcon, InfoIcon, SunnyIcon, 
  ClearNightIcon, ClearIcon, ChevronUpSmallIcon,
  ChevronDownSmallIcon, AddIcon,
  Rotate90CounterClockwiseIcon
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
    ClearStats: <Rotate90CounterClockwiseIcon />,
  }
});

ReactDOM.hydrate(
  <ThemeContext.Provider value={ new ThemeStore() }>
    <LocaleContext.Provider value={ new LocaleStore() }>
      <SimulatorContext.Provider value={ new SimulatorStore() }>
        <App />
      </SimulatorContext.Provider>
    </LocaleContext.Provider>
  </ThemeContext.Provider>,
  document.getElementById("app")
);
