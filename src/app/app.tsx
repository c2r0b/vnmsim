import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material-darker.css';

import React, { useState } from 'react';

import SplitPane, { Pane } from "react-split-pane";

import Header from './layout/header';
import Ram from './layout/ram';
import Sim from './layout/sim';
import Footer from './layout/footer';

const App = (props) => {
  const [ status, setStatus ] = useState(0);

  return (
    <div className="app">
      <Header {...{ status, setStatus }} store={ props.store } />

      <SplitPane
        defaultSize={ parseInt(localStorage.getItem("ramSize"), 10) || "80%" }
        onChange={ (size) => localStorage.setItem("ramSize", size) }
      >
        <Pane
          className="pane1"
          initialSize={ "80%" }
        >
          <Sim {...{ status, setStatus }} store={ props.store } />
        </Pane>
        <Pane
          className="pane2"
        >
          <Ram store={ props.store } />
        </Pane>
      </SplitPane>

      <Footer store={ props.store } />
    </div>
  );
}

export default App;
