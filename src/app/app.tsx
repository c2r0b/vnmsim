import React from "react";

import Header from "./layout/header/Header";
import Nav from "./layout/nav/Nav";
import Ram from "./layout/ram/Ram";
import Sim from "./layout/sim/Sim";
import WorkTitle from "./layout/workTitle/WorkTitle";
import Notification from "./layout/notification/Notification";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Nav />
      <Sim />
      <Ram />
      <WorkTitle />
      <Notification />
    </div>
  );
}

export default App;
