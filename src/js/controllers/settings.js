'use strict';

module.exports = ['$rootScope', '$scope', '$cookies', 'sim',
  function($rootScope, $scope, $cookies, sim) {

    // function to call to change the language in use
    function useLang() {
      $cookies.put('lang', $rootScope.selectedLang = $scope.lang);
    }

    // apply global settings
    $rootScope.simLables = (($cookies.get('simLables') || 'true') === 'true')
    $rootScope.logStats = (($cookies.get('logStats') || 'true') === 'true')

    // get settings values
    $scope.pc_step = sim.pc.step;
    $scope.tVarCount = sim.tVarCount;
    $scope.simLables = $rootScope.simLables;
    $scope.logStats = $rootScope.logStats;
    $scope.welcomeMsg = (($cookies.get('welcomeMsg') || 'true') === 'true');

    // startup with cookie language or browser lang or default lang
    $scope.lang = $cookies.get('lang')
                  || navigator.language.split('-')[0]
                  || navigator.userLanguage.split('-')[0];
    useLang();

    // function called on 'APPLY' button mouse click in the settings panel
    $scope.save = function() {
      // language preference
      useLang();
      // save cookies
      $cookies.put('pc_step', $scope.pc_step);
      $cookies.put('tVarCount', $scope.tVarCount);
      $cookies.put('welcomeMsg', $scope.welcomeMsg);
      $cookies.put('simLables', $rootScope.simLables = $scope.simLables);
      $cookies.put('logStats', $rootScope.logStats = $scope.logStats);
      // close settings panel
      $rootScope.panel = '';
    };
  }
];
