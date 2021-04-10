import './app.css';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material-darker.css';

import React, { useState } from 'react';
import CodeMirror from 'react-codemirror';
import { Stack } from '@fluentui/react';

import Header from './layout/header';
import Sim from './layout/sim';
import Footer from './layout/footer';

const code = 'const a = 0;';

const App = (props) => {
  const [ status, setStatus ] = useState(0);

  return (
    <div className="app">
      <Header {...{ status, setStatus }} store={ props.store } />
      <div className="editor">
        <Stack horizontal>
          <CodeMirror
            value='// X + Y = Z
  LOD X
  ADD Y
  STO Z
  HLT
            '
            options={{
              mode: 'xml',
              theme: props.store.getDarkMode() ? 'material-darker' : 'default',
              lineNumbers: true
            }}
          />
          <Stack>

          </Stack>
        </Stack>
      </div>
      <Sim {...{ status, setStatus }} store={ props.store } />
      <Footer store={ props.store } />
    </div>
  );
}

export default App;
