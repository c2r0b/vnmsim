import React, { useEffect } from "react";

import { applyTheme, getTheme } from "src/themes/utils";

import Header from "./layout/header/Header";
import Nav from "./layout/nav/Nav";
import Controls from "./layout/controls/Controls";
import Ram from "./layout/ram/Ram";
import Sim from "./layout/sim/Sim";
import WorkTitle from "./layout/workTitle/WorkTitle";
import Notification from "./layout/notification/Notification";

const App = () => {
  useEffect(() => {
    // init app theme
    applyTheme(getTheme());
  }, []);

  return (
    <div className="app">
      <Header />
      <Nav />
      <Sim />
      <Controls />
      <Ram />
      <WorkTitle />
      <Notification />
    </div>
  );
}

export default App;
