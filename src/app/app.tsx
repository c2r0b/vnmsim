import './app.css';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material-darker.css';

import React, { useState } from 'react';

import Header from './layout/header';
import Ram from './layout/ram';
import Sim from './layout/sim';
import Footer from './layout/footer';

const App = (props) => {
  const [ status, setStatus ] = useState(0);

  return (
    <div className="app">
      <Header {...{ status, setStatus }} store={ props.store } />
      <Ram store={ props.store } />
      <Sim {...{ status, setStatus }} store={ props.store } />
      <Footer store={ props.store } />
    </div>
  );
}

export default App;
