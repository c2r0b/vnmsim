import "../../node_modules/codemirror/lib/codemirror.css";
import "../../node_modules/codemirror/theme/material-darker.css";

import React, { useRef } from "react";

import Header from "./layout/header";
import Ram from "./layout/ram";
import Sim from "./layout/sim";
import WorkTitle from "./layout/workTitle";
import Notification from "./layout/notification";

const App = (props) => {
  const editorRef = useRef(null);

  return (
    <div className="app">
      <Header ref={ editorRef } store={ props.store } />

      <Sim ref={ editorRef } store={ props.store } />
      
      <Ram store={ props.store } />

      <WorkTitle store={ props.store } />

      <Notification store={ props.store } />
    </div>
  );
}

export default App;
