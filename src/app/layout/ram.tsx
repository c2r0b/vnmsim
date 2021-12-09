import './ram.css';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/addon/lint/lint.css';

import React, { useState, useRef } from 'react';
import { observer } from "mobx-react-lite";

import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/display/autorefresh.js');
require('codemirror/addon/lint/lint.js');

import { editorMode } from "../utility/mode";
import { linter } from "../utility/linter";

import {
  Stack, SpinButton, TooltipHost, IconButton, 
  Slider, Panel
} from '@fluentui/react';

import * as Styles from "./ram.styles";

const speedFormat = (value: number) => `${value} ms`;

const variables = ["X", "Y", "Z", "W"];

const Ram = observer((props:Props) => {
  const [lastTvariable, setLastTvariable] = useState(10);
  
  const hasErrors = props.store.hasErrors();

  const editorRef = useRef(null);

  const simStatus = props.store.getSimStatus();

  const _controls = [
    {
      ariaLabel: "Play",
      disabled: hasErrors || [1,2,3].includes(simStatus),
      iconProps: { iconName: "Play" },
      onClick: () => props.store.setSimStatus(1),
    },
    {
      ariaLabel: "Single step",
      disabled: hasErrors || [1,2,3].includes(simStatus),
      iconProps: { iconName: "Step" },
      onClick: () => props.store.setSimStatus(2),
    },
    {
      ariaLabel: "Single iteration",
      disabled: hasErrors || [1,2,3].includes(simStatus),
      iconProps: { iconName: "Circle" },
      onClick: () => props.store.setSimStatus(3),
    },
    {
      ariaLabel: "Pause",
      disabled: hasErrors || [0,4].includes(simStatus),
      iconProps: { iconName: "Pause" },
      onClick: () => props.store.setSimStatus(4),
    },
    {
      ariaLabel: "Stop",
      disabled: hasErrors || simStatus === 0,
      iconProps: { iconName: "Stop" },
      onClick: () => props.store.setSimStatus(0),
    },
  ];
  
  const codeMirrorOptions = {
    mode: "vnm",
    styleActiveLine: true,
    autoRefresh: true,
    firstLineNumber: 0,
    cursorBlinkRate: 800,
    theme: props.store.getDarkMode() ? "material-darker" : "default",
    gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
    lineNumbers: true,
    lint: (doc, opt, editor) => linter(doc, opt, editor, props.store)
  };

  const onRenderFooterContent = () => (
    <Stack horizontal tokens={{ childrenGap: 10 }}>
      {
        _controls.map(props => (
          <TooltipHost
            content={ props.ariaLabel }
            calloutProps={{ gapSpace: 0 }}
          >
            <IconButton {...props} />
          </TooltipHost>
        ))
      }
      <Slider
        styles={ Styles.speed }
        valueFormat={ speedFormat }
        min={ 0 }
        max={ 2000 }
        step={ 50 }
        defaultValue={ 500 }
        showValue
        snapToStep
      />
    </Stack>
  );

  // generate T variables
  const allVariables = [
    ...variables, 
    ...Array.from(
      Array(lastTvariable).keys()
    ).map(i => "T" + ++i)
  ];

  const onVariableChange = (key, newValue) => {
    props.store.setVariable(key, newValue);
  };

  const addVariable = () => {
    props.store.setVariable(lastTvariable + 1, 0);
    setLastTvariable(lastTvariable + 1);
  };

  return (
    <Panel
      isBlocking={ false }
      isOpen={ true }
      hasCloseButton={ false }
      styles={ Styles.container }
      isFooterAtBottom={ true }
      onRenderFooterContent={ onRenderFooterContent }
    >
      <Stack horizontal>
        <Stack.Item styles={ Styles.ramPart }>
        <CodeMirror
          ref={ editorRef }
          value={ props.store.getCode() }
          defineMode={ editorMode }
          options={ codeMirrorOptions }
          onChange={ (editor, data, value) => {

          }}
        />
        </Stack.Item>
        <Stack.Item styles={ Styles.ramPart }>
          <Stack
            tokens={{ childrenGap: 10 }} 
            styles={ Styles.variablesContainer }
          >
            {
              allVariables.map(key => {
                return (
                  <SpinButton
                    label={ key }
                    step={ 1 }
                    value={ props.store.getVariable(key) }
                    onChange={ (e, v) => onVariableChange(key, v) }
                  />
                );
              })
            }
            <Stack horizontal horizontalAlign="space-between">
              <p/>
              <TooltipHost
                content="Add next T variable"
              >
                <IconButton
                  iconProps={{ iconName: "Add" }}
                  ariaLabel="Add next T variable"
                  onClick={ addVariable }
                />
              </TooltipHost>
              <p/>
            </Stack>
          </Stack>
        </Stack.Item>
      </Stack>
    </Panel>
  );
});

export default Ram;
