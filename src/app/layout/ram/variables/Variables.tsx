import React from "react"
import { useT } from '@transifex/react'

import { Add24Filled } from '@fluentui/react-icons'
import { Tooltip, Button, Table, TableBody, TableCell, TableCellLayout, TableRow } from '@fluentui/react-components'

import { addVariable, setVariable } from "src/store/ram.slice"
import { useAppDispatch, useAppSelector } from "src/hooks/store"

import * as RamStyles from '../ram.styles'
import * as Styles from './variables.styles'

interface IProps {
  focusedVar?: string
}

export const Variables = (props:IProps) => {
  const dispatch = useAppDispatch()
  const variables = useAppSelector((state) => state.ram.variables)

  const t = useT()

  const allVariables = Object.keys(variables)
  const items = allVariables.map((key, i) => ({
    key: i.toString(),
    type: key,
    value: variables[key]
  }))

  const onChange = (key, event) => {
    const newValue = event.target.value
    if (newValue === undefined) return
    dispatch(setVariable({ name: key, value: newValue }))
  }

  const handleAddVariable = () => {
    dispatch(addVariable())
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
            <input
              type="number"
              step={ 1 }
              value={ value }
              onChange={ (e) => onChange(item.type, e) }
              style={ style }
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