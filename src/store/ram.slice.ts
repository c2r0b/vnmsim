import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Ram } from 'src-wasm/pkg'
import { getTVariableIndexFromName, isTVariable } from 'src/app/utility/tVariables'

export const initialState:TypeFromWasm<Ram> = {
  code: '',
  variables: {
    X: 0,
    Y: 0,
    Z: 0,
    W: 0,
    T: [0],
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
      if (isTVariable(action.payload.name)) {
        state.variables.T[getTVariableIndexFromName(action.payload.name)] = +action.payload.value
      }
      else {
        state.variables[action.payload.name] = +action.payload.value
      }
    },
    addTVariable(state) {
      state.variables.T.push(0)
    },
  }
})

export const {
  clearRam,
  setCode,
  setVariable,
  addTVariable,
} = ramSlice.actions
export default ramSlice.reducer