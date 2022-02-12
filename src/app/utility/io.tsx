export const save = ({ sim, code, title, date }) => {
  sim.code = code;

  // construct output file
  let data = "data:text/json;charset=utf-8,";
  data += encodeURIComponent(JSON.stringify(sim));

  // get file name as user defined
  const fileName = title + "_" + date + ".json";

  // start download by performing click on #downloadProject
  const dlProj = document.createElement("a");
  dlProj.href = data;
  dlProj.download = fileName;
  document.body.appendChild(dlProj);
  dlProj.click();
};

export const readFile = (event, onSuccess, onError) => {
  const input = event.target.files[0];

  // file reader init
  var reader = new FileReader();
  reader.readAsText(input, "UTF-8");

  // read the file
  reader.onload = evt => {
    const file = evt.target.result;
    let obj = JSON.parse(file);

    // retrocompatibility
    if (input[0]?.name?.split(".")?.slice(-1)[0] == "vnsp") {
      obj = vnspToJson(file);
    }

    // check correct file type
    if (input.type != "application/json") {
      onError();
      return;
    }

    onSuccess(obj);
  }

  // on invalid file
  reader.onerror = () => {
    onError();
    return;
  }
};

// retrocompatibility with versions that used .vnsp files
export const vnspToJson = (file) => {
  // split input file lines
  file = file.split(/\n+/);

  // code for memory cells (removing NOP used as placeholders)
  const nop_cmds = new RegExp("NOP", "g");
  const code = file[5].split(",").join("\n").replace(nop_cmds, "");

  // X-Y-Z-W variables
  const variables = file[8].split(',');

  // T1-40 variables
  const tVal = file[11].split(',');
  tVal.pop();
  let tVariables = {};
  for (let v in tVal) {
    tVariables["T" + (parseInt(v) + 1)] =  parseInt(tVal[v]);
  }

  return {
    title: "Untitled",
    created: new Date().toISOString().slice(0, 10),
    code,
    codeLine: 0,
    step: 0,
    status: 0,
    alu: {
      e1: '',
      e2: '',
      op: ''
    },
    acc: 0,
    pc: {
      val: 0,
      step: 1,
    },
    ir: {
      cmd: '',
      loc: ''
    },
    focus: {
      el: "ir",
      cell: -1,
      var: -1
    },
    variables: {
      X: parseInt(variables[0]),
      Y: parseInt(variables[1]),
      Z: parseInt(variables[2]),
      W: parseInt(variables[3]),
      ...tVariables
    }
  };
};