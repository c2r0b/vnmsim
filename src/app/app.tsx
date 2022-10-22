import appStyles from './app.module.css';

import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ThemeContext } from "src/themes/dispatcher";
import { FluentProvider } from "@fluentui/react-components";

import Split from "react-split";

import * as Styles from "./app.styles";

import Nav from "./layout/nav/Nav";
import Controls from "./layout/controls/Controls";
import Ram from "./layout/ram/Ram";
import Sim from "./layout/sim/Sim";
import Notification from "./layout/notification/Notification";

export const App = observer(() => {
  const Theme = useContext(ThemeContext);
  return (
    <FluentProvider theme={ Theme.getTheme() }>
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
          <Sim />
        </Split>

        <Notification />
      </div>
    </FluentProvider>
  );
});
