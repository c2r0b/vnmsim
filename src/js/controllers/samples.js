import { default as samples } from '../samples';

export default class SamplesController {
  /*@ngInject*/

  constructor($rootScope, $http, editor, log, sim) {
    this.samples = samples();
    this.$http = $http;
    this.editor = editor;
    this.log = log;
    this.sim = sim;
    this.$rootScope = $rootScope;
  }

  // read content of selected sample
  open(name) {
    this.$http.get('samples/' + name + '.json').then(response => {

      if (confirm(this.$rootScope.translate('WARNING_UNSAVED'))) {
        var obj = response.data;

        // set memory cells code and then destroy that property
        this.editor.doc.setValue(obj.code);
        delete obj.code;

        // set simulator status object
        if (this.sim != obj) angular.copy(obj, this.sim);
        this.log.write('LOG_OPENED');

        // close panel
        this.$rootScope.panel = '';
      }
    });
  }
}
