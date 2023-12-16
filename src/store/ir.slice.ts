import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Ir } from 'src-tauri/shared/pkg/shared'

export const initialState:TypeFromWasm<Ir> = {
  cmd: '',
  loc: ''
}

const irSlice = createSlice({
  name: 'ir',
  initialState,
  reducers: {
    clearIr() {
      return initialState
    },
    setIrCmd(state, action) {
      state.cmd = action.payload
      state.loc = ''
    },
    setIrLoc(state, action) {
      state.loc = action.payload
    },
  }
})

export const {
  clearIr,
  setIrCmd,
  setIrLoc,
} = irSlice.actions
export default irSlice.reducer