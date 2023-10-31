import { createSlice } from '@reduxjs/toolkit'
import type Stats from '../types/stats'

const initialState:Stats = {
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
  incrementExecutedStep,
  incrementAluCalculation,
  incrementVariableAccess,
  incrementCellAccess,
  incrementPerformedJmp,
  incrementPerformedJmz
} = statsSlice.actions
export default statsSlice.reducer