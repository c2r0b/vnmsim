export default class SimulatorController {
  /*@ngInject*/

  constructor($rootScope, $cookies, sim, log) {
    // init default tVars
    for (var i = 1; i < +sim.tVarCount + 1; i++)
      this.addTvar(i);

    // link simulator status
    this.sim = sim;
  }

  // function to add t variables
  addTvar(i) {
    this.sim.variables['T'+(i || ++this.sim.tVarCount)] = '';
  }

  // functions for elements highlighting
  fEl(e) {
    return this.sim.focus.el == e;
  }
  fSt(n) {
    return this.sim.step == n;
  }
}
