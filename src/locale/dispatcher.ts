import { createContext } from "react";
import { makeAutoObservable } from "mobx";

import { Locale } from "../locale/locale";

export class LocaleStore {
  language

  constructor() {
    makeAutoObservable(this);
    this.setLocale();
  }
  
  getLanguage() {
    return this.language;
  }
  
  setLanguage(lang) {
    localStorage.setItem("language", this.language = lang);
  }

  // get string from correct locale
  get(key) {
    return Locale[this.language][key];
  }

  // set saved language preferences (fallback to browser language or english)
  setLocale() {
    const fallbackLanguage = "en";
    if (localStorage.getItem("language") === null) {
      const browserPreference = navigator.language?.split("-")[0];
      if (browserPreference && Locale[browserPreference]) {
        this.language = browserPreference;
      }
      this.language = fallbackLanguage;
      return;
    }
    this.language = localStorage.getItem("language") || fallbackLanguage;
  }
};

export const LocaleContext = createContext<LocaleStore>(null);