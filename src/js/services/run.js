'use strict';

module.exports = ['$interval', 'codeMirror', 'sim', 'log',
  function($interval, codeMirror, sim, log) {
    // last simulator step ID
    const lastStep = 9;
    return {
      // promise for running loop
      runLoop: '',
      // stop the execution
      stop: function() {
        $interval.cancel(this.runLoop);
        // re-enable codeMirror editor
        codeMirror.editor.setOption('readOnly',false);
      },
      // clear machine values
      clear: function() {
        // clear elements
        sim.alu.e1 = sim.alu.e2 = sim.alu.op = sim.ir.cmd = sim.ir.loc = '';
        sim.focus.el = sim.focus.var = '';
        // unfocus active codeMirror line
        codeMirror.cell.unfocus();
      },
      // step executor
      execute: function() {
        switch(sim.step) {
          case 1:
            // focus and get next line from codeMirror
            codeMirror.cell.focus(sim.pc.val);
            var line = codeMirror.doc.getLine(sim.pc.val);
            sim.line = (
              (!line || line.match(/^((\d+)|(\/\/[\s\S]*))$/i))
              ? 'NOP'
              : line
            );
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
                break;
              case 'JMZ':
                sim.focus.el = 'acc';
                break;
              default:
                sim.focus.el = 'aluOp';
                sim.alu.op = require('../cmds')[sim.ir.cmd];
                break;
            }
            break;
          case 7:
            // JMZ instruction behaviour
            if (sim.ir.cmd == 'JMZ') {
              if (sim.acc == 0) {
                sim.focus.el = 'pc';
                sim.pc.val = +sim.ir.loc;
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
            }
            else { // memory cell
              codeMirror.cell.focus(sim.ir.loc);
              sim.alu.e2 = parseInt(codeMirror.doc.getLine(sim.ir.loc)) || 0;
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
              }
              else { // memory cell
                // focus that cell
                codeMirror.cell.focus(sim.ir.loc);
                // append to cell content
                var line = sim.ir.loc,
                    start = { line: line, ch: 0 },
                    end = { line: line, ch: sim.line.length };
                codeMirror.doc.replaceRange(sim.acc.toString(), start, end);
              }
            }
            break;
        }
      },
      // startup the simulation
      begin: function(delay) {
        // disable codeMirror editor
        codeMirror.editor.setOption('readOnly',true);
        // run the simulator loop
        var parent = this;
        this.runLoop = $interval(
          function() {
            sim.focus.var = sim.focus.el = '';
            // unfocus active codeMirror line
            codeMirror.cell.unfocus();
            // next step, if last step then
            if (++sim.step > lastStep) {
              // prepare for next loop
              parent.clear();
              sim.step = 0;
              // if single cicle option then stop the simulation
              if (sim.status == 2) {
                parent.stop();
                sim.status = 0;
                log("Simulation stopped");
                return;
              }
            }
            // execute next simulation step
            parent.execute();
          },
          delay
        );
      },
      isRunning: function() {
        return sim.status == 1 || sim.status == 2;
      }
    };
  }
];
