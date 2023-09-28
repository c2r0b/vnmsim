export default interface Sim {
  title: string;
  created: string;
  codeLine: number;
  step: number;
  status: number;
  alu: {
    e1: string;
    e2: string;
    op: string;
  };
  acc: number;
  pc: {
    val: number;
    step: number;
  };
  ir: {
    cmd: string;
    loc: string;
  };
  focus: {
    el: string;
    cell: number;
    var: number;
  };
  variables: {
    X: number;
    Y: number;
    Z: number;
    W: number;
    T1: number;
  };
}