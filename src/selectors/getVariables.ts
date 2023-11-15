import { createSelector } from '@reduxjs/toolkit'
import { getTVariableNameFromIndex } from 'src/app/utility/tVariables'
import { RootState } from 'src/store'

export const getVariables = createSelector(
    (state:RootState) => state.ram.variables,
    status => {
      let variables:any = {
        ...status,
        T: undefined
      }

      variables.T.forEach((v, i) => {
        variables[getTVariableNameFromIndex(i)] = v
      })

      return variables
    }
  )