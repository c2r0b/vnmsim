'use strict';

var angular = require('angular');

// angular app init
var app = angular.module('vnmsim', [ require('angular-cookies') ]);

app.run(['$rootScope', function($rootScope) {
  // languages
  $rootScope.translations = require('./locales');
  $rootScope.selectedLang = 'en';
  // function to translate a string
  function translate(t) {
    return $rootScope.translations[$rootScope.selectedLang].text[t];
  };
  $rootScope.translate = translate;

  // warning on page leave
  window.addEventListener('beforeunload', function (e) {
    return (e || window.event).returnValue = translate('WARNING_UNSAVED');
  });
}]);

// services
app.factory('codeMirror', require('./services/editor'));
app.factory('log', require('./services/log'));
app.factory('sim', require('./services/sim'));
app.factory('run', require('./services/run'));

// controllers
app.controller('ioCtrl', require('./controllers/io'));
app.controller('settingsCtrl', require('./controllers/settings'));
app.controller('controlsCtrl', require('./controllers/controls'));
app.controller('simulatorCtrl', require('./controllers/simulator'));
app.controller('samplesCtrl', require('./controllers/samples'));

// directives
app.directive('translate', require('./directives/translate'));

// fullpage input files drop zone
require('./dropzone');
