import type Sim from "../types/sim";

const sim:Sim = {
  title: 'vnms',
  created: new Date().toISOString().slice(0, 10),
  codeLine: 0,
  step: 0,
  status: 0,
  alu: {
    e1: '',
    e2: '',
    op: ''
  },
  acc: 0,
  pc: {
    val: 0,
    step: 1,
  },
  ir: {
    cmd: '',
    loc: ''
  },
  focus: {
    el: "",
    cell: -1,
    var: -1
  },
  variables: {
    X: 0,
    Y: 0,
    Z: 0,
    W: 0,
    T1: 0
  }
};

export default sim;