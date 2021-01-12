import { default as stats } from '../stats';

export default class ControlsController {
  /*@ngInject*/

  constructor($rootScope, sim, run, log, editor) {
    // init delay at 500ms
    this.delay = 500;

    // statistics
    this.resetStats = () => {
      angular.copy(stats, ($rootScope.stats = {}));
    };
    this.resetStats();

    // link simulator status
    this.sim = sim;
    this.run = run;
    this.editor = editor;
    this.log = log;
  }

  // code compilation
  compile() {
    var lines;
    if (lines = this.editor.hasErrors()) {
      this.log.write('','separator');
      this.log.write('LOG_COMPILATION_FAILED', 'error');

      // log problematic lines numbers
      for(let l of lines) this.log.write('LOG_SYNTAX_ERROR', +l);

      this.log.write('','separator');
      return false;
    }
    this.log.write('LOG_COMPILATION_SUCCEEDED', 'success');
    return true;
  }

  // run button pressed (play / step)
  start(status) {
    // reset statistics on new startup
    if (!this.sim.status) this.resetStats();

    // check for input errors
    if (this.compile()) {
      // update status and startup the simulation
      this.sim.status = status;
      this.run.begin(this.delay);
      this.log.write('LOG_RUNNING', ((status == 1) ? 'success' : 'step'));
    }
  }

  // 'pause' button pressed
  pause() {
    this.sim.status = 3;
    this.run.stop();
    this.log.write('LOG_PAUSED');
  }

  // 'stop' button pressed
  stop() {
    this.run.stop();
    this.log.write('LOG_STOPPED');
    this.run.clear();
    this.sim.status = this.sim.step = this.sim.pc.val = 0;
    this.log.write('LOG_RESET');
  }

  // watch for delay changes
  delayChanged() {
    if (this.run.isRunning()) {
      this.run.stop();
      this.run.begin(this.delay);
    }
  }
}
