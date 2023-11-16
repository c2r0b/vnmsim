// syntax validator
export const validator = (t, lastIndex: number, getLine: Function) => {
  let line: number

  // comment lines
  if (t.match(/^\/\/[\s\S]*$/)) {
    return true
  }
  
  // pardon inline comments
  t = t.split("//")[0]
  
  return (
    // cmds with cell number parameter
    (
      t.match(/^(lod|add|sub|mul|div|sto)\s\d+\s*$/i)
      && (line = +t.split(' ')[1]) < lastIndex
      && getLine(line).match(/^(\d|$)*$/)
    )
    // jumps
    || t.match(/^(jmp|jmz)\s\d+\s*$/i) && +t.split(' ')[1] < lastIndex
    // cmds with variable
    || t.match(/^(lod|add|sub|mul|div|sto)\s(x|y|z|w|(t([0-9]\d*)))\s*$/i)
    // cmds with numeric value
    || t.match(/^(lod|add|sub|mul|div)\s#-?\d+\s*$/i)
    // NOP and HLT with no parameters
    || t.match(/^(nop|hlt)$/i)
    // numeric value or none
    || t.match(/^\d*$/i)
    // comment lines
    || t.match(/^\/\/[\s\S]*$/)
  )
}
