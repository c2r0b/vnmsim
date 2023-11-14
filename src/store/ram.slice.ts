import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Ram } from 'src-wasm/pkg'

const initialState:TypeFromWasm<Ram> = {
  code: '',
  variables: {
    X: 0,
    Y: 0,
    Z: 0,
    W: 0,
    T: new Int32Array(0),
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
    setTVariable(state, action) {
      state.variables.T[action.payload.index] = action.payload.value
    },
    addTVariable(state) {
      state.variables.T = new Int32Array([...state.variables.T, 0])
    },
  }
})

export const {
  clearRam,
  setCode,
  setVariable,
  setTVariable,
  addTVariable,
} = ramSlice.actions
export default ramSlice.reducer