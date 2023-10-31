export default interface Sim {
  title: string
  created: string
  codeLine: number
  step: number
  status: number
  interval: number
  focus: {
    el: string
    cell: number
    var: string
  }
}