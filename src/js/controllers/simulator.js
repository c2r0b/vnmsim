'use strict';

module.exports = ['$scope', 'sim', 'log', function($scope, sim, log) {
  // startup log messages
  log('Von Neumann Machine Simulator', 'success', false);
  log('vnsimulator.altervista.org', '', false);
  log('github.com/lorenzoganni/vnmsim', 'step', false);
  log('', 'separator');

  $scope.addTvar = function() {
    sim.variables['T'+(++sim.tVarCount)] = '';
  };
  // functions for elements highlighting
  $scope.fEl = function(e) {
    return sim.focus.el == e;
  };
  $scope.fSt = function(n) {
    return sim.step == n;
  };
}];
