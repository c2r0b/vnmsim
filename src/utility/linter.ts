import { validator } from './validator'
import { Diagnostic } from '@codemirror/lint'

export const editorLinter = view => {
  const errors: Diagnostic[] = []
  const code = view.state.doc.toJSON()

  // utility function to get the line X on the validator
  const getLine = (index) => code[index]
  
  code.forEach((line, i) => {
    if (!validator(line, view.state.doc.lines, getLine)) {
      // get line char init
      const lineStartIndex = +code.reduce((a, b, index) => (index >= i) ? a : a + b.length + 1, 0)
      
      errors.push({
        from: lineStartIndex,
        to: lineStartIndex + line.length,
        severity: "error",
        message: "Invalid syntax"
      })
    }
  })

  return errors
}