export const lastStep = 9;

const commands = {
  LOD: '=',
  STO: '=',
  ADD: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/'
};

export const execute = ({ sim, stats, status, line, editor }) => {
  // get line, interpret comments as NOP operations
  sim.line = (
    (!line || line.match(/^((\d+)|(\/\/[\s\S]*))$/i))
    ? 'NOP'
    : line
  );

  // pardon inline comments
  sim.line = sim.line.split("//")[0];

  // execute code related to the current simulator step
  switch(sim.step) {
    case 1:
      sim.focus.cell = -1;
      sim.focus.var = -1;
      stats.executed_step++;

      // stop the simulator if the PC has a negative value
      if (sim.pc.val < 0) {
        sim.pc.val = 0;
        sim.step = lastStep;
        status = 4;
      }
      break;
    case 2:
      sim.focus.cell = sim.pc.val;
      sim.focus.el = 'ir.input';
      sim.ir.cmd = sim.line.substr(0, 3).toUpperCase();
      break;
    case 3:
      sim.focus.cell = sim.pc.val;
      sim.focus.el = 'ir.input';
      sim.ir.loc = sim.line.substr(4).toUpperCase().trim();
      break;
    case 4:
      sim.focus.cell = -1;
      sim.focus.el = 'pc.increment';
      break;
    case 5:
      sim.focus.el = 'pc.input';
      // increment program counter
      sim.pc.val = +sim.pc.val + sim.pc.step;
      break;
    case 6:
      sim.focus.el = 'ir.decoder';
      break;
    case 7:
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
          sim.focus.el = 'pc.input';
          sim.pc.val = +sim.ir.loc;
          sim.step = lastStep;
          sim.codeLine = +sim.ir.loc - 1;
          stats.performed_jmp++;
          break;
        case 'JMZ':
          sim.focus.el = 'acc.field';
          break;
        default:
          sim.focus.el = 'alu.op';
          sim.alu.op = commands[sim.ir.cmd] || "=";
          break;
      }
      break;
    case 8:
      // JMZ instruction behaviour
      if (sim.ir.cmd == 'JMZ') {
        if (sim.acc == 0) {
          sim.focus.el = 'pc.input';
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
        sim.focus.el = 'acc.field';
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
        stats.variable_access++;
      }
      // memory cell
      else {
        sim.focus.cell = sim.ir.loc;
        sim.alu.e2 = parseInt(editor.doc.getLine(sim.ir.loc)) || 0;
        stats.cell_access++;
      }
      sim.focus.el = 'alu.p2';
      break;
    case 9:
      if (sim.ir.cmd != 'STO') {
        // execute operation
        switch (sim.alu.op) {
          case '=':
            sim.focus.el = 'acc.field';
            sim.acc = parseInt(sim.alu.e2) || 0;
            break;
          default:
            stats.alu_calculation++;
            sim.focus.el = 'acc.field';

            // execute requested operation
            const data = parseInt(sim.alu.e2);
            switch (sim.alu.op) {
              case '=':
                sim.acc = data;
                break;
              case '+':
                sim.acc += data;
                break;
              case '-':
                sim.acc -= data;
                break;
              case '*':
                sim.acc *= data;
                break;
              case '/':
                sim.acc /= data;
                break;
            }
            break;
        }
      }
      // STO instruction -> edit variable
      else if (sim.ir.loc.match(/T|X|Y|Z|W/)) {
        sim.focus.var = sim.ir.loc;
        sim.variables[sim.ir.loc] = sim.acc;
        stats.variable_access++;
      }
      // STO instruction -> edit cell
      else {
        sim.focus.cell = sim.ir.loc;
        editor.doc.replaceRange(
          sim.acc.toString(),
          {
            line: sim.ir.loc,
            ch: 0
          }
        );
      }
      break;
  }
  
  return { sim, stats, status };
};
