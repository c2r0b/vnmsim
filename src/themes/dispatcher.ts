'use client'
import { createContext } from "react";
import { makeAutoObservable,  } from "mobx";

import { THEMES } from "./themes";
import { createDarkTheme, createLightTheme } from "@fluentui/react-components";

export class ThemeStore {
  theme

  constructor() {
    makeAutoObservable(this);
    try {
      this.theme = localStorage.getItem("theme") || "system";
      this.setCSSVariables();
    } catch (e) {
      console.error(e);
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
        (value as string).toString()
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
    try {
      if (theme === "system") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = "dark";
        }
        else {
          theme = "light";
        }
      }
    } catch (e) {
      console.error(e);
      theme = "light";
    }
    return theme;
  }

  getCurrentThemeName() {
    return this.theme;
  }

  setTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.error(e);
    }
    this.theme = theme;
    this.setCSSVariables();
  }

  getTheme() {
    const theme = this.getNormalizedThemeName();
    
    if (theme === "dark") {
      return {
        ...createDarkTheme(THEMES[theme]),
        colorNeutralBackground1: "#000000",
        colorNeutralForegroundOnBrand: "#000000"
      };
    }
    
    return createLightTheme(THEMES[theme]);
  }
};

export const ThemeContext = createContext<ThemeStore>(new ThemeStore());