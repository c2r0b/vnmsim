const lastStep = 8;

const commands = {
  LOD: '=',
  STO: '=',
  ADD: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/'
};

export default ({ sim, stats, status, line, editor }) => {
  // execute code related to the current simulator step
  switch(sim.step) {
    case 1:
      sim.focus.var = -1;
      stats.executed_steps++;

      // get line, interpret comments as NOP operations
      sim.line = (
        (!line || line.match(/^((\d+)|(\/\/[\s\S]*))$/i))
        ? 'NOP'
        : line
      );

      // stop the simulator if the PC has a negative value
      if (sim.pc.val < 0) {
        sim.pc.val = 0;
        sim.step = lastStep;
        status = 4;
      }
      break;
    case 2:
      sim.focus.cell = 1;
      sim.focus.el = 'ir.input.field';
      sim.ir.cmd = sim.line.substr(0, 3).toUpperCase();
      break;
    case 3:
      sim.focus.cell = 1;
      sim.focus.el = 'ir.input.field';
      sim.ir.loc = sim.line.substr(4).toUpperCase();
      break;
    case 4:
      sim.focus.el = 'pc.increment.input';
      break;
    case 5:
      sim.focus.cell = -1;
      sim.focus.el = 'pc.input.input';
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
          sim.pc.val = 0;
          sim.focus.el = "";
          sim.focus.var = -1;
          sim.focus.cell = -1;
          sim.codeLine = -1;
          status = 0;
          break;
        case 'JMP':
          sim.focus.el = 'pc.input.input';
          sim.pc.val = +sim.ir.loc;
          sim.step = lastStep;
          sim.codeLine = +sim.ir.loc - 1;
          stats.performed_jmp++;
          break;
        case 'JMZ':
          sim.focus.el = 'acc.field.field';
          break;
        default:
          sim.focus.el = 'alu.op.field';
          sim.alu.op = commands[sim.ir.cmd];
          break;
      }
      break;
    case 7:
      // JMZ instruction behaviour
      if (sim.ir.cmd == 'JMZ') {
        if (sim.acc == 0) {
          sim.focus.el = 'pc.input.input';
          sim.pc.val = +sim.ir.loc;
          sim.codeLine = +sim.ir.loc - 1;
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
        sim.focus.el = 'acc.field.field';
        break;
      }

      // aything but LOD instruction behaviour
      if (sim.ir.cmd != 'LOD') {
        sim.alu.e1 = sim.acc
      };

      // parse data portion (instruction register loc)
      // #n
      if (sim.ir.loc.indexOf('#') != -1) {
        sim.alu.e2 = sim.ir.loc.replace('#','');
      }
      // variable
      else if (sim.ir.loc.match(/T|X|Y|Z|W/)) {
        sim.focus.var = sim.ir.loc;
        sim.alu.e2 = parseInt(sim.variables[sim.ir.loc]) || 0;
        stats.variables_accesses++;
      }
      // memory cell
      else {
        sim.focus.cell = sim.ir.loc;
        sim.alu.e2 = parseInt(editor.doc.getLine(sim.ir.loc)) || 0;
        stats.cells_accesses++;
      }
      sim.focus.el = 'alu.p2.field';
      break;
    case 8:
      if (sim.ir.cmd != 'STO') {
        // execute operation
        switch (sim.alu.op) {
          case '=':
            sim.focus.el = 'acc.field';
            sim.acc = parseInt(sim.alu.e2) || 0;
            break;
          default:
            stats.alu_calculations++;
            sim.focus.el = 'acc.field.field';
            sim.acc = parseInt(
              eval("sim.acc" + sim.alu.op + "parseInt(sim.alu.e2)")
            );
            break;
        }
      }
      // STO instruction -> edit cell / variable
      else if (sim.ir.loc.match(/T|X|Y|Z|W/)) {
        sim.focus.var = sim.ir.loc;
        sim.variables[sim.ir.loc] = sim.acc;
        stats.variables_accesses++;
      }
      break;
  }
  
  return { sim, stats, status };
};