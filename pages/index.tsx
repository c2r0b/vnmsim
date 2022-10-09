import React from "react";
import Head from "next/head";

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

export default () => {
  return (
    <>
      <Head>
        <title>Von Neumann machine simulator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="style-src 'self' 'unsafe-inline'; connect-src self * 'unsafe-inline' blob: data: gap:;" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/images/touch/192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeContext.Provider value={ new ThemeStore() }>
        <LocaleContext.Provider value={ new LocaleStore() }>
          <SimulatorContext.Provider value={ new SimulatorStore() }>
            <App />
          </SimulatorContext.Provider>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};