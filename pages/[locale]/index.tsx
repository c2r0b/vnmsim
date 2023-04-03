import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import appStyles from 'src/app/app.module.css';

import { ThemeContext } from "src/themes/dispatcher";
import { FluentProvider } from "@fluentui/react-components";
import { getServerSideTranslations } from "src/i18n";
import { tx } from "@transifex/native";

import Split from "react-split";

import * as Styles from "src/app/app.styles";

import { LocaleContext } from "src/store/locale";
import Nav from "src/app/layout/nav/Nav";
import Controls from "src/app/layout/controls/Controls";
import Ram from "src/app/layout/ram/Ram";
import Sim from "src/app/layout/sim/Sim";
import Notification from "src/app/layout/notification/Notification";

tx.init({
  token: process.env.TX_NATIVE_PUBLIC_TOKEN,
});

export default observer((props) => {
  const Theme = useContext(ThemeContext);

  const [theme, setTheme] = useState(Theme.getTheme());
  
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
            <div>
              <Nav />
              <Ram />
              <Controls />
            </div>
            <div>
              <Sim />
            </div>
          </Split>

          <Notification />
        </div>
      </FluentProvider>
    </LocaleContext.Provider>
  );
});

// get the list of paths based on locales from the API
const getPathSlugs = async () => {
  const languages = await tx.getLanguages();

  // We fetched locales from our API once at build time
  return languages
        .filter((language) => language.code !== 'en')
        .map((language) => ({
    params: {
      locale: language.code.replace('_', '-').toLocaleLowerCase(),
    },
  }));
}

export async function getStaticPaths(_) {
  const pathsWithLocale = await getPathSlugs();
  return {
    paths: pathsWithLocale,
    fallback: false,
  };
}

// get the locales information from the API
export async function getStaticProps(context) {
  const languages = (await tx.getLanguages())
    .filter((language) => language.code !== 'en');
  if (!context.locale) {
    context.locale = context.params.locale;
  }
  if (!context.locales) {
    context.locales = languages.map((language) => language.code);
  }

  const data = await getServerSideTranslations(context)

  return {
    props: {
      ...data,
      languages: languages
        .map((language) => ({
          ...language,
          code: language.code.replace('_', '-').toLocaleLowerCase(),
        })),
      locale: context.locale
    }
  }
}