export default class MainController {
  /*@ngInject*/

  constructor($cookies, log) {
    // startup log messages (if allowed by the settings)
    if (($cookies.get('welcomeMsg') || 'true') === 'true') {
      log.write('Von Neumann Machine Simulator', 'success', false);
      log.write('vnsimulator.altervista.org', '', false);
      log.write('github.com/lorenzoganni/vnmsim', 'step', false);
      log.write('', 'separator');
    }
    this.log = log;
  }

  // clear log button
  clearLog() {
    this.log.clear();
  }
}
