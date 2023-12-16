'use client'

import { THEMES } from './themes'
import { createDarkTheme, createLightTheme } from '@fluentui/react-components'

// get theme name translating the "system" option into an actual choice
export const getNormalizedThemeName = (theme:string) => {
  try {
    if (theme === "system") {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "dark"
      }
      else {
        theme = "light"
      }
    }
  } catch (e) {
    theme = "light"
  }
  return theme
}

export const setCSSVariables = (theme:string) => {
  const normalizedTheme = getNormalizedThemeName(theme)
  const palette = THEMES[normalizedTheme]
  
  if (!palette) return

  Object.entries(palette).forEach(([key, value]) => {
    document.documentElement.style.setProperty(
      "--" + key,
      (value as string).toString()
    )
  })

  // also set color scheme for scrollbars color
  document.documentElement.style.setProperty(
    "--color-scheme",
    normalizedTheme
  )
}

export const getFluentTheme = (theme:string) => {
  const normalizedTheme = getNormalizedThemeName(theme)

  if (normalizedTheme === "dark") {
    return {
      ...createDarkTheme(THEMES[normalizedTheme]),
      colorNeutralBackground1: "#000000",
      colorNeutralForegroundOnBrand: "#000000"
    }
  }
  
  return createLightTheme(THEMES[normalizedTheme])
}