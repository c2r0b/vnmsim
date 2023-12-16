import { createSlice } from '@reduxjs/toolkit'
import type { TypeFromWasm } from '../types/fromWasm'
import type { Stats } from 'src-tauri/shared/pkg/shared'

export const initialState:TypeFromWasm<Stats> = {
  executed_step: 0,
  alu_calculation: 0,
  variable_access: 0,
  cell_access: 0,
  performed_jmp: 0,
  performed_jmz: 0,
}

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats() {
      return initialState
    },
    setStats(state, action) {
      state.executed_step = action.payload.executed_step
      state.alu_calculation = action.payload.alu_calculation
      state.variable_access = action.payload.variable_access
      state.cell_access = action.payload.cell_access
      state.performed_jmp = action.payload.performed_jmp
      state.performed_jmz = action.payload.performed_jmz
    },
    incrementExecutedStep(state) {
      state.executed_step++
    },
    incrementAluCalculation(state) {
      state.alu_calculation++
    },
    incrementVariableAccess(state) {
      state.variable_access++
    },
    incrementCellAccess(state) {
      state.cell_access++
    },
    incrementPerformedJmp(state) {
      state.performed_jmp++
    },
    incrementPerformedJmz(state) {
      state.performed_jmz++
    }
  }
})

export const {
  clearStats,
  setStats,
  incrementExecutedStep,
  incrementAluCalculation,
  incrementVariableAccess,
  incrementCellAccess,
  incrementPerformedJmp,
  incrementPerformedJmz
} = statsSlice.actions
export default statsSlice.reducer