import { createSlice } from '@reduxjs/toolkit'
import type Ram from '../types/ram'

const initialState:Ram = {
  code: '',
  lastTVariableIndex: 1,
  variables: {
    X: 0,
    Y: 0,
    Z: 0,
    W: 0,
    T1: 0
  }
}

const ramSlice = createSlice({
  name: 'ram',
  initialState,
  reducers: {
    clearRam() {
      return initialState
    },
    setCode(state, action) {
      state.code = action.payload
    },
    setVariable(state, action) {
      state.variables[action.payload.name] = action.payload.value
    },
    addVariable(state) {
      state.lastTVariableIndex += 1
      state.variables[`T${state.lastTVariableIndex}`] = 0
    },
  }
})

export const {
  clearRam,
  setCode,
  setVariable,
  addVariable,
} = ramSlice.actions
export default ramSlice.reducer