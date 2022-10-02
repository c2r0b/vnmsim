import { createContext } from "react";
import { makeAutoObservable } from "mobx";

import { Locale } from "./locale";

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
    if (typeof window !== "undefined") {
      localStorage.setItem("language", this.language = lang);
    }
  }

  // get string from correct locale
  get(key) {
    return Locale[this.language][key];
  }

  // set saved language preferences (fallback to browser language or english)
  setLocale() {
    let language = null;
    if (typeof window !== "undefined") {
      language = localStorage.getItem("language");
    }
    const fallbackLanguage = "en";
    if (language === null) {
      const browserPreference = "en"/*navigator.language?.split("-")[0]*/;
      if (browserPreference && Locale[browserPreference]) {
        this.language = browserPreference;
      }
      this.language = fallbackLanguage;
      return;
    }
    this.language = language || fallbackLanguage;
  }
};

export const LocaleContext = createContext<LocaleStore>(null);