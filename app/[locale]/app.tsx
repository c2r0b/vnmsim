'use client';

import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import appStyles from 'src/app/app.module.css';

import { ThemeContext } from "src/themes/dispatcher";
import { FluentProvider } from "@fluentui/react-components";
import { tx } from "@transifex/native";

import Split from "react-split";

import * as Styles from "src/app/app.styles";

import { LocaleContext } from "src/store/locale";
import Nav from "src/app/layout/nav/Nav";
import Controls from "src/app/layout/controls/Controls";
import Ram from "src/app/layout/ram/Ram";
import Sim from "src/app/layout/sim/Sim";
import Notification from "src/app/layout/notification/Notification";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";

tx.init({
  token: process.env.TX_NATIVE_PUBLIC_TOKEN,
  filterStatus: "reviewed",
});

interface ILanguage {
  code: string;
}

interface IProps {
  locale: string;
  languages: ILanguage[];
}

export default observer((props:IProps) => {
  const Theme = useContext(ThemeContext);
  const currentLocale = usePathname()?.replace("/", "");

  const [cookies] = useCookies(['NEXT_LOCALE']);
  const [theme, setTheme] = useState(Theme.getTheme());

  // redirect to the saved locale route if it's different from the current one
  if (cookies.NEXT_LOCALE && cookies.NEXT_LOCALE !== currentLocale) {
    window.location.href = "/" + cookies.NEXT_LOCALE;
  }
  
  useEffect(() => {
    setTheme(Theme.getTheme());
  }, [Theme.theme]);

  return (
    <LocaleContext.Provider value={ props }>
      <FluentProvider theme={ theme }>
        <div style={ Styles.container }>
          <Split
            className={ appStyles.split }
            sizes={[35, 65]}
            minSize={ [400] }
            expandToMin={ true }
            gutterSize={ 20 }
            dragInterval={ 30 }
            direction="horizontal"
          >
            <div style={ Styles.panel }>
              <Nav />
              <Ram />
              <Controls />
            </div>
            <div style={ Styles.panel }>
              <Sim />
            </div>
          </Split>

          <Notification />
        </div>
      </FluentProvider>
    </LocaleContext.Provider>
  );
});