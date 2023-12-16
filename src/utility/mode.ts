export const editorMode = {
  token: (stream) => {
    if (
      stream.match(/^(lod|add|sub|mul|div|sto|jmp|jmz|nop|hlt)/i)
    ) {
      return "keyword"
    }
    if (stream.match(/\s#-?\d+(\s*)$/)) {
      return "number"
    }
    if (stream.match(/\s[1-9]\d*(\s*)$/)) {
      return "string"
    }
    if (stream.match(/\s(x|y|z|w|(t[0-9]\d*))(\s*)$/i)) {
      return "operator"
    }
    if (stream.match(/^\/\/[\s\S]*$/)) {
      return "comment"
    }
    stream.next()
    return null
  }
}