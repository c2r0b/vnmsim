import { createSelector } from '@reduxjs/toolkit'
import { getTVariableNameFromIndex } from 'src/utility/tVariables'
import { RootState } from 'src/store'

export const getVariables = createSelector(
    (state:RootState) => state.ram.variables,
    status => {
      let variables:any = {
        ...status
      }

      status.T.forEach((v, i) => {
        variables[getTVariableNameFromIndex(i)] = v
      })

      delete variables.T

      return variables
    }
  )