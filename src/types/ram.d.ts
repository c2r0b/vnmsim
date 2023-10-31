export default interface Ram {
  code: string
  lastTVariableIndex: number
  variables: {
    Y: number
    X: number
    Z: number
    W: number
    T1: number
  }
}