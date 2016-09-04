'use strict';

module.exports = ['$scope', '$translate', '$cookies',
  function($scope, $translate, $cookies) {
    $scope.lang = {
      languages: require('../locales'),
      // function to call to change the language in use
      use: function(l) {
        for(var i in this.languages) {
          // if the selected language exsists then use it
          if (this.languages[i].id == l) {
            $translate.use(l);
            $cookies.put('lang',l);
            return;
          }
        }
        $translate.use(this.languages[0].id)
      }
    };
    // startup with cookie language or browser lang or default lang
    $scope.lang.use(
      $cookies.get('lang')
      || navigator.language
      || navigator.userLanguage
    );
  }
];
