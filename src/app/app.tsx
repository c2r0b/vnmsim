import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ThemeContext } from "src/themes/dispatcher";
import { FluentProvider } from "@fluentui/react-components";

import * as Styles from "./app.styles";

import Header from "./layout/header/Header";
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
        <Header />
        <Nav />
        <Sim />
        <Controls />
        <Ram />
        <Notification />
      </div>
    </FluentProvider>
  );
});
