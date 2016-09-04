'use strict';

var angular = require('angular');

// angular and components
require('angular-translate');

// angular app init
var app = angular.module(
  'vnmsim',
  [
    'pascalprecht.translate',
    require('angular-cookies')
  ]
);

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

// translations
require('../temp/translations');

// fullpage input files drop zone
require('./dropzone');
