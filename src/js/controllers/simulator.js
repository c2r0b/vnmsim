'use strict';

module.exports = ['$scope', 'sim', function($scope, sim) {
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
