export const editorMode = {
  name: "vnm",
  fn: () => {
    return {
      token: (stream) => {
        if (
          stream.match(/^(lod|add|sub|mul|div|sto|jmp|jmz|nop|hlt)/i)
        ) {
          return "cmd";
        }
        if (stream.match(/\s#-?\d+(\s*)$/)) {
          return "num";
        }
        if (stream.match(/\s[1-9]\d*(\s*)$/)) {
          return "cell";
        }
        if (stream.match(/\s(x|y|z|w|(t[1-9]\d*))(\s*)$/i)) {
          return "val";
        }
        if (stream.match(/^\/\/[\s\S]*$/)) {
          return "comment";
        }
        stream.next();
        return null;
      }
    };
  }
};