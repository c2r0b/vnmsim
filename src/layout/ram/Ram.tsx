import ramStyled from './ram.module.css'

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

import AutoSizer from 'react-virtualized-auto-sizer'
import Split from 'react-split'

import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { StreamLanguage } from '@codemirror/language'
import { linter, lintGutter } from '@codemirror/lint'
import { Compartment } from '@codemirror/state'

import { editorMode as vnmLang } from '../../utility/mode'
import { editorLinter } from '../../utility/linter'

import { Variables } from './variables/Variables'

import * as Styled from './ram.styles'
import { clearHighlight, focusCell, lineHighlightField } from 'src/utility/highlight'
import { lineNumbersExtension } from 'src/utility/gutter'

import { setCode } from 'src/store/ram.slice'
import { setError, clearError } from 'src/store/errors.slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/store'

import { editorOptions, updateCode } from 'src/utility/editor'
import { getNormalizedThemeName } from 'src/themes/utils'

const editorTheme = new Compartment()

const Ram = forwardRef((_props, ref) => {
  const dispatch = useAppDispatch()
  
  const sim = useAppSelector((state) => state.sim)
  const ramCode = useAppSelector((state) => state.ram.code)
  const theme = useAppSelector((state) => state.theme.name)

  const editorRef = useRef<ReactCodeMirrorRef>(null)
  const isTyping = useRef(false);
  
  useImperativeHandle(ref, () => ({
    clearHighlight: () => clearHighlight(editorRef?.current)
  }), [])

  useEffect(() => {
    if (!editorRef?.current) return
    focusCell(sim.focus.cell, editorRef.current)
  }, [sim.focus.cell])

  // on editor content change
  const onEditorChange = (_value, viewUpdate) => {
    if (!viewUpdate) {
      return
    }
    const newCode = viewUpdate.state.doc.toString()
    if (newCode != ramCode) {
      isTyping.current = true
      dispatch(setCode(newCode))
    }
  }

  // on editor update check for highlighted errors
  const vnmLinter = linter(view => {
    const errors = editorLinter(view)
    if (errors.length) {
      dispatch(setError(errors[0].message))
    }
    else {
      dispatch(clearError())
    }
    return errors
  })

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

  useEffect(() => {
    if (ramCode == editorRef?.current?.state?.doc.toString()) {
      return
    }
    if (isTyping.current) {
      isTyping.current = false
      return
    }
    if (editorRef?.current) {
      updateCode(ramCode, editorRef.current)
    }
  }, [ramCode])

  return (
    <AutoSizer>
      {({ height }) => (
        <Styled.Container>
          <Split
            className={ ramStyled.split }
            sizes={[55, 45]}
            minSize={ 0 }
            gutterSize={ 20 }
            dragInterval={ 30 }
            direction="horizontal"
          >
            <Styled.RamHalf>
              <CodeMirror
                ref={ editorRef }
                value={ ramCode || "" }
                className={ ramStyled.CodeMirror }
                height={ height.toString() }
                extensions={ editorExtensions }
                onChange={ onEditorChange }
                basicSetup={ editorOptions }
              />
            </Styled.RamHalf>
            <Variables focusedVar={ sim.focus.var } />
          </Split>
        </Styled.Container>
      )}
    </AutoSizer>
  )
})

export default Ram