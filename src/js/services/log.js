'use strict';

module.exports = ['$rootScope', function($rootScope) {
  var log = document.getElementById('log');

  return function (toTranslate,  mode) {
    // special modes management
    var before = '', after = '', style = '';
    switch(mode) {
      case 'error':
        before = '[!] ';
        after = ' [!]';
        style = 'error';
        break;
      case 'success':
        style = 'success';
        break;
      case 'step':
        style = 'step';
        break;
      case 'separator':
        before = '--------------------------------';
        break;
      case undefined:
        break;
      default:
        after = ' ' + mode;
    }
    // update log from scope
    log.innerHTML +=
      '<span class="' + style + '">' + before +
      ($rootScope.translations[$rootScope.selectedLang].text[toTranslate] || '')
      + after + '</span>';
    // scroll to the bottom of the log area
    log.scrollTop = log.scrollHeight;
  };
}];
