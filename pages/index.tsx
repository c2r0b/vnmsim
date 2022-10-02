import React from "react";

import { App } from "../src/app/app";
import { SimulatorContext, SimulatorStore } from "../src/store/dispatcher";
import { LocaleContext, LocaleStore } from "../src/locale/dispatcher";
import { ThemeContext, ThemeStore } from "../src/themes/dispatcher";

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
/*
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
});*/

export default () => {
  return (
    <ThemeContext.Provider value={ new ThemeStore() }>
      <LocaleContext.Provider value={ new LocaleStore() }>
        <SimulatorContext.Provider value={ new SimulatorStore() }>
          <App />
        </SimulatorContext.Provider>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}
