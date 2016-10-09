'use strict';

module.exports = ['$scope', '$cookies', 'sim', 'log',
  function($scope, $cookies, sim, log) {
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
