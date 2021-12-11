import './ram.css';
import '../../../node_modules/codemirror/lib/codemirror.css';
import '../../../node_modules/codemirror/addon/lint/lint.css';

import React, { useState, useRef, useEffect } from 'react';
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
  const [focusedVar, setFocusedVar] = useState("");
  const [currentMark, setCurrentMark] = useState({ clear: () => {}});
  
  const hasErrors = props.store.hasErrors();

  const simStatus = props.store.getSimStatus();
  const interval = props.store.getInterval();

  const editorRef = useRef(null);

  const focusCell = (line: number, start: number, end: number) => {
    currentMark.clear();
    setCurrentMark(editorRef.current.editor.markText(
      { line, ch: start },
      { line, ch: end },
      { css: "background-color: #f9c55b" }
    ));
  };

  useEffect(() => {
    if (interval === 0) {
      return;
    }
    
    const sim = props.store.getSim();
    if (!editorRef?.current) {
      return;
    }

    if (sim.focus.cell < 0) {
      currentMark.clear();
    }
    else {
      switch (sim.step) {
        case 2: // IR command
          focusCell(sim.codeLine, 0, sim.ir.cmd.length);
          break;
        case 3: // IR location
          const positionZero = sim.ir.cmd.length + 1;
          focusCell(sim.codeLine, positionZero, positionZero + sim.ir.loc.length);
          break;
        case 7: // number store in cell
          focusCell(sim.focus.cell, 0, 10);
          break;
        default:
          currentMark.clear();
      }
    }

    if (sim.focus.var < 0) {
      setFocusedVar("");
    }
    else if (sim.step >= 7) {
      setFocusedVar(sim.focus.var);
    }
  }, [props.store.getSim().step]);

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
    styleSelectedText: true,
    autoRefresh: true,
    firstLineNumber: 0,
    cursorBlinkRate: 800,
    theme: props.store.getDarkMode() ? "material-darker" : "default",
    gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
    lineNumbers: true,
    lint: (doc, opt, editor) => linter(doc, opt, editor, props.store)
  };

  const onIntervalChange = (value) => {
    // if running restore interval
    if ([1,2,3].includes(simStatus)) {
      const oldStatus = simStatus;
      props.store.setSimStatus(0);
      setTimeout(() => {
        props.store.setSimStatus(oldStatus);
      });
    }
    props.store.setInterval(value);
  };

  const onRenderFooterContent = () => (
    <Stack
      horizontal
      tokens={{ childrenGap: 10 }}
    >
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
        onChange={ onIntervalChange }
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
    if (newValue === undefined) return;
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
          editorDidMount={(editor) => {
            props.store.setEditor(editor);
          }}
          onChange={ (editor, data, value) => {
            props.store.setEditor(editor);
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
                    styles={ focusedVar === key ? Styles.focusedVar : {} }
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
