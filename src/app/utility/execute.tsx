export default ({ sim, stats, status, line }) => {
  // execute code related to the current simulator step
  switch(status) {
    case 1:
      stats.executed_steps++;

      sim.line = (
        (!line || line.match(/^((\d+)|(\/\/[\s\S]*))$/i))
        ? 'NOP'
        : line
      );

      // stop the simulator if the PC has a negative value
      if (sim.pc.val < 0) {
        sim.pc.val = 0;
        sim.step = lastStep;
        sim.status = 2;
      }
      break;
    case 2:
      // get instruction inside IR first part
      sim.ir.cmd = sim.line.substr(0, 3).toUpperCase();
      break;
    case 3:
      // get value inside IR second part
      sim.ir.loc = sim.line.substr(4).toUpperCase();
      break;
    case 4:
      // increment program counter
      sim.pc.val = +sim.pc.val + sim.pc.step;
      break;
    case 6:
      // get correct alu operation
      switch (sim.ir.cmd) {
        case 'NOP':
          sim.step = lastStep;
          sim.focus.el = '';
          break;
        case 'HLT':
          sim.step = lastStep;
          sim.status = 2;
          break;
        case 'JMP':
          sim.focus.el = 'pc';
          sim.pc.val = +sim.ir.loc;
          sim.step = lastStep;
          stats.performed_jmp++;
          break;
        case 'JMZ':
          sim.focus.el = 'acc';
          break;
        default:
          sim.focus.el = 'aluOp';
          sim.alu.op = cmds[sim.ir.cmd];
          break;
      }
      break;
    case 7:
      // JMZ instruction behaviour
      if (sim.ir.cmd == 'JMZ') {
        if (sim.acc == 0) {
          sim.focus.el = 'pc';
          sim.pc.val = +sim.ir.loc;
          stats.performed_jmz++;
        }
        else {
          sim.focus.el = '';
        }
        sim.step = lastStep;
        break;
      }

      // STO instruction behaviour
      if (sim.ir.cmd == 'STO') {
        sim.focus.el = 'acc';
        break;
      }

      // aything but LOD instruction behaviour
      if (sim.ir.cmd != 'LOD') sim.alu.e1 = sim.acc;

      // parse data portion (instruction register loc)
      if (sim.ir.loc.indexOf('#') != -1) { // #n
        sim.alu.e2 = sim.ir.loc.replace('#','');
      }
      else if (sim.ir.loc.match(/T|X|Y|Z|W/)) { // variable
        sim.focus.var = sim.ir.loc;
        sim.alu.e2 = parseInt(sim.variables[sim.ir.loc]) || 0;
        stats.variables_accesses++;
      }
      else { // memory cell
        editor.focusCell(sim.ir.loc);
        sim.alu.e2 = parseInt(editor.doc.getLine(sim.ir.loc)) || 0;
        stats.cells_accesses++;
      }
      sim.focus.el = 'aluE2';
      break;
    case 8:
      if (sim.ir.cmd != 'STO') {

        // execute operation
        switch (sim.alu.op) {
          case '=':
            sim.acc = parseInt(sim.alu.e2) || 0;
            break;
          default:
            stats.alu_calculations++;
            sim.acc = parseInt(
              //eval("sim.acc" + sim.alu.op + "parseInt(sim.alu.e2)")
            );
            break;
        }
      }
      // STO instruction -> edit cell / variable
      else {
        if (sim.ir.loc.match(/T|X|Y|Z|W/)) { // variable
          sim.focus.var = sim.ir.loc;
          sim.variables[sim.ir.loc] = sim.acc;
          stats.variables_accesses++;
        }
        else { // memory cell
          stats.cells_accesses++;

          // focus that cell
          editor.focusCell(sim.ir.loc);

          // append to cell content
          var line = sim.ir.loc,
              start = { line: line, ch: 0 },
              end = { line: line, ch: codeMirror.doc.getLine(sim.ir.loc).length };
          editor.doc.replaceRange(sim.acc.toString(), start, end);
        }
      }
      break;
  }
  return { sim, stats };
};
