import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'src/store'
import { Status } from 'src/types/status'

export const isSimulatorRunning = createSelector(
    (state:RootState) => state.sim.status,
    status => [
      Status.PLAY,
      Status.INSTANT,
      Status.SINGLE_STEP, 
      Status.SINGLE_ITERATION
    ].includes(status)
  )