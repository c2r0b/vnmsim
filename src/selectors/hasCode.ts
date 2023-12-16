import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

export const hasCode = createSelector(
  (state:RootState) => state.ram.code,
  status => {
    return status.length > 0
  }
)