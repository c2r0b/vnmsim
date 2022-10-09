import ramStyles from './ram.module.css';

import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import AutoSizer from "react-virtualized-auto-sizer";
import { Resizable } from "re-resizable";
import Split from "react-split";

import CodeMirror from '@uiw/react-codemirror';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { StreamLanguage } from "@codemirror/language";
import { linter, lintGutter } from "@codemirror/lint";
import { Compartment } from "@codemirror/state";

import { SimulatorContext } from "src/store/dispatcher";
import { Localize } from "src/locale/Localize";
import { ThemeContext } from "src/themes/dispatcher";

import { editorMode as vnmLang } from "../../utility/mode";
import { editorLinter } from "../../utility/linter";

import { Text } from '@fluentui/react';

import { Variables } from "./variables/Variables";
import { Statistics } from "./stats/Stats";

import * as Styles from "./ram.styles";
import { addLineHighlight, clearHighlight, lineHighlightField } from 'src/app/utility/highlight';
import { lineNumbersExtension } from 'src/app/utility/gutter';

const editorTheme = new Compartment();

const Ram = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Theme = useContext(ThemeContext);

  const [focusedVar, setFocusedVar] = useState("");
  
  const interval = Sim.getInterval();
  const editorRef = useRef(null);

  const focusCell = (lineNo: number) => {
    const editor = Sim.getEditor();

    // if out of bounds, return
    if (lineNo < 0 || lineNo > editor.state.doc.lines) {
      clearHighlight(editor);
      return;
    }

    const docPosition = editor.state.doc.line(lineNo + 1).from;
    editor.view.dispatch({ effects: addLineHighlight.of(docPosition) });
  };

  useEffect(() => {
    if (interval === 0) {
      return;
    }
    
    const sim = Sim.getSim();
    if (!editorRef?.current) {
      return;
    }

    focusCell(sim.focus.cell);

    if (sim.focus.var < 0) {
      setFocusedVar("");
    }
    else if (sim.step >= 7) {
      setFocusedVar(sim.focus.var);
    }
  }, [Sim.getSim().step]);

  // on editor content change
  const onEditorChange = React.useCallback((value, viewUpdate) => {
    Sim.setEditor(viewUpdate);
    Sim.setCode(viewUpdate.state.doc.toString());
  }, []);

  // on editor update check for highlighted errors
  const vnmLinter = linter(view => {
    const errors = editorLinter(view);
    if (errors.length) {
      Sim.fireError(errors.length);
    }
    else {
      Sim.clearErrors();
    }
    return errors;
  });
  
  const editorOptions = {
    mode: "vnm",
    highlightActiveLine: true,
    highlightActiveLineGutter: true,
    highlightSelectionMatches: true,
    firstLineNumber: 0,
    cursorBlinkRate: 800,
    lineNumbers: false
  };

  const currentEditorTheme = () => {
    const useDarkMode = Theme.getNormalizedThemeName() === "dark";
    return useDarkMode ? githubDark : githubLight;
  };

  const editorExtensions = [
    lineNumbersExtension,
    lintGutter(),
    StreamLanguage.define(vnmLang),
    vnmLinter,
    lineHighlightField,
    editorTheme.of(currentEditorTheme())
  ];
  
  useEffect(() => {
    Sim.getEditor().view?.dispatch({
      effects: editorTheme.reconfigure(currentEditorTheme())
    });
  }, [Theme.getNormalizedThemeName()]);

  return (
    <AutoSizer>
      {({ width }) => (
        <Resizable
          style={ Styles.container }
          minWidth={ 500 }
          maxWidth={ width - 60 }
          defaultSize={{
            width: 500,
            height: "100%",
          }}
        >
          <Split
            className={ ramStyles.split }
            sizes={[50, 50]}
            minSize={ 0 }
            gutterSize={ 20 }
            dragInterval={ 30 }
            direction="horizontal"
          >
            <div style={ Styles.ramHalf }>
              <div style={ Styles.title }>
                <Text styles={ Styles.titleText }>
                  <Localize label="MEMORY"/>
                </Text>
              </div>
              <CodeMirror
                ref={ editorRef }
                className={ ramStyles.CodeMirror }
                value={ Sim.getCode() || "" }
                height="200px"
                extensions={ editorExtensions }
                onChange={ onEditorChange }
                onUpdate={ (viewUpdate) => onEditorChange("", viewUpdate) }
                basicSetup={ editorOptions }
              />
            </div>
            <Split
              sizes={[55, 45]}
              minSize={ 40 }
              gutterSize={ 20 }
              dragInterval={ 30 }
              direction="vertical"
            >
              <Variables focusedVar={ focusedVar } />
              <Statistics />
            </Split>
          </Split>
        </Resizable>
      )}
    </AutoSizer>
  );
});

export default Ram;
