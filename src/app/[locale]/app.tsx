"use client";

import React, { useEffect, useRef } from "react";

import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import { setClientSideTranslations } from "src/i18n";

import appStyles from "src/app.module.css";

import { FluentProvider } from "@fluentui/react-components";
import { tx } from "@transifex/native";

import Split from "react-split";

import "src/global.css";
import * as Styles from "src/app.styles";

import Nav from "src/layout/nav/Nav";
import Controls from "src/layout/controls/Controls";
import Ram from "src/layout/ram/Ram";
import Sim from "src/layout/sim/Sim";
import Notification from "src/layout/notification/Notification";

import { useAppSelector } from "src/hooks/store";
import { LocaleContext } from "src/store";
import { getFluentTheme, setCSSVariables } from "src/themes/utils";

import type EditorRef from "src/types/editor";

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
  translations: any;
}

export default (props: IProps) => {
  const theme = useAppSelector((state) => state.theme.name);
  const editorRef = useRef<EditorRef>(null);

  const currentLocale = usePathname()?.replace("/", "");
  const [cookies] = useCookies(["NEXT_LOCALE"]);
  setClientSideTranslations(props);

  // redirect to the saved locale route if it's different from the current one
  if (cookies.NEXT_LOCALE && cookies.NEXT_LOCALE !== currentLocale) {
    window.location.href = "/" + cookies.NEXT_LOCALE;
  }

  useEffect(() => {
    setCSSVariables(theme);
  }, [theme]);

  const clearEditorHighlight = editorRef?.current?.clearHighlight || (() => {});

  return (
    <LocaleContext.Provider value={props}>
      <FluentProvider theme={getFluentTheme(theme)}>
        <Nav />
        <div style={Styles.container}>
          <Split
            className={appStyles.split}
            sizes={[35, 65]}
            minSize={[400]}
            expandToMin={true}
            gutterSize={20}
            dragInterval={30}
            direction="horizontal"
          >
            <div style={Styles.panel}>
              <Ram ref={editorRef} />
              <Controls clearEditorHighlight={clearEditorHighlight} />
            </div>
            <div style={Styles.simPanel}>
              <Sim />
            </div>
          </Split>

          <Notification />
        </div>
      </FluentProvider>
    </LocaleContext.Provider>
  );
};
