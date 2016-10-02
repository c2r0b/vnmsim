'use strict';

module.exports = ['$rootScope', '$scope', '$http', 'codeMirror', 'log', 'sim',
  function($rootScope, $scope, $http, codeMirror, log, sim) {
    // get samples file names
    $http({
      method: 'GET',
      url: 'samples/list.txt'
    })
    .success(function(response) {
      $scope.samples = response.split('\n');
      $scope.samples.pop();
    });

    // read content of selected sample
    $scope.open = function(name) {
      $http({
        method: 'GET',
        url: 'samples/' + name + '.json'
      })
      .success(function(obj) {
        // set memory cells code and then destroy that property
        codeMirror.doc.setValue(obj.code);
        delete obj.code;
        // set simulator status object
        if (sim != obj) angular.copy(obj, sim);
        log('LOG_OPENED');
        // close panel
        $rootScope.panel = '';
      });
    };
  }
];
