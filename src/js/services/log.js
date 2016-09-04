'use strict';

module.exports = ['$filter', function($filter) {
  var logTextarea = document.getElementById('log');

  return function (toTranslate,  mode) {
    // special modes management
    var before = '', after = '';
    switch(mode) {
      case 'error':
        before = '[!] ';
        after = ' [!]';
        break;
      case 'separator':
        before = '-----------------------------------------';
        break;
      case undefined:
        break;
      default:
        after = ' ' + mode;
    }
    // update textarea from scope
    logTextarea.value += before + $filter('translate')(toTranslate) + after + '\n';
    // scroll to the bottom of the textarea
    logTextarea.scrollTop = logTextarea.scrollHeight;
  };
}];
