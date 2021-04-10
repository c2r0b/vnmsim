import React from "react";
import ReactDOM from "react-dom";

import App from "./app/app";
import store from "./store/dispatcher";

import { registerIcons } from "@fluentui/react/lib/Styling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder, faCloudDownloadAlt, faLifeRing, faVial, faCogs, faTerminal, faPlay,
  faPause, faCircleNotch, faStepForward, faStop, faGlobeEurope
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

registerIcons({
  icons: {
    Open: <FontAwesomeIcon icon={ faFolder } />,
    Save: <FontAwesomeIcon icon={ faCloudDownloadAlt } />,
    Help: <FontAwesomeIcon icon={ faLifeRing } />,
    Sample: <FontAwesomeIcon icon={ faVial } />,
    Settings: <FontAwesomeIcon icon={ faCogs } />,
    Compile: <FontAwesomeIcon icon={ faTerminal } />,
    Play: <FontAwesomeIcon icon={ faPlay } />,
    Pause: <FontAwesomeIcon icon={ faPause } />,
    Circle: <FontAwesomeIcon icon={ faCircleNotch } />,
    Step: <FontAwesomeIcon icon={ faStepForward } />,
    Stop: <FontAwesomeIcon icon={ faStop } />,
    Language: <FontAwesomeIcon icon={ faGlobeEurope } />,
    GitHub: <FontAwesomeIcon icon={ faGithub } />
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
