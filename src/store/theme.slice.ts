import { createSlice } from '@reduxjs/toolkit'
import type Theme from '../types/theme'

const initialState:Theme = {
  name: "system"
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.name = action.payload
    }
  }
})

export const {
  setTheme
} = themeSlice.actions
export default themeSlice.reducer