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
  Stack, DetailsList, DetailsListLayoutMode, IColumn, SelectionMode,
  TooltipHost, IconButton, Slider, Panel
} from '@fluentui/react';

import * as Styles from "./ram.styles";

const speedFormat = (value: number) => `${value} ms`;

const columns: IColumn[] = [
  {
    key: "name",
    name: "Name"
  },
  {
    key: "value",
    name: "Value"
  }
];

const Ram = observer((props:Props) => {
  const [items, setItems] = useState(["x", "y", "z", "w"].map(v => ({
    key: v,
    name: v,
    value: v
  })));

  // does not rerender !!
  const hasErrors = props.store.hasErrors();

  const editorRef = useRef(null);

  const _controls = [
    {
      ariaLabel: "Play",
      disabled: hasErrors,
      iconProps: { iconName: "Play" },
      onClick: () => props.setStatus(1),
    },
    {
      ariaLabel: "Single step",
      disabled: hasErrors,
      iconProps: { iconName: "Step" },
      onClick: () => props.setStatus(2),
    },
    {
      ariaLabel: "Single iteration",
      disabled: hasErrors,
      iconProps: { iconName: "Circle" },
      onClick: () => props.setStatus(3),
    },
    {
      ariaLabel: "Pause",
      disabled: hasErrors,
      iconProps: { iconName: "Pause" },
      onClick: () => props.setStatus(4),
    },
    {
      ariaLabel: "Stop",
      disabled: hasErrors,
      iconProps: { iconName: "Stop" },
      onClick: () => props.setStatus(0),
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
        <CodeMirror
          ref={ editorRef }
          value={ props.store.getCode() }
          defineMode={ editorMode }
          options={ codeMirrorOptions }
          onChange={ (editor, data, value) => {

          }}
        />
        <DetailsList
          items={ items }
          columns={ columns }
          layoutMode={ DetailsListLayoutMode.justified }
          isHeaderVisible={ false }
          selectionMode={ SelectionMode.none }
        />
      </Stack>
    </Panel>
  );
});

export default Ram;
