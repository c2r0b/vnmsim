import { THEMES } from "./themes";
import { loadTheme } from "@fluentui/react";

export const getTheme = () => {
  return localStorage.getItem("theme") || "system";
};

export const applyTheme = (theme) => {
  if (theme === "system") {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = "dark";
    }
    else {
      theme = "light";
    }
  }

  loadTheme({
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
  });
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  applyTheme(theme);
}
