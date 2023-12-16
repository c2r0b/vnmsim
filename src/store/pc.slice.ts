import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Pc } from 'src-tauri/shared/pkg/shared'

export const initialState:TypeFromWasm<Pc> = {
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
      state.val = action.payload ?? initialState.val
    },
    setPcStep(state, action) {
      state.step = action.payload ?? initialState.step
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