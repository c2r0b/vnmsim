import { execute, lastStep } from "./execute";
import * as samples from "../samples";

import StatsStore from "../../store/stats.store";
import StatusStore from "../../store/status.store";

// editor mock function
const editor =  { doc: { getLine: () => 1 } };

// check all samples for valid result
Object.entries(samples).forEach(([key, sample]) => {
  test(`${key} sample execution `, () => {
    const code = sample.input.code.split("\n");

    let result = {
      sim: { ...sample.input, step: 1, codeLine: 0 },
      stats: { ...StatsStore },
      status: { ...StatusStore }
    };

    do {
      result = execute({
        ...result,
        line: code[result.sim.codeLine],
        code: editor
      });
    } while (result?.status);

    // check final resulted status
    expect(result.sim.step).toEqual(lastStep);
    expect(result.sim.pc.val).toEqual(sample.result.pc.val);
    expect(result.sim.alu.e1).toEqual(sample.result.alu.e1);
    expect(result.sim.alu.e2).toEqual(sample.result.alu.e2);
    expect(result.sim.alu.op).toEqual(sample.result.alu.op);
    expect(result.sim.variables.X).toEqual(sample.result.variables.X);
    expect(result.sim.variables.Y).toEqual(sample.result.variables.Y);
    expect(result.sim.variables.Z).toEqual(sample.result.variables.Z);
    expect(result.sim.variables.W).toEqual(sample.result.variables.W);
  });
});

