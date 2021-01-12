import { default as cmds } from '../cmds';

export default class RunService {
  /*@ngInject*/

  constructor($rootScope, $interval, editor, sim, log) {
    // last simulator step ID
    this.lastStep = 9;

    this.runLoop = '';
    this.sim = sim;
    this.editor = editor;
    this.$interval = $interval;
    this.log = log;
    this.$rootScope = $rootScope;
  }

  // stop the execution
  stop() {
    this.$interval.cancel(this.runLoop);
    // re-enable codeMirror editor
    this.editor.textArea.setOption('readOnly', false);
  }

  // clear machine values
  clear() {
    // clear elements
    this.sim.alu.e1 = this.sim.alu.e2 = this.sim.alu.op = this.sim.ir.cmd = this.sim.ir.loc = '';
    this.sim.focus.el = this.sim.focus.var = '';
    // unfocus active codeMirror line
    this.editor.unfocusCell();
  }

  // step executor
  execute() {
    // statistics object shortcut
    var stats = this.$rootScope.stats;

    // execute code related to the current simulator step
    switch(this.sim.step) {
      case 1:
        stats.executed_steps++;

        // focus and get next line from codeMirror
        this.editor.focusCell(this.sim.pc.val);

        var line = this.editor.doc.getLine(this.sim.pc.val);

        this.sim.line = (
          (!line || line.match(/^((\d+)|(\/\/[\s\S]*))$/i))
          ? 'NOP'
          : line
        );

        // stop the simulator if the PC has a negative value
        if (this.sim.pc.val < 0) {
          this.sim.pc.val = 0;
          this.sim.step = this.lastStep;
          this.sim.status = 2;
        }
        break;
      case 2:
        // get instruction inside IR first part
        this.sim.ir.cmd = this.sim.line.substr(0, 3).toUpperCase();
        break;
      case 3:
        // get value inside IR second part
        this.sim.ir.loc = this.sim.line.substr(4).toUpperCase();
        break;
      case 4:
        // increment program counter
        this.sim.pc.val = +this.sim.pc.val + this.sim.pc.step;
        break;
      case 6:
        // get correct alu operation
        switch (this.sim.ir.cmd) {
          case 'NOP':
            this.sim.step = this.lastStep;
            this.sim.focus.el = '';
            break;
          case 'HLT':
            this.sim.step = this.lastStep;
            this.sim.status = 2;
            break;
          case 'JMP':
            this.sim.focus.el = 'pc';
            this.sim.pc.val = +this.sim.ir.loc;
            this.sim.step = this.lastStep;
            stats.performed_jmp++;
            break;
          case 'JMZ':
            this.sim.focus.el = 'acc';
            break;
          default:
            this.sim.focus.el = 'aluOp';
            this.sim.alu.op = cmds[this.sim.ir.cmd];
            break;
        }
        break;
      case 7:
        // JMZ instruction behaviour
        if (this.sim.ir.cmd == 'JMZ') {
          if (this.sim.acc == 0) {
            this.sim.focus.el = 'pc';
            this.sim.pc.val = +this.sim.ir.loc;
            stats.performed_jmz++;
          }
          else {
            this.sim.focus.el = '';
          }
          this.sim.step = this.lastStep;
          break;
        }

        // STO instruction behaviour
        if (this.sim.ir.cmd == 'STO') {
          this.sim.focus.el = 'acc';
          break;
        }

        // aything but LOD instruction behaviour
        if (this.sim.ir.cmd != 'LOD') this.sim.alu.e1 = this.sim.acc;

        // parse data portion (instruction register loc)
        if (this.sim.ir.loc.indexOf('#') != -1) { // #n
          this.sim.alu.e2 = this.sim.ir.loc.replace('#','');
        }
        else if (this.sim.ir.loc.match(/T|X|Y|Z|W/)) { // variable
          this.sim.focus.var = this.sim.ir.loc;
          this.sim.alu.e2 = parseInt(this.sim.variables[this.sim.ir.loc]) || 0;
          stats.variables_accesses++;
        }
        else { // memory cell
          this.editor.focusCell(this.sim.ir.loc);
          this.sim.alu.e2 = parseInt(this.editor.doc.getLine(this.sim.ir.loc)) || 0;
          stats.cells_accesses++;
        }
        this.sim.focus.el = 'aluE2';
        break;
      case 8:
        if (this.sim.ir.cmd != 'STO') {

          // execute operation
          switch (this.sim.alu.op) {
            case '=':
              this.sim.acc = parseInt(this.sim.alu.e2) || 0;
              break;
            default:
              stats.alu_calculations++;
              this.sim.acc = parseInt(
                eval("this.sim.acc" + this.sim.alu.op + "parseInt(this.sim.alu.e2)")
              );
              break;
<<<<<<< HEAD
          }
          this.sim.focus.el = 'acc';
=======
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
              codeMirror.cell.focus(sim.ir.loc);
              sim.alu.e2 = parseInt(codeMirror.doc.getLine(sim.ir.loc)) || 0;
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
                    eval("sim.acc" + sim.alu.op + "parseInt(sim.alu.e2)")
                  );
                  break;
              }
              sim.focus.el = 'acc';
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
                codeMirror.cell.focus(sim.ir.loc);
                // append to cell content
                var line = sim.ir.loc,
                    start = { line: line, ch: 0 },
                    end = { line: line, ch: codeMirror.doc.getLine(sim.ir.loc).length };
                codeMirror.doc.replaceRange(sim.acc.toString(), start, end);
              }
            }
            break;
>>>>>>> a75b7157a2d2315d8858fb213886a5ca9c2da1df
        }
        // STO instruction -> edit cell / variable
        else {
          if (this.sim.ir.loc.match(/T|X|Y|Z|W/)) { // variable
            this.sim.focus.var = this.sim.ir.loc;
            this.sim.variables[this.sim.ir.loc] = this.sim.acc;
            stats.variables_accesses++;
          }
          else { // memory cell
            stats.cells_accesses++;

            // focus that cell
            this.editor.focusCell(this.sim.ir.loc);

            // append to cell content
            var line = this.sim.ir.loc,
                start = { line: line, ch: 0 },
                end = { line: line, ch: codeMirror.doc.getLine(sim.ir.loc).length };
            this.editor.doc.replaceRange(this.sim.acc.toString(), start, end);
          }
        }
        break;
    }
  }

  // startup the simulation
  begin(delay) {
    // disable codeMirror editor
    this.editor.textArea.setOption('readOnly',true);
    // run the simulator loop
    var parent = this;
    this.runLoop = this.$interval(
      () => {
        parent.sim.focus.var = parent.sim.focus.el = '';

        // unfocus active codeMirror line
        parent.editor.unfocusCell();

        // next step, if last step then
        if (++parent.sim.step > parent.lastStep) {

          // prepare for next loop
          parent.clear();
          parent.sim.step = 0;

          // if single cicle option then stop the simulation
          if (parent.sim.status == 2) {
            parent.stop();
            parent.sim.status = 0;
            parent.log.write("Simulation stopped");
            return;
          }
        }
        // execute next simulation step
        parent.execute();
      },
      delay
    );
  }

  isRunning() {
    return this.sim.status == 1 || this.sim.status == 2;
  }
}
