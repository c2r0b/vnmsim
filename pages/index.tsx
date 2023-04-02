import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import appStyles from 'src/app/app.module.css';

import { ThemeContext } from "src/themes/dispatcher";
import { FluentProvider } from "@fluentui/react-components";
import { getServerSideTranslations } from "src/i18n";

import Split from "react-split";

import * as Styles from "src/app/app.styles";

import { LocaleContext } from "src/store/locale";
import Nav from "src/app/layout/nav/Nav";
import Controls from "src/app/layout/controls/Controls";
import Ram from "src/app/layout/ram/Ram";
import Sim from "src/app/layout/sim/Sim";
import Notification from "src/app/layout/notification/Notification";

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

export async function getServerSideProps(context) {
  const data = await getServerSideTranslations(context)
  return {
    props: {
      ...data
    }
  }
}
