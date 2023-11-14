import React from "react"
import { useT } from '@transifex/react'

import { Add24Filled } from '@fluentui/react-icons'
import { Tooltip, Button, Table, TableBody, TableCell, TableCellLayout, TableRow, SpinButton } from '@fluentui/react-components'

import { addTVariable, setVariable, setTVariable } from "src/store/ram.slice"
import { useAppDispatch, useAppSelector } from "src/hooks/store"
import { getTVariableIndexFromName, getTVariableNameFromIndex, isTVariable } from "src/app/utility/tVariables"

import * as RamStyles from '../ram.styles'
import * as Styles from './variables.styles'

interface IProps {
  focusedVar?: string
}

export const Variables = (props:IProps) => {
  const dispatch = useAppDispatch()
  const variables = useAppSelector((state) => state.ram.variables)

  const t = useT()

  // create an array of all variables keys to be displayed
  const allVariables = Object.keys(variables).filter((key) => key !== "T")
  variables.T.forEach((_key, i) => allVariables.push(getTVariableNameFromIndex(i)))

  // create an array of objects to be displayed as variables
  const items = allVariables.map((key, i) => {
    const value = isTVariable(key) ? variables.T[getTVariableIndexFromName(key)] : variables[key]
    return {
      key: i.toString(),
      type: key,
      value
    }
  })

  const onChange = (key, value) => {
    if (value === undefined) return
    if (isTVariable(key)) {
      dispatch(setTVariable({ index: getTVariableIndexFromName, value }))
      return
    }
    dispatch(setVariable({ name: key, value }))
  }

  const handleAddVariable = () => {
    dispatch(addTVariable())
  }

  const displayVariable = (item) => {
    const value = variables[item.type]
    let style = Styles.varSpin

    // change style on focus variable
    if (props.focusedVar === item.type) {
      style = Styles.focusedVar
    }

    return (
      <TableRow key={ item.type } style={ RamStyles.row }>
        <TableCell style={ Styles.typeCell }>
          { item.type }
        </TableCell>
        <TableCell style={ Styles.inputCell }>
          <TableCellLayout>
            <SpinButton
              appearance="underline"
              value={ value }
              style={ style }
              onChange={ (_e, data) => onChange(item.type, data.value) }
            />
          </TableCellLayout>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div style={ RamStyles.verticalHalf }>
      <Table size="small">
        <TableBody>
          { items.map(displayVariable) }
          <TableRow>
            <TableCell>
              <Tooltip
                content={ t("Add T variable") }
                relationship="label"
                withArrow
              >
                <Button
                  aria-label={ t("Add T variable") }
                  icon={ <Add24Filled /> }
                  onClick={ handleAddVariable }
                  appearance="subtle"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}