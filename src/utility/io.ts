import { SimulatorState } from '../types/simulatorState'
import { open as tauriOpen, save as tauriSave } from '@tauri-apps/plugin-dialog'
import { readTextFile, writeFile } from '@tauri-apps/plugin-fs'

export const save = async ({ obj, title, date }) => {
  const jsonObj = JSON.stringify(obj)

  // get file name as user defined
  const fileName = title + "_" + date + ".json"

  // on desktop use Tauri dialog
  if ('__TAURI_INTERNALS__' in window) {
    const filePath = await tauriSave({
      defaultPath: fileName,
      filters: [{
        name: fileName,
        extensions: ["json"]
      }]
    })
    if (filePath === null) return

    // Convert the JSON string to a Uint8Array
    const buffer = new TextEncoder().encode(jsonObj);

    // Write the Uint8Array to file
    await writeFile(filePath, buffer);
  }
  else {
    // construct output file
    let data = "data:text/jsoncharset=utf-8,"
    data += encodeURIComponent(jsonObj)

    // start download by performing click on #downloadProject
    const dlProj = document.createElement("a")
    dlProj.href = data
    dlProj.download = fileName
    document.body.appendChild(dlProj)
    dlProj.click()
    dlProj.remove()
  }
}

export const readFileTauri = async () => {
  const fileSelection = await tauriOpen({
    directory: false,
    multiple: false,
    filters: [
      { name: 'VNMS Project', extensions: ['vnsp'] },
      { name: 'JSON', extensions: ['json'] }
    ]
  }) as any;

  // Ensure fileSelection is not null and has a path
  if (!fileSelection?.path) {
    console.error('No file selected or file has no path');
    return;
  }

  const filePath = fileSelection.path;
  const content = await readTextFile(filePath);
  
  // Create a File object if needed, using the file name and mime type from the selection.
  const blob = new Blob([content], { type: "application/json" });
  return new File([blob], fileSelection.name, { type: fileSelection.mimeType || "application/json" });
};

export const readFile = (input, onSuccess, onError) => {
  if (!(input instanceof Blob) && !(input instanceof File)) {
    onError()
    return
  }

  // file reader init
  const reader = new FileReader()
  reader.readAsText(input, "UTF-8")

  // read the file
  reader.onload = (evt) => {
    const file = evt.target?.result
    if (!file) return
    let obj:any
    let result:SimulatorState = new SimulatorState()

    // retrocompatibility
    if (input[0]?.name?.split(".")?.slice(-1)[0] == "vnsp") {
      result.fromVNSP(file as string)
    }

    // check correct file type
    if (input.type == "application/json") {
      obj = JSON.parse(file as string)
      obj.focus.el = stylesRetrocompatibility(obj.focus.el)
      result.fromJSON(obj)
    }
    else {
      onError()
      return
    }

    onSuccess(result)
  }

  // on invalid file
  reader.onerror = () => {
    onError()
  }
}

// styling retrocompatibility of currently highlighted field
export const stylesRetrocompatibility = (el) => {
  switch (el) {
    case "ir":
      el = "ir.input.field"
      break
    case "pc":
      el = "pc.input.input"
      break
    case "acc":
      el = "acc.field.field"
      break
    case "aluOp":
      el = "alu.op.field"
      break
    case "aluE2":
      el = "alu.p2.field"
      break
  }
  return el
}