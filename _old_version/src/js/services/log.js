export default class LogService {
	/*@ngInject*/

  constructor($rootScope) {
    this.element = document.getElementById('log');

    this.translate = (t) => $rootScope.translate(t);
  }

  clear() {
    this.element.innerHTML = '';
  }

  write(text,  mode, mustTranslate) {
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
    this.element.innerHTML +=
      '<span class="' + style + '">' + before +
      (
        (mustTranslate === undefined || mustTranslate)
        ? (this.translate(text) || '')
        : text
      )
      + after + '</span>';

    // scroll to the bottom of the log area
    this.element.scrollTop = this.element.scrollHeight;
  }
}
