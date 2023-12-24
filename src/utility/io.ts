import { SimulatorState } from '../types/simulatorState'
import { open as tauriOpen, save as tauriSave } from '@tauri-apps/api/dialog'
import { readTextFile, writeFile } from '@tauri-apps/api/fs'

export const save = async ({ obj, title, date }) => {
  const jsonObj = JSON.stringify(obj)

  // get file name as user defined
  const fileName = title + "_" + date + ".json"

  // on desktop use Tauri dialog
  if ('__TAURI__' in window) {
    const filePath = await tauriSave({
      defaultPath: fileName,
      filters: [{
        name: fileName,
        extensions: ["json"]
      }]
    })
    if (filePath === null) return
    await writeFile(filePath, jsonObj)
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
  const filePath = await tauriOpen({
    directory: false,
    multiple: false,
    filters: [
      { name: 'VNMS Project', extensions: ['vnsp'] },
      { name: 'JSON', extensions: ['json'] }
    ]
  }) as unknown as string
  if (!filePath) return
  const content = await readTextFile(filePath);
  const file = new File([content], filePath, { type: "application/json" })
  return file
}

export const readFile = (input, onSuccess, onError) => {
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