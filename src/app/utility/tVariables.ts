// T variables utils
const isTVariable = (key:string):boolean => key.indexOf("T") === 0
const getTVariableNameFromIndex = (index:number):string => `T${index}`
const getTVariableIndexFromName = (name:string):number => +name.replace("T", "")

export {
    isTVariable,
    getTVariableNameFromIndex,
    getTVariableIndexFromName
}