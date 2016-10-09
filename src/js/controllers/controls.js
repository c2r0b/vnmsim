'use strict';

var stats = require('../stats');

module.exports = ['$rootScope', '$scope', 'sim', 'run', 'log', 'codeMirror',
  function($rootScope, $scope, sim, run, log, codeMirror) {
    // init delay at 500ms
    $scope.delay = 500;
    // statistics
    angular.copy(stats, ($rootScope.stats = {}));
    // code compilation
    function compile() {
      var lines;
      if (lines = codeMirror.hasErrors()) {
        log.write('','separator');
        log.write('LOG_COMPILATION_FAILED', 'error');
        // log problematic lines numbers
        for(var i in lines) log.write('LOG_SYNTAX_ERROR', (+lines[i]));
        log.write('','separator');
        return false;
      }
      log.write('LOG_COMPILATION_SUCCEEDED', 'success');
      return true;
    }
    $scope.compile = compile;
    // run button pressed (play / step)
    $scope.run = function(status) {
      // reset statistics on new startup
      if (!sim.status && stats != $rootScope.stats)
        angular.copy(stats, $rootScope.stats);
      // check for input errors
      if (compile()) {
        // update status and startup the simulation
        sim.status = status;
        run.begin($scope.delay);
        log.write('LOG_RUNNING', ((status == 1) ? 'success' : 'step'));
      }
    };

    // 'pause' button pressed
    $scope.pause = function() {
      sim.status = 3;
      run.stop();
      log.write('LOG_PAUSED');
    };

    // 'stop' button pressed
    $scope.stop = function() {
      run.stop();
      log.write('LOG_STOPPED');
      run.clear();
      sim.status = sim.step = sim.pc.val = 0;
      log.write('LOG_RESET');
    };

    // watch for delay changes
    $scope.delayChanged = function() {
      if (run.isRunning()) {
        run.stop();
        run.begin($scope.delay);
      }
    };
  }
];
