'use strict';

module.exports = ['$rootScope', function($rootScope) {
  var log = document.getElementById('log');

  return function (text,  mode, mustTranslate) {
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
        before = '<hr />';
        break;
      case undefined:
        break;
      default:
        after = ' ' + mode;
    }
    // update log from scope
    log.innerHTML +=
      '<span class="' + style + '">' + before +
      (
        (mustTranslate)
        ? ($rootScope.translate(text) || '')
        : text
      )
      + after + '</span>';
    // scroll to the bottom of the log area
    log.scrollTop = log.scrollHeight;
  };
}];
