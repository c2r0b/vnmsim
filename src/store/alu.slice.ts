import { createSlice } from '@reduxjs/toolkit'
import type Alu from '../types/alu'

const initialState:Alu = {
  e1: '',
  e2: '',
  op: '',
  acc: 0,
}

const aluSlice = createSlice({
  name: 'alu',
  initialState,
  reducers: {
    clearAlu() {
      return initialState
    },
    setE1(state, action) {
      state.e1 = action.payload
    },
    setE2(state, action) {
      state.e2 = action.payload
    },
    setOp(state, action) {
      state.op = action.payload
    },
    setAcc(state, action) {
      state.acc = action.payload
    },
    calculate(state) {
      switch (state.op) {
        case '+': {
          state.acc = parseInt(state.e1) + parseInt(state.e2)
          break
        }
        case '-': {
          state.acc = parseInt(state.e1) - parseInt(state.e2)
          break
        }
        case '*': {
          state.acc = parseInt(state.e1) * parseInt(state.e2)
          break
        }
        case '/': {
          state.acc = parseInt(state.e1) / parseInt(state.e2)
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