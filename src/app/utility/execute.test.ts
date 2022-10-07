import { execute, lastStep } from "./execute";
import * as samples from "../samples";

import stats from "../../store/stats.store";
import status from "../../store/status.store";

// editor mock function
const editor =  { doc: { getLine: () => 1 } };

// check all samples for valid result
test("samples execution", () => {
  for (let sample of Object.values(samples)) {
    const code = sample.input.code.split("\n");

    let simVal = { ...sample.input, step: 1, code: "" };
    let statsVal = { ...stats };
    let statusVal = { ...status };

    let pc = 0;
    // for each specified line of code
    for (let line of code) {
      simVal.step = 0;

      // execute every simulator step
      do {
        simVal.step++;

        const result = execute({
          sim: simVal,
          stats: statsVal,
          status: statusVal,
          line,
          editor
        });

        // remember simulator status
        simVal = result.sim;
        statsVal = result.stats;
        statusVal = result.status;
      } while (simVal.step < lastStep);
      pc++;
    }

    // check final resulted status
    expect(simVal.step).toEqual(lastStep);
    expect(simVal.pc.val).toEqual(sample.result.pc.val);
    expect(simVal.alu.e1).toEqual(sample.result.alu.e1);
    expect(simVal.alu.e2).toEqual(sample.result.alu.e2);
    expect(simVal.alu.op).toEqual(sample.result.alu.op);
    expect(simVal.variables.X).toEqual(sample.result.variables.X);
    expect(simVal.variables.Y).toEqual(sample.result.variables.Y);
    expect(simVal.variables.Z).toEqual(sample.result.variables.Z);
    expect(simVal.variables.W).toEqual(sample.result.variables.W);
  }
});

