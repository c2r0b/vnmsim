'use strict';

module.exports = ['$rootScope', '$scope', '$cookies',
  function($rootScope, $scope, $cookies) {
    // function to call to change the language in use
    $scope.useLang = function(l) {
      for(var i in $rootScope.translations) {
        // if the selected language exsists then use it
        if (i == l) {
          $cookies.put('lang', ($rootScope.selectedLang = l));
          return;
        }
      }
      // if the choosen lang ID is not valid, use default language (english)
      $rootScope.selectedLang = 'en';
    };
    // startup with cookie language or browser lang or default lang
    $scope.useLang(
      $cookies.get('lang')
      || navigator.language.split('-')[0]
      || navigator.userLanguage.split('-')[0]
    );
  }
];
