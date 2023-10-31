import { createSlice } from '@reduxjs/toolkit'
import type Pc from '../types/pc'

const initialState:Pc = {
  val: 0,
  step: 1,
}

const pcSlice = createSlice({
  name: 'pc',
  initialState,
  reducers: {
    clearPc() {
      return initialState
    },
    incrementPc(state) {
      state.val += state.step
    },
    setPc(state, action) {
      state.val = action.payload
    },
    setPcStep(state, action) {
      state.step = action.payload
    },
  }
})

export const {
  clearPc,
  incrementPc,
  setPc,
  setPcStep
} = pcSlice.actions
export default pcSlice.reducer