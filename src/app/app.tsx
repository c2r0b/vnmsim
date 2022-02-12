import "../../node_modules/codemirror/lib/codemirror.css";
import "../../node_modules/codemirror/theme/material-darker.css";

import React from "react";

import Header from "./layout/header";
import Nav from "./layout/nav";
import Ram from "./layout/ram";
import Sim from "./layout/sim";
import WorkTitle from "./layout/workTitle";
import Notification from "./layout/notification";

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
