import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Ram } from 'src-tauri/shared/pkg/shared'
import { getTVariableIndexFromName, isTVariable } from 'src/utility/tVariables'

export const initialState:TypeFromWasm<Ram> = {
  code: '',
  variables: {
    X: BigInt(0),
    Y: BigInt(0),
    Z: BigInt(0),
    W: BigInt(0),
    T: [BigInt(0)],
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
        const index = getTVariableIndexFromName(action.payload.name)
        while (index >= state.variables.T.length) {
          state.variables.T.push(BigInt(0))
        }
        state.variables.T = state.variables.T.map((item, i) => i === index ? BigInt(action.payload.value) : item);
      }
      else {
        state.variables[action.payload.name] = BigInt(action.payload.value)
      }
    },
    addTVariable(state) {
      state.variables.T.push(BigInt(0))
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