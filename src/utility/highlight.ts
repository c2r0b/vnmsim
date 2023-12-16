import { Decoration, EditorView } from '@codemirror/view'
import { StateEffect, StateField } from '@codemirror/state'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'

export const addLineHighlight = StateEffect.define<null|number>()

const lineHighlightMark = Decoration.line({
  attributes: {style: 'background-color: #f9c55b'},
})

export const lineHighlightField = StateField.define({
  create() {
    return Decoration.none
  },
  update(lines:any, tr) {
    for (let e of tr.effects) {
      if (e.is(addLineHighlight)) {
        lines = Decoration.none
        if (e.value !== null) {
          lines = lines.update({ add: [lineHighlightMark.range(e.value)] })
        }
      }
    }
    return lines
  },
  provide: (f) => EditorView.decorations.from(f),
})

export const clearHighlight = (editor) => {
  editor.view?.dispatch({ effects: addLineHighlight.of(null) })
}

export const focusCell = (lineNo: number, editor: ReactCodeMirrorRef) => {
  if (!editor?.view?.state) return
  // if out of bounds, return
  if (lineNo < 0 || lineNo > editor.view.state.doc.lines) {
    clearHighlight(editor)
    return
  }

  if (editor.view && editor.view.state.doc.lines > lineNo) {
    const docPosition = editor.view.state.doc.line(lineNo + 1).from
    editor.view.dispatch({ effects: addLineHighlight.of(docPosition) })
  }
}