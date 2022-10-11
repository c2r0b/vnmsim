import { createContext } from "react";
import { makeAutoObservable } from "mobx";

import { THEMES } from "./themes";
import { createDarkTheme, createLightTheme } from "@fluentui/react-components";

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
    
    if (theme === "dark") {
      return createDarkTheme(THEMES[theme]);
    }
    
    return createLightTheme(THEMES[theme]);
  }
};

export const ThemeContext = createContext<ThemeStore>(null);