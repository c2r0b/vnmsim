// T variables utils
const isTVariable = (key:string):boolean => key.startsWith("T")
const getTVariableNameFromIndex = (index:number):string => `T${index}`
const getTVariableIndexFromName = (name:string):number => +name.replace("T", "")

export {
    isTVariable,
    getTVariableNameFromIndex,
    getTVariableIndexFromName
}