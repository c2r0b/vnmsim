import codeMirror from 'codemirror';

// addons
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/display/autorefresh.js');

// syntax highlighting custom mode
codeMirror.defineMode('vnm', () => {
  return {
    token: (stream, state) => {

      if (stream.match(/^(lod|add|sub|mul|div|sto|jmp|jmz|nop|hlt)/i))
        return 'cmd';

      if (stream.match(/\s#-?\d+(\s*)$/))
        return 'num';

      if (stream.match(/\s[1-9]\d*(\s*)$/))
        return 'cell';

      if (stream.match(/\s(x|y|z|w|(t[1-9]\d*))(\s*)$/i))
        return 'val';

      if (stream.match(/^\/\/[\s\S]*$/))
        return 'comment';

      stream.next();
      return null;
    }
  };
});

// init editor
var textArea = codeMirror.fromTextArea(
  document.getElementById('editor'),
  {
    mode: 'vnm',
    styleActiveLine: true,
    autoRefresh: true,
    firstLineNumber: 0,
    gutters: ["CodeMirror-linenumbers", "gutter"],
    lineNumbers: true
  }
);

// export editor object
export default class EditorService {
  constructor() {
    this.textArea = textArea;
    this.doc = textArea.getDoc();

    this.line = 0;
  }

  // memory cells highlighting
  // focus cell
  focusCell(line) {
    this.textArea.getDoc().addLineClass(
      (this.line = +line),
      'background',
      'focus'
    );
  }
  // remove previous focus
  unfocusCell() {
    this.textArea.getDoc().removeLineClass(
      this.line,
      'background'
    );
  }

  // syntax validator
  validate(t) {
    var lastDocLine = this.doc.lineCount(), line;
    return (
      // cmds with cell number parameter
      (
        t.match(/^(lod|add|sub|mul|div|sto)\s\d+\s*$/i)
        && (this.line = +t.split(' ')[1]) < lastDocLine
        && this.doc.getLine(this.line).match(/^\d*$/)
      )
      // jumps
      || t.match(/^(jmp|jmz)\s\d+\s*$/i) && +t.split(' ')[1] < lastDocLine
      // cmds with variable
      || t.match(/^(lod|add|sub|mul|div|sto)\s(x|y|z|w|(t([1-9]\d*)))\s*$/i)
      // cmds with numeric value
      || t.match(/^(lod|add|sub|mul|div)\s#-?\d+\s*$/i)
      // NOP and HLT with no parameters
      || t.match(/^nop|hlt$/i)
      // numeric value or none
      || t.match(/^\d*$/i)
      // comment lines
      || t.match(/^\/\/[\s\S]*$/)
    );
  }

  // error checking
  hasErrors() {
    // remove previous generated markers
    this.textArea.clearGutter('gutter');

    // fetch code for errors
    var code = this.doc.getValue().split('\n'), lines = [];

    for (var i in code) {
      if (!this.validate(code[i])) {

        // generate an error marker
        var marker = document.createElement('div');
        marker.style.color = 'red';
        marker.innerHTML = '●';

        // apply gutter marker to the line with the syntax error
        this.textArea.setGutterMarker(+i, 'gutter', marker);

        // add line to error lines array to be returned
        lines.push(i);
      }
    }
    return (lines.length > 0) ? lines : false;
  }
}
