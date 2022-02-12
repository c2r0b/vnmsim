import "../../node_modules/codemirror/lib/codemirror.css";
import "../../node_modules/codemirror/theme/material-darker.css";

import React, { useRef } from "react";

import Header from "./layout/header";
import Nav from "./layout/nav";
import Ram from "./layout/ram";
import Sim from "./layout/sim";
import WorkTitle from "./layout/workTitle";
import Notification from "./layout/notification";

const App = () => {
  const editorRef = useRef(null);

  return (
    <div className="app">
      <Header />

      <Nav ref={ editorRef }/>

      <Sim ref={ editorRef }/>
      
      <Ram/>

      <WorkTitle/>

      <Notification/>
    </div>
  );
}

export default App;
