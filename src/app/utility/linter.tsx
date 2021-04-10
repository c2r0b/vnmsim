import { validator } from "./validator";
import CodeMirror from "codemirror";

export const linter = (doc, options, editor, store) => {
  const code = doc.split('\n'), errors = [];

  // utility function to get the line X on the validator
  const getLine = (index) => code[index];

  for (var i in code) {
    if (!validator(code[i], code.length, getLine)) {
      errors.push({
        severity: "error",
        from: CodeMirror.Pos(+i, 0),
        to: CodeMirror.Pos(+i, code[i].length)
      });
    }
  }
  if (errors.length) {
    store.fireError(errors.length);
  }
  else {
    store.clearErrors();
  }
  return errors;
};
