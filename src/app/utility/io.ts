import { SimulatorState } from '../../types/simulatorState'

export const save = ({ obj, title, date }) => {
  // construct output file
  let data = "data:text/jsoncharset=utf-8,"
  data += encodeURIComponent(JSON.stringify(obj))

  // get file name as user defined
  const fileName = title + "_" + date + ".json"

  // start download by performing click on #downloadProject
  const dlProj = document.createElement("a")
  dlProj.href = data
  dlProj.download = fileName
  document.body.appendChild(dlProj)
  dlProj.click()
  dlProj.remove()
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