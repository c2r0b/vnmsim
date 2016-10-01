'use strict';

var angular = require('angular');

// angular app init
var app = angular.module('vnmsim', [ require('angular-cookies') ]);

// languages
app.run(['$rootScope', function($rootScope) {
  $rootScope.translations = require('./locales');
  $rootScope.selectedLang = 'en';
}]);

// services
app.factory('codeMirror', require('./services/editor'));
app.factory('log', require('./services/log'));
app.factory('sim', require('./services/sim'));
app.factory('run', require('./services/run'));

// controllers
app.controller('ioCtrl', require('./controllers/io'));
app.controller('langCtrl', require('./controllers/lang'));
app.controller('controlsCtrl', require('./controllers/controls'));
app.controller('simulatorCtrl', require('./controllers/simulator'));

// directives
app.directive('translate', require('./directives/translate'));

// fullpage input files drop zone
require('./dropzone');
