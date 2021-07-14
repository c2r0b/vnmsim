export const addition = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":2,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X + Y = Z\nLOD X\nADD Y\nSTO Z\nHLT"};

export const basics = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":1,"pc":{"val":3,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":null,"Z":2,"W":null},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X (op.Y) Z = W\n// 0 -> +\t1 -> -\n// 2 -> *\t3 -> /\nLOD Y\nJMZ 14\nSUB #1\nJMZ 19\nSUB #1\nJMZ 24\nSUB #1\nJMZ 29\nHLT\n\n// +\nLOD X\nADD Z\nJMP 33\n\n// -\nLOD X\nSUB Z\nJMP 33\n\n// *\nLOD X\nMUL Z\nJMP 33\n\n// /\nLOD X\nDIV Z\nJMP 33\n\nSTO W\nHLT"};

export const division = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":12,"Y":3,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X / Y = Z\nLOD X\nDIV Y\nSTO Z\nHLT"};

export const even = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"","variables":{"X":4,"Y":0,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// is X even? Z\nLOD X\nDIV #2\nMUL #2\nSTO Y\nLOD X\nSUB Y\nJMZ 11\nLOD #0\nSTO Z\nJMP 13\nLOD #1\nSTO Z\nHLT"};

export const greater_than = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X > Y ? Z\nLOD X\nJMZ 11\nSUB #1\nSTO X\nLOD Y\nJMZ 15\nSUB #1\nSTO Y\nJMP 1\n// X < Y\nLOD #0\nSTO Z\nHLT\n// X > Y\nLOD #1\nSTO Z\nHLT\n\n\n\n\n\n"};

export const modulo = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X > Y ? Z\nLOD X\nJMZ 11\nSUB #1\nSTO X\nLOD Y\nJMZ 15\nSUB #1\nSTO Y\nJMP 1\n// X < Y\nLOD #0\nSTO Z\nHLT\n// X > Y\nLOD #1\nSTO Z\nHLT\n\n\n\n\n\n"};

export const multiplication = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":6,"Y":7,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X * Y = Z\nLOD X\nMUL Y\nSTO Z\nHLT"};

export const power = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":3,"Y":2,"Z":null,"W":null},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X^Y = Z\nLOD #1\nSTO Z\nLOD Y\nJMZ 12\nLOD Z\nMUL X\nSTO Z\nLOD Y\nSUB #1\nSTO Y\nJMP 4\nHLT"};

export const square_root = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":0,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"HLT","variables":{"X":25,"Y":0,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// sqrt(X) = Y\nLOD X\nSTO Y\nDIV #2\nSTO Z\n// decrement Z\n// if Z == 0 end\nLOD Z\nJMZ 20\nSUB #1\nSTO Z\n// Y = (Y + X/Y) / 2\nLOD X\nDIV Y\nADD Y\nDIV #2\nSTO Y\n// loop\nJMP 7\n// end\nHLT"};

export const subtraction = {"status":0,"step":0,"alu":{"e1":"","e2":"","op":""},"acc":1,"pc":{"val":0,"step":1},"ir":{"cmd":"","loc":""},"line":"NOP","variables":{"X":3,"Y":2,"Z":0,"W":0},"tVarCount":0,"focus":{"el":"","var":""},"code":"// X - Y = Z\nLOD X\nSUB Y\nSTO Z\nHLT"};
