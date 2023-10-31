import { createSelector, createSlice } from '@reduxjs/toolkit'
import type Sim from '../types/sim'
import { lastStep } from 'src/middleware/execute'
import { Status } from 'src/types/status'
import { RootState } from '.'

const initialState:Sim = {
  title: 'vnms',
  created: new Date().toISOString().slice(0, 10),
  codeLine: 0,
  step: 0,
  status: 0,
  interval: 500,
  focus: {
    el: "",
    cell: -1,
    var: ""
  }
}

const simSlice = createSlice({
  name: 'sim',
  initialState,
  reducers: {
    clearSim() {
      return initialState
    },
    setTitle(state, action) {
      state.title = action.payload
    },
    setCreated(state, action) {
      state.created = action.payload
    },
    setCodeLine(state, action) {
      state.codeLine = action.payload
    },
    incrementCodeLine(state) {
      state.codeLine += 1
    },
    setStep(state, action) {
      state.step = action.payload
    },
    incrementStep(state) {
      state.step += 1

      if (state.step > lastStep) {
        state.step = 1
        state.codeLine += 1
  
        // single iteration
        if (state.status === 3) {
          state.focus = initialState.focus
          state.status = 0
          return
        }
      }
  
      if (!state.codeLine || state.codeLine < 0) {
        state.codeLine = 0
      }
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    setInterval(state, action) {
      state.interval = action.payload
    },
    setFocusCell(state, action) {
      state.focus.cell = action.payload
    },
    setFocusVar(state, action) {
      state.focus.var = action.payload
    },
    setFocusEl(state, action) {
      state.focus.el = action.payload
    },
    clearFocus(state) {
      state.focus = initialState.focus
    },
    clearFocusEl(state) {
      state.focus.el = initialState.focus.el
    },
    stopSim(state) {
      state.status = 0
      state.focus = initialState.focus
      state.codeLine = -1
    },
  }
})

export const {
  clearSim,
  setTitle,
  setCreated,
  setCodeLine,
  incrementCodeLine,
  setStep,
  incrementStep,
  setStatus,
  setInterval,
  setFocusCell,
  setFocusVar,
  setFocusEl,
  clearFocus,
  clearFocusEl,
  stopSim,
} = simSlice.actions
export default simSlice.reducer