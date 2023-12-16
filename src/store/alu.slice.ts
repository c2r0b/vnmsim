import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Alu } from 'src-tauri/shared/pkg/shared'

export const initialState:TypeFromWasm<Alu> = {
  e1: BigInt(0),
  e2: BigInt(0),
  op: '',
  acc: BigInt(0),
}

const aluSlice = createSlice({
  name: 'alu',
  initialState,
  reducers: {
    clearAlu() {
      return initialState
    },
    setE1(state, action) {
      state.e1 = BigInt(action.payload) ?? initialState.e1
    },
    setE2(state, action) {
      state.e2 = BigInt(action.payload) ?? initialState.e2
    },
    setOp(state, action) {
      state.op = action.payload ?? initialState.op
    },
    setAcc(state, action) {
      state.acc = BigInt(action.payload) ?? initialState.acc
    },
    calculate(state) {
      switch (state.op) {
        case '+': {
          state.acc = state.e1 + state.e2
          break
        }
        case '-': {
          state.acc = state.e1 - state.e2
          break
        }
        case '*': {
          state.acc = state.e1 * state.e2
          break
        }
        case '/': {
          state.acc = state.e1 / state.e2
          break
        }
      }
    }
  }
})

export const {
  clearAlu,
  setE1,
  setE2,
  setOp,
  setAcc,
  calculate,
} = aluSlice.actions
export default aluSlice.reducer