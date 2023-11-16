export const addition = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":2,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X + Y = Z\nLOD X\nADD Y\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":2,"e2":2,"op":"="},"acc":4,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":2,"Y":2,"Z":4,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Addition","codeLine":0}
}

export const basics = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":1,"pc":{"val":3,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":0,"Z":2,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X (op.Y) Z = W\n// 0 -> +\t1 -> -\n// 2 -> *\t3 -> /\nLOD Y\nJMZ 14\nSUB #1\nJMZ 19\nSUB #1\nJMZ 24\nSUB #1\nJMZ 29\nHLT\n\n// +\nLOD X\nADD Z\nJMP 33\n\n// -\nLOD X\nSUB Z\nJMP 33\n\n// *\nLOD X\nMUL Z\nJMP 33\n\n// /\nLOD X\nDIV Z\nJMP 33\n\nSTO W\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":3,"e2":2,"op":"="},"acc":5,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":3,"Y":0,"Z":2,"W":5},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Basics","codeLine":0}
}

export const division = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":12,"Y":3,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X / Y = Z\nLOD X\nDIV Y\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":12,"e2":3,"op":"="},"acc":4,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":12,"Y":3,"Z":4,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Division","codeLine":0}
}

export const even = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"","variables":{"X":4,"Y":0,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// is X even? Z\nLOD X\nDIV #2\nMUL #2\nSTO Y\nLOD X\nSUB Y\nJMZ 11\nLOD #0\nSTO Z\nJMP 13\nLOD #1\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":4,"e2":1,"op":"="},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":4,"Y":4,"Z":1,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Is even","created":"2022-02-20","codeLine":0}
}

export const greater_than = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X > Y ? Z\nLOD X\nSTO T1 // save +X\nMUL #-1\nSTO T2 // save -X\nLOD Y\nSTO T3 // save +Y\nMUL #-1\nSTO T4 // save -Y\n\n// decrement all 4 counters\nLOD T1\nJMZ 30\nSUB #1\nSTO T1\nLOD T2\nJMZ 30\nSUB #1\nSTO T2\nLOD T3\nJMZ 41\nSUB #1\nSTO T3\nLOD T4\nJMZ 41\nSUB #1\nSTO T4\nJMP 11\n\n// X reached 0\nLOD T3\nJMZ 57\nSUB #1\nSTO T3\nLOD T4\nJMZ 52\nSUB #1\nSTO T4\nJMP 30\n\n// Y reached 0\nLOD T1\nJMZ 52\nSUB #1\nSTO T1\nLOD T2\nJMZ 57\nSUB #1\nSTO T2\nJMP 41\n\n// Result 1\nLOD #1\nSTO Z\nHLT\n\n// Result 0\nLOD #0\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":-5,"e2":1,"op":"="},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":1,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Is greater than","created":"2022-02-20","codeLine":0}
}

export const modulo = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X > Y ? Z\nLOD X\nJMZ 11\nSUB #1\nSTO X\nLOD Y\nJMZ 15\nSUB #1\nSTO Y\nJMP 1\n// X < Y\nLOD #0\nSTO Z\nHLT\n// X > Y\nLOD #1\nSTO Z\nHLT\n\n\n\n\n\n"},
  result: {"status":0,"step":9,"alu":{"e1":1,"e2":1,"op":"="},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":0,"Y":0,"Z":1,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Modulo","created":"2022-02-20","codeLine":0}
}

export const multiplication = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":6,"Y":7,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X * Y = Z\nLOD X\nMUL Y\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":6,"e2":7,"op":"="},"acc":42,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":6,"Y":7,"Z":42,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Multiplication","codeLine":0}
}

export const power = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X^Y = Z\nLOD #1\nSTO Z\nLOD Y\nJMZ 12\nLOD Z\nMUL X\nSTO Z\nLOD Y\nSUB #1\nSTO Y\nJMP 4\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":1,"e2":1,"op":"="},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":3,"Y":0,"Z":9,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Power","codeLine":0}
}

export const square_root = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":25,"Y":0,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// sqrt(X) = Y\nLOD X\nSTO Y\nDIV #2\nSTO Z\n// decrement Z\n// if Z == 0 end\nLOD Z\nJMZ 20\nSUB #1\nSTO Z\n// Y = (Y + X/Y) / 2\nLOD X\nDIV Y\nADD Y\nDIV #2\nSTO Y\n// loop\nJMP 7\n// end\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":10,"e2":0,"op":"="},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":25,"Y":5,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Square root","codeLine":0}
}

export const subtraction = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X - Y = Z\nLOD X\nSUB Y\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":3,"e2":2,"op":"="},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":1,"W":0},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Subtraction","codeLine":0}
}

export const is_negative = {
  input: {"status":0,"step":0,"alu":{"e1":0,"e2":0,"op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":-3,"Y":0,"Z":0,"W":0,"T1":0,"T2":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X < 0 ? Z\nLOD X\nMUL X\nSTO T1\nSUB X\nSTO T2\nJMZ 23 // 0 is positive\n\nLOD T1\nJMZ 19\nSUB #1\nSTO T1\nLOD T2\nJMZ 23\nSUB #1\nSTO T2\nJMP 7\n\n// is negative\nLOD #1\nJMP 27\n\n// is positive\nLOD #0\nJMP 27\n\n// save result\nSTO Z\nHLT"},
  result: {"status":0,"step":9,"alu":{"e1":4,"e2":1,"op":"="},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"HLT","loc":""},"line":"HLT","variables":{"X":-3,"Y":0,"Z":1,"W":0,"T1":0,"T2":3},"tVarCount":0,"focus":{"el":"","cell":-1,"var":-1},"title":"Is negative","codeLine":0}
}