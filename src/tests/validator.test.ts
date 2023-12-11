import { validator } from '../utility/validator'
import * as samples from '../samples'

// check all samples for valid result
test("samples validity", () => {
  for (let sample of Object.values(samples)) {
    const code = sample.input.code.split("\n")
    const getLine = (i) => code[i]
    for (let line of code) {
      expect(validator(line, code.length, getLine) ? true : false).toEqual(true)
    }
  }
})

const withSyntaxErrors = [
  "LODs 3", "sLOD 3", "sLOD", "hlt 2", "nop 2", "nop x",
  "hlt x", "lod", "add", "mul", "div ", "sub", "lod v1",
  "lod t-1", "add t1s", "lod //x", "jmp", "jmz", "jmp x",
  "jmz x", "nop hlt", "lod #x", "lod#2", "x", "lod 4",
  "lod 3", "jmp 4"
]

// check instructions that should trigger an error
test("syntax errors", () => {
  for (let withError of withSyntaxErrors) {
    expect(validator(withError, 3, () => "lod #2") ? true : false).toEqual(false)
  }
})

const withSyntaxCorrect = [
  "LOD 2", "LOD #1", "LOD X", "ADD #1", "ADD Y", "ADD 1",
  "MUL #1", "MUL 1", "MUL Z", "DIV #2", "DIV 3", "DIV T1",
  "JMP 1", "JMZ 2", "NOP", "HLT"
]

// check instructions that should NOT trigger an error
test("syntax correct", () => {
  for (let correctSample of withSyntaxCorrect) {
    expect(validator(correctSample, 4, () => "2") ? true : false).toEqual(true)
  }
})