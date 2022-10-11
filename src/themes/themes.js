export const theme = {
  10: "#4b3b1b",
  20: "#644f24",
  30: "#7d632e",
  40: "#957637",
  50: "#ae8a40",
  60: "#c79e49",
  70: "#e0b152",
  80: "#f9c55b",
  90: "#facb6b",
  100: "#fad17c",
  110: "#fbd68c",
  120: "#fbdc9d",
  130: "#fce2ad",
  140: "#fde8bd",
  150: "#fdeece",
  160: "#fef3de",
};

export const THEMES = {
  light: {
    ...theme,
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
    white: "#ffffff",
    black: "#000000",
    
    // code mirror
    codeCmd: "blue",
    codeNum: "green",
    codeCell: "red",
    codeVal: "purple",

    // github icon
    invert: 0
  },
  dark: {
    ...theme,
    neutralLighterAlt: "#0b0b0b",
    neutralLighter: "#151515",
    neutralLight: "#252525",
    neutralQuaternaryAlt: "#2f2f2f",
    neutralQuaternary: "#373737",
    neutralTertiaryAlt: "#595959",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    white: "#000000",
    black: "#ffffff",

    // code mirror
    codeCmd: "#8196eb",
    codeNum: "#76de8a",
    codeCell: "#f05959",
    codeVal: "#e182ed",

    // github icon
    invert: 1
  }
};