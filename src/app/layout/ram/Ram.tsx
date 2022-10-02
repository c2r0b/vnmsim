import ramStyles from './ram.module.css';
import '../../../../node_modules/codemirror/lib/codemirror.css';
import '../../../../node_modules/codemirror/addon/lint/lint.css';
import "../../../../node_modules/codemirror/theme/material-darker.css";

import React, { useState, useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import AutoSizer from "react-virtualized-auto-sizer";
import { Resizable } from "re-resizable";
import Split from "react-split";

import CodeMirror from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
import { StreamLanguage } from "@codemirror/language"
import { linter, lintGutter } from "@codemirror/lint"

import { SimulatorContext } from "src/store/dispatcher";
import { Localize } from "src/locale/Localize";
import { ThemeContext } from "src/themes/dispatcher";

import { editorMode as vnmLang } from "../../utility/mode";
import { editorLinter } from "../../utility/linter";

import { Text } from '@fluentui/react';

import { Variables } from "./variables/Variables";
import { Statistics } from "./stats/Stats";

import * as Styles from "./ram.styles";

const Ram = observer(() => {
  const Sim = useContext(SimulatorContext);
  const Theme = useContext(ThemeContext);

  const [focusedVar, setFocusedVar] = useState("");
  const [currentMark, setCurrentMark] = useState({ clear: () => {}});
  
  const interval = Sim.getInterval();
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
    
    const sim = Sim.getSim();
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
  }, [Sim.getSim().step]);

  // on editor content change
  const onEditorChange = React.useCallback((value, viewUpdate) => {
    Sim.setEditor(viewUpdate);
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
    lineNumbers: true
  };

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
                extensions={[lintGutter(), StreamLanguage.define(vnmLang), vnmLinter]}
                theme={ (Theme.getNormalizedThemeName() === "dark") ? githubDark : "light" }
                onChange={ onEditorChange }
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
