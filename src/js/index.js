var angular = require('angular');
var ngCookies = require('angular-cookies');

// controllers
import MainController from './controllers/main';
import IoController from './controllers/io';
import SettingsController from './controllers/settings';
import ControlsController from './controllers/controls';
import SimulatorController from './controllers/simulator';
import SamplesController from './controllers/samples';

// services
import EditorService from './services/editor';
import LogService from './services/log';
import SimService from './services/sim';
import RunService from './services/run';

// directives
import TranslateDirective from './directives/translate';

import { default as Run } from './run';

// app init
angular.module('vnmsim', [ 'ngCookies' ])

  .controller('MainController', MainController)
  .controller('IoController', IoController)
  .controller('SettingsController', SettingsController)
  .controller('ControlsController', ControlsController)
  .controller('SimulatorController', SimulatorController)
  .controller('SamplesController', SamplesController)

  .service('editor', EditorService)
  .service('log', LogService)
  .service('sim', SimService)
  .service('run', RunService)

  .directive('translate', TranslateDirective)
  .run(Run);

// drag & drop
require('./dropzone.js');
