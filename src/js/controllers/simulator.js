'use strict';

module.exports = ['$scope', '$cookies', 'sim', 'log',
  function($scope, $cookies, sim, log) {
    // startup log messages (if allowed by the settings)
    if (($cookies.get('welcomeMsg') || 1) === 'true') {
      log('Von Neumann Machine Simulator', 'success', false);
      log('vnsimulator.altervista.org', '', false);
      log('github.com/lorenzoganni/vnmsim', 'step', false);
      log('', 'separator');
    }

    // function to add t variables
    $scope.addTvar = function(i) {
      sim.variables['T'+(i || ++sim.tVarCount)] = '';
    };
    // init default tVars
    for (var i = 1; i < +sim.tVarCount + 1; i++) $scope.addTvar(i);

    // functions for elements highlighting
    $scope.fEl = function(e) {
      return sim.focus.el == e;
    };
    $scope.fSt = function(n) {
      return sim.step == n;
    };
  }
];
