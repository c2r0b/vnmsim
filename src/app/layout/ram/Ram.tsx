import ramStyles from './ram.module.css'

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AutoSizer from 'react-virtualized-auto-sizer'
import Split from 'react-split'

import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { StreamLanguage } from '@codemirror/language'
import { linter, lintGutter } from '@codemirror/lint'
import { Compartment } from '@codemirror/state'

import { RootState } from 'src/store'

import { editorMode as vnmLang } from '../../utility/mode'
import { editorLinter } from '../../utility/linter'

import { Variables } from './variables/Variables'

import * as Styles from './ram.styles'
import { addLineHighlight, clearHighlight, lineHighlightField } from 'src/app/utility/highlight'
import { lineNumbersExtension } from 'src/app/utility/gutter'

import { setError, clearError } from 'src/store/errors.slice'
import { setCode } from 'src/store/ram.slice'

import { getNormalizedThemeName } from 'src/themes/utils'

const editorTheme = new Compartment()

const Ram = forwardRef((_props, ref) => {
  const dispatch = useDispatch()
  
  const sim = useSelector((state:RootState) => state.sim)
  const ramCode = useSelector((state:RootState) => state.ram.code)
  const theme = useSelector((state:RootState) => state.theme.name)

  const editorRef = useRef<ReactCodeMirrorRef>(null)

  useImperativeHandle(ref, () => ({
    clearHighlight: () => clearHighlight(editorRef?.current)
  }), [])

  const focusCell = (lineNo: number) => {
    const editor = editorRef?.current
    if (!editor?.state) return

    // if out of bounds, return
    if (lineNo < 0 || lineNo > editor.state.doc.lines) {
      clearHighlight(editor)
      return
    }

    if (editor.view && editor.state.doc.lines > lineNo) {
      const docPosition = editor.state.doc.line(lineNo + 1).from
      editor.view.dispatch({ effects: addLineHighlight.of(docPosition) })
    }
  }

  useEffect(() => {
    focusCell(sim.focus.cell)
  }, [sim.focus.cell])

  // on editor content change
  const onEditorChange = (_value, viewUpdate) => {
    if (!viewUpdate) {
      return
    }
    const newCode = viewUpdate.state.doc.toString()
    if (newCode != ramCode) {
      dispatch(setCode(newCode))
    }
  }

  // on editor update check for highlighted errors
  const vnmLinter = linter(view => {
    const errors = editorLinter(view)
    if (errors.length) {
      dispatch(setError(errors.length))
    }
    else {
      dispatch(clearError())
    }
    return errors
  })
  
  const editorOptions = {
    mode: "vnm",
    highlightActiveLine: true,
    highlightActiveLineGutter: true,
    highlightSelectionMatches: true,
    firstLineNumber: 0,
    cursorBlinkRate: 800,
    lineNumbers: false
  }

  const currentEditorTheme = () => {
    const useDarkMode = getNormalizedThemeName(theme) === "dark"
    return useDarkMode ? githubDark : githubLight
  }

  const editorExtensions = [
    lineNumbersExtension,
    lintGutter(),
    StreamLanguage.define(vnmLang),
    vnmLinter,
    lineHighlightField,
    editorTheme.of(currentEditorTheme())
  ]
  
  useEffect(() => {
    editorRef?.current?.view?.dispatch({
      effects: editorTheme.reconfigure(currentEditorTheme())
    })
  }, [theme])

  return (
    <AutoSizer>
      {({ height }) => (
        <div style={ Styles.container }>
          <Split
            className={ ramStyles.split }
            sizes={[55, 45]}
            minSize={ 0 }
            gutterSize={ 20 }
            dragInterval={ 30 }
            direction="horizontal"
          >
            <div style={ Styles.ramHalf }>
              <CodeMirror
                ref={ editorRef }
                className={ ramStyles.CodeMirror }
                value={ ramCode || "" }
                height={ height.toString() }
                extensions={ editorExtensions }
                onChange={ onEditorChange }
                onUpdate={ (viewUpdate) => onEditorChange("", viewUpdate) }
                basicSetup={ editorOptions }
              />
            </div>
            <Variables focusedVar={ sim.focus.var } />
          </Split>
        </div>
      )}
    </AutoSizer>
  )
})

export default Ram