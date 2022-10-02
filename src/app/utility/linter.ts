import { validator } from "./validator";

export const linter = (doc) => {
  const code = doc.split('\n'), errors = [];

  // utility function to get the line X on the validator
  const getLine = (index) => code[index];

  for (var i in code) {
    if (!validator(code[i], code.length, getLine)) {
      errors.push({
        severity: "error",
        from: { line: +i, ch: 0 },
        to: { line: +i, ch: code[i].length }
      });
    }
  }
  
  return errors;
};
