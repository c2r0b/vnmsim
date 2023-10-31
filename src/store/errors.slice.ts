import { createSlice } from '@reduxjs/toolkit'
import type ErrorManager from '../types/error'

const initialState:ErrorManager = {
  error: undefined,
  hasErrors: 0
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clearError() {
      return initialState
    },
    setError(state, action) {
      state.error = action.payload
      state.hasErrors++
    }
  }
})

export const {
  clearError,
  setError
} = errorSlice.actions
export default errorSlice.reducer