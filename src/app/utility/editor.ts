import { ReactCodeMirrorRef } from '@uiw/react-codemirror'

export const editorOptions = {
    mode: "vnm",
    highlightActiveLine: true,
    highlightActiveLineGutter: true,
    highlightSelectionMatches: true,
    firstLineNumber: 0,
    cursorBlinkRate: 800,
    lineNumbers: false
}

export const updateCode = (code:string, editor:ReactCodeMirrorRef):void => {
    if (!editor) {
        return
    }
    editor.view?.dispatch({
        changes: {
            from: 0,
            to: editor.view.state.doc.toString().length,
            insert: code
        }
    })
}