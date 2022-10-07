import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { ThemeContext } from "src/themes/dispatcher";
import { ThemeProvider } from "@fluentui/react";

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
    <ThemeProvider theme={ Theme.getTheme() }>
      <div style={ Styles.container }>
        <Header />
        <Nav />
        <Sim />
        <Controls />
        <Ram />
        <Notification />
      </div>
    </ThemeProvider>
  );
});
