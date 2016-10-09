'use strict';

module.exports = ['$rootScope', '$scope', '$http', 'codeMirror', 'log', 'sim',
  function($rootScope, $scope, $http, codeMirror, log, sim) {

    // get samples file names
    $http.get('samples/list.txt').then(function(response) {
      $scope.samples = response.data.split('\n');
      $scope.samples.pop();
    });

    // read content of selected sample
    $scope.open = function(name) {
      $http.get('samples/' + name + '.json').then(function(response) {
        if (confirm($rootScope.translate('WARNING_UNSAVED'))) {
          var obj = response.data;
          // set memory cells code and then destroy that property
          codeMirror.doc.setValue(obj.code);
          delete obj.code;
          // set simulator status object
          if (sim != obj) angular.copy(obj, sim);
          log.write('LOG_OPENED');
          // close panel
          $rootScope.panel = '';
        }
      });
    };
  }
];
