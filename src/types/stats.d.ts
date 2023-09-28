export default interface Stats {
  executed_step: number;
  alu_calculation: number;
  variable_access: number;
  cell_access: number;
  performed_jmp: number;
  performed_jmz: number;
}