'use strict';

module.exports = ['$rootScope', '$scope', '$cookies',
  function($rootScope, $scope, $cookies) {

    // function to call to change the language in use
    $scope.useLang = function(l) {
      $cookies.put('lang', ($scope.lang = $rootScope.selectedLang = l));
    };

    // startup with cookie language or browser lang or default lang
    $scope.useLang(
      $cookies.get('lang')
      || navigator.language.split('-')[0]
      || navigator.userLanguage.split('-')[0]
    );
  }
];
