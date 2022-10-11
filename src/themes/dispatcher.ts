import { createContext } from "react";
import { makeAutoObservable } from "mobx";

import { THEMES } from "./themes";
import { webDarkTheme, webLightTheme } from "@fluentui/react-components";

export class ThemeStore {
  theme

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.theme = localStorage.getItem("theme") || "system";
      this.setCSSVariables();
    }
    else {
      this.theme = "system";
    }
  }
  
  // sets FluentUI theme palette as CSS variables for ease of use
  private setCSSVariables() {
    const theme = this.getNormalizedThemeName();
    const palette = THEMES[theme];
    
    if (!palette) return;

    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        "--" + key,
        value.toString()
      );
    });

    // also set color scheme for scrollbars color
    document.documentElement.style.setProperty(
      "--color-scheme",
      theme
    );
  }

  // get theme name translating the "System" option into an actual choice
  getNormalizedThemeName(theme = this.theme) {
    if (typeof window === "undefined") {
      return "light";
    }
    if (theme === "system") {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "dark";
      }
      else {
        theme = "light";
      }
    }
    return theme;
  }

  getCurrentThemeName() {
    return this.theme;
  }

  setTheme(theme) {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
    this.theme = theme;
    this.setCSSVariables();
  }

  getTheme(theme = this.theme) {
    theme = this.getNormalizedThemeName();
    
    return theme === "dark" ? webDarkTheme : webLightTheme;
    /*return {
      palette: THEMES[theme],
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
    };*/
  }
};

export const ThemeContext = createContext<ThemeStore>(null);