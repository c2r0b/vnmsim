import './ram.css';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/addon/lint/lint.css';

import React, { useRef } from 'react';

import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/display/autorefresh.js');
require('codemirror/addon/lint/lint.js');

import { linter } from "../utility/linter";
import { Stack } from '@fluentui/react';

import * as Styles from "./ram.styles.tsx";

const Ram = (props:Props) => {
  const editorRef = useRef(null);

  return (
    <div style={ Styles.container }>
      <Stack horizontal>
        <CodeMirror
          ref={ editorRef }
          value='// X + Y = Z
LOD X
ADD Y
STO Z
HLT
'
          options={{
            mode: "vnm",
            styleActiveLine: true,
            autoRefresh: true,
            firstLineNumber: 0,
            cursorBlinkRate: 800,
            theme: props.store.getDarkMode() ? "material-darker" : "default",
            gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
            lineNumbers: true,
            lint: (doc, opt, editor) => linter(doc, opt, editor, props.store)
          }}
          onChange={ (editor, data, value) => {

          }}
          defineMode={{
            name: "vnm",
            fn: () => {
              return {
                token: (stream, state) => {
                  if (stream.match(/^(lod|add|sub|mul|div|sto|jmp|jmz|nop|hlt)/i)) {
                    return "cmd";
                  }
                  if (stream.match(/\s#-?\d+(\s*)$/)) {
                    return "num";
                  }
                  if (stream.match(/\s[1-9]\d*(\s*)$/)) {
                    return "cell";
                  }
                  if (stream.match(/\s(x|y|z|w|(t[1-9]\d*))(\s*)$/i)) {
                    return "val";
                  }
                  if (stream.match(/^\/\/[\s\S]*$/)) {
                    return "comment";
                  }
                  stream.next();
                  return null;
                }
              };
            }
          }}
        />
        <Stack>

        </Stack>
      </Stack>
    </div>
  );
}

export default Ram;
