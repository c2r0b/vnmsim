// I/O functions to be used in mainCtrl
export default class IoController {
  /*@ngInject*/

  constructor($rootScope, editor, log, sim) {
    this.sim = sim;
    this.log = log;
    this.editor = editor;
    this.$rootScope = $rootScope;

    // open file on input[file]#openProject change
    document.getElementById('openProject').addEventListener('change', evt => {
      this.read(evt.srcElement.files);
    });
  }

  // function to display input dialog
  open() {
    document.getElementById('openProject').click();
  }

  // read file content
  read(files) {

    // file reader init
    var reader = new FileReader();
    reader.readAsText(files[0], 'UTF-8');

    // on reader error
    var errorCallBack = () => this.log.write('LOG_OPENING_FAILURE', 'error');

    // read the file
    reader.onload = evt => {
      var file = evt.target.result,
          obj = JSON.parse(file);


      // prevent data loss
      if (confirm(this.$rootScope.translate('WARNING_UNSAVED'))) {

        // if this is a json file from VNMSIM v >= 2016.09.04
        if (files[0].type == "application/json") {
          // set memory cells code and then destroy that property
          this.editor.doc.setValue(obj.code);
          delete obj.code;
          // set simulator status object
          if (this.sim != obj)
            angular.copy(obj, this.sim);
        }
        // retrocompatibility for older versions / Zanichelli edition
        else if (files[0].name.split('.').slice(-1)[0] == 'vnsp') {
          // split input file lines
          file = file.split(/\n+/);

          // code for memory cells (removing NOP used as placeholders)
          var nop_cmds = new RegExp('NOP','g');
          this.editor.doc.setValue(
            file[5].split(',').join('\n').replace(nop_cmds,'')
          );

          // X-Y-Z-W variables
          var val = file[8].split(',');
          this.sim.variables = {
            X: parseInt(val[0]),
            Y: parseInt(val[1]),
            Z: parseInt(val[2]),
            W: parseInt(val[3])
          };

          // T1-40 variables
          val = file[11].split(',');
          val.pop();
          for (var v in val)
            this.sim.variables['T' + (parseInt(v) + 1)] = parseInt(val[v]);
        }
        // unreadable file type
        else {
          errorCallBack();
          return;
        }
        // force sim values update
        this.$rootScope.$apply();
        this.log.write('LOG_OPENED');
      }
    }
    // invalid file
    reader.onerror = evt => errorCallBack();
  }

  // save current machine status and memory content in a downloadble file
  save() {
    var obj = this.sim;
    obj.code = this.editor.doc.getValue();

    // construct output file
    var data = 'data:text/json;charset=utf-8,';
    data += encodeURIComponent(JSON.stringify(obj));

    // start download by performing click on #downloadProject
    var dlProj = document.getElementById('downloadProject');
    dlProj.setAttribute('href', data);
    dlProj.setAttribute('download', Date().split(' ').join('_') + '.json');
    dlProj.click();
    this.log.write('LOG_SAVED');
  }
}
