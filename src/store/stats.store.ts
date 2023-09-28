import type Stats from "../types/stats";

const stats:Stats = {
  executed_step: 0,
  alu_calculation: 0,
  variable_access: 0,
  cell_access: 0,
  performed_jmp: 0,
  performed_jmz: 0,
};

export default stats;