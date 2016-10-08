'use strict';

// I/O functions to be used in mainCtrl
module.exports = ['$rootScope', '$scope', 'codeMirror', 'log', 'sim',
  function($rootScope, $scope, codeMirror, log, sim){

    // function to display input dialog
    $scope.open = function() {
      document.getElementById('openProject').click();
    };

    // read file content
    $scope.read = function(files) {
      // file reader init
      var reader = new FileReader();
      reader.readAsText(files[0], "UTF-8");

      // on reader error
      function errorCallBack() {
        log('LOG_OPENING_FAILURE', 'error');
      }

      // read the file
      reader.onload = function(evt) {
        var file = evt.target.result,
            obj = JSON.parse(file);
        // prevent data loss
        if (confirm($rootScope.translate('WARNING_UNSAVED'))) {
          // if this is a json file from VNMSIM v >= 3.06
          if (files[0].type == "application/json") {
            // set memory cells code and then destroy that property
            codeMirror.doc.setValue(obj.code);
            delete obj.code;
            // set simulator status object
            if (sim != obj) {
              angular.copy(obj, sim);
            }
          }
          // retrocompatibility for older versions / Zanichelli edition
          else if (files[0].name.split('.').slice(-1)[0] == 'vnsp') {
            // split input file lines
            file = file.split(/\n+/);
            // code for memory cells (removing NOP used as placeholders)
            var nop_cmds = new RegExp('NOP','g');
            codeMirror.doc.setValue(
              file[5].split(',').join('\n').replace(nop_cmds,'')
            );

            // X-Y-Z-W variables
            var val = file[8].split(',');
            sim.variables = {
              X: parseInt(val[0]),
              Y: parseInt(val[1]),
              Z: parseInt(val[2]),
              W: parseInt(val[3])
            };

            // T1-40 variables
            val = file[11].split(',');
            val.pop();
            for (var v in val)
              sim.variables['T'+(parseInt(v)+1)] = parseInt(val[v]);
          }
          // unreadable file type
          else {
            errorCallBack();
            return;
          }
          // force sim values update
          $rootScope.$apply();
          log('LOG_OPENED');
        }
      }
      // invalid file
      reader.onerror = function (evt) {
        errorCallBack();
      }
    };

    // save current machine status and memory content in a downloadble file
    $scope.save = function() {
      var obj = sim;
      obj.code = codeMirror.doc.getValue();

      // construct output file
      var data = "data:text/json;charset=utf-8,";
      data += encodeURIComponent(JSON.stringify(obj));

      // start download by performing click on #downloadProject
      var dlProj = document.getElementById('downloadProject');
      dlProj.setAttribute("href", data);
      dlProj.setAttribute("download", Date().split(' ').join('_') + ".json");
      dlProj.click();
      log('LOG_SAVED');
    };

  }
];
