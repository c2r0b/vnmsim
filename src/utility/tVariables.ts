// T variables utils
const isTVariable = (key:string):boolean => /^T\d+$/.test(key)
const getTVariableNameFromIndex = (index:number):string => `T${index}`
const getTVariableIndexFromName = (name:string):number => (isTVariable(name) || NaN) && +name.replace("T", "")

export {
    isTVariable,
    getTVariableNameFromIndex,
    getTVariableIndexFromName
}